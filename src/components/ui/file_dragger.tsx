import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"

interface FileDraggerProps {
  label: string
  accept?: Record<string, string[]>
  multiple?: boolean
  onFilesSelected?: (files: File | null) => void
}

export function FileDragger({
  label,
  accept,
  multiple = false,
  onFilesSelected,
}: FileDraggerProps) {
  const [fileNames, setFileNames] = useState<string | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0] || null;
      setFileNames(file ? file.name : null);

      if (onFilesSelected) {
        onFilesSelected(file);
      }
    },
    [onFilesSelected]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple,
  })

  return (
    <div className="mb-4">
      <label className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div
        {...getRootProps()}
        className={`flex cursor-pointer flex-col items-center justify-center rounded border-2 border-dashed p-6 transition ${
          isDragActive
            ? "border-violet-500 bg-violet-50"
            : "border-gray-300 bg-gray-50"
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-sm text-violet-600">Drop files here...</p>
        ) : (
          <p className="text-sm text-gray-500">
            Drag & drop or click to choose file
          </p>
        )}
      </div>
      {fileNames && (
        <div className="mt-2 text-sm text-gray-600">
          <strong>Selected file:</strong> {fileNames}
        </div>
      )}
    </div>
  )
}
