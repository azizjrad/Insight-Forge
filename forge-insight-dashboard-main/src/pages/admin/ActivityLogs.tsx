
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface ActivityLog {
  id: string;
  action: string;
  description: string | null;
  created_at: string;
  user_id: string | null;
  ip_address: string | null;
  user_agent: string | null;
}

const ActivityLogs: React.FC = () => {
  // Demo data for activity logs
  const logs: ActivityLog[] = [
    {
      id: '1',
      action: 'user_login',
      description: 'User successfully logged in',
      created_at: new Date().toISOString(),
      user_id: 'user_123',
      ip_address: '192.168.1.1',
      user_agent: 'Mozilla/5.0...'
    },
    {
      id: '2',
      action: 'data_sync',
      description: 'Data synchronization completed',
      created_at: new Date(Date.now() - 300000).toISOString(),
      user_id: null,
      ip_address: null,
      user_agent: null
    },
    {
      id: '3',
      action: 'user_logout',
      description: 'User logged out',
      created_at: new Date(Date.now() - 600000).toISOString(),
      user_id: 'user_456',
      ip_address: '192.168.1.2',
      user_agent: 'Mozilla/5.0...'
    }
  ];

  const getActionColor = (action: string) => {
    if (action.includes('login')) return 'default';
    if (action.includes('error') || action.includes('fail')) return 'destructive';
    if (action.includes('create') || action.includes('success')) return 'default';
    if (action.includes('delete') || action.includes('suspend')) return 'destructive';
    if (action.includes('update') || action.includes('sync')) return 'secondary';
    return 'outline';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Activity Logs</h2>
        <p className="text-gray-600 mt-2">Monitor system activities and user actions</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>User ID</TableHead>
                <TableHead>IP Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs?.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <div className="text-sm">
                      {new Date(log.created_at).toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getActionColor(log.action)}>
                      {log.action}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-md truncate">
                      {log.description || 'No description'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-mono">
                      {log.user_id ? log.user_id.substring(0, 8) + '...' : 'System'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {log.ip_address || 'N/A'}
                    </div>
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

export default ActivityLogs;
