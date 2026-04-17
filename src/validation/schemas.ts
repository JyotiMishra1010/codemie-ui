import * as Yup from 'yup';

export const sftpValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Data source name is required')
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must not exceed 50 characters'),
  
  hostname: Yup.string()
    .required('Hostname is required')
    .matches(
      /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)*[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$|^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/i,
      'Please enter a valid hostname or IP address'
    ),
  
  port: Yup.number()
    .required('Port is required')
    .integer('Port must be a whole number')
    .min(1, 'Port must be between 1 and 65535')
    .max(65535, 'Port must be between 1 and 65535'),
  
  username: Yup.string()
    .required('Username is required')
    .min(1, 'Username cannot be empty'),
  
  password: Yup.string()
    .required('Password is required')
    .min(1, 'Password cannot be empty'),
  
  directoryPath: Yup.string()
    .required('Directory path is required')
    .matches(/^\/.*/, 'Directory path must start with /'),
  
  filePattern: Yup.string()
    .required('File pattern is required')
    .default('*.csv'),
  
  schedule: Yup.string()
    .required('Schedule is required')
});

export const generalDataSourceSchema = Yup.object().shape({
  type: Yup.string()
    .required('Data source type is required'),
  
  name: Yup.string()
    .required('Data source name is required')
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must not exceed 50 characters'),
});