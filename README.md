# CodeMie UI - SFTP Data Source Implementation

A React TypeScript application implementing SFTP data source configuration for the CodeMie platform. This project enables administrators to configure SFTP server connections for indexing CSV files from legacy systems.

## 🚀 Features

### ✅ Implemented SFTP Data Source
- **SFTP Configuration Form**: Complete configuration interface with hostname, port, username, password, directory path, and file pattern settings
- **Connection Testing**: Built-in SFTP connection test functionality with real-time feedback
- **Validation**: Form validation for all required fields and formats
- **Scheduler Integration**: Support for configurable sync schedules (every 15 minutes, hourly, daily, weekly)
- **Security**: Password masking in UI for security

### 🎯 Key Components
- **`IndexTypeSFTP.tsx`**: Complete SFTP configuration form component
- **`DataSourceForm.tsx`**: Main form component with data source type selection
- **`DataSourceManager.tsx`**: Data source management interface
- **Shared Components**: Reusable Input, Autocomplete, Button, and CronScheduleInput components
- **API Services**: Mock SFTP testing and data source CRUD operations
- **Type Definitions**: Complete TypeScript interfaces for SFTP configuration

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Hook Form** for form management
- **Yup** validation schemas (configured but simplified for demo)
- **CSS3** with custom styling

## 📋 Implementation Status

### ✅ Completed (Phase 2)
- [x] SFTP added to data source types
- [x] Complete SFTP configuration form component
- [x] Form validation and error handling
- [x] Test connection functionality  
- [x] Integration with DataSourceForm
- [x] Mock API services for SFTP operations
- [x] Responsive UI with professional styling
- [x] Configuration notes and help text

### 🔄 Demo Features
- **Connection Testing**: Try different hostnames to see various responses:
  - `demo.sftp.com` - Successful connection with file count
  - `invalid.host` - Hostname resolution error
  - `baduser` (username) - Authentication failure
  - Any other values - Random success with file count

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation & Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Server
The application will be available at `http://localhost:5173/`

## 🗂️ Project Structure

```
src/
├── components/
│   ├── shared/          # Reusable UI components
│   │   ├── Input.tsx
│   │   ├── Autocomplete.tsx
│   │   ├── Button.tsx
│   │   ├── CronScheduleInput.tsx
│   │   └── TooltipButton.tsx
│   ├── DataSourceForm.tsx     # Main form component
│   ├── DataSourceManager.tsx  # Management interface
│   └── IndexTypeSFTP.tsx      # SFTP configuration form
├── services/
│   └── api.ts           # API service layer (mock)
├── types/
│   └── index.ts         # TypeScript type definitions
├── validation/
│   └── schemas.ts       # Yup validation schemas
├── App.tsx              # Main application component
└── main.tsx            # Application entry point
```

## 🎨 User Experience

### Data Source Creation Workflow
1. **Overview**: Main dashboard showing existing data sources
2. **Type Selection**: Choose from Git, File System, Confluence, or SFTP Server
3. **SFTP Configuration**: Complete form with all necessary connection details
4. **Connection Test**: Verify connectivity before saving
5. **Schedule Setup**: Configure automatic sync intervals
6. **Save & Manage**: Create and manage multiple data sources

### Validation & Error Handling
- Real-time form validation
- Comprehensive error messages
- Connection test feedback
- Required field indicators
- Format validation (hostname, port ranges)

## 🔧 Configuration Options

### SFTP Settings
- **Hostname**: Server address (domain or IP)
- **Port**: Connection port (default: 22)
- **Username**: SFTP account username  
- **Password**: Secure password input
- **Directory Path**: Path to CSV files (must start with /)
- **File Pattern**: File matching pattern (supports wildcards)

### Scheduling Options
- Every 15 minutes (default)
- Every hour
- Daily at midnight
- Weekly (Mondays)

## 🚀 Production Deployment

### Build Process
```bash
npm run build
```

### Environment Setup
For production deployment, configure:
- Backend API endpoints for SFTP operations
- Authentication and authorization
- File upload and processing services
- Database connections for configuration storage

## 🔮 Future Enhancements (Phase 3)

### Testing & Quality Assurance
- [ ] Unit tests for all components
- [ ] Integration tests for form workflows
- [ ] End-to-end testing with real SFTP servers
- [ ] Performance testing and optimization

### Additional Features
- [ ] SFTP key-based authentication
- [ ] File preview capabilities
- [ ] Advanced scheduling options (custom cron expressions)
- [ ] Batch configuration import/export
- [ ] Connection pooling and optimization
- [ ] Real-time sync status monitoring

### Backend Integration
- [ ] Replace mock APIs with real backend services
- [ ] Implement actual SFTP connectivity
- [ ] Add CSV parsing and indexing pipeline
- [ ] Integrate with search and AI services

## 📌 Notes

- This implementation focuses on the UI/frontend components
- Backend SFTP connectivity requires separate implementation
- CSV file processing and indexing logic not included
- Authentication and authorization layers need backend integration
- Production deployment requires proper security configurations

## 🤝 Architecture Decisions

### Component Approach
- **Modular Design**: Separate components for different data source types
- **Reusable UI**: Shared component library for consistency
- **Type Safety**: Full TypeScript integration for reliability
- **Form Management**: React Hook Form for efficient form handling

### Security Considerations
- Password fields properly masked
- Form validation prevents invalid configurations  
- API service layer ready for authentication integration
- No sensitive data stored in client-side state

### Performance Features
- Lazy loading ready for additional data source types
- Efficient re-rendering with React Hook Form
- Optimized build output with Vite
- CSS optimization and minification

---

## 🎯 Demo Usage

1. **Start the application**: `npm run dev`
2. **Access at**: `http://localhost:5173/`
3. **Create New Data Source**: Click the button on the main page
4. **Select SFTP Server**: Choose from the dropdown
5. **Configure Connection**: Fill in the SFTP details
6. **Test Connection**: Use the test button to verify settings
7. **Save**: Create the data source configuration

**Try the demo hostnames** mentioned above to see different connection test responses!