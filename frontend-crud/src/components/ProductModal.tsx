import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Product, ProductFormData, PRODUCT_CATEGORIES, ProductCategory } from "@/types/product";
import { Loader2 } from "lucide-react";
const CATEGORY_GROUP_MAP: Record<string, string[]> = {
  "Eletrônicos": ["Celular", "Teclado", "Headset", "Webcam", "Mouse", "TV", "Monitor"],
  "Esporte": ["Bola", "Tênis", "Bicicleta", "Basquete", "Futebol"],
  "Saúde": ["Escova de Dente", "Protetor Labial", "Protetor Solar", "Sabonete"],
  "Alimentos": ["Fruta", "Doce", "Salgado", "Almoço"],
};

const productSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  description: z.string().max(500, "Description must be less than 500 characters").optional(),
  price: z.coerce.number().min(0, "Price must be positive").max(999999.99, "Price is too high"),
  stock: z.boolean(),
  category: z.string().min(1, "Subcategory is required"),
});

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ProductFormData) => void;
  product?: Product | null;
  isLoading?: boolean;
}

const ProductModal = ({ open, onClose, onSubmit, product, isLoading }: ProductModalProps) => {
  const isEditing = !!product;

  const form = useForm<any>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: true,
      category: CATEGORY_GROUP_MAP[PRODUCT_CATEGORIES[0]][0],
    },
  });

  useEffect(() => {
    if (open) {
      if (product) {
        form.reset({
          name: product.name,
          description: product.description ?? "",
          price: product.price,
          stock: product.stock,
          category: product.category,
        });
      } else {
        form.reset({
          name: "",
          description: "",
          price: 0,
          stock: true,
          category: CATEGORY_GROUP_MAP[PRODUCT_CATEGORIES[0]][0],
        });
      }
    }
  }, [open, product, form]);

  const handleSubmit = (data: ProductFormData) => {
    onSubmit(data);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[480px] animate-scale-in">
        <DialogHeader />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
            {/* Nome do produto */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter product name"
                      {...field}
                      className="h-11"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Subcategoria (categoria filha) */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(CATEGORY_GROUP_MAP).flat().map((subcat) => (
                        <SelectItem key={subcat} value={subcat}>
                          {subcat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter product description (optional)"
                      {...field}
                      className="min-h-[100px] resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        R$
                      </span>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        {...field}
                        className="h-11 pl-12"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div>
                    <FormLabel className="text-base">In Stock</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Is this product currently available?
                    </p>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEditing ? "Save Changes" : "Add Product"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
