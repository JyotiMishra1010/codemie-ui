# Implementation Plan: SFTP Data Source UI (Frontend)

## Overview
Implementation plan for SFTP data source UI components.

**Repository**: codemie-ui  
**Jira Ticket**: https://jiraeu.epam.com/browse/EPMCDMETST-37512

## Requirements from Transcript (June 2, 2025)
- Form fields: Hostname, Port (default 22), Username, Password, Directory Path, File Pattern
- Test Connection button with loading/success/error states
- Integration with existing form patterns (Git/Confluence)
- Scheduler configuration UI
- Form validation (required fields, port range 1-65535)

## Components to Implement
1. **IndexTypeSftp Component** - SFTP form fields, validation
2. **useTestConnection Hook** - Connection testing logic
3. **Integration** - Wire into DataSourceForm, constants, types
4. **Unit Tests** - Component and hook tests (>80% coverage)

## UI Form Fields
- Hostname (text, required)
- Port (number, default: 22, range: 1-65535)
- Username (text, required)
- Password (password, required, masked)
- Directory Path (text, required, example: /data/exports)
- File Pattern (text, optional, default: *, example: *.csv)

## Test Connection Flow
1. User fills in SFTP credentials
2. Clicks "Test Connection" button
3. Loading state: Shows spinner + "Testing..."
4. Success: Checkmark + "Connection successful! Found X files."
5. Error: X icon + error message (e.g., "Authentication failed")

## Implementation Phases

### Phase 1: IndexTypeSftp Component
- Create form fields with React Hook Form
- Add validation (required fields, port range)
- Add tooltips for complex fields
- Follow existing datasource form patterns

### Phase 2: useTestConnection Hook
- Manage connection test state (idle/testing/success/error)
- Call POST /v1/index/test-connection API
- Handle errors and display messages

### Phase 3: Integration
- Add SFTP to INDEX_TYPES constant
- Add SftpConfig type definition
- Wire IndexTypeSftp into DataSourceForm
- Add scheduler support for SFTP

### Phase 4: Testing
- Unit tests for IndexTypeSftp component
- Unit tests for useTestConnection hook
- Integration test: Create SFTP datasource end-to-end

## Timeline
- Phase 1: 2 days
- Phase 2: 1 day
- Phase 3: 1 day
- Phase 4: 2 days
- **Total**: ~1 week

## Dependencies
- Backend API endpoints (must be implemented first)
- Existing form components (Input, FormAutocomplete)
- IntegrationSection component