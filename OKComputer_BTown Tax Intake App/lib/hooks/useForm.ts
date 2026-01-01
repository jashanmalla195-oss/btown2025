import { useState, useCallback, useEffect } from 'react';
import { useForm as useReactHookForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormData, formSchema } from '@/types';
import { getVisibleFields } from '@/lib/constants/conditionalRules';

interface UseFormOptions {
  defaultValues?: Partial<FormData>;
  onSave?: (data: FormData) => void;
  onError?: (error: any) => void;
}

export function useForm({ defaultValues, onSave, onError }: UseFormOptions = {}) {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [visibleFields, setVisibleFields] = useState<string[]>([]);
  
  const formMethods = useReactHookForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taxYear: new Date().getFullYear().toString(),
      province: 'ON',
      filingType: 'personal',
      ...defaultValues,
    },
    mode: 'onChange',
  });
  
  const { watch, getValues, setValue } = formMethods;
  
  // Watch for form changes and update visible fields
  const formData = watch();
  
  useEffect(() => {
    const newVisibleFields = getVisibleFields(formData);
    setVisibleFields(newVisibleFields);
  }, [formData]);
  
  // Auto-save functionality
  const saveForm = useCallback(async () => {
    try {
      setIsSaving(true);
      const currentData = getValues();
      
      if (onSave) {
        await onSave(currentData);
      }
      
      // Save to localStorage as backup
      localStorage.setItem('taxIntakeDraft', JSON.stringify({
        data: currentData,
        timestamp: new Date().toISOString(),
      }));
      
      setLastSaved(new Date());
    } catch (error) {
      console.error('Error saving form:', error);
      if (onError) {
        onError(error);
      }
    } finally {
      setIsSaving(false);
    }
  }, [getValues, onSave, onError]);
  
  // Load saved draft
  const loadDraft = useCallback(() => {
    try {
      const saved = localStorage.getItem('taxIntakeDraft');
      if (saved) {
        const { data, timestamp } = JSON.parse(saved);
        
        // Only load if draft is less than 30 days old
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        if (new Date(timestamp) > thirtyDaysAgo) {
          Object.keys(data).forEach(key => {
            if (data[key] !== undefined && data[key] !== null) {
              setValue(key as keyof FormData, data[key]);
            }
          });
          setLastSaved(new Date(timestamp));
          return true;
        }
      }
    } catch (error) {
      console.error('Error loading draft:', error);
    }
    return false;
  }, [setValue]);
  
  // Clear draft
  const clearDraft = useCallback(() => {
    localStorage.removeItem('taxIntakeDraft');
    setLastSaved(null);
  }, []);
  
  // Check if field is visible based on conditional logic
  const isFieldVisible = useCallback((fieldName: string): boolean => {
    return visibleFields.includes(fieldName) || !visibleFields.length;
  }, [visibleFields]);
  
  // Get field value with type safety
  const getFieldValue = useCallback(<K extends keyof FormData>(fieldName: K): FormData[K] => {
    return getValues(fieldName);
  }, [getValues]);
  
  // Set field value with type safety
  const setFieldValue = useCallback(<K extends keyof FormData>(fieldName: K, value: FormData[K]) => {
    setValue(fieldName, value);
  }, [setValue]);
  
  // Validate specific field
  const validateField = useCallback(async (fieldName: keyof FormData): Promise<boolean> => {
    try {
      await formMethods.trigger(fieldName);
      return true;
    } catch {
      return false;
    }
  }, [formMethods]);
  
  // Get form validation state
  const getFormState = useCallback(() => {
    const values = getValues();
    const errors = formMethods.formState.errors;
    const isValid = formMethods.formState.isValid;
    
    return {
      values,
      errors,
      isValid,
      isDirty: formMethods.formState.isDirty,
      isSubmitting: formMethods.formState.isSubmitting,
    };
  }, [getValues, formMethods]);
  
  return {
    ...formMethods,
    isSaving,
    lastSaved,
    visibleFields,
    saveForm,
    loadDraft,
    clearDraft,
    isFieldVisible,
    getFieldValue,
    setFieldValue,
    validateField,
    getFormState,
  };
}