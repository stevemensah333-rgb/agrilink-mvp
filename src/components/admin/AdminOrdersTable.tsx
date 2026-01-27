import { useState } from "react";
import { format } from "date-fns";
import { Check, X, Truck, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Order {
  id: string;
  buyer_id: string;
  product_id: string | null;
  agent_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  transport_mode: string;
  transport_cost: number;
  service_fee: number;
  status: string;
  delivery_location: string | null;
  notes: string | null;
  cancelled_reason: string | null;
  created_at: string;
  products: {
    name: string;
    unit: string;
  } | null;
}

interface AdminOrdersTableProps {
  orders: Order[];
  loading: boolean;
  onRefetch: () => void;
}

const AdminOrdersTable = ({ orders, loading, onRefetch }: AdminOrdersTableProps) => {
  const { toast } = useToast();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const { error } = await supabase
        .from("orders")
        .update({ status })
        .eq("id", orderId);

      if (error) throw error;

      toast({
        title: "Order updated",
        description: `Order status changed to ${status}`,
      });
      onRefetch();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-blue-100 text-blue-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return styles[status] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Loading orders...</div>;
  }

  if (orders.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No orders found</div>;
  }

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Transport</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-mono text-xs">
                  {order.id.slice(0, 8)}...
                </TableCell>
                <TableCell>{order.products?.name || "Unknown"}</TableCell>
                <TableCell>
                  {order.quantity} {order.products?.unit || "units"}
                </TableCell>
                <TableCell>₵{(Number(order.total_price) + Number(order.transport_cost) + Number(order.service_fee)).toFixed(2)}</TableCell>
                <TableCell className="capitalize">{order.transport_mode}</TableCell>
                <TableCell>
                  <Badge className={getStatusBadge(order.status)}>{order.status}</Badge>
                </TableCell>
                <TableCell>{format(new Date(order.created_at), "MMM d, yyyy")}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    {order.status === "pending" && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-green-600"
                          onClick={() => updateOrderStatus(order.id, "confirmed")}
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-600"
                          onClick={() => updateOrderStatus(order.id, "cancelled")}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                    {order.status === "confirmed" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-blue-600"
                        onClick={() => updateOrderStatus(order.id, "delivered")}
                      >
                        <Truck className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Order ID</p>
                  <p className="font-mono">{selectedOrder.id}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <Badge className={getStatusBadge(selectedOrder.status)}>
                    {selectedOrder.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-muted-foreground">Product</p>
                  <p>{selectedOrder.products?.name || "Unknown"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Quantity</p>
                  <p>{selectedOrder.quantity} {selectedOrder.products?.unit}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Unit Price</p>
                  <p>₵{Number(selectedOrder.unit_price).toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Subtotal</p>
                  <p>₵{Number(selectedOrder.total_price).toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Transport</p>
                  <p>{selectedOrder.transport_mode} - ₵{Number(selectedOrder.transport_cost).toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Service Fee</p>
                  <p>₵{Number(selectedOrder.service_fee).toFixed(2)}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-muted-foreground">Delivery Location</p>
                  <p>{selectedOrder.delivery_location || "Not specified"}</p>
                </div>
                {selectedOrder.notes && (
                  <div className="col-span-2">
                    <p className="text-muted-foreground">Notes</p>
                    <p>{selectedOrder.notes}</p>
                  </div>
                )}
              </div>
              <div className="border-t pt-4">
                <p className="text-lg font-bold">
                  Total: ₵{(Number(selectedOrder.total_price) + Number(selectedOrder.transport_cost) + Number(selectedOrder.service_fee)).toFixed(2)}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminOrdersTable;
