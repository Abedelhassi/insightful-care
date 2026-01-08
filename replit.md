# CareWatch - AI Health Platform

## Overview

CareWatch is an AI-powered healthcare platform designed for addiction monitoring and patient care management. The application provides healthcare professionals with tools to monitor patient behavior through video analysis, track treatment progress, manage alerts, and generate reports. The platform features a dashboard-centric design with patient management, real-time monitoring alerts, and AI-assisted behavioral analysis capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, built using Vite for fast development and optimized production builds
- **Routing**: React Router DOM for client-side navigation with protected and public routes
- **State Management**: React Query (TanStack Query) for server state management, React Context for global app state (theme, language)
- **UI Component Library**: shadcn/ui components built on Radix UI primitives, providing accessible and customizable components
- **Styling**: Tailwind CSS with custom medical-themed design tokens (blues, greens, reds for status indicators), CSS variables for theming support

### Design Patterns
- **Component Structure**: Follows a feature-based organization with shared UI components in `src/components/ui/`, layout components in `src/components/layout/`, and feature-specific components in `src/components/dashboard/`
- **Page Components**: Located in `src/pages/`, each representing a distinct route in the application
- **Custom Hooks**: Reusable logic extracted into `src/hooks/` (mobile detection, toast notifications)
- **Context Providers**: Theme and language contexts wrap the application for global state access

### Key Features
- **Multi-language Support**: Internationalization with English, French, and Arabic translations, including RTL layout support
- **Dark/Light Theme**: Theme toggle with localStorage persistence
- **Patient Workflow**: Two-step patient creation process - basic info entry followed by video/report analysis
- **Mock Data Layer**: Analysis data is simulated in `src/lib/mockAnalysisData.ts` for demonstration purposes

### Data Flow
Currently, the application uses:
- localStorage for temporary patient data persistence during the creation workflow
- Mock data generators for AI analysis results (behavior logs, medical results, relapse risk scores)
- No backend database is currently integrated - the application is frontend-only

## External Dependencies

### UI Framework Dependencies
- **Radix UI**: Full suite of accessible, unstyled components (dialogs, dropdowns, tabs, accordions, etc.)
- **Lucide React**: Icon library used throughout the application
- **class-variance-authority**: For creating variant-based component styles
- **tailwind-merge/clsx**: Utility functions for conditional class name handling

### Form and Data Handling
- **react-hook-form**: Form state management with `@hookform/resolvers` for validation
- **date-fns**: Date manipulation and formatting
- **react-day-picker**: Calendar/date picker component

### Additional UI Libraries
- **embla-carousel-react**: Carousel/slider functionality
- **cmdk**: Command palette component
- **vaul**: Drawer component
- **recharts**: Charting library (via chart component)
- **sonner**: Toast notification system
- **next-themes**: Theme management utilities

### Build Tools
- **Vite**: Build tool and dev server configured for React SWC
- **TypeScript**: Type checking with relaxed strictness settings
- **ESLint**: Code linting with React hooks and refresh plugins
- **PostCSS/Autoprefixer**: CSS processing for Tailwind

### External Services (Planned/Referenced)
- **Telegram**: Referenced in alert notifications (UI mentions "via Telegram" for real-time alerts)
- **AI Video Analysis**: The UI suggests AI-powered behavioral analysis from uploaded videos (currently mocked)

### Notes for Future Development
- No backend or database is currently implemented - patient data uses localStorage temporarily
- API integration points exist in the UI workflow but connect to mock data
- The application is prepared for real AI integration with video upload and analysis UI components