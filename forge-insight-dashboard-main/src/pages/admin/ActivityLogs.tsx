import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ActivityLogs: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <Card className="bg-slate-800/60 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-white">Activity Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-300">
            Activity logs functionality is being updated...
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityLogs;
