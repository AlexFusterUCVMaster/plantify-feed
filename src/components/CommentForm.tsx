import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

interface CommentFormProps {
  postId: string;
  onCommentAdded: () => void;
}

const CommentForm = ({ postId, onCommentAdded }: CommentFormProps) => {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Error",
        description: "Debes iniciar sesión para comentar",
        variant: "destructive",
      });
      return;
    }

    if (!content.trim()) {
      toast({
        title: "Error",
        description: "El comentario no puede estar vacío",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("comments").insert({
        post_id: postId,
        user_id: user.id,
        content: content.trim(),
      });

      if (error) throw error;

      setContent("");
      onCommentAdded();
      toast({
        title: "Comentario añadido",
        description: "Tu comentario se ha publicado correctamente",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "No se pudo publicar el comentario",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <p className="text-sm text-muted-foreground text-center py-4 border-t-2 border-primary/20 mt-4">
        Inicia sesión para comentar
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border-t-2 border-primary/20 mt-4 pt-4">
      <div className="flex gap-2">
        <Textarea
          placeholder="Escribe un comentario..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[60px] bg-muted/30 border-primary/30 focus:border-primary resize-none rounded-none"
          maxLength={500}
        />
        <Button
          type="submit"
          disabled={isSubmitting || !content.trim()}
          className="bg-primary hover:bg-primary/80 text-primary-foreground rounded-none"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};

export default CommentForm;
