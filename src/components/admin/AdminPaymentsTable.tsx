import { useState } from "react";
import { Loader2, CheckCircle, Clock, XCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

interface Payment {
  id: string;
  order_id: string;
  farmer_amount: number;
  farmer_momo: string;
  transport_amount: number;
  platform_fee: number;
  status: string;
  created_at: string;
  processed_at: string | null;
}

interface AdminPaymentsTableProps {
  payments: Payment[];
  loading: boolean;
  onRefetch: () => void;
}

const statusConfig: Record<string, { color: string; icon: React.ComponentType<any> }> = {
  pending: { color: "bg-yellow-500/10 text-yellow-600", icon: Clock },
  processing: { color: "bg-blue-500/10 text-blue-600", icon: Loader2 },
  completed: { color: "bg-primary/10 text-primary", icon: CheckCircle },
  failed: { color: "bg-destructive/10 text-destructive", icon: XCircle },
};

const AdminPaymentsTable = ({ payments, loading, onRefetch }: AdminPaymentsTableProps) => {
  const { toast } = useToast();
  const [processingId, setProcessingId] = useState<string | null>(null);

  const handleProcessPayment = async (payment: Payment) => {
    setProcessingId(payment.id);
    
    // Simulate MoMo payment processing
    // In production, this would call a payment gateway API (e.g., Paystack, Flutterwave)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Payment Processing",
      description: `Payment of ₵${payment.farmer_amount.toFixed(2)} to ${payment.farmer_momo} has been initiated. In production, this would use MTN MoMo API.`,
    });
    
    setProcessingId(null);
    onRefetch();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (payments.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No payments found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Farmer Amount</TableHead>
            <TableHead>MoMo Number</TableHead>
            <TableHead>Platform Fee</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => {
            const statusInfo = statusConfig[payment.status] || statusConfig.pending;
            const StatusIcon = statusInfo.icon;
            
            return (
              <TableRow key={payment.id}>
                <TableCell className="font-mono text-xs">
                  {payment.order_id?.slice(0, 8)}...
                </TableCell>
                <TableCell className="font-medium text-primary">
                  ₵{payment.farmer_amount.toFixed(2)}
                </TableCell>
                <TableCell>{payment.farmer_momo || "Pending"}</TableCell>
                <TableCell>₵{payment.platform_fee.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge className={statusInfo.color}>
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {payment.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(payment.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {payment.status === "pending" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleProcessPayment(payment)}
                      disabled={processingId === payment.id}
                    >
                      {processingId === payment.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <Send className="w-3 h-3 mr-1" />
                          Pay
                        </>
                      )}
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminPaymentsTable;
