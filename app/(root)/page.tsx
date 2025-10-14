"use client";
import DragAndDropUploader from "@/components/custom/DragAndDropUploader/DragAndDropUploader";
import Logout from "../(auth)/logout/Logout";
import { useState } from "react";

export default function Home() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFilesChange = (files: File[]) => {
    console.log("Files uploaded:", files);
    setUploadedFiles(files);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Drag & Drop Uploader Examples
          </h1>
          <p className="text-gray-600">
            Modern file upload component with multiple configurations
          </p>
        </div>

        {/* Example 1: All Files */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            1. Accept All Files (Multiple)
          </h2>
          <DragAndDropUploader
            label="Upload any files"
            onFilesChange={(files) => console.log("📁 Files:", files)}
            onDataRead={(data) => console.log("📄 Data:", data)}
            multiple={true}
            readFile={true}
          />
        </div>

        {/* Example 2: Images Only */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            2. Images Only
          </h2>
          <DragAndDropUploader
            label="Upload images"
            onFilesChange={(files) => console.log("📁 Files:", files)}
            onDataRead={(data) => console.log("📄 Data:", data)}
            accept={{
              "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
            }}
            multiple={true}
            readFile={true}

          />
        </div>

        {/* Example 3: Single PDF */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            3. Single PDF File
          </h2>
          <DragAndDropUploader
            label="Upload a PDF document"
            onFilesChange={(files) => console.log("📁 Files:", files)}
            accept={{
              "application/pdf": [".pdf"],
            }}
            multiple={false}
          />
        </div>

        {/* Example 4: Documents and Images */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            4. Documents & Images
          </h2>
          <DragAndDropUploader
            label="Upload documents or images"
            onFilesChange={(files) => console.log("📁 Files:", files)}
            accept={{
              "application/pdf": [".pdf"],
              "application/msword": [".doc"],
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                [".docx"],
              "image/*": [".png", ".jpg", ".jpeg"],
            }}
            multiple={true}
          />
        </div>

        {/* Example 5: Video Files */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            5. Video Files Only
          </h2>
          <DragAndDropUploader
            label="Upload video files"
            onFilesChange={(files) => console.log("📁 Files:", files)}
            accept={{
              "video/*": [".mp4", ".mov", ".avi", ".mkv", ".webm"],
            }}
            multiple={true}
          />
        </div>

        {/* Example 6: Controlled Component */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            6. Controlled Component
          </h2>
          <DragAndDropUploader
            variant="compact"
            label="Controlled uploader"
            value={uploadedFiles}
            onFilesChange={(files) => console.log("📁 Files:", files)}
            multiple={true}
          />
          {uploadedFiles.length > 0 && (
            <div className="mt-6 p-4 bg-purple-50 rounded-2xl">
              <p className="text-sm font-semibold text-purple-900 mb-2">
                Current state: {uploadedFiles.length} files
              </p>
              <button
                onClick={() => setUploadedFiles([])}
                className="px-4 py-2 bg-purple-600 text-white rounded-xl text-sm font-medium hover:bg-purple-700 transition-colors"
              >
                Clear All Files
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
