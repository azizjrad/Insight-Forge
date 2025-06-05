
import React, { useState } from 'react';
import { MoreHorizontal, UserCheck, UserX, Trash2, MessageSquare } from 'lucide-react';
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
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface User {
  id: string;
  email: string;
  full_name: string | null;
  role: string;
  status: string;
  created_at: string;
}

const Users: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [notificationData, setNotificationData] = useState({
    title: '',
    message: '',
    type: 'info' as 'info' | 'success' | 'warning' | 'error'
  });
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      email: 'admin@demo.com',
      full_name: 'Admin User',
      role: 'admin',
      status: 'active',
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      email: 'user@demo.com',
      full_name: 'Demo User',
      role: 'user',
      status: 'active',
      created_at: new Date().toISOString()
    }
  ]);

  const updateUser = (userId: string, updates: Partial<User>) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, ...updates } : user
    ));
    toast.success('User updated successfully');
  };

  const handleStatusChange = (userId: string, newStatus: string) => {
    updateUser(userId, { status: newStatus });
  };

  const handleRoleChange = (userId: string, newRole: string) => {
    updateUser(userId, { role: newRole });
  };

  const handleSendNotification = () => {
    if (!selectedUser || !notificationData.title || !notificationData.message) {
      toast.error('Please fill in all notification fields');
      return;
    }

    // In a real app, this would send the notification
    toast.success('Notification sent successfully');
    setSelectedUser(null);
    setNotificationData({ title: '', message: '', type: 'info' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Users</h2>
        <p className="text-gray-600 mt-2">Manage user accounts and permissions</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{user.full_name || 'Unknown'}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        user.status === 'active' ? 'default' : 
                        user.status === 'suspended' ? 'destructive' : 'secondary'
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(user.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Dialog>
                          <DialogTrigger asChild>
                            <DropdownMenuItem 
                              onSelect={(e) => {
                                e.preventDefault();
                                setSelectedUser(user);
                              }}
                            >
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Send Notification
                            </DropdownMenuItem>
                          </DialogTrigger>
                        </Dialog>
                        
                        {user.status === 'active' ? (
                          <DropdownMenuItem
                            onClick={() => handleStatusChange(user.id, 'suspended')}
                          >
                            <UserX className="mr-2 h-4 w-4" />
                            Suspend
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            onClick={() => handleStatusChange(user.id, 'active')}
                          >
                            <UserCheck className="mr-2 h-4 w-4" />
                            Activate
                          </DropdownMenuItem>
                        )}
                        {user.role !== 'admin' && (
                          <DropdownMenuItem
                            onClick={() => handleRoleChange(user.id, 'admin')}
                          >
                            Make Admin
                          </DropdownMenuItem>
                        )}
                        {user.role === 'admin' && (
                          <DropdownMenuItem
                            onClick={() => handleRoleChange(user.id, 'user')}
                          >
                            Remove Admin
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-red-600">
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

      {/* Send Notification Dialog */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Send Notification to {selectedUser?.full_name || selectedUser?.email}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={notificationData.title}
                onChange={(e) => setNotificationData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Notification title"
              />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={notificationData.message}
                onChange={(e) => setNotificationData(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Notification message"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <select
                id="type"
                value={notificationData.type}
                onChange={(e) => setNotificationData(prev => ({ ...prev, type: e.target.value as any }))}
                className="w-full p-2 border rounded-md"
              >
                <option value="info">Info</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setSelectedUser(null)}>
                Cancel
              </Button>
              <Button onClick={handleSendNotification}>
                Send Notification
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Users;
