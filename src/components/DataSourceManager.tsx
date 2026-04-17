import React, { useState, useEffect } from 'react';
import { DataSourceForm } from './DataSourceForm';
import { DataSourceFormData } from '../types';
import { getDataSources } from '../services/api';
import { Button } from './shared';

interface DataSource extends DataSourceFormData {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const DataSourceManager: React.FC = () => {
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingDataSource, setEditingDataSource] = useState<DataSource | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDataSources();
  }, []);

  const loadDataSources = async () => {
    setIsLoading(true);
    try {
      const result = await getDataSources();
      if (result.success && result.data) {
        setDataSources(result.data);
      }
    } catch (error) {
      console.error('Failed to load data sources:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateSuccess = (data: DataSourceFormData) => {
    setDataSources(prev => [...prev, { ...data, id: 'ds_' + Date.now() }]);
    setShowCreateForm(false);
  };

  const handleEditSuccess = (data: DataSourceFormData) => {
    setDataSources(prev => 
      prev.map(ds => 
        ds.id === editingDataSource?.id 
          ? { ...ds, ...data, updatedAt: new Date().toISOString() }
          : ds
      )
    );
    setEditingDataSource(null);
  };

  const handleEdit = (dataSource: DataSource) => {
    setEditingDataSource(dataSource);
    setShowCreateForm(false);
  };

  const handleCancelEdit = () => {
    setEditingDataSource(null);
  };

  const handleCancelCreate = () => {
    setShowCreateForm(false);
  };

  const getTypeDisplayName = (type: string) => {
    const typeNames: Record<string, string> = {
      git: 'Git Repository',
      file: 'File System',
      confluence: 'Confluence',
      sftp: 'SFTP Server'
    };
    return typeNames[type] || type;
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <p>Loading data sources...</p>
      </div>
    );
  }

  if (editingDataSource) {
    return (
      <DataSourceForm
        initialData={editingDataSource}
        onSuccess={handleEditSuccess}
        onCancel={handleCancelEdit}
      />
    );
  }

  if (showCreateForm) {
    return (
      <DataSourceForm
        onSuccess={handleCreateSuccess}
        onCancel={handleCancelCreate}
      />
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '2rem' 
      }}>
        <h2>Data Sources</h2>
        <Button onClick={() => setShowCreateForm(true)}>
          Create New Data Source
        </Button>
      </div>

      {dataSources.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem', 
          background: '#f8f9fa', 
          borderRadius: '8px',
          color: '#6c757d'
        }}>
          <h3>No Data Sources Configured</h3>
          <p>Get started by creating your first data source for indexing content.</p>
          <Button onClick={() => setShowCreateForm(true)}>
            Create Data Source
          </Button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {dataSources.map((dataSource, index) => (
            <div
              key={dataSource.id || index}
              style={{
                border: '1px solid #e1e5e9',
                borderRadius: '8px',
                padding: '1.5rem',
                background: '#fff'
              }}
            >
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start',
                marginBottom: '1rem'
              }}>
                <div>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: '#2c3e50' }}>
                    {dataSource.name}
                  </h3>
                  <div style={{ 
                    display: 'inline-block',
                    background: '#e3f2fd',
                    color: '#1565c0',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '12px',
                    fontSize: '0.875rem',
                    fontWeight: 500
                  }}>
                    {getTypeDisplayName(dataSource.type)}
                  </div>
                </div>
                <Button
                  variant="secondary"
                  onClick={() => handleEdit(dataSource)}
                >
                  Edit
                </Button>
              </div>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                fontSize: '0.875rem',
                color: '#6c757d'
              }}>
                {dataSource.type === 'sftp' && (
                  <>
                    <div>
                      <strong>Hostname:</strong> {dataSource.hostname || 'Not configured'}
                    </div>
                    <div>
                      <strong>Directory:</strong> {dataSource.directoryPath || 'Not configured'}
                    </div>
                    <div>
                      <strong>File Pattern:</strong> {dataSource.filePattern || '*.csv'}
                    </div>
                  </>
                )}
                <div>
                  <strong>Schedule:</strong> {dataSource.schedule || 'Not configured'}
                </div>
                {dataSource.createdAt && (
                  <div>
                    <strong>Created:</strong> {new Date(dataSource.createdAt).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{
        marginTop: '3rem',
        padding: '1.5rem',
        background: '#f8f9fa',
        borderRadius: '8px',
        fontSize: '0.875rem'
      }}>
        <h4 style={{ margin: '0 0 1rem 0', color: '#495057' }}>Getting Started with SFTP Data Sources</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <div>
            <strong>✓ Step 1:</strong> Click "Create New Data Source" above
          </div>
          <div>
            <strong>✓ Step 2:</strong> Select "SFTP Server" as the type
          </div>
          <div>
            <strong>✓ Step 3:</strong> Configure your SFTP connection details
          </div>
          <div>
            <strong>✓ Step 4:</strong> Test the connection and save
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataSourceManager;