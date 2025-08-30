# Sanrio Character Rankings - Project Overview

## Project Purpose

Interactive React TypeScript application for visualizing Sanrio character ranking trends over time with comprehensive dual theme system (Light/Dark mode).

## Key Features

### Core Functionality
- **Interactive Chart Visualization**: Chart.js powered ranking displays
- **Multi-Character Comparison**: Select and compare multiple characters
- **Time-Based Filtering**: Filter rankings by year ranges
- **Character Detail Views**: Comprehensive character information display
- **Dual Theme System**: Seamless light/dark mode switching with system preference detection

### Technical Features
- **Real-time Theme Switching**: CSS custom properties with smooth transitions
- **Responsive Design**: Mobile-first approach with desktop optimization
- **Data Caching**: Efficient static caching in service layer
- **Type Safety**: Comprehensive TypeScript implementation with strict mode
- **Japanese Language Support**: Full Unicode support for character names and descriptions

## Target Users

- Sanrio character enthusiasts
- Data visualization enthusiasts  
- Users interested in character popularity trends
- Both Japanese and English speaking users

## Business Domain

### Data Model
- **Characters**: Sanrio characters with metadata (name, debut year, representative colors)
- **Rankings**: Time-series ranking data with optional vote counts
- **Trends**: Historical popularity analysis across years

### Key Entities
- Character profiles with Japanese/English names
- Annual ranking positions
- Visual themes and color schemes
- Interactive chart configurations

## Application Workflow

### Primary User Journey
1. **Data Loading**: App loads character and ranking data
2. **Character Selection**: User selects characters to compare
3. **Visualization**: Chart displays ranking trends over time
4. **Filtering**: User applies year range or other filters
5. **Detail View**: User explores individual character information
6. **Theme Preference**: User switches between light/dark modes

### Data Flow
1. Service layer loads and caches data from JSON files
2. Custom hooks manage state and provide data to components
3. Components render UI with theme-aware styling
4. Chart.js renders interactive visualizations
5. Context system manages global state (theme, selections)

## Development Philosophy

### Architecture Principles
- **Separation of Concerns**: Clear boundaries between UI, logic, and data
- **Type Safety**: Comprehensive TypeScript with strict compilation
- **Performance First**: Caching, memoization, and optimized rendering
- **User Experience**: Smooth animations, responsive design, accessible UI

### Code Organization
- **Feature-Based Structure**: Components grouped by functionality
- **Custom Hooks Pattern**: Business logic extracted from UI components
- **Service Layer Pattern**: Data access abstracted from components
- **CSS Modules**: Scoped styling with theme system integration

## Success Metrics

### Technical Performance
- Fast initial load times with data caching
- Smooth theme transitions without flickering
- Responsive design across all device sizes
- TypeScript strict mode compliance

### User Experience
- Intuitive character selection and comparison
- Clear ranking trend visualization
- Accessible theme switching
- Proper Japanese text rendering

## Current Status

### Implemented Features
- Complete dual theme system
- Interactive character selection
- Chart.js integration for ranking visualization
- Responsive CSS Modules implementation
- TypeScript strict mode compliance
- Service layer with static caching

### Known Limitations
- No testing framework implemented
- Static JSON data (no API integration)
- No user authentication or personalization
- No data export functionality