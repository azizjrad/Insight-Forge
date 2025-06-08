import React, { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import {
  Database,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle,
  Loader2,
} from "lucide-react";

const DataManagement = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [exportStatus, setExportStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleExport = async () => {
    setIsExporting(true);
    setExportStatus("idle");

    try {
      // Simulate export process
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Create and download a sample file
      const data = {
        profile: { name: "John Doe", email: "john.doe@example.com" },
        settings: { theme: "light", notifications: true },
        exportDate: new Date().toISOString(),
      };

      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `settings-export-${
        new Date().toISOString().split("T")[0]
      }.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setExportStatus("success");
      setTimeout(() => setExportStatus("idle"), 3000);
    } catch (error) {
      setExportStatus("error");
      setTimeout(() => setExportStatus("idle"), 3000);
    } finally {
      setIsExporting(false);
    }
  };

  const handleImport = async () => {
    setIsImporting(true);

    try {
      // Create file input
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".json";

      input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = async (e) => {
            try {
              const content = e.target?.result as string;
              JSON.parse(content); // Validate JSON

              // Simulate import process
              await new Promise((resolve) => setTimeout(resolve, 1500));
              alert("Data imported successfully!");
            } catch (error) {
              alert("Invalid file format. Please upload a valid JSON file.");
            } finally {
              setIsImporting(false);
            }
          };
          reader.readAsText(file);
        } else {
          setIsImporting(false);
        }
      };

      input.click();
    } catch (error) {
      setIsImporting(false);
      alert("Import failed. Please try again.");
    }
  };
  return (
    <Card className="bg-white/80 backdrop-blur-md border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gray-500/10 rounded-xl">
          <Database className="w-6 h-6 text-gray-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">
            Data Management
          </h3>
          <p className="text-sm text-gray-600">
            Import, export, and manage your data
          </p>
        </div>
        {exportStatus === "success" && (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle size={16} />
            <span className="text-sm font-medium">Exported!</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Button
          onClick={handleExport}
          disabled={isExporting}
          variant="outline"
          className="flex items-center gap-3 p-4 h-auto border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isExporting ? (
            <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
          ) : (
            <Download className="w-5 h-5 text-blue-600" />
          )}
          <div className="text-left">
            <p className="font-medium text-blue-900">
              {isExporting ? "Exporting..." : "Export Data"}
            </p>
            <p className="text-xs text-blue-600">Download your information</p>
          </div>
        </Button>

        <Button
          onClick={handleImport}
          disabled={isImporting}
          variant="outline"
          className="flex items-center gap-3 p-4 h-auto border-2 border-green-200 hover:border-green-300 hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isImporting ? (
            <Loader2 className="w-5 h-5 text-green-600 animate-spin" />
          ) : (
            <Upload className="w-5 h-5 text-green-600" />
          )}
          <div className="text-left">
            <p className="font-medium text-green-900">
              {isImporting ? "Importing..." : "Import Data"}
            </p>
            <p className="text-xs text-green-600">Upload your information</p>
          </div>
        </Button>

        <Button
          variant="outline"
          className="flex items-center gap-3 p-4 h-auto border-2 border-red-200 hover:border-red-300 hover:bg-red-50 transition-all duration-200"
          onClick={() => {
            if (
              confirm(
                "Are you sure you want to delete your account? This action cannot be undone."
              )
            ) {
              alert("Account deletion would be processed here.");
            }
          }}
        >
          <AlertTriangle className="w-5 h-5 text-red-600" />
          <div className="text-left">
            <p className="font-medium text-red-900">Delete Account</p>
            <p className="text-xs text-red-600">Permanently remove data</p>
          </div>
        </Button>
      </div>

      <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-amber-900">
              Data Privacy Notice
            </h4>
            <p className="text-xs text-amber-700 mt-1">
              Your data is encrypted and stored securely. Export files contain
              sensitive information - please handle them carefully and store
              them in a secure location.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DataManagement;
