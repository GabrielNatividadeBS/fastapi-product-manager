import { Loader2 } from "lucide-react";

const LoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="mt-4 text-sm text-muted-foreground">Loading products...</p>
    </div>
  );
};

export default LoadingState;
