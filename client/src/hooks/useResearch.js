import { useContext } from 'react';
import { ResearchContext } from '../context/ResearchContext.jsx';

/**
 * Hook to consume the Research Context.
 * Provides access to research triggering and results state.
 */
export function useResearch() {
  const context = useContext(ResearchContext);
  if (!context) {
    throw new Error('useResearch must be used within a ResearchProvider');
  }
  return context;
}
