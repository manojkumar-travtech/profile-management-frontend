"use client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Upload,
  X,
  File,
  Image,
  FileText,
  Music,
  Video,
  Archive,
  Loader2,
} from "lucide-react";

interface DragAndDropUploaderProps {
  label?: string;
  onFilesChange?: (files: File[]) => void;
  onDataRead?: (fileData: { file: File; data: string | ArrayBuffer | null }[]) => void;
  value?: File[];
  multiple?: boolean;
  accept?: Record<string, string[]>;
  readFile?: boolean;
}

const getFileIcon = (fileType: string) => {
  if (fileType.startsWith("image/")) return <Image className="w-4 h-4 sm:w-5 sm:h-5" />;
  if (fileType.startsWith("video/")) return <Video className="w-4 h-4 sm:w-5 sm:h-5" />;
  if (fileType.startsWith("audio/")) return <Music className="w-4 h-4 sm:w-5 sm:h-5" />;
  if (fileType.includes("pdf") || fileType.includes("document"))
    return <FileText className="w-4 h-4 sm:w-5 sm:h-5" />;
  if (fileType.includes("zip") || fileType.includes("rar"))
    return <Archive className="w-4 h-4 sm:w-5 sm:h-5" />;
  return <File className="w-4 h-4 sm:w-5 sm:h-5" />;
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};

const getAcceptedTypesDisplay = (accept?: Record<string, string[]>): string[] => {
  if (!accept || Object.keys(accept).length === 0) return ["All Files"];

  const types: string[] = [];
  Object.keys(accept).forEach((mimeType) => {
    if (mimeType.startsWith("image/")) types.push("Images");
    else if (mimeType.startsWith("video/")) types.push("Videos");
    else if (mimeType.startsWith("audio/")) types.push("Audio");
    else if (mimeType.includes("pdf")) types.push("PDF");
    else if (mimeType.includes("document") || mimeType.includes("word"))
      types.push("Documents");
    else if (mimeType.includes("spreadsheet") || mimeType.includes("excel"))
      types.push("Spreadsheets");
    else if (mimeType.includes("zip") || mimeType.includes("rar")) types.push("Archives");
  });

  return [...new Set(types)].slice(0, 4);
};

const DragAndDropUploader: React.FC<DragAndDropUploaderProps> = ({
  label = "Upload files",
  onFilesChange,
  onDataRead,
  value = [],
  multiple = true,
  accept,
  readFile = false,
}) => {
  const [files, setFiles] = useState<File[]>(value);
  const [loading, setLoading] = useState(false);

  const readFilesData = async (fileList: File[]) => {
    setLoading(true);

    const fileDataPromises = fileList.map(
      (file) =>
        new Promise<{ file: File; data: string | ArrayBuffer | null }>((resolve) => {
          const reader = new FileReader();

          if (file.type.startsWith("image/")) {
            reader.readAsDataURL(file);
          } else {
            reader.readAsText(file);
          }

          reader.onload = (e) => resolve({ file, data: e.target?.result || null });
          reader.onerror = () => resolve({ file, data: null });
        })
    );

    const result = await Promise.all(fileDataPromises);
    setLoading(false);

    if (onDataRead) onDataRead(result);
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const updatedFiles = multiple ? [...files, ...acceptedFiles] : acceptedFiles.slice(0, 1);
      setFiles(updatedFiles);

      // Send files immediately
      if (onFilesChange) onFilesChange(updatedFiles);

      // If readFile is true, read data and send separately
      if (readFile && onDataRead) {
        await readFilesData(updatedFiles);
      }
    },
    [files, multiple, readFile, onFilesChange, onDataRead]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple,
    accept,
  });

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    if (onFilesChange) onFilesChange(updatedFiles);
  };

  const acceptedTypes = getAcceptedTypesDisplay(accept);

  return (
    <div className="w-full">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`relative overflow-hidden rounded-2xl sm:rounded-3xl cursor-pointer transition-all duration-300 ease-out
        ${
          isDragActive
            ? "border-2 border-purple-500 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 scale-[1.02] shadow-2xl"
            : "border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 hover:border-purple-300 hover:shadow-xl hover:scale-[1.01]"
        }`}
      >
        <input {...getInputProps()} />
        <div
          className={`absolute inset-0 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 opacity-0 transition-opacity duration-300 ${
            isDragActive ? "opacity-10" : ""
          }`}
        />
        <div className="relative p-6 sm:p-8 flex flex-col items-center justify-center">
          {loading ? (
            <div className="flex flex-col items-center space-y-2">
              <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 animate-spin" />
              <p className="text-sm text-gray-600">Reading files...</p>
            </div>
          ) : (
            <>
              <div
                className={`mb-3 p-3 rounded-xl sm:rounded-2xl bg-gradient-to-br transition-all duration-300 ${
                  isDragActive
                    ? "from-purple-500 to-blue-500 shadow-lg scale-110"
                    : "from-gray-300 to-gray-400 shadow-md"
                }`}
              >
                <Upload
                  className={`w-6 h-6 sm:w-8 sm:h-8 text-white transition-transform duration-300 ${
                    isDragActive ? "animate-bounce" : ""
                  }`}
                />
              </div>
              <p
                className={`text-sm sm:text-lg font-semibold mb-1 sm:mb-2 transition-colors duration-300 text-center ${
                  isDragActive ? "text-purple-700" : "text-gray-700"
                }`}
              >
                {isDragActive ? "Drop your files here" : "Drag & drop files"}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                or click to browse
              </p>
              <div className="flex gap-1.5 sm:gap-2 flex-wrap justify-center">
                {acceptedTypes.map((type, index) => (
                  <span
                    key={index}
                    className="px-2 sm:px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-medium text-gray-600 shadow-sm"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
          <p className="text-xs sm:text-sm font-medium text-gray-600">
            {files.length} {files.length === 1 ? "file" : "files"} selected
          </p>

          {files.map((file, index) => (
            <div
              key={index}
              className="group relative overflow-hidden bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-blue-500/0 to-cyan-500/0 group-hover:from-purple-500/5 group-hover:via-blue-500/5 group-hover:to-cyan-500/5 transition-all duration-300" />
              <div className="relative flex items-center gap-2 sm:gap-4">
                <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br from-purple-100 to-blue-100 text-purple-600 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                  {getFileIcon(file.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 truncate text-xs sm:text-sm">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5 sm:mt-1">
                    {formatFileSize(file.size)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-red-50 text-red-500 hover:bg-red-100 hover:scale-110 transition-all duration-200 shadow-sm flex-shrink-0"
                  aria-label="Remove file"
                >
                  <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DragAndDropUploader;
