# YouTube Playlist Manager

A collaborative YouTube video streaming platform built with NX monorepo, Angular, and NestJS.

## Project Structure

This is an NX monorepo containing:

- **Client App** (`apps/client`): Main user-facing Angular application
- **Admin App** (`apps/admin`): Administrative interface for managing users and premium accounts
- **API** (`apps/api`): NestJS backend API with WebSocket support
- **Shared Libraries** (`libs/shared`): Common types and utilities

## Technology Stack

- **Frontend**: Angular 20.1.0, TailwindCSS
- **Backend**: NestJS, Prisma ORM, Socket.io
- **Database**: PostgreSQL
- **Monorepo**: NX Workspace
- **Real-time**: WebSocket (Socket.io)
- **External APIs**: YouTube Data API v3, Google OAuth

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- YouTube Data API key
- Google OAuth credentials (for premium accounts)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Set up the database:
```bash
npm run prisma:migrate
npm run prisma:generate
```

### Development

Run all applications in development mode:

```bash
# Start the API server
npm run start:api

# Start the client app
npm run start:client

# Start the admin app
npm run start:admin
```

Individual commands:
- Client app: `http://localhost:4200`
- Admin app: `http://localhost:4201`
- API server: `http://localhost:3000`

### Build

```bash
# Build all applications
npm run build

# Build individual apps
npm run build:client
npm run build:admin
npm run build:api
```

## Features

- **User Authentication**: JWT-based authentication system
- **YouTube Integration**: Search and play YouTube videos
- **Shared Queue**: Real-time collaborative video queue
- **Personal Playlists**: Create and manage personal video collections
- **Premium Playback**: Ad-free playback through admin-managed premium accounts
- **Real-time Sync**: WebSocket-based real-time updates
- **Admin Panel**: User management and premium account configuration

## Database Schema

The application uses Prisma ORM with PostgreSQL. Key entities:
- Users (authentication and profiles)
- Videos (YouTube video metadata)
- Queue Items (shared playback queue)
- Playlists (personal video collections)
- Premium Accounts (Google OAuth for ad-free playback)

## API Documentation

Once the API is running, visit `http://localhost:3000/api` for Swagger documentation.

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests: `npm run test`
4. Run linting: `npm run lint`
5. Submit a pull request

## Environment Variables

Required environment variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/youtube_playlist_manager"

# JWT
JWT_SECRET="your-jwt-secret"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_SECRET="your-refresh-secret"
JWT_REFRESH_EXPIRES_IN="7d"

# YouTube API
YOUTUBE_API_KEY="your-youtube-api-key"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GOOGLE_REDIRECT_URI="http://localhost:3000/auth/google/callback"

# Application
PORT=3000
NODE_ENV="development"
```

## License

MIT