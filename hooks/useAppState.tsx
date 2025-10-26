
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AppState, ViewState, User, ForumSortOption, ChatMessage } from '../types';

type Action =
  | { type: 'NAVIGATE_TO'; payload: ViewState }
  | { type: 'GO_BACK' }
  | { type: 'SET_PUSTAKA_STATE'; payload: { scrollPos: number; searchQuery: string } }
  | { type: 'SET_DOC_TAB'; payload: { lawId: string; tab: 'pasal' | 'analisis' | 'blockchain' | 'forum' } }
  | { type: 'SET_DOC_CHAT_INPUT'; payload: { lawId: string; input: string } }
  | { type: 'ADD_DOC_CHAT_MESSAGE'; payload: { lawId: string; message: ChatMessage } }
  | { type: 'SET_DOC_FORUM_DRAFT'; payload: { lawId: string; draft: string } }
  | { type: 'CLEAR_DOC_FORUM_DRAFT'; payload: { lawId: string } }
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SHOW_LOGIN'; payload: boolean };


const initialState: AppState = {
  history: [{ view: 'home', params: {} }],
  documents: {},
  currentUser: null,
  showLogin: false,
};

const AppStateContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);


// Function to load state from localStorage
const loadState = (): AppState => {
    try {
        const serializedState = localStorage.getItem('lexaraAppState');
        if (serializedState === null) {
            return initialState;
        }
        const loadedState = JSON.parse(serializedState);
        // Ensure history always has a valid start point
        if (!loadedState.history || loadedState.history.length === 0) {
            loadedState.history = initialState.history;
        }
        return loadedState;
    } catch (err) {
        return initialState;
    }
};

const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'NAVIGATE_TO':
      return { ...state, history: [...state.history, action.payload] };
    case 'GO_BACK':
      if (state.history.length <= 1) return state;
      return { ...state, history: state.history.slice(0, -1) };
    case 'SET_PUSTAKA_STATE': {
      const newHistory = [...state.history];
      const lastView = newHistory[newHistory.length - 1];
      if (lastView.view === 'pustaka') {
        lastView.pustakaScrollPos = action.payload.scrollPos;
        lastView.pustakaSearchQuery = action.payload.searchQuery;
      }
      return { ...state, history: newHistory };
    }
    case 'SET_DOC_TAB': {
        const { lawId, tab } = action.payload;
        return {
            ...state,
            documents: {
                ...state.documents,
                [lawId]: { ...getDefaultDocState(), ...state.documents[lawId], activeTab: tab },
            },
        };
    }
    case 'SET_DOC_CHAT_INPUT': {
        const { lawId, input } = action.payload;
        return {
            ...state,
            documents: {
                ...state.documents,
                [lawId]: { ...getDefaultDocState(), ...state.documents[lawId], chatInput: input },
            },
        };
    }
    case 'ADD_DOC_CHAT_MESSAGE': {
        const { lawId, message } = action.payload;
        const currentDocState = state.documents[lawId] || getDefaultDocState();
        return {
            ...state,
            documents: {
                ...state.documents,
                [lawId]: { ...currentDocState, chatHistory: [...currentDocState.chatHistory, message] },
            },
        };
    }
    case 'SET_DOC_FORUM_DRAFT': {
        const { lawId, draft } = action.payload;
        return {
            ...state,
            documents: {
                ...state.documents,
                [lawId]: { ...getDefaultDocState(), ...state.documents[lawId], forumCommentDraft: draft },
            },
        };
    }
    case 'CLEAR_DOC_FORUM_DRAFT': {
        const { lawId } = action.payload;
        return {
            ...state,
            documents: {
                ...state.documents,
                [lawId]: { ...getDefaultDocState(), ...state.documents[lawId], forumCommentDraft: '' },
            },
        };
    }
    case 'LOGIN':
      return { ...state, currentUser: action.payload, showLogin: false };
    case 'LOGOUT':
      return { ...state, currentUser: null };
    case 'SHOW_LOGIN':
      return { ...state, showLogin: action.payload };
    default:
      return state;
  }
};

export const getDefaultDocState = () => ({
    activeTab: 'pasal' as const,
    analysisScrollPos: 0,
    lastViewedBlockchainNode: null,
    forumSortOption: ForumSortOption.Relevant,
    forumCommentDraft: '',
    chatHistory: [],
    chatInput: '',
});

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, undefined, loadState);

  // Effect to save state to localStorage
  useEffect(() => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('lexaraAppState', serializedState);
    } catch (err) {
        console.error("Could not save state", err);
    }
  }, [state]);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within a AppStateProvider');
  }
  return context;
};
