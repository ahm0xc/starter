import React from "react";

import ReactDropzone, {
  type DropzoneProps as ReactDropzoneProps,
} from "react-dropzone";
import { toast } from "sonner";

import { cn } from "~/utils/tailwindcss";

export type DropzoneProps = {
  children?: React.ReactNode;
  className?: string;
  dragActiveClassName?: string;
  dragAcceptClassName?: string;
  dragRejectClassName?: string;
  focusedClassName?: string;
} & Omit<ReactDropzoneProps, "children">;

export default function Dropzone({
  children,
  className,
  dragActiveClassName,
  dragAcceptClassName,
  dragRejectClassName,
  focusedClassName,
  ...props
}: DropzoneProps) {
  return (
    <ReactDropzone
      onDropRejected={(fileRejections) => {
        for (const rejection of fileRejections) {
          switch (rejection.errors[0]?.code) {
            case "too-many-files":
              toast.error("You uploaded too many files.", {
                description: `\`${rejection.file.name}\`. You can only upload ${props.maxFiles ?? 1} ${props.maxFiles ? "files" : "files"}`,
              });
              break;
            case "file-invalid-type":
              toast.error(`\`${rejection.file.name}\`. Invalid file type`);
              break;
            case "file-too-large":
              toast.error("File is too large", {
                description: `\`${rejection.file.name}\`. File size should be less than ${(
                  (props.maxSize ?? 1) /
                  1024 /
                  1024
                ).toFixed(2)} MB`,
              });
              break;

            default:
              toast.error("An error occurred while uploading the file.", {
                description: `\`${rejection.file.name}\``,
              });
              break;
          }
        }
      }}
      {...props}
    >
      {({
        getRootProps,
        getInputProps,
        isDragAccept,
        isDragActive,
        isDragReject,
        isFocused,
      }) => (
        <div
          {...getRootProps()}
          className={cn(
            "w-96 flex items-center justify-center h-40 rounded-lg border border-dashed",
            className,
            isDragActive && (dragActiveClassName ?? "bg-blue-600"),
            isDragAccept && dragAcceptClassName,
            isDragReject && (dragRejectClassName ?? "bg-red-600"),
            isFocused && focusedClassName
          )}
        >
          <input {...getInputProps()} />
          <p>Drag n drop files</p>
          {children}
        </div>
      )}
    </ReactDropzone>
  );
}
