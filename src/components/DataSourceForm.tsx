import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { DataSourceFormData, INDEX_TYPES, IndexType } from '../types';
import { Input, Autocomplete, Button } from './shared';
import { IndexTypeSFTP } from './IndexTypeSFTP';
import { createDataSource, updateDataSource } from '../services/api';

interface DataSourceFormProps {
  initialData?: DataSourceFormData;
  onSuccess?: (data: DataSourceFormData) => void;
  onCancel?: () => void;
}

const DATA_SOURCE_OPTIONS = [
  { value: INDEX_TYPES.GIT, label: 'Git Repository' },
  { value: INDEX_TYPES.FILE, label: 'File System' },
  { value: INDEX_TYPES.CONFLUENCE, label: 'Confluence' },
  { value: INDEX_TYPES.SFTP, label: 'SFTP Server' }
];

export const DataSourceForm: React.FC<DataSourceFormProps> = ({
  initialData,
  onSuccess,
  onCancel
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const [formData, setFormData] = useState<DataSourceFormData>(initialData || {
    type: '' as IndexType,
    name: '',
    schedule: '*/15 * * * *'
  });

  const {
    handleSubmit,
    setValue,
    formState: { errors },
    reset
  } = useForm<DataSourceFormData>({
    defaultValues: formData,
    mode: 'onBlur'
  });

  const handleInputChange = (field: keyof DataSourceFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    setValue(field as any, value);
  };

  const handleFormDataChange = (newData: Partial<DataSourceFormData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const onSubmit = async (data: DataSourceFormData) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      let result;
      
      if (initialData) {
        result = await updateDataSource('existing_id', data);
      } else {
        result = await createDataSource(data);
      }

      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: `Data source ${initialData ? 'updated' : 'created'} successfully!`
        });
        
        if (onSuccess) {
          onSuccess(data);
        }
        
        if (!initialData) {
          reset();
          setFormData({
            type: '' as IndexType,
            name: '',
            schedule: '*/15 * * * *'
          });
        }
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Failed to save data source'
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'An unexpected error occurred. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderTypeSpecificFields = () => {
    if (!formData.type) return null;

    switch (formData.type) {
      case INDEX_TYPES.SFTP:
        return (
          <IndexTypeSFTP
            setValue={setValue}
            errors={errors}
            formData={formData}
            onChange={handleFormDataChange}
          />
        );
      
      case INDEX_TYPES.GIT:
        return (
          <div className="git-config">
            <h3>Git Repository Configuration</h3>
            <Input
              label="Repository URL"
              name="repositoryUrl"
              value={formData.repositoryUrl || ''}
              onChange={handleInputChange('repositoryUrl')}
              placeholder="https://github.com/owner/repo.git"
              required
            />
            <p style={{ fontSize: '0.875rem', color: '#666' }}>
              Git configuration is not fully implemented in this demo.
            </p>
          </div>
        );
      
      default:
        return (
          <div style={{ padding: '1rem', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
            <p>Configuration for {formData.type} is not implemented in this demo.</p>
            <p>This demo focuses on the SFTP data source implementation.</p>
          </div>
        );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit as any)} className="data-source-form">
      <h2>{initialData ? 'Edit' : 'Create'} Data Source</h2>
      
      <Input
        label="Data Source Name"
        name="name"
        value={formData.name}
        onChange={handleInputChange('name')}
        error={errors.name?.message}
        placeholder="Enter a descriptive name"
        required
      />

      <Autocomplete
        label="Data Source Type"
        name="type"
        value={formData.type}
        onChange={handleInputChange('type')}
        options={DATA_SOURCE_OPTIONS}
        error={errors.type?.message}
        required
      />

      {renderTypeSpecificFields()}

      {submitStatus.type && (
        <div className={submitStatus.type === 'success' ? 'success' : 'error'}>
          {submitStatus.message}
        </div>
      )}

      <div style={{ margin: '2rem 0 1rem', display: 'flex', gap: '1rem' }}>
        <Button
          type="submit"
          loading={isSubmitting}
          disabled={!formData.type}
        >
          {initialData ? 'Update' : 'Create'} Data Source
        </Button>
        
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};