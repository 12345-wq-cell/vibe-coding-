import React, { useRef } from 'react';
import type { UploadedImage } from '../types';
import { PlusIcon, GlobeIcon, MicrophoneIcon, ArrowUpIcon, XCircleIcon } from './icons';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
  uploadedImage: UploadedImage | null;
  setUploadedImage: (image: UploadedImage | null) => void;
}

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(',')[1]); // remove the "data:mime/type;base64," prefix
    };
    reader.onerror = (error) => reject(error);
  });

const PromptInput: React.FC<PromptInputProps> = ({ 
  prompt, setPrompt, onGenerate, isLoading, uploadedImage, setUploadedImage 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const base64 = await fileToBase64(file);
        setUploadedImage({ base64, mimeType: file.type });
      } catch (error) {
        console.error("Error converting file to base64:", error);
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (!isLoading && prompt.trim()) {
        onGenerate();
      }
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-8">
      <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-2xl p-2 transition-all duration-300 focus-within:border-white/30">
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="A website for a local bakery..."
            className="w-full bg-transparent p-4 pl-5 text-base text-white placeholder-gray-400 focus:outline-none resize-none h-20"
            disabled={isLoading}
            aria-label="Website description prompt"
          />
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <button className="text-gray-400 hover:text-white transition-colors" aria-label="Use microphone">
              <MicrophoneIcon className="h-5 w-5" />
            </button>
            <button
              onClick={onGenerate}
              disabled={isLoading || !prompt.trim()}
              className="bg-black/30 hover:bg-black/50 text-white rounded-full p-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Generate website"
            >
              <ArrowUpIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 p-2 pt-0">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/png, image/jpeg, image/webp"
            className="hidden"
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            className="flex items-center gap-2 text-sm text-gray-300 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-md transition-colors"
          >
            <PlusIcon className="h-4 w-4" />
            Attach
          </button>
           {uploadedImage && (
              <div className="relative group">
                  <img 
                      src={`data:${uploadedImage.mimeType};base64,${uploadedImage.base64}`} 
                      alt="Uploaded preview" 
                      className="h-9 w-9 object-cover rounded-md border border-white/20"
                  />
                  <button 
                      onClick={() => setUploadedImage(null)}
                      className="absolute -top-1.5 -right-1.5 bg-gray-800 rounded-full text-white hover:text-red-400 transition-transform opacity-0 group-hover:opacity-100"
                      aria-label="Remove image"
                  >
                      <XCircleIcon className="h-5 w-5" />
                  </button>
              </div>
          )}
          <button className="flex items-center gap-2 text-sm text-gray-300 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-md transition-colors">
            <GlobeIcon className="h-4 w-4" />
            Public
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptInput;
