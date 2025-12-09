import { Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthDialog } from "@/components/AuthDialog";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";

const Header = () => {
  const [authMode, setAuthMode] = useState<"login" | "signup" | null>(null);
  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-primary bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 neon-glow">
      <div className="container flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-3 animate-slide-up">
          <Leaf className="h-8 w-8 text-accent animate-neon-pulse drop-shadow-[0_0_15px_hsl(140_100%_50%)]" />
          <Link to="/" className="text-3xl font-bold text-primary neon-text tracking-wider uppercase animate-flicker">
            Plantify
          </Link>
        </div>
        <div className="flex items-center gap-3 animate-slide-up">
          <Button
            variant="outline"
            className="text-red-500 hover:bg-primary/20 hover:text-accent hover:border-accent border-primary/30 neon-text transition-colors"
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
