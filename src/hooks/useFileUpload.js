import { useState, useCallback } from 'react';
import { validateFileUpload } from '../utils/validation';
import { APP_CONFIG } from '../utils/constants';

/**
 * Custom hook for managing file upload functionality
 */
export const useFileUpload = (type = 'image') => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const handleFileUpload = useCallback((file, onSuccess, onError) => {
    if (!file) {
      setUploadError('No file selected');
      return;
    }

    // Validate file
    const validation = validateFileUpload(file, type);
    if (!validation.isValid) {
      setUploadError(validation.error);
      if (onError) onError(validation.error);
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    const reader = new FileReader();
    
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      setIsUploading(false);
      if (onSuccess) onSuccess(dataUrl);
    };
    
    reader.onerror = () => {
      setIsUploading(false);
      const error = 'Failed to read file';
      setUploadError(error);
      if (onError) onError(error);
    };
    
    reader.readAsDataURL(file);
  }, [type]);

  const clearError = useCallback(() => {
    setUploadError(null);
  }, []);

  const reset = useCallback(() => {
    setIsUploading(false);
    setUploadError(null);
  }, []);

  return {
    isUploading,
    uploadError,
    handleFileUpload,
    clearError,
    reset,
  };
};
