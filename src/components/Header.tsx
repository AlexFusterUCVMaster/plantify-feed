import { Leaf } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Leaf className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Plantify</h1>
        </div>
        <p className="text-sm text-muted-foreground hidden sm:block">
          Comparte tu amor por las plantas 🌿
        </p>
      </div>
    </header>
  );
};

export default Header;
