
export enum UserRole {
  Warga = 'Warga',
  Ahli = 'Ahli',
  Pemerintah = 'Pemerintah',
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
}

export interface LawDocument {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  status: string;
  coreArticles: { article: string; content: string }[];
}

export interface MultidisciplinaryAnalysis {
  discipline: string;
  icon: string; // SVG path or component name
  summary: string;
  fullAnalysis: string;
}

export interface BlockchainNode {
  id: string;
  date: string;
  actor: string;
  summary: string;
  hash: string;
  changes: {
    article: string;
    before: string;
    after: string;
    reason: string;
  };
}

export interface ForumComment {
  id: string;
  author: User;
  content: string;
  timestamp: string;
  upvotes: number;
  linkedArticle?: string;
  replies: ForumComment[];
}

export enum ForumSortOption {
  Relevant = 'Paling Relevan',
  Newest = 'Terbaru',
  Expert = 'Komentar Ahli',
}

export interface ChatMessage {
    sender: 'user' | 'ai';
    text: string;
    options?: ('externalAI' | 'googleSearch')[];
}

// State Management Types
export interface DocumentState {
  activeTab: 'pasal' | 'analisis' | 'blockchain' | 'forum';
  analysisScrollPos: number;
  lastViewedBlockchainNode: string | null;
  forumSortOption: ForumSortOption;
  forumCommentDraft: string;
  chatHistory: ChatMessage[];
  chatInput: string;
}

export type View = 'home' | 'pustaka' | 'documentDetail';

export interface ViewState {
  view: View;
  params: any;
  pustakaScrollPos?: number;
  pustakaSearchQuery?: string;
}

export interface AppState {
  history: ViewState[];
  documents: Record<string, DocumentState>;
  currentUser: User | null;
  showLogin: boolean;
}
