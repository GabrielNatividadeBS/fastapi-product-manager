import { cn } from "@/lib/utils";

interface StockBadgeProps {
  inStock: boolean;
}

const StockBadge = ({ inStock }: StockBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
        inStock
          ? "bg-success/10 text-success"
          : "bg-destructive/10 text-destructive"
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          inStock ? "bg-success" : "bg-destructive"
        )}
      />
      {inStock ? "In Stock" : "Out of Stock"}
    </span>
  );
};

export default StockBadge;
