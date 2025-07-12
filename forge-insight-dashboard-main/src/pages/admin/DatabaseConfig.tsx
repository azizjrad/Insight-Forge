import React, { useState, useEffect } from "react";
import {
  Database,
  Server,
  Activity,
  Settings,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  XCircle,
  HardDrive,
  Clock,
  Users,
  FileText,
  Zap,
  Shield,
  Eye,
  Download,
  Upload,
  Trash2,
  Info,
  Edit3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { dashboardApi } from "@/lib/api";

interface DatabaseStatus {
  status: string;
  total_bookings: number;
  total_guests: number;
  total_rooms: number;
  last_booking: string;
}

interface TableInfo {
  name: string;
  records: number;
  size: string;
  lastUpdated: string;
}

const DatabaseConfig: React.FC = () => {
  const [dbStatus, setDbStatus] = useState<DatabaseStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [testing, setTesting] = useState(false);
  const [showBackupDialog, setShowBackupDialog] = useState(false);
  const [showRestoreDialog, setShowRestoreDialog] = useState(false);

  // Mock data for tables info
  const [tablesInfo] = useState<TableInfo[]>([
    {
      name: "bookings",
      records: 1250,
      size: "2.4 MB",
      lastUpdated: "2025-06-24 09:30:00",
    },
    {
      name: "guests",
      records: 850,
      size: "1.8 MB",
      lastUpdated: "2025-06-24 09:25:00",
    },
    {
      name: "rooms",
      records: 45,
      size: "0.2 MB",
      lastUpdated: "2025-06-20 14:00:00",
    },
    {
      name: "hotels",
      records: 3,
      size: "0.1 MB",
      lastUpdated: "2025-06-15 10:00:00",
    },
    {
      name: "users",
      records: 12,
      size: "0.1 MB",
      lastUpdated: "2025-06-24 08:45:00",
    },
    {
      name: "reviews",
      records: 320,
      size: "0.8 MB",
      lastUpdated: "2025-06-24 07:15:00",
    },
    {
      name: "activity_logs",
      records: 5420,
      size: "3.2 MB",
      lastUpdated: "2025-06-24 09:35:00",
    },
  ]);

  const fetchDatabaseStatus = async () => {
    try {
      setLoading(true);
      const response = await dashboardApi.testConnection();
      if (response.data) {
        setDbStatus(response.data);
        toast.success("Database status updated");
      } else {
        toast.error("Failed to fetch database status");
      }
    } catch (error) {
      console.error("Database status error:", error);
      toast.error("Error connecting to database");
    } finally {
      setLoading(false);
    }
  };

  const testConnection = async () => {
    try {
      setTesting(true);
      const response = await dashboardApi.testConnection();
      if (response.data && response.data.status === "connected") {
        toast.success("Database connection successful!");
        setDbStatus(response.data);
      } else {
        toast.error("Database connection failed");
      }
    } catch (error) {
      console.error("Connection test error:", error);
      toast.error("Failed to test database connection");
    } finally {
      setTesting(false);
    }
  };

  const handleBackup = () => {
    toast.success("Database backup initiated");
    setShowBackupDialog(false);
  };

  const handleRestore = () => {
    toast.success("Database restore initiated");
    setShowRestoreDialog(false);
  };

  useEffect(() => {
    fetchDatabaseStatus();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "error":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            Connected
          </Badge>
        );
      case "error":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200"
          >
            Error
          </Badge>
        );
      default:
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200"
          >
            Unknown
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Database Configuration
          </h1>
          <p className="text-gray-600 mt-1">
            Manage database connections and monitor system health
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={testConnection}
            disabled={testing}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Activity className={`w-4 h-4 ${testing ? "animate-pulse" : ""}`} />
            {testing ? "Testing..." : "Test Connection"}
          </Button>
          <Button
            onClick={fetchDatabaseStatus}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Database Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Connection Status
            </CardTitle>
            <Database className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {loading ? (
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>
              ) : (
                <>
                  {getStatusIcon(dbStatus?.status || "unknown")}
                  {getStatusBadge(dbStatus?.status || "unknown")}
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Bookings
            </CardTitle>
            <FileText className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? (
                <div className="animate-pulse">
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
                </div>
              ) : (
                dbStatus?.total_bookings?.toLocaleString() || "0"
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Guests</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? (
                <div className="animate-pulse">
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
                </div>
              ) : (
                dbStatus?.total_guests?.toLocaleString() || "0"
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
            <HardDrive className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? (
                <div className="animate-pulse">
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
                </div>
              ) : (
                dbStatus?.total_rooms?.toLocaleString() || "0"
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Database Tables Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Database Tables
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Table Name</TableHead>
                <TableHead>Records</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tablesInfo.map((table) => (
                <TableRow key={table.name}>
                  <TableCell className="font-medium">{table.name}</TableCell>
                  <TableCell>{table.records.toLocaleString()}</TableCell>
                  <TableCell>{table.size}</TableCell>
                  <TableCell>
                    {new Date(table.lastUpdated).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit3 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Database Operations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Backup & Restore */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Backup & Restore
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Database Backup</p>
                <p className="text-sm text-gray-600">
                  Create a backup of the current database
                </p>
              </div>
              <Dialog
                open={showBackupDialog}
                onOpenChange={setShowBackupDialog}
              >
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Backup
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create Database Backup</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="backup-name">Backup Name</Label>
                      <Input
                        id="backup-name"
                        placeholder="backup-2025-06-24"
                        defaultValue={`backup-${
                          new Date().toISOString().split("T")[0]
                        }`}
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setShowBackupDialog(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleBackup}>Create Backup</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Database Restore</p>
                <p className="text-sm text-gray-600">
                  Restore database from backup file
                </p>
              </div>
              <Dialog
                open={showRestoreDialog}
                onOpenChange={setShowRestoreDialog}
              >
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Restore
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Restore Database</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="backup-file">Select Backup File</Label>
                      <Input id="backup-file" type="file" accept=".sql,.db" />
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-600" />
                        <p className="text-sm text-yellow-800">
                          Warning: This will overwrite all current data.
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setShowRestoreDialog(false)}
                      >
                        Cancel
                      </Button>
                      <Button variant="destructive" onClick={handleRestore}>
                        Restore Database
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Database Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Database Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="db-path">Database Path</Label>
              <Input
                id="db-path"
                value="./backend/insightforge.db"
                readOnly
                className="bg-gray-50"
              />
            </div>
            <div>
              <Label htmlFor="max-connections">Max Connections</Label>
              <Input id="max-connections" type="number" defaultValue="100" />
            </div>
            <div>
              <Label htmlFor="timeout">Connection Timeout (seconds)</Label>
              <Input id="timeout" type="number" defaultValue="30" />
            </div>
            <Button className="w-full">Save Settings</Button>
          </CardContent>
        </Card>
      </div>

      {/* System Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="w-5 h-5" />
            System Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Database Type</p>
              <p className="text-sm text-gray-600">SQLite 3.x</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Location</p>
              <p className="text-sm text-gray-600">./backend/insightforge.db</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Last Backup</p>
              <p className="text-sm text-gray-600">
                {dbStatus?.last_booking
                  ? new Date(dbStatus.last_booking).toLocaleString()
                  : "Never"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DatabaseConfig;
