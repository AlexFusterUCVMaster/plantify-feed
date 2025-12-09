import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { z } from "zod";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "login" | "signup";
}

const emailSchema = z.string().email("Email inválido");
const passwordSchema = z.string().min(6, "La contraseña debe tener al menos 6 caracteres");

export const AuthDialog = ({ open, onOpenChange, mode }: AuthDialogProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setUsername("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      emailSchema.parse(email);
      passwordSchema.parse(password);
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast.error(err.errors[0].message);
        return;
      }
    }

    if (mode === "signup" && password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    setIsLoading(true);

    try {
      if (mode === "login") {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast.error("Credenciales inválidas");
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success("¡Bienvenido de vuelta!");
          resetForm();
          onOpenChange(false);
        }
      } else {
        const { error } = await signUp(email, password, username);
        if (error) {
          if (error.message.includes("User already registered")) {
            toast.error("Este email ya está registrado");
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success("¡Cuenta creada exitosamente!");
          resetForm();
          onOpenChange(false);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-card border-2 border-primary/30 neon-glow">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary neon-text">
            {mode === "login" ? "Login" : "Sign Up"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {mode === "login"
              ? "Ingresa tus credenciales para acceder"
              : "Crea una cuenta para comenzar"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {mode === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="username" className="text-foreground">
                Nombre de usuario
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="tu_nombre"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-background/50 border-primary/30 focus:border-accent"
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background/50 border-primary/30 focus:border-accent"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground">
              Contraseña
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-background/50 border-primary/30 focus:border-accent"
              required
            />
          </div>
          {mode === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-foreground">
                Confirmar Contraseña
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-background/50 border-primary/30 focus:border-accent"
                required
              />
            </div>
          )}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary/20 text-accent border-2 border-accent hover:bg-accent/20 neon-glow"
          >
            {isLoading 
              ? "Cargando..." 
              : mode === "login" 
                ? "Iniciar Sesión" 
                : "Crear Cuenta"
            }
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
