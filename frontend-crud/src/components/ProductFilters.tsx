import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductFilters, PRODUCT_CATEGORIES } from "@/types/product";
import { Search, Filter } from "lucide-react";

interface ProductFiltersProps {
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
}

const ProductFiltersComponent = ({ filters, onFiltersChange }: ProductFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 p-4 bg-card rounded-lg border border-border shadow-sm">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          id="search-products"
          name="search"
          placeholder="Search products..."
          value={filters.search}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
          className="pl-9"
        />
      </div>
      
      <div className="flex gap-3">
        <Select
          value={filters.category}
          onValueChange={(value) => onFiltersChange({ ...filters, category: value as ProductFilters["category"] })}
        >
          <SelectTrigger className="w-[160px]">
            <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {PRODUCT_CATEGORIES.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.stockStatus}
          onValueChange={(value) => onFiltersChange({ ...filters, stockStatus: value as ProductFilters["stockStatus"] })}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Stock" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="in_stock">In Stock</SelectItem>
            <SelectItem value="out_of_stock">Out of Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ProductFiltersComponent;
