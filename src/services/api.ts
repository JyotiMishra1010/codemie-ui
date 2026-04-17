import { SftpConfig, DataSourceFormData } from '../types';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface SftpTestResult {
  success: boolean;
  fileCount?: number;
  error?: string;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const testSftpConnection = async (config: SftpConfig): Promise<SftpTestResult> => {
  await delay(2000);
  
  if (!config.hostname || !config.username || !config.password) {
    return {
      success: false,
      error: 'Missing required connection parameters'
    };
  }
  
  if (config.hostname === 'demo.sftp.com') {
    return {
      success: true,
      fileCount: 15
    };
  }
  
  if (config.hostname === 'invalid.host') {
    return {
      success: false,
      error: 'Could not resolve hostname'
    };
  }
  
  if (config.username === 'baduser') {
    return {
      success: false,
      error: 'Authentication failed'
    };
  }
  
  return {
    success: true,
    fileCount: Math.floor(Math.random() * 50) + 1
  };
};

export const createDataSource = async (data: DataSourceFormData): Promise<ApiResponse> => {
  await delay(1500);
  
  return {
    success: true,
    data: {
      id: 'ds_' + Date.now(),
      ...data,
      createdAt: new Date().toISOString()
    }
  };
};

export const updateDataSource = async (id: string, data: DataSourceFormData): Promise<ApiResponse> => {
  await delay(1500);
  
  return {
    success: true,
    data: {
      id,
      ...data,
      updatedAt: new Date().toISOString()
    }
  };
};

export const getDataSources = async (): Promise<ApiResponse<DataSourceFormData[]>> => {
  await delay(1000);
  
  return {
    success: true,
    data: [
      {
        type: 'git',
        name: 'Main Repository',
        schedule: '0 * * * *'
      },
      {
        type: 'file',
        name: 'Local Documents',
        schedule: '0 0 * * *'
      }
    ] as DataSourceFormData[]
  };
};