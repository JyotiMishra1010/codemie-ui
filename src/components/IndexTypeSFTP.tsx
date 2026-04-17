import React, { useState } from 'react';
import { UseFormSetValue, FieldErrors } from 'react-hook-form';
import { Input, CronScheduleInput, Button } from './shared';
import { DataSourceFormData, SftpConfig } from '../types';
import { testSftpConnection } from '../services/api';

interface IndexTypeSFTPProps {
  setValue: UseFormSetValue<DataSourceFormData>;
  errors: FieldErrors<DataSourceFormData>;
  formData: DataSourceFormData;
  onChange: (data: Partial<DataSourceFormData>) => void;
}

export const IndexTypeSFTP: React.FC<IndexTypeSFTPProps> = ({
  setValue,
  errors,
  formData,
  onChange
}) => {
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleInputChange = (field: keyof DataSourceFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value = field === 'port' ? parseInt(e.target.value) || 22 : e.target.value;
    setValue(field as any, value);
    onChange({ [field]: value });
  };

  const handleTestConnection = async () => {
    setIsTestingConnection(true);
    setConnectionStatus({ type: null, message: '' });

    try {
      const sftpConfig: SftpConfig = {
        hostname: formData.hostname || '',
        port: formData.port || 22,
        username: formData.username || '',
        password: formData.password || '',
        directoryPath: formData.directoryPath || '',
        filePattern: formData.filePattern || '*.csv'
      };

      const result = await testSftpConnection(sftpConfig);
      
      if (result.success) {
        setConnectionStatus({
          type: 'success',
          message: 'Connection successful! Found ' + (result.fileCount || 0) + ' matching files.'
        });
      } else {
        setConnectionStatus({
          type: 'error',
          message: result.error || 'Connection test failed'
        });
      }
    } catch (error) {
      setConnectionStatus({
        type: 'error',
        message: 'Failed to test connection. Please check your settings.'
      });
    } finally {
      setIsTestingConnection(false);
    }
  };

  return (
    <div className="sftp-config">
      <h3>SFTP Server Configuration</h3>
      
      <Input
        label="Hostname"
        name="hostname"
        value={formData.hostname || ''}
        onChange={handleInputChange('hostname')}
        error={errors.hostname?.message}
        placeholder="sftp.example.com or 192.168.1.100"
        required
      />

      <Input
        label="Port"
        name="port"
        type="number"
        value={formData.port?.toString() || '22'}
        onChange={handleInputChange('port')}
        error={errors.port?.message}
        placeholder="22"
        required
      />

      <Input
        label="Username"
        name="username"
        value={formData.username || ''}
        onChange={handleInputChange('username')}
        error={errors.username?.message}
        placeholder="Enter username"
        required
      />

      <Input
        label="Password"
        name="password"
        type="password"
        value={formData.password || ''}
        onChange={handleInputChange('password')}
        error={errors.password?.message}
        placeholder="Enter password"
        required
      />

      <Input
        label="Directory Path"
        name="directoryPath"
        value={formData.directoryPath || ''}
        onChange={handleInputChange('directoryPath')}
        error={errors.directoryPath?.message}
        placeholder="/path/to/csv/files"
        required
      />

      <Input
        label="File Pattern"
        name="filePattern"
        value={formData.filePattern || '*.csv'}
        onChange={handleInputChange('filePattern')}
        error={errors.filePattern?.message}
        placeholder="*.csv"
        required
      />

      <CronScheduleInput
        label="Sync Schedule"
        name="schedule"
        value={formData.schedule || ''}
        onChange={handleInputChange('schedule')}
        error={errors.schedule?.message}
      />

      <div style={{ margin: '1rem 0' }}>
        <Button
          onClick={handleTestConnection}
          loading={isTestingConnection}
          disabled={!formData.hostname || !formData.username || !formData.password}
          variant="secondary"
        >
          Test Connection
        </Button>
      </div>

      {connectionStatus.type && (
        <div className={connectionStatus.type === 'success' ? 'success' : 'error'}>
          {connectionStatus.message}
        </div>
      )}

      <div style={{ 
        background: '#f5f5f5', 
        padding: '1rem', 
        borderRadius: '4px', 
        marginTop: '1rem',
        fontSize: '0.875rem'
      }}>
        <h4>Configuration Notes:</h4>
        <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
          <li>Only CSV files are supported for indexing</li>
          <li>The sync will run according to the selected schedule</li>
          <li>Ensure the SFTP user has read access to the specified directory</li>
          <li>File pattern supports wildcards (e.g., *.csv, data_*.csv)</li>
        </ul>
      </div>
    </div>
  );
};