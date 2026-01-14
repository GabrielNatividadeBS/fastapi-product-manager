import { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import ProductTable from "@/components/ProductTable";
import ProductModal from "@/components/ProductModal";
import ProductFiltersComponent from "@/components/ProductFilters";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
import EmptyState from "@/components/EmptyState";
import LoadingState from "@/components/LoadingState";
import { useProducts } from "@/hooks/useProducts";
import { Product, ProductFormData, ProductFilters } from "@/types/product";

const Index = () => {
  const {
    products,
    isLoading,
    createProduct,
    updateProduct,
    deleteProduct,
    isCreating,
    isUpdating,
    isDeleting,
    setCategoryGroup,
  } = useProducts();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filters, setFilters] = useState<ProductFilters>({
    search: "",
    category: "all",
    stockStatus: "all",
  });

  // O filtro de categoria principal agora é feito no backend
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search filter
      const searchMatch =
        filters.search === "" ||
        product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.description?.toLowerCase().includes(filters.search.toLowerCase());

      // Stock status filter
      const stockMatch =
        filters.stockStatus === "all" ||
          (filters.stockStatus === "in_stock" && product.stock) ||
        (filters.stockStatus === "out_of_stock" && !product.stock);

      return searchMatch && stockMatch;
    });
  }, [products, filters]);

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteDialogOpen(true);
  };

  const handleModalSubmit = (data: ProductFormData) => {
    if (selectedProduct) {
      updateProduct(
        { id: selectedProduct.id, data },
        {
          onSuccess: () => setIsModalOpen(false),
        }
      );
    } else {
      createProduct(data, {
        onSuccess: () => setIsModalOpen(false),
      });
    }
  };

  const handleDeleteConfirm = () => {
    if (selectedProduct) {
      deleteProduct(selectedProduct.id, {
        onSuccess: () => {
          setIsDeleteDialogOpen(false);
          setSelectedProduct(null);
        },
      });
    }
  };

  // Atualizar o filtro de categoria principal para buscar do backend
  const handleFiltersChange = (newFilters: ProductFilters) => {
    setFilters(newFilters);
    setCategoryGroup(newFilters.category);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Products</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage your product inventory
            </p>
          </div>
          <Button onClick={handleAddProduct} className="sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            New Product
          </Button>
        </div>

        {/* Filters */}
        {!isLoading && (
          <div className="mb-6">
            <ProductFiltersComponent filters={filters} onFiltersChange={handleFiltersChange} />
          </div>
        )}

        {/* Content */}
        {isLoading ? (
          <LoadingState />
        ) : products.length === 0 ? (
          <EmptyState onAddProduct={handleAddProduct} />
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products match your filters.</p>
            <Button
              variant="link"
              onClick={() => setFilters({ search: "", category: "all", stockStatus: "all" })}
              className="mt-2"
            >
              Clear filters
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-muted-foreground">
              {filteredProducts.length} of {products.length} {products.length === 1 ? "product" : "products"}
            </div>
            <ProductTable
              products={filteredProducts}
              onEdit={handleEditProduct}
              onDelete={handleDeleteClick}
            />
          </>
        )}
      </main>

      {/* Modals */}
      <ProductModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        product={selectedProduct}
        isLoading={isCreating || isUpdating}
      />

      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        productName={selectedProduct?.name}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default Index;
