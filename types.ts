export type Language = 'pt' | 'en';

export interface StudyItem {
  id: number | string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl?: string; 
  category: string;
  duration: string;
  progress: number;
  isNew?: boolean;
  type: 'video' | 'pdf' | 'link' | 'custom';
  subject?: 'tech' | 'math' | 'physics' | 'chemistry' | 'english' | 'general';
  playlistId?: string; // Support for modules/playlists
}

export interface Playlist {
    id: string;
    title: string;
    cover: string;
    items: (string | number)[]; // IDs of StudyItems
}

export interface Task {
  id: number;
  title: string;
  subject: string;
  status: 'todo' | 'doing' | 'done';
  priority: 'High' | 'Medium' | 'Low';
}

export interface DBQueryLog {
  id: number;
  command: string;
  timestamp: string;
  status: 'success' | 'error';
}

export interface Flashcard {
  id: number;
  question: string;
  answer: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface MemoryCard {
    id: number;
    front: string;
    back: string;
    nextReview: number; 
    interval: number;
    type: 'text' | 'code';
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; 
  explanation: string;
}

export type CodeLanguage = 'python' | 'java' | 'cpp' | 'csharp' | 'javascript' | 'html' | 'sql' | 'web';

export interface CodeChallenge {
    id: number;
    title: string;
    description: string;
    starterCode: string;
    language: CodeLanguage;
    difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface UserProfile {
    name: string;
    avatar: string;
    streak: number;
    xp: number;
    level: number;
    bio: string;
    trophies: string[];
}

export interface MindNode {
    id: number;
    x: number;
    y: number;
    label: string;
    color: string;
    connections: number[];
}

export interface ChatMessage {
    id: number;
    sender: 'user' | 'ai';
    text: string;
    timestamp: Date;
}