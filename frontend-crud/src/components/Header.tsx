import { Package } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Package className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Product Manager</h1>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            Dashboard
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
