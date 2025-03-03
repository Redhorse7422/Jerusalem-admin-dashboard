import React, { useState, useCallback, useId } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";

interface FileUploaderProps {
    multiple?: boolean; // If true, allows multiple file uploads
    className?: string;
    label: string;
    required?: boolean;
    error?: string;
    onChange?: (file: File | File[] | null) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ multiple = false, className, label, required, error, onChange }) => {
    const [files, setFiles] = useState<File[]>([]);
    const [localError, setLocalError] = useState<string | null>(null);
    const id = useId();
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (required && acceptedFiles.length === 0) {
            setLocalError("This field is required.");
            return;
        }
        setLocalError(null);

        // Update file state
        const selectedFiles = multiple ? [...files, ...acceptedFiles] : acceptedFiles;
        setFiles(selectedFiles);

        // Send all files when multiple is enabled
        if (onChange) {
            onChange(multiple ? selectedFiles : selectedFiles[0] || null);
        }
    }, [multiple, files, onChange, required]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple,
        accept: {
            "image/*": [".png", ".jpg", ".jpeg", ".gif"], // Accept only images
        },
    });

    return (
        <div className={cn(className)}>
            <label htmlFor={id} className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                {label}
                {required && <span className="ml-1 select-none text-red">*</span>}
            </label>

            <div className="flex flex-col items-center space-y-4">
                {/* Dropzone */}
                <div
                    {...getRootProps()}
                    className={cn(
                        "border-2 border-dashed p-6 rounded-lg cursor-pointer w-80 text-center transition-all",
                        isDragActive ? "border-blue-500" : "border-gray-300",
                        (error || localError) && "border-red-500"
                    )}
                >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p className="text-blue-500">Drop the files here...</p>
                    ) : (
                        <p>Drag & drop some files here, or click to select files</p>
                    )}
                </div>

                {/* Error Message */}
                {(error || localError) && <p className="mt-1 text-sm text-red-500">{error || localError}</p>}

                {/* Preview */}
                <div className="grid grid-cols-3 gap-4 mt-4">
                    {files.map((file) => (
                        <div key={file.name} className="relative">
                            <img
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                className="w-24 h-24 object-cover rounded shadow-md"
                            />
                            <p className="text-xs text-center mt-1">{file.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FileUploader;
