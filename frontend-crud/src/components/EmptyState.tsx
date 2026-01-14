import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onAddProduct: () => void;
}

const EmptyState = ({ onAddProduct }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card p-12 text-center animate-fade-in">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <Package className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-foreground">No products yet</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-sm">
        Get started by adding your first product. Click the button below to create one.
      </p>
      <Button onClick={onAddProduct} className="mt-6">
        Add Your First Product
      </Button>
    </div>
  );
};

export default EmptyState;
