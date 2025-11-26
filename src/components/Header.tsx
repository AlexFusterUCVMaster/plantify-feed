import { Leaf } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-primary bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 neon-glow">
      <div className="container flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-3 animate-slide-up">
          <Leaf className="h-8 w-8 text-accent animate-neon-pulse drop-shadow-[0_0_15px_hsl(140_100%_50%)]" />
          <h1 className="text-3xl font-bold text-primary neon-text tracking-wider uppercase animate-flicker">
            Plantify
          </h1>
        </div>
        <p className="text-sm text-secondary hidden sm:block animate-slide-up font-medium">
          <span className="drop-shadow-[0_0_10px_hsl(320_100%_50%)]">
            CYBER GARDEN 🌿
          </span>
        </p>
      </div>
    </header>
  );
};

export default Header;
