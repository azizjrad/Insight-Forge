import React, { useState } from "react";
import {
  MoreHorizontal,
  UserCheck,
  UserX,
  Trash2,
  MessageSquare,
  Users as UsersIcon,
  Plus,
  Edit3,
  Eye,
  Settings,
  Shield,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Crown,
  User,
  Mail,
  Calendar,
  Clock,
  Search,
  Filter,
  Download,
  Upload,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface User {
  id: string;
  email: string;
  full_name: string | null;
  role: string;
  status: string;
  created_at: string;
  last_login?: string;
  profile_picture?: string;
  department?: string;
  phone?: string;
  permissions?: string[];
  session_count?: number;
  data_usage?: string;
}

const Users: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");

  const [notificationData, setNotificationData] = useState({
    title: "",
    message: "",
    type: "info" as "info" | "success" | "warning" | "error",
  });

  const [newUser, setNewUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    full_name: "",
    role: "user",
    status: "active",
    department: "",
    phone: "",
    password: "",
  });

  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      email: "admin@demo.com",
      full_name: "Admin User",
      role: "admin",
      status: "active",
      created_at: new Date().toISOString(),
      last_login: new Date().toISOString(),
      department: "IT",
      phone: "+1 (555) 123-4567",
      session_count: 156,
      data_usage: "2.4 GB",
      permissions: ["read", "write", "delete", "admin"],
    },
    {
      id: "2",
      email: "user@demo.com",
      full_name: "Demo User",
      role: "user",
      status: "active",
      created_at: new Date(Date.now() - 86400000).toISOString(),
      last_login: new Date(Date.now() - 3600000).toISOString(),
      department: "Sales",
      phone: "+1 (555) 987-6543",
      session_count: 42,
      data_usage: "850 MB",
      permissions: ["read", "write"],
    },
    {
      id: "3",
      email: "manager@demo.com",
      full_name: "Manager Smith",
      role: "manager",
      status: "active",
      created_at: new Date(Date.now() - 172800000).toISOString(),
      last_login: new Date(Date.now() - 7200000).toISOString(),
      department: "Marketing",
      phone: "+1 (555) 456-7890",
      session_count: 89,
      data_usage: "1.6 GB",
      permissions: ["read", "write", "manage"],
    },
    {
      id: "4",
      email: "suspended@demo.com",
      full_name: "Suspended User",
      role: "user",
      status: "suspended",
      created_at: new Date(Date.now() - 259200000).toISOString(),
      last_login: new Date(Date.now() - 86400000).toISOString(),
      department: "Support",
      phone: "+1 (555) 321-0987",
      session_count: 23,
      data_usage: "340 MB",
      permissions: ["read"],
    },
    {
      id: "5",
      email: "inactive@demo.com",
      full_name: "Inactive User",
      role: "user",
      status: "inactive",
      created_at: new Date(Date.now() - 604800000).toISOString(),
      last_login: new Date(Date.now() - 259200000).toISOString(),
      department: "Finance",
      phone: "+1 (555) 654-3210",
      session_count: 8,
      data_usage: "120 MB",
      permissions: ["read"],
    },
  ]);

  // CRUD Operations
  const createUser = () => {
    if (!newUser.email || !newUser.firstName || !newUser.lastName) {
      toast.error("Please fill in required fields");
      return;
    }

    const user: User = {
      id: Date.now().toString(),
      email: newUser.email,
      full_name: `${newUser.firstName} ${newUser.lastName}`,
      role: newUser.role,
      status: newUser.status || "active",
      created_at: new Date().toISOString(),
      department: newUser.department,
      phone: newUser.phone,
      session_count: 0,
      data_usage: "0 MB",
      permissions:
        newUser.role === "admin"
          ? ["read", "write", "delete", "admin"]
          : ["read"],
    };

    setUsers((prev) => [user, ...prev]);
    toast.success("User created successfully");
    setIsCreatingUser(false);
    setNewUser({
      email: "",
      firstName: "",
      lastName: "",
      full_name: "",
      role: "user",
      status: "active",
      department: "",
      phone: "",
      password: "",
    });
  };

  const updateUser = (userId: string, updates: Partial<User>) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === userId ? { ...user, ...updates } : user))
    );
    toast.success("User updated successfully");
  };

  const deleteUser = (userId: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== userId));
    toast.success("User deleted successfully");
  };

  const handleStatusChange = (userId: string, newStatus: string) => {
    updateUser(userId, { status: newStatus });
  };

  const handleRoleChange = (userId: string, newRole: string) => {
    const permissions =
      newRole === "admin"
        ? ["read", "write", "delete", "admin"]
        : newRole === "manager"
        ? ["read", "write", "manage"]
        : ["read"];
    updateUser(userId, { role: newRole, permissions });
  };

  const handleSendNotification = () => {
    if (!selectedUser || !notificationData.title || !notificationData.message) {
      toast.error("Please fill in all notification fields");
      return;
    }

    toast.success("Notification sent successfully");
    setSelectedUser(null);
    setNotificationData({ title: "", message: "", type: "info" });
  };

  const handleCreateUser = () => {
    if (
      !newUser.email ||
      !newUser.firstName ||
      !newUser.lastName ||
      !newUser.password
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    const user: User = {
      id: Date.now().toString(),
      email: newUser.email,
      full_name: `${newUser.firstName} ${newUser.lastName}`,
      role: newUser.role,
      status: newUser.status || "active",
      created_at: new Date().toISOString(),
      department: newUser.department,
      phone: newUser.phone,
      session_count: 0,
      data_usage: "0 MB",
      permissions:
        newUser.role === "admin"
          ? ["read", "write", "delete", "admin"]
          : newUser.role === "manager"
          ? ["read", "write", "manage"]
          : ["read"],
    };

    setUsers((prev) => [user, ...prev]);
    toast.success("User created successfully");
    setIsCreatingUser(false);
    setNewUser({
      email: "",
      firstName: "",
      lastName: "",
      full_name: "",
      role: "user",
      status: "active",
      department: "",
      phone: "",
      password: "",
    });
  };

  const handleEditUser = () => {
    if (!editingUser) return;

    updateUser(editingUser.id, {
      full_name: editingUser.full_name,
      email: editingUser.email,
      department: editingUser.department,
      phone: editingUser.phone,
    });
    setEditingUser(null);
  };

  // Filter functions
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    return matchesSearch && matchesStatus && matchesRole;
  });

  // Helper functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-400 bg-green-400/10 border-green-400/20";
      case "suspended":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
      case "inactive":
        return "text-red-400 bg-red-400/10 border-red-400/20";
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/20";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4" />;
      case "suspended":
        return <AlertTriangle className="h-4 w-4" />;
      case "inactive":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "from-red-500 to-red-600";
      case "manager":
        return "from-blue-500 to-blue-600";
      case "user":
        return "from-green-500 to-green-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Crown className="h-4 w-4" />;
      case "manager":
        return <Shield className="h-4 w-4" />;
      case "user":
        return <User className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#0f172a_25%,transparent_25%),linear-gradient(-45deg,#0f172a_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#0f172a_75%),linear-gradient(-45deg,transparent_75%,#0f172a_75%)] bg-[size:20px_20px] bg-[position:0_0,0_10px,10px_-10px,-10px_0px]"></div>
      </div>

      {/* Floating geometric elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 border border-blue-500/20 rotate-45 animate-float"></div>
        <div className="absolute top-40 right-32 w-24 h-24 border border-cyan-500/20 rotate-12 animate-float-delayed"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 border border-indigo-500/20 -rotate-12 animate-float"></div>
      </div>

      <div className="relative z-10 p-6 space-y-8">
        {/* Enhanced Header Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-indigo-500/10 rounded-3xl blur-2xl"></div>
          <div className="relative bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-lg opacity-30"></div>
                  <div className="relative p-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-xl">
                    <UsersIcon className="w-10 h-10 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent mb-2">
                    User Control Center
                  </h1>
                  <p className="text-xl text-slate-300">
                    Manage user accounts, permissions & access control
                  </p>
                </div>
              </div>

              {/* Add User Button */}
              <Dialog open={isCreatingUser} onOpenChange={setIsCreatingUser}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 px-6 py-3 text-lg">
                    <Plus className="h-5 w-5 mr-2" />
                    Add User
                  </Button>
                </DialogTrigger>
              </Dialog>
            </div>

            {/* Enhanced Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  label: "Total Users",
                  value: users.length,
                  color: "from-blue-400 to-blue-600",
                  icon: UsersIcon,
                },
                {
                  label: "Active Users",
                  value: users.filter((u) => u.status === "active").length,
                  color: "from-green-400 to-green-600",
                  icon: CheckCircle,
                },
                {
                  label: "Admins",
                  value: users.filter((u) => u.role === "admin").length,
                  color: "from-red-400 to-red-600",
                  icon: Crown,
                },
                {
                  label: "Suspended",
                  value: users.filter((u) => u.status === "suspended").length,
                  color: "from-yellow-400 to-yellow-600",
                  icon: AlertTriangle,
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-slate-700/30 backdrop-blur-sm rounded-2xl p-4 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`p-2 bg-gradient-to-r ${stat.color} rounded-lg`}
                    >
                      <stat.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm text-slate-400">{stat.label}</span>
                  </div>
                  <div className="text-3xl font-bold text-white group-hover:scale-105 transition-transform duration-300">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Search and Filters Section */}
        <div className="relative">
          <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-cyan-500/50 focus:ring-cyan-500/20 pl-10"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-700/50 border border-slate-600/50 rounded-md text-white focus:border-cyan-500/50 focus:ring-cyan-500/20 focus:outline-none px-3 py-2"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="inactive">Inactive</option>
              </select>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="bg-slate-700/50 border border-slate-600/50 rounded-md text-white focus:border-cyan-500/50 focus:ring-cyan-500/20 focus:outline-none px-3 py-2"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>
        </div>

        {/* Enhanced Users Table Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-cyan-500/5 to-indigo-500/5 rounded-3xl blur-2xl"></div>
          <div className="relative bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl overflow-hidden">
            {/* Table Header */}
            <div className="p-8 border-b border-slate-700/50">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg blur opacity-30"></div>
                  <div className="relative p-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg border border-blue-500/30">
                    <UsersIcon className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">
                    User Directory
                  </h2>
                  <p className="text-slate-400">
                    Manage user accounts and permissions
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700/50">
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-300 uppercase tracking-wider">
                      User Details
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-300 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-300 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="text-right py-4 px-6 text-sm font-semibold text-slate-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/30">
                  {filteredUsers.map((user, index) => (
                    <tr
                      key={user.id}
                      className="hover:bg-slate-700/20 transition-all duration-200 group"
                      style={{
                        animationDelay: `${index * 0.05}s`,
                        animation: "fadeInUp 0.6s ease-out forwards",
                      }}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                              {user.full_name
                                ? user.full_name.charAt(0).toUpperCase()
                                : user.email.charAt(0).toUpperCase()}
                            </div>
                            <div
                              className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-800 ${
                                user.status === "active"
                                  ? "bg-green-500"
                                  : user.status === "suspended"
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                              }`}
                            ></div>
                          </div>
                          <div>
                            <div className="font-semibold text-white group-hover:text-blue-300 transition-colors">
                              {user.full_name || "Unknown User"}
                            </div>
                            <div className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <div
                            className={`p-2 bg-gradient-to-r ${getRoleColor(
                              user.role
                            )} rounded-lg shadow-lg`}
                          >
                            {getRoleIcon(user.role)}
                          </div>
                          <span className="font-medium text-white capitalize">
                            {user.role}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <div
                            className={`p-2 rounded-lg ${
                              user.status === "active"
                                ? "bg-green-500/20 text-green-400"
                                : user.status === "suspended"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {getStatusIcon(user.status)}
                          </div>
                          <span
                            className={`font-medium capitalize ${
                              user.status === "active"
                                ? "text-green-400"
                                : user.status === "suspended"
                                ? "text-yellow-400"
                                : "text-red-400"
                            }`}
                          >
                            {user.status}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-slate-300">
                          {new Date(user.created_at).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-slate-500">
                          {new Date(user.created_at).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              className="h-10 w-10 p-0 bg-slate-700/30 hover:bg-slate-600/50 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-200"
                            >
                              <MoreHorizontal className="h-4 w-4 text-slate-300" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="bg-slate-800/95 backdrop-blur-xl border-slate-700/50 text-white min-w-[200px]"
                          >
                            <Dialog>
                              <DialogTrigger asChild>
                                <DropdownMenuItem
                                  onSelect={(e) => {
                                    e.preventDefault();
                                    setSelectedUser(user);
                                  }}
                                  className="hover:bg-slate-700/50 focus:bg-slate-700/50 cursor-pointer"
                                >
                                  <MessageSquare className="mr-3 h-4 w-4 text-blue-400" />
                                  Send Notification
                                </DropdownMenuItem>
                              </DialogTrigger>
                            </Dialog>

                            {user.status === "active" ? (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleStatusChange(user.id, "suspended")
                                }
                                className="hover:bg-slate-700/50 focus:bg-slate-700/50 cursor-pointer"
                              >
                                <UserX className="mr-3 h-4 w-4 text-yellow-400" />
                                Suspend User
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleStatusChange(user.id, "active")
                                }
                                className="hover:bg-slate-700/50 focus:bg-slate-700/50 cursor-pointer"
                              >
                                <UserCheck className="mr-3 h-4 w-4 text-green-400" />
                                Activate User
                              </DropdownMenuItem>
                            )}

                            {user.role !== "admin" && (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleRoleChange(user.id, "admin")
                                }
                                className="hover:bg-slate-700/50 focus:bg-slate-700/50 cursor-pointer"
                              >
                                <Crown className="mr-3 h-4 w-4 text-red-400" />
                                Promote to Admin
                              </DropdownMenuItem>
                            )}

                            {user.role === "admin" && (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleRoleChange(user.id, "user")
                                }
                                className="hover:bg-slate-700/50 focus:bg-slate-700/50 cursor-pointer"
                              >
                                <User className="mr-3 h-4 w-4 text-blue-400" />
                                Remove Admin
                              </DropdownMenuItem>
                            )}

                            <DropdownMenuItem className="text-red-400 hover:bg-red-500/10 focus:bg-red-500/10 cursor-pointer">
                              <Trash2 className="mr-3 h-4 w-4" />
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredUsers.length === 0 && (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-slate-700/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UsersIcon className="w-8 h-8 text-slate-500" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  No users found
                </h3>
                <p className="text-slate-400">
                  {searchTerm || statusFilter !== "all" || roleFilter !== "all"
                    ? "Try adjusting your search criteria"
                    : "Get started by adding your first user"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Send Notification Dialog */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="bg-slate-800/95 backdrop-blur-xl border-slate-700/50 text-white max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg blur opacity-30"></div>
                <div className="relative p-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg border border-blue-500/30">
                  <MessageSquare className="w-6 h-6 text-blue-400" />
                </div>
              </div>
              <div>
                <DialogTitle className="text-xl font-bold text-white">
                  Send Notification
                </DialogTitle>
                <p className="text-sm text-slate-400">
                  To: {selectedUser?.full_name || selectedUser?.email}
                </p>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <Label
                htmlFor="title"
                className="text-sm font-medium text-slate-300 mb-2 block"
              >
                Notification Title
              </Label>
              <Input
                id="title"
                value={notificationData.title}
                onChange={(e) =>
                  setNotificationData((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                placeholder="Enter notification title..."
                className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-cyan-500/50 focus:ring-cyan-500/20"
              />
            </div>

            <div>
              <Label
                htmlFor="message"
                className="text-sm font-medium text-slate-300 mb-2 block"
              >
                Message Content
              </Label>
              <Textarea
                id="message"
                value={notificationData.message}
                onChange={(e) =>
                  setNotificationData((prev) => ({
                    ...prev,
                    message: e.target.value,
                  }))
                }
                placeholder="Enter your message..."
                rows={4}
                className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-cyan-500/50 focus:ring-cyan-500/20 resize-none"
              />
            </div>

            <div>
              <Label
                htmlFor="type"
                className="text-sm font-medium text-slate-300 mb-2 block"
              >
                Notification Type
              </Label>
              <select
                id="type"
                value={notificationData.type}
                onChange={(e) =>
                  setNotificationData((prev) => ({
                    ...prev,
                    type: e.target.value as
                      | "info"
                      | "success"
                      | "warning"
                      | "error",
                  }))
                }
                className="w-full bg-slate-700/50 border border-slate-600/50 rounded-md text-white focus:border-cyan-500/50 focus:ring-cyan-500/20 focus:outline-none px-3 py-2"
              >
                <option value="info">📢 Information</option>
                <option value="success">✅ Success</option>
                <option value="warning">⚠️ Warning</option>
                <option value="error">❌ Error</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setSelectedUser(null)}
                className="bg-slate-700/30 border-slate-600/50 text-slate-300 hover:bg-slate-600/50 hover:text-white transition-all duration-200"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSendNotification}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Send Notification
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Enhanced Create User Dialog */}
      <Dialog open={isCreatingUser} onOpenChange={setIsCreatingUser}>
        <DialogContent className="bg-slate-800/95 backdrop-blur-xl border-slate-700/50 text-white max-w-lg">
          <DialogHeader>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg blur opacity-30"></div>
                <div className="relative p-3 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg border border-green-500/30">
                  <UserPlus className="w-6 h-6 text-green-400" />
                </div>
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold text-white">
                  Create New User
                </DialogTitle>
                <p className="text-slate-400">Add a new user to the system</p>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="firstName"
                  className="text-sm font-medium text-slate-300 mb-2 block"
                >
                  First Name
                </Label>
                <Input
                  id="firstName"
                  value={newUser.firstName || ""}
                  onChange={(e) =>
                    setNewUser((prev) => ({
                      ...prev,
                      firstName: e.target.value,
                    }))
                  }
                  placeholder="Enter first name..."
                  className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-cyan-500/50 focus:ring-cyan-500/20"
                />
              </div>
              <div>
                <Label
                  htmlFor="lastName"
                  className="text-sm font-medium text-slate-300 mb-2 block"
                >
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  value={newUser.lastName || ""}
                  onChange={(e) =>
                    setNewUser((prev) => ({
                      ...prev,
                      lastName: e.target.value,
                    }))
                  }
                  placeholder="Enter last name..."
                  className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-cyan-500/50 focus:ring-cyan-500/20"
                />
              </div>
            </div>

            <div>
              <Label
                htmlFor="email"
                className="text-sm font-medium text-slate-300 mb-2 block"
              >
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="Enter email address..."
                className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-cyan-500/50 focus:ring-cyan-500/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="role"
                  className="text-sm font-medium text-slate-300 mb-2 block"
                >
                  User Role
                </Label>
                <select
                  id="role"
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser((prev) => ({ ...prev, role: e.target.value }))
                  }
                  className="w-full bg-slate-700/50 border border-slate-600/50 rounded-md text-white focus:border-cyan-500/50 focus:ring-cyan-500/20 focus:outline-none px-3 py-2"
                >
                  <option value="user">👤 User</option>
                  <option value="manager">🛡️ Manager</option>
                  <option value="admin">👑 Admin</option>
                </select>
              </div>
              <div>
                <Label
                  htmlFor="status"
                  className="text-sm font-medium text-slate-300 mb-2 block"
                >
                  Account Status
                </Label>
                <select
                  id="status"
                  value={newUser.status || "active"}
                  onChange={(e) =>
                    setNewUser((prev) => ({ ...prev, status: e.target.value }))
                  }
                  className="w-full bg-slate-700/50 border border-slate-600/50 rounded-md text-white focus:border-cyan-500/50 focus:ring-cyan-500/20 focus:outline-none px-3 py-2"
                >
                  <option value="active">✅ Active</option>
                  <option value="inactive">⏸️ Inactive</option>
                  <option value="suspended">⚠️ Suspended</option>
                </select>
              </div>
            </div>

            <div>
              <Label
                htmlFor="password"
                className="text-sm font-medium text-slate-300 mb-2 block"
              >
                Temporary Password
              </Label>
              <Input
                id="password"
                type="password"
                value={newUser.password || ""}
                onChange={(e) =>
                  setNewUser((prev) => ({ ...prev, password: e.target.value }))
                }
                placeholder="Enter temporary password..."
                className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-cyan-500/50 focus:ring-cyan-500/20"
              />
              <p className="text-xs text-slate-500 mt-1">
                User will be prompted to change password on first login
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-slate-700/50">
              <Button
                variant="outline"
                onClick={() => setIsCreatingUser(false)}
                className="bg-slate-700/30 border-slate-600/50 text-slate-300 hover:bg-slate-600/50 hover:text-white transition-all duration-200"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateUser}
                disabled={
                  !newUser.email ||
                  !newUser.firstName ||
                  !newUser.lastName ||
                  !newUser.password
                }
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Create User
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Users;
