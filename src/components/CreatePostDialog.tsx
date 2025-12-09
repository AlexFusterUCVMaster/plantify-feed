import { useState, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Upload, X, Loader2, Sparkles } from "lucide-react";

const postSchema = z.object({
  plantName: z.string().min(1, "El nombre de la planta es requerido").max(100),
  description: z.string().max(500).optional(),
});

const CreatePostDialog = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [open, setOpen] = useState(false);
  const [plantName, setPlantName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  const [errors, setErrors] = useState<{ plantName?: string; image?: string }>({});

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrors({ ...errors, image: "Solo se permiten imágenes" });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, image: "La imagen no puede superar 5MB" });
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setErrors({ ...errors, image: undefined });
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const resetForm = () => {
    setPlantName("");
    setDescription("");
    setImageFile(null);
    setImagePreview(null);
    setErrors({});
  };

  const generateDescription = async (imageUrl: string) => {
    setIsGeneratingDescription(true);
    try {
      const response = await supabase.functions.invoke('generate-plant-description', {
        body: { imageUrl }
      });
      
      if (response.error) throw new Error(response.error.message);
      
      if (response.data?.description) {
        setDescription(response.data.description);
        toast({ title: "Descripción generada con IA" });
      }
    } catch (error) {
      console.error('Error generating description:', error);
      toast({
        title: "No se pudo generar la descripción",
        description: "Puedes escribirla manualmente",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingDescription(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({ title: "Debes iniciar sesión", variant: "destructive" });
      return;
    }

    // Validate form
    const validation = postSchema.safeParse({ plantName, description });
    if (!validation.success) {
      const fieldErrors: { plantName?: string } = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0] === "plantName") fieldErrors.plantName = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    if (!imageFile) {
      setErrors({ ...errors, image: "Debes subir una imagen" });
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload image to storage
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from("plants")
        .upload(fileName, imageFile);

      if (uploadError) {
        throw new Error("Error al subir la imagen");
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("plants")
        .getPublicUrl(fileName);

      // Create post in database
      const { error: insertError } = await supabase.from("posts").insert({
        user_id: user.id,
        plant_name: plantName.trim(),
        description: description.trim() || null,
        image_url: publicUrl,
      });

      if (insertError) {
        throw new Error("Error al crear el post");
      }

      toast({ title: "Post creado correctamente" });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      resetForm();
      setOpen(false);
    } catch (error) {
      toast({
        title: error instanceof Error ? error.message : "Error al crear el post",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 neon-border">
          <Plus className="h-4 w-4" />
          Crear Post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md border-2 border-primary rounded-none bg-card">
        <DialogHeader>
          <DialogTitle className="text-primary drop-shadow-[0_0_8px_hsl(var(--primary))]">
            Nueva Planta
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="plantName">Nombre de la planta *</Label>
            <Input
              id="plantName"
              value={plantName}
              onChange={(e) => setPlantName(e.target.value)}
              placeholder="Ej: Monstera Deliciosa"
              className="rounded-none border-primary/50"
            />
            {errors.plantName && (
              <p className="text-sm text-destructive">{errors.plantName}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="description">Descripción</Label>
              {imagePreview && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs gap-1 text-primary hover:text-primary"
                  onClick={() => generateDescription(imagePreview)}
                  disabled={isGeneratingDescription}
                >
                  {isGeneratingDescription ? (
                    <>
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Generando...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-3 w-3" />
                      Generar con IA
                    </>
                  )}
                </Button>
              )}
            </div>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Cuéntanos sobre tu planta..."
              className="rounded-none border-primary/50 resize-none"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Imagen *</Label>
            {imagePreview ? (
              <div className="relative aspect-square w-full overflow-hidden border-2 border-primary">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 rounded-none"
                  onClick={removeImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div
                className="aspect-square w-full border-2 border-dashed border-primary/50 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-10 w-10 text-primary/50 mb-2" />
                <p className="text-sm text-muted-foreground">
                  Haz clic para subir una imagen
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Máximo 5MB
                </p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageSelect}
            />
            {errors.image && (
              <p className="text-sm text-destructive">{errors.image}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full rounded-none neon-border"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Subiendo...
              </>
            ) : (
              "Publicar"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostDialog;
