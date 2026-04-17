# CodeMie UI - SFTP Data Source Implementation

This project implements SFTP data source functionality for the codemie-ui frontend application.

## Project Overview
- React 18 with TypeScript
- SFTP data source configuration for legacy system integration
- Uses react-hook-form with validation
- Follows established patterns from Git/File data sources

## Key Components
- SFTP configuration form
- Validation schemas  
- Data source integration
- Test connection functionality

## Development Guidelines
- Use existing component patterns (Input, Autocomplete, CronScheduleInput)
- Follow react-hook-form patterns established in codebase
- Maintain security considerations (masked passwords)
- Integrate with existing scheduler (15-minute intervals)

## Implementation Focus
The main goal is to add SFTP as a data source type that allows administrators to:
1. Configure SFTP server connections
2. Set up CSV file indexing from legacy systems
3. Enable AI-assisted semantic search on the data

## Acceptance Criteria
- SFTP data source type in dropdown
- Configuration form with hostname, port, username, password, directory path, file pattern
- Test connection functionality
- Scheduler integration (every 15 minutes option)
- Validation and error handling

## Usage
Run `npm run dev` to start the development server at http://localhost:5173