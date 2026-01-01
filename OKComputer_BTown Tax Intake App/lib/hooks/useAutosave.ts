import { useEffect, useRef, useCallback } from 'react';
import { useForm } from './useForm';

interface UseAutosaveOptions {
  interval?: number; // Save interval in milliseconds
  enabled?: boolean;
  onSave?: (data: any) => void;
  onError?: (error: any) => void;
}

export function useAutosave({
  interval = 30000, // 30 seconds
  enabled = true,
  onSave,
  onError,
}: UseAutosaveOptions = {}) {
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isSavingRef = useRef(false);
  
  const startAutosave = useCallback((saveFunction: () => void) => {
    if (!enabled) return;
    
    // Clear existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    // Set new timeout
    saveTimeoutRef.current = setTimeout(() => {
      if (!isSavingRef.current) {
        isSavingRef.current = true;
        try {
          saveFunction();
        } catch (error) {
          console.error('Autosave error:', error);
          if (onError) onError(error);
        } finally {
          isSavingRef.current = false;
        }
      }
    }, interval);
  }, [interval, enabled, onError]);
  
  const stopAutosave = useCallback(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = null;
    }
  }, []);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAutosave();
    };
  }, [stopAutosave]);
  
  // Handle page visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is hidden, save immediately
        if (onSave && enabled) {
          onSave({});
        }
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [onSave, enabled]);
  
  // Handle page unload
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (enabled && onSave) {
        onSave({});
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [onSave, enabled]);
  
  return {
    startAutosave,
    stopAutosave,
  };
}

// Hook to integrate autosave with form
export function useFormAutosave(form: ReturnType<typeof useForm>, options?: UseAutosaveOptions) {
  const { startAutosave } = useAutosave({
    ...options,
    onSave: async () => {
      await form.saveForm();
      if (options?.onSave) {
        options.onSave(form.getFormState().values);
      }
    },
  });
  
  // Watch for form changes and trigger autosave
  const formData = form.watch();
  
  useEffect(() => {
    if (form.formState.isDirty) {
      startAutosave(() => {});
    }
  }, [formData, form.formState.isDirty, startAutosave]);
  
  return {
    isAutosaving: form.isSaving,
    lastAutosaved: form.lastSaved,
  };
}