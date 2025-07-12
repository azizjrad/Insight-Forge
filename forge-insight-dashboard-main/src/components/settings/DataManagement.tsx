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
    <Card className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gray-600/20 rounded-xl">
          <Database className="w-6 h-6 text-gray-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Data Management
          </h3>
          <p className="text-sm text-gray-400">
            Import, export, and manage your data
          </p>
        </div>
        {exportStatus === "success" && (
          <div className="flex items-center gap-2 text-green-400">
            <CheckCircle size={16} />
            <span className="text-sm font-medium">Exported!</span>
          </div>
        )}
      </div>{" "}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Button
          onClick={handleExport}
          disabled={isExporting}
          variant="outline"
          className="flex items-center gap-3 p-4 h-auto bg-gray-700/40 backdrop-blur-sm border border-blue-500/30 hover:border-blue-400/50 hover:bg-blue-500/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 rounded-xl"
        >
          {isExporting ? (
            <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
          ) : (
            <Download className="w-5 h-5 text-blue-400" />
          )}
          <div className="text-left">
            <p className="font-medium text-blue-300">
              {isExporting ? "Exporting..." : "Export Data"}
            </p>
            <p className="text-xs text-blue-400">Download your information</p>
          </div>
        </Button>

        <Button
          onClick={handleImport}
          disabled={isImporting}
          variant="outline"
          className="flex items-center gap-3 p-4 h-auto bg-gray-700/40 backdrop-blur-sm border border-green-500/30 hover:border-green-400/50 hover:bg-green-500/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 rounded-xl"
        >
          {isImporting ? (
            <Loader2 className="w-5 h-5 text-green-400 animate-spin" />
          ) : (
            <Upload className="w-5 h-5 text-green-400" />
          )}{" "}
          <div className="text-left">
            <p className="font-medium text-green-300">
              {isImporting ? "Importing..." : "Import Data"}
            </p>
            <p className="text-xs text-green-400">Upload your information</p>
          </div>
        </Button>

        <Button
          variant="outline"
          className="flex items-center gap-3 p-4 h-auto bg-gray-700/40 backdrop-blur-sm border border-red-500/30 hover:border-red-400/50 hover:bg-red-500/10 transition-all duration-200 rounded-xl"
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
          <AlertTriangle className="w-5 h-5 text-red-400" />
          <div className="text-left">
            <p className="font-medium text-red-300">Delete Account</p>
            <p className="text-xs text-red-400">Permanently remove data</p>
          </div>
        </Button>
      </div>
      <div className="mt-6 p-4 bg-amber-900/20 backdrop-blur-sm border border-amber-600/30 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-amber-300">
              Data Privacy Notice
            </h4>
            <p className="text-xs text-amber-400 mt-1">
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
