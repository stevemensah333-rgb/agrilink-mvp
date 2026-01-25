import { useState } from "react";
import { Check, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface Order {
  id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  transport_mode: string;
  transport_cost: number;
  service_fee: number;
  status: string;
  delivery_location: string | null;
  cancelled_reason: string | null;
  created_at: string;
  products: {
    name: string;
    unit: string;
  } | null;
}

interface OrdersTableProps {
  orders: Order[];
  loading: boolean;
  onRefresh: () => void;
}

const statusStyles: Record<string, string> = {
  pending: "bg-secondary/20 text-secondary",
  confirmed: "bg-primary/20 text-primary",
  cancelled: "bg-destructive/20 text-destructive",
  delivered: "bg-green-100 text-green-700",
};

const OrdersTable = ({ orders, loading, onRefresh }: OrdersTableProps) => {
  const [updating, setUpdating] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState("");
  const { toast } = useToast();

  const updateOrderStatus = async (orderId: string, status: string, reason?: string) => {
    setUpdating(orderId);
    try {
      const updateData: { status: string; cancelled_reason?: string } = { status };
      if (reason) {
        updateData.cancelled_reason = reason;
      }

      const { error } = await supabase
        .from("orders")
        .update(updateData)
        .eq("id", orderId);

      if (error) throw error;

      toast({
        title: `Order ${status}`,
        description: `The order has been ${status}.`,
      });

      setCancelReason("");
      onRefresh();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No orders yet. Orders will appear here when buyers place them.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Transport</TableHead>
            <TableHead>Delivery</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-mono text-xs">
                {order.id.slice(0, 8)}...
              </TableCell>
              <TableCell>{order.products?.name || "N/A"}</TableCell>
              <TableCell>
                {order.quantity} {order.products?.unit || "units"}
              </TableCell>
              <TableCell className="font-medium text-secondary">
                {order.total_price.toFixed(2)} GHS
              </TableCell>
              <TableCell className="capitalize">{order.transport_mode}</TableCell>
              <TableCell className="max-w-[150px] truncate">
                {order.delivery_location || "-"}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {format(new Date(order.created_at), "MMM d, yyyy")}
              </TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                    statusStyles[order.status] || "bg-muted"
                  }`}
                >
                  {order.status}
                </span>
              </TableCell>
              <TableCell className="text-right">
                {order.status === "pending" && (
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1 text-primary"
                      onClick={() => updateOrderStatus(order.id, "confirmed")}
                      disabled={updating === order.id}
                    >
                      {updating === order.id ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <Check className="w-3 h-3" />
                      )}
                      Confirm
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1 text-destructive"
                          disabled={updating === order.id}
                        >
                          <X className="w-3 h-3" />
                          Cancel
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Cancel Order</AlertDialogTitle>
                          <AlertDialogDescription>
                            Please provide a reason for cancellation (e.g., product
                            unavailable, out of stock).
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <Textarea
                          placeholder="Reason for cancellation..."
                          value={cancelReason}
                          onChange={(e) => setCancelReason(e.target.value)}
                          className="mt-2"
                        />
                        <AlertDialogFooter>
                          <AlertDialogCancel onClick={() => setCancelReason("")}>
                            Keep Order
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() =>
                              updateOrderStatus(order.id, "cancelled", cancelReason)
                            }
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            disabled={!cancelReason.trim()}
                          >
                            Cancel Order
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                )}
                {order.status === "confirmed" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 text-green-600"
                    onClick={() => updateOrderStatus(order.id, "delivered")}
                    disabled={updating === order.id}
                  >
                    {updating === order.id ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <Check className="w-3 h-3" />
                    )}
                    Mark Delivered
                  </Button>
                )}
                {order.status === "cancelled" && order.cancelled_reason && (
                  <span className="text-xs text-muted-foreground italic">
                    {order.cancelled_reason}
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersTable;
