import { useState, useRef } from 'react';
import { uploadToIPFS, encryptFile } from '@/services';
import { generateEncryptionKey } from '@/lib';

interface UploadModalProps {
  onClose: () => void;
}

export default function UploadModal({ onClose }: UploadModalProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      setFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleSubmit = async () => {
    if (files.length === 0) return;
    
    setUploading(true);
    setProgress(0);
    
    try {
      // Process each file
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Generate encryption key
        const encryptionKey = await generateEncryptionKey();
        
        // Encrypt file
        const encryptedFile = await encryptFile(file, encryptionKey);
        
        // Upload to IPFS
        await uploadToIPFS(new File([encryptedFile], file.name));
        
        // Update progress
        setProgress(((i + 1) / files.length) * 100);
      }
      
      // Close modal after successful upload
      setTimeout(() => onClose(), 1000);
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Upload Files</h2>
          <button onClick={onClose} className="text-gray-500">&times;</button>
        </div>
        
        <div 
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {files.length > 0 ? (
            <ul className="text-left">
              {files.map((file, index) => (
                <li key={index} className="mb-2">
                  {file.name} ({Math.round(file.size / 1024)} KB)
                </li>
              ))}
            </ul>
          ) : (
            <>
              <p className="mb-2">Drag and drop files here, or</p>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="btn-secondary"
              >
                Browse Files
              </button>
              <input 
                type="file" 
                multiple 
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
            </>
          )}
        </div>
        
        {uploading && (
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500">Uploading... {Math.round(progress)}%</p>
          </div>
        )}
        
        <div className="flex justify-end gap-2">
          <button 
            onClick={onClose}
            className="btn-secondary"
            disabled={uploading}
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            className="btn-primary"
            disabled={files.length === 0 || uploading}
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </div>
    </div>
  );
}
