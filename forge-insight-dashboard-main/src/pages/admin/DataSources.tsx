import React, { useState } from "react";
import {
  Plus,
  MoreHorizontal,
  Database,
  Cloud,
  FileText,
  Trash2,
  RefreshCw,
  Shield,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Server,
  Zap,
  HardDrive,
  Settings,
  Eye,
  Edit3,
  Link,
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
// Remove auth import
import { toast } from "sonner";

interface DataSource {
  id: string;
  name: string;
  type: string;
  status: string;
  last_sync: string | null;
  created_at: string;
  created_by: string;
  error_message: string | null;
  config?: {
    host?: string;
    port?: number;
    database?: string;
  };
  metrics?: {
    recordCount: number;
    dataSize: string;
    syncDuration: string;
  };
}

const DataSources: React.FC = () => {
  const user = null;
  const [isAddingSource, setIsAddingSource] = useState(false);
  const [newSource, setNewSource] = useState({
    name: "",
    type: "database",
    config: {},
  });
  const [dataSources, setDataSources] = useState<DataSource[]>([
    {
      id: "1",
      name: "Main Database",
      type: "database",
      status: "connected",
      last_sync: new Date().toISOString(),
      created_at: new Date().toISOString(),
      created_by: "1",
      error_message: null,
      config: {
        host: "prod-db.company.com",
        port: 5432,
        database: "insights_prod",
      },
      metrics: {
        recordCount: 1250000,
        dataSize: "4.2 GB",
        syncDuration: "2.3s",
      },
    },
    {
      id: "2",
      name: "Analytics API",
      type: "api",
      status: "connected",
      last_sync: new Date().toISOString(),
      created_at: new Date().toISOString(),
      created_by: "1",
      error_message: null,
      config: {
        host: "api.analytics.com",
      },
      metrics: {
        recordCount: 85000,
        dataSize: "1.8 GB",
        syncDuration: "0.8s",
      },
    },
    {
      id: "3",
      name: "Sales Data Export",
      type: "file",
      status: "warning",
      last_sync: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      created_at: new Date().toISOString(),
      created_by: "1",
      error_message: "Connection timeout - retrying...",
      metrics: {
        recordCount: 45000,
        dataSize: "890 MB",
        syncDuration: "1.2s",
      },
    },
    {
      id: "4",
      name: "Cloud Storage",
      type: "cloud",
      status: "disconnected",
      last_sync: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      created_at: new Date().toISOString(),
      created_by: "1",
      error_message: "Authentication failed",
      metrics: {
        recordCount: 0,
        dataSize: "0 MB",
        syncDuration: "N/A",
      },
    },
  ]);

  const addDataSource = () => {
    if (!newSource.name) {
      toast.error("Please enter a data source name");
      return;
    }

    const newDataSource: DataSource = {
      id: Date.now().toString(),
      name: newSource.name,
      type: newSource.type,
      status: "connected",
      last_sync: new Date().toISOString(),
      created_at: new Date().toISOString(),
      created_by: user?.id || "1",
      error_message: null,
    };

    setDataSources((prev) => [newDataSource, ...prev]);
    toast.success("Data source added successfully");
    setIsAddingSource(false);
    setNewSource({ name: "", type: "database", config: {} });
  };

  const syncDataSource = (sourceId: string) => {
    setDataSources((prev) =>
      prev.map((source) =>
        source.id === sourceId
          ? {
              ...source,
              last_sync: new Date().toISOString(),
              status: "connected",
            }
          : source
      )
    );
    toast.success("Data source synced successfully");
  };

  const deleteDataSource = (sourceId: string) => {
    setDataSources((prev) => prev.filter((source) => source.id !== sourceId));
    toast.success("Data source deleted successfully");
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "database":
        return <Database className="h-5 w-5" />;
      case "api":
        return <Cloud className="h-5 w-5" />;
      case "file":
        return <FileText className="h-5 w-5" />;
      case "cloud":
        return <HardDrive className="h-5 w-5" />;
      default:
        return <Database className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "text-green-400 bg-green-400/10 border-green-400/20";
      case "warning":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
      case "disconnected":
        return "text-red-400 bg-red-400/10 border-red-400/20";
      case "error":
        return "text-red-400 bg-red-400/10 border-red-400/20";
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/20";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="h-4 w-4" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4" />;
      case "disconnected":
        return <XCircle className="h-4 w-4" />;
      case "error":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getTypeGradient = (type: string) => {
    switch (type) {
      case "database":
        return "from-blue-500 to-blue-600";
      case "api":
        return "from-green-500 to-green-600";
      case "file":
        return "from-purple-500 to-purple-600";
      case "cloud":
        return "from-cyan-500 to-cyan-600";
      default:
        return "from-gray-500 to-gray-600";
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
                    <Database className="w-10 h-10 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent mb-2">
                    Data Control Center
                  </h1>
                  <p className="text-xl text-slate-300">
                    Manage and monitor all connected data sources
                  </p>
                </div>
              </div>

              {/* Add Data Source Button */}
              <Dialog open={isAddingSource} onOpenChange={setIsAddingSource}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 px-6 py-3 text-lg">
                    <Plus className="h-5 w-5 mr-2" />
                    Add Data Source
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-800/95 backdrop-blur-xl border-slate-700/50 text-white">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent">
                      Add New Data Source
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div>
                      <Label
                        htmlFor="name"
                        className="text-slate-300 font-medium"
                      >
                        Data Source Name
                      </Label>
                      <Input
                        id="name"
                        value={newSource.name}
                        onChange={(e) =>
                          setNewSource((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        placeholder="Enter data source name"
                        className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-cyan-500/50 focus:ring-cyan-500/20 mt-2"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="type"
                        className="text-slate-300 font-medium"
                      >
                        Source Type
                      </Label>
                      <select
                        id="type"
                        value={newSource.type}
                        onChange={(e) =>
                          setNewSource((prev) => ({
                            ...prev,
                            type: e.target.value,
                          }))
                        }
                        className="w-full p-3 mt-2 bg-slate-700/50 border border-slate-600/50 rounded-md text-white focus:border-cyan-500/50 focus:ring-cyan-500/20 focus:outline-none"
                      >
                        <option value="database">Database</option>
                        <option value="api">API Endpoint</option>
                        <option value="file">File System</option>
                        <option value="cloud">Cloud Storage</option>
                      </select>
                    </div>
                    <div className="flex justify-end space-x-4 pt-4">
                      <Button
                        variant="outline"
                        onClick={() => setIsAddingSource(false)}
                        className="border-slate-600/50 text-slate-300 hover:bg-slate-700/50 hover:text-white"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={addDataSource}
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Source
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Enhanced Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  label: "Total Sources",
                  value: dataSources.length,
                  color: "from-blue-400 to-blue-600",
                  icon: Database,
                },
                {
                  label: "Active Connections",
                  value: dataSources.filter((s) => s.status === "connected")
                    .length,
                  color: "from-green-400 to-green-600",
                  icon: CheckCircle,
                },
                {
                  label: "Warning States",
                  value: dataSources.filter((s) => s.status === "warning")
                    .length,
                  color: "from-yellow-400 to-yellow-600",
                  icon: AlertTriangle,
                },
                {
                  label: "Total Records",
                  value: `${(
                    dataSources.reduce(
                      (acc, s) => acc + (s.metrics?.recordCount || 0),
                      0
                    ) / 1000000
                  ).toFixed(1)}M`,
                  color: "from-purple-400 to-purple-600",
                  icon: Activity,
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

        {/* Enhanced Data Sources Table */}
        <Card className="bg-slate-800/40 backdrop-blur-xl border-slate-700/50 shadow-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-white text-2xl">
              <div className="p-2 bg-cyan-500/20 rounded-lg">
                <Server className="w-6 h-6 text-cyan-400" />
              </div>
              Connected Data Sources
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse ml-auto"></div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-xl border border-slate-700/50">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700/50 hover:bg-slate-700/30">
                    <TableHead className="text-slate-300 font-semibold">
                      Source Details
                    </TableHead>
                    <TableHead className="text-slate-300 font-semibold">
                      Type & Status
                    </TableHead>
                    <TableHead className="text-slate-300 font-semibold">
                      Metrics
                    </TableHead>
                    <TableHead className="text-slate-300 font-semibold">
                      Last Sync
                    </TableHead>
                    <TableHead className="text-slate-300 font-semibold text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dataSources.map((source) => (
                    <TableRow
                      key={source.id}
                      className="border-slate-700/50 hover:bg-slate-700/20 transition-colors duration-200 group"
                    >
                      <TableCell>
                        <div className="flex items-center space-x-4">
                          <div
                            className={`p-3 rounded-xl bg-gradient-to-br ${getTypeGradient(
                              source.type
                            )} shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                          >
                            {getTypeIcon(source.type)}
                          </div>
                          <div>
                            <div className="font-semibold text-white text-lg">
                              {source.name}
                            </div>
                            {source.config?.host && (
                              <div className="text-sm text-slate-400 flex items-center gap-1 mt-1">
                                <Link className="w-3 h-3" />
                                {source.config.host}
                                {source.config.port && `:${source.config.port}`}
                              </div>
                            )}
                            {source.error_message && (
                              <div className="text-sm text-red-400 mt-1 flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" />
                                {source.error_message}
                              </div>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <Badge className="bg-slate-700/50 text-slate-300 border-slate-600/50 hover:bg-slate-600/50">
                            {source.type.toUpperCase()}
                          </Badge>
                          <div
                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusColor(
                              source.status
                            )}`}
                          >
                            {getStatusIcon(source.status)}
                            {source.status.charAt(0).toUpperCase() +
                              source.status.slice(1)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between text-slate-300">
                            <span>Records:</span>
                            <span className="font-mono font-medium">
                              {source.metrics?.recordCount.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between text-slate-400">
                            <span>Size:</span>
                            <span className="font-mono">
                              {source.metrics?.dataSize}
                            </span>
                          </div>
                          <div className="flex justify-between text-slate-400">
                            <span>Sync Time:</span>
                            <span className="font-mono">
                              {source.metrics?.syncDuration}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-slate-300">
                          {source.last_sync ? (
                            <div>
                              <div className="font-medium">
                                {new Date(
                                  source.last_sync
                                ).toLocaleDateString()}
                              </div>
                              <div className="text-sm text-slate-400">
                                {new Date(
                                  source.last_sync
                                ).toLocaleTimeString()}
                              </div>
                            </div>
                          ) : (
                            <span className="text-slate-500 italic">
                              Never synced
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              className="h-9 w-9 p-0 text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors duration-200"
                            >
                              <MoreHorizontal className="h-5 w-5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="bg-slate-800/95 backdrop-blur-xl border-slate-700/50 text-white"
                          >
                            <DropdownMenuItem
                              onClick={() => syncDataSource(source.id)}
                              className="text-slate-300 hover:text-white hover:bg-slate-700/50 focus:bg-slate-700/50 focus:text-white"
                            >
                              <RefreshCw className="mr-2 h-4 w-4 text-green-400" />
                              Sync Now
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-700/50 focus:bg-slate-700/50 focus:text-white">
                              <Eye className="mr-2 h-4 w-4 text-blue-400" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-700/50 focus:bg-slate-700/50 focus:text-white">
                              <Edit3 className="mr-2 h-4 w-4 text-cyan-400" />
                              Edit Configuration
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-700/50 focus:bg-slate-700/50 focus:text-white">
                              <Settings className="mr-2 h-4 w-4 text-purple-400" />
                              Settings
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => deleteDataSource(source.id)}
                              className="text-red-400 hover:text-red-300 hover:bg-red-500/10 focus:bg-red-500/10 focus:text-red-300"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Source
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DataSources;

