// Data source types
export const INDEX_TYPES = {
  GIT: 'git',
  FILE: 'file', 
  CONFLUENCE: 'confluence',
  SFTP: 'sftp'
} as const;

export type IndexType = typeof INDEX_TYPES[keyof typeof INDEX_TYPES];

export interface DataSourceFormData {
  type: IndexType;
  name: string;
  // Common fields
  schedule?: string;
  
  // SFTP specific fields
  hostname?: string;
  port?: number;
  username?: string;
  password?: string;
  directoryPath?: string;
  filePattern?: string;
  
  // Other data source fields can be added here
  [key: string]: any;
}

export interface SftpConfig {
  hostname: string;
  port: number;
  username: string;
  password: string;
  directoryPath: string;
  filePattern: string;
}