
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Search, PackageOpen, CreditCard, Download, Eye, CheckCircle, XCircle, Info } from "lucide-react";
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface Order {
  id: string;
  user_id: string;
  recipe_id: string;
  amount: number;
  status: string;
  created_at: string;
  user?: {
    first_name: string | null;
    last_name: string | null;
  };
  recipe?: {
    name: string;
  };
}

interface OrderDetailsProps {
  order: Order | null;
  onClose: () => void;
  onStatusChange: (orderId: string, status: string) => void;
  isStatusUpdatePending: boolean;
}

const OrderDetails = ({ order, onClose, onStatusChange, isStatusUpdatePending }: OrderDetailsProps) => {
  const [status, setStatus] = useState(order?.status || 'pending');

  const handleStatusChange = () => {
    if (order) {
      onStatusChange(order.id, status);
    }
  };

  if (!order) return null;

  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Order Details</DialogTitle>
        <DialogDescription>
          View and manage order information
        </DialogDescription>
      </DialogHeader>
      
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Order ID</Label>
          <div className="col-span-3 font-mono text-sm">{order.id}</div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Customer</Label>
          <div className="col-span-3">
            {order.user?.first_name || order.user?.last_name
              ? `${order.user?.first_name || ''} ${order.user?.last_name || ''}`.trim()
              : 'Anonymous User'}
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Recipe</Label>
          <div className="col-span-3">{order.recipe?.name || 'Unknown Recipe'}</div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Amount</Label>
          <div className="col-span-3">${order.amount.toFixed(2)}</div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Date</Label>
          <div className="col-span-3">{new Date(order.created_at).toLocaleString()}</div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="status" className="text-right">Status</Label>
          <Select value={status} onValueChange={setStatus} disabled={isStatusUpdatePending}>
            <SelectTrigger id="status" className="col-span-3">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button 
          onClick={handleStatusChange}
          disabled={isStatusUpdatePending || status === order.status}
        >
          {isStatusUpdatePending ? "Updating..." : "Update Status"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

interface Transaction {
  id: string;
  user_id: string;
  order_id: string;
  amount: number;
  payment_method: string;
  status: string;
  created_at: string;
  user?: {
    first_name: string | null;
    last_name: string | null;
  };
}

interface TransactionDetailsProps {
  transaction: Transaction | null;
  onClose: () => void;
}

const TransactionDetails = ({ transaction, onClose }: TransactionDetailsProps) => {
  if (!transaction) return null;

  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Transaction Details</DialogTitle>
        <DialogDescription>
          View payment transaction information
        </DialogDescription>
      </DialogHeader>
      
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Transaction ID</Label>
          <div className="col-span-3 font-mono text-sm">{transaction.id}</div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Customer</Label>
          <div className="col-span-3">
            {transaction.user?.first_name || transaction.user?.last_name
              ? `${transaction.user?.first_name || ''} ${transaction.user?.last_name || ''}`.trim()
              : 'Anonymous User'}
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Order ID</Label>
          <div className="col-span-3">{transaction.order_id}</div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Amount</Label>
          <div className="col-span-3">${transaction.amount.toFixed(2)}</div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Payment Method</Label>
          <div className="col-span-3 capitalize">{transaction.payment_method}</div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Status</Label>
          <div className="col-span-3">
            <Badge className={
              transaction.status === 'completed' 
                ? "bg-green-100 text-green-800" 
                : transaction.status === 'pending' 
                ? "bg-amber-100 text-amber-800" 
                : "bg-red-100 text-red-800"
            }>
              {transaction.status}
            </Badge>
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Date</Label>
          <div className="col-span-3">{new Date(transaction.created_at).toLocaleString()}</div>
        </div>
      </div>
      
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

const OrderManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("orders");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [isTransactionDetailsOpen, setIsTransactionDetailsOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch orders
  const { data: orders, isLoading } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('purchases')
        .select(`
          *,
          profiles:user_id (first_name, last_name),
          recipe:recipe_id (name)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Order[];
    },
  });

  // Fetch transactions (in a real app, you'd have a separate table for this)
  const { data: transactions, isLoading: isTransactionsLoading } = useQuery({
    queryKey: ["admin-transactions"],
    queryFn: async () => {
      // In a real implementation, you would fetch from a transactions table
      // For this demo, we'll derive transactions from purchases
      const { data, error } = await supabase
        .from('purchases')
        .select(`
          *,
          profiles:user_id (first_name, last_name)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Transform purchases into transactions for demo
      return data.map((purchase: any) => ({
        id: `txn_${purchase.id.substring(0, 8)}`,
        user_id: purchase.user_id,
        order_id: purchase.id,
        amount: purchase.amount,
        payment_method: Math.random() > 0.5 ? 'credit_card' : 'paypal',
        status: purchase.status,
        created_at: purchase.created_at,
        user: purchase.profiles
      })) as Transaction[];
    },
  });

  // Update order status mutation
  const updateOrderStatusMutation = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string, status: string }) => {
      const { data, error } = await supabase
        .from('purchases')
        .update({ status })
        .eq('id', orderId)
        .select();
      
      if (error) throw error;
      return data[0];
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      queryClient.invalidateQueries({ queryKey: ["admin-transactions"] });
      toast({
        title: "Order updated",
        description: `Order status changed to ${data.status}`,
      });
      setIsOrderDetailsOpen(false);
    },
    onError: (error: any) => {
      toast({
        title: "Error updating order",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const filteredOrders = orders?.filter(order => {
    if (!searchQuery) return true;
    
    const userName = order.user 
      ? `${order.user.first_name || ''} ${order.user.last_name || ''}`.toLowerCase() 
      : '';
    const recipeName = order.recipe?.name?.toLowerCase() || '';
    
    return userName.includes(searchQuery.toLowerCase()) || 
           recipeName.includes(searchQuery.toLowerCase()) ||
           order.id.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const filteredTransactions = transactions?.filter(transaction => {
    if (!searchQuery) return true;
    
    const userName = transaction.user 
      ? `${transaction.user.first_name || ''} ${transaction.user.last_name || ''}`.toLowerCase() 
      : '';
    
    return userName.includes(searchQuery.toLowerCase()) || 
           transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
           transaction.payment_method.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsOrderDetailsOpen(true);
  };

  const handleViewTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsTransactionDetailsOpen(true);
  };

  const handleStatusChange = (orderId: string, status: string) => {
    updateOrderStatusMutation.mutate({ orderId, status });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Order Management</h2>
      
      <Tabs defaultValue="orders" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Orders Overview</CardTitle>
              <CardDescription>Manage customer orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-6">
                <Search className="h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full max-w-sm"
                />
                <Button variant="outline" className="ml-auto">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
              
              {renderOrdersTable(filteredOrders, isLoading, handleViewOrder)}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Transactions Overview</CardTitle>
              <CardDescription>View and manage financial transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-6">
                <Search className="h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full max-w-sm"
                />
                <Button variant="outline" className="ml-auto">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
              
              {renderTransactionsTable(filteredTransactions, isTransactionsLoading, handleViewTransaction)}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isOrderDetailsOpen} onOpenChange={setIsOrderDetailsOpen}>
        <OrderDetails
          order={selectedOrder}
          onClose={() => setIsOrderDetailsOpen(false)}
          onStatusChange={handleStatusChange}
          isStatusUpdatePending={updateOrderStatusMutation.isPending}
        />
      </Dialog>

      <Dialog open={isTransactionDetailsOpen} onOpenChange={setIsTransactionDetailsOpen}>
        <TransactionDetails
          transaction={selectedTransaction}
          onClose={() => setIsTransactionDetailsOpen(false)}
        />
      </Dialog>
    </div>
  );
};

const renderOrdersTable = (
  orders: Order[] | undefined, 
  isLoading: boolean,
  onViewOrder: (order: Order) => void
) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
      </div>
    );
  }
  
  if (!orders || orders.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No orders found</div>;
  }
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Recipe</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-mono text-xs">{order.id.substring(0, 8)}...</TableCell>
              <TableCell>
                {order.user?.first_name || order.user?.last_name
                  ? `${order.user?.first_name || ''} ${order.user?.last_name || ''}`.trim()
                  : 'Anonymous User'}
              </TableCell>
              <TableCell>{order.recipe?.name || 'Unknown Recipe'}</TableCell>
              <TableCell>${order.amount.toFixed(2)}</TableCell>
              <TableCell>
                {order.status === 'completed' && (
                  <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                    <CheckCircle className="h-3 w-3 mr-1" /> Completed
                  </Badge>
                )}
                {order.status === 'pending' && (
                  <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                    <Info className="h-3 w-3 mr-1" /> Pending
                  </Badge>
                )}
                {order.status === 'failed' && (
                  <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
                    <XCircle className="h-3 w-3 mr-1" /> Failed
                  </Badge>
                )}
              </TableCell>
              <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8"
                    onClick={() => onViewOrder(order)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const renderTransactionsTable = (
  transactions: Transaction[] | undefined,
  isLoading: boolean,
  onViewTransaction: (transaction: Transaction) => void
) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
      </div>
    );
  }
  
  if (!transactions || transactions.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No transactions found</div>;
  }
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Transaction ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx) => (
            <TableRow key={tx.id}>
              <TableCell className="font-mono text-xs">{tx.id}</TableCell>
              <TableCell>
                {tx.user?.first_name || tx.user?.last_name
                  ? `${tx.user?.first_name || ''} ${tx.user?.last_name || ''}`.trim()
                  : 'Anonymous User'}
              </TableCell>
              <TableCell>${tx.amount.toFixed(2)}</TableCell>
              <TableCell className="capitalize">{tx.payment_method.replace('_', ' ')}</TableCell>
              <TableCell>
                {tx.status === 'completed' && (
                  <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                    <CheckCircle className="h-3 w-3 mr-1" /> Completed
                  </Badge>
                )}
                {tx.status === 'pending' && (
                  <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                    <Info className="h-3 w-3 mr-1" /> Pending
                  </Badge>
                )}
                {tx.status === 'failed' && (
                  <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
                    <XCircle className="h-3 w-3 mr-1" /> Failed
                  </Badge>
                )}
              </TableCell>
              <TableCell>{new Date(tx.created_at).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8"
                    onClick={() => onViewTransaction(tx)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderManagement;
