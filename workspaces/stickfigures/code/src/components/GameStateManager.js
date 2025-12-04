import { useEffect } from 'react';

// ENB-945678: Game State Manager
// Tracks current game state and manages state transitions
const GameStateManager = ({ currentState, playerState }) => {
  useEffect(() => {
    // Log state transitions for debugging
    console.log(`Game state changed to: ${currentState}`);
    
    // Validate state transitions
    const validStates = ['menu', 'player_selection', 'character_creation', 'playing', 'game_over'];
    if (!validStates.includes(currentState)) {
      console.warn(`Invalid game state: ${currentState}`);
    }
  }, [currentState]);

  useEffect(() => {
    // Monitor player state changes
    console.log('Player state updated:', playerState);
  }, [playerState]);

  // This component doesn't render anything - it's for state management only
  return null;
};

export default GameStateManager;