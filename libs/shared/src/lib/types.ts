// Shared types and interfaces for the YouTube Playlist Manager

export interface User {
  id: string;
  email: string;
  username: string;
  isActive: boolean;
  isAdmin: boolean;
  createdAt: Date;
  lastLoginAt?: Date;
}

export interface Video {
  id: string; // YouTube Video ID
  title: string;
  description?: string;
  thumbnail: string;
  duration: number; // in seconds
  channelTitle: string;
  publishedAt: Date;
}

export interface QueueItem {
  id: string;
  video: Video;
  addedBy: User;
  addedAt: Date;
  position: number;
  isPriority: boolean;
}

export interface Playlist {
  id: string;
  name: string;
  userId: string;
  videos: PlaylistVideo[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PlaylistVideo {
  id: string;
  playlistId: string;
  video: Video;
  position: number;
  addedAt: Date;
}

export interface PremiumAccount {
  id: string;
  googleAccountId: string;
  email: string;
  accessToken: string;
  refreshToken: string;
  isActive: boolean;
  createdAt: Date;
}

export interface PlayerState {
  currentVideo: Video | null;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  queue: QueueItem[];
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Authentication types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

// WebSocket Event types
export interface ClientToServerEvents {
  'queue:add': (data: AddToQueueData) => void;
  'queue:remove': (queueId: string) => void;
  'queue:reorder': (data: ReorderQueueData) => void;
  'player:play': () => void;
  'player:pause': () => void;
  'player:volume': (volume: number) => void;
  'player:next': () => void;
}

export interface ServerToClientEvents {
  'queue:updated': (queue: QueueItem[]) => void;
  'player:state': (state: PlayerState) => void;
  'player:video-changed': (video: Video) => void;
  'user:joined': (user: User) => void;
  'user:left': (userId: string) => void;
}

export interface AddToQueueData {
  videoId: string;
  isPriority?: boolean;
}

export interface ReorderQueueData {
  fromIndex: number;
  toIndex: number;
}