import { format } from "date-fns";
import { User, Mail, MapPin, Phone } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone: string | null;
  location: string | null;
  role: "buyer" | "agent" | "admin" | "farmer";
  created_at: string;
}

interface AdminUsersTableProps {
  users: Profile[];
  loading: boolean;
}

const AdminUsersTable = ({ users, loading }: AdminUsersTableProps) => {
  const getRoleBadge = (role: string) => {
    const styles: Record<string, string> = {
      buyer: "bg-blue-100 text-blue-800",
      farmer: "bg-green-100 text-green-800",
      agent: "bg-purple-100 text-purple-800",
      admin: "bg-red-100 text-red-800",
    };
    return styles[role] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Loading users...</div>;
  }

  if (users.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No users found</div>;
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Joined</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-medium">{user.full_name}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  {user.email}
                </div>
              </TableCell>
              <TableCell>
                {user.phone ? (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    {user.phone}
                  </div>
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </TableCell>
              <TableCell>
                {user.location ? (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {user.location}
                  </div>
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </TableCell>
              <TableCell>
                <Badge className={getRoleBadge(user.role)}>{user.role}</Badge>
              </TableCell>
              <TableCell>{format(new Date(user.created_at), "MMM d, yyyy")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminUsersTable;
