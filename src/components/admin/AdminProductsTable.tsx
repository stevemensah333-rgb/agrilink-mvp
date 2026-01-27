import { format } from "date-fns";
import { Package, MapPin } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getProduceImage } from "@/lib/produceImages";

interface Product {
  id: string;
  agent_id: string;
  name: string;
  description: string | null;
  price: number;
  quantity: number;
  unit: string;
  category: string;
  location: string | null;
  image_url: string | null;
  is_available: boolean;
  created_at: string;
}

interface AdminProductsTableProps {
  products: Product[];
  loading: boolean;
}

const AdminProductsTable = ({ products, loading }: AdminProductsTableProps) => {
  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Loading products...</div>;
  }

  if (products.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No products found</div>;
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Listed</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted">
                    <img
                      src={product.image_url || getProduceImage(product.name, product.category)}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-medium">{product.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{product.category}</Badge>
              </TableCell>
              <TableCell>₵{Number(product.price).toFixed(2)}/{product.unit}</TableCell>
              <TableCell>{product.quantity} {product.unit}</TableCell>
              <TableCell>
                {product.location ? (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {product.location}
                  </div>
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </TableCell>
              <TableCell>
                <Badge className={product.is_available ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                  {product.is_available ? "Available" : "Unavailable"}
                </Badge>
              </TableCell>
              <TableCell>{format(new Date(product.created_at), "MMM d, yyyy")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminProductsTable;
