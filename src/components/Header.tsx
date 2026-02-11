import { Leaf, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthDialog } from "@/components/AuthDialog";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [authMode, setAuthMode] = useState<"login" | "signup" | null>(null);
  const { user, signOut, loading } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-primary bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 neon-glow">
      <div className="container flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-3 animate-slide-up">
          <Leaf className="h-8 w-8 text-secondary animate-neon-pulse drop-shadow-[0_0_15px_hsl(320_100%_50%)]" />
          <Link to="/" className="text-3xl font-bold text-primary neon-text tracking-wider uppercase animate-flicker">
            Plantify
          </Link>
        </div>
        <div className="flex items-center gap-3 animate-slide-up">
          {loading ? (
            <div className="h-10 w-20 bg-primary/20 animate-pulse" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="text-foreground hover:bg-primary/20 hover:text-accent hover:border-accent border-primary/30 neon-text transition-colors gap-2"
                >
                  <User className="h-4 w-4" />
                  {user.user_metadata?.username || user.email?.split("@")[0]}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card border-primary/30">
                <DropdownMenuItem
                  onClick={() => signOut()}
                  className="text-foreground hover:bg-primary/20 cursor-pointer gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button
                variant="outline"
                className="text-foreground hover:bg-primary/20 hover:text-accent hover:border-accent border-primary/30 neon-text transition-colors"
                onClick={() => setAuthMode("login")}
              >
                Login
              </Button>
              <Button
                className="bg-primary/20 text-accent border-2 border-accent hover:bg-accent/20 neon-glow"
                onClick={() => setAuthMode("signup")}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
      <AuthDialog
        open={authMode !== null}
        onOpenChange={(open) => !open && setAuthMode(null)}
        mode={authMode || "login"}
      />
    </header>
  );
};

export default Header;
