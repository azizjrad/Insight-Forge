
import React, { useState } from 'react';
import { Plus, MoreHorizontal, Database, Cloud, FileText, Trash2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface DataSource {
  id: string;
  name: string;
  type: string;
  status: string;
  last_sync: string | null;
  created_at: string;
  created_by: string;
  error_message: string | null;
}

const DataSources: React.FC = () => {
  const { user } = useAuth();
  const [isAddingSource, setIsAddingSource] = useState(false);
  const [newSource, setNewSource] = useState({
    name: '',
    type: 'database',
    config: {}
  });
  const [dataSources, setDataSources] = useState<DataSource[]>([
    {
      id: '1',
      name: 'Main Database',
      type: 'database',
      status: 'connected',
      last_sync: new Date().toISOString(),
      created_at: new Date().toISOString(),
      created_by: '1',
      error_message: null
    },
    {
      id: '2',
      name: 'Analytics API',
      type: 'api',
      status: 'connected',
      last_sync: new Date().toISOString(),
      created_at: new Date().toISOString(),
      created_by: '1',
      error_message: null
    }
  ]);

  const addDataSource = () => {
    if (!newSource.name) {
      toast.error('Please enter a data source name');
      return;
    }
    
    const newDataSource: DataSource = {
      id: Date.now().toString(),
      name: newSource.name,
      type: newSource.type,
      status: 'connected',
      last_sync: new Date().toISOString(),
      created_at: new Date().toISOString(),
      created_by: user?.id || '1',
      error_message: null
    };
    
    setDataSources(prev => [newDataSource, ...prev]);
    toast.success('Data source added successfully');
    setIsAddingSource(false);
    setNewSource({ name: '', type: 'database', config: {} });
  };

  const syncDataSource = (sourceId: string) => {
    setDataSources(prev => prev.map(source => 
      source.id === sourceId 
        ? { ...source, last_sync: new Date().toISOString(), status: 'connected' }
        : source
    ));
    toast.success('Data source synced successfully');
  };

  const deleteDataSource = (sourceId: string) => {
    setDataSources(prev => prev.filter(source => source.id !== sourceId));
    toast.success('Data source deleted successfully');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'database': return <Database className="h-4 w-4" />;
      case 'api': return <Cloud className="h-4 w-4" />;
      case 'file': return <FileText className="h-4 w-4" />;
      default: return <Database className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'default';
      case 'error': return 'destructive';
      case 'disconnected': return 'secondary';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Data Sources</h2>
          <p className="text-gray-600 mt-2">Manage your connected data sources</p>
        </div>
        <Dialog open={isAddingSource} onOpenChange={setIsAddingSource}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Data Source
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Data Source</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newSource.name}
                  onChange={(e) => setNewSource(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Data source name"
                />
              </div>
              <div>
                <Label htmlFor="type">Type</Label>
                <select
                  id="type"
                  value={newSource.type}
                  onChange={(e) => setNewSource(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="database">Database</option>
                  <option value="api">API</option>
                  <option value="file">File</option>
                  <option value="cloud">Cloud Storage</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddingSource(false)}>
                  Cancel
                </Button>
                <Button onClick={addDataSource}>
                  Add Source
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Connected Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Sync</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataSources.map((source) => (
                <TableRow key={source.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(source.type)}
                      <div>
                        <div className="font-medium">{source.name}</div>
                        {source.error_message && (
                          <div className="text-sm text-red-500">{source.error_message}</div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{source.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(source.status)}>
                      {source.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {source.last_sync 
                      ? new Date(source.last_sync).toLocaleString()
                      : 'Never'
                    }
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => syncDataSource(source.id)}
                        >
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Sync Now
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => deleteDataSource(source.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataSources;
