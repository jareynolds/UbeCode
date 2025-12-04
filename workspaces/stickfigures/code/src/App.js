import React, { useState, useEffect, useCallback } from 'react';
import GameStateManager from './components/GameStateManager';
import PlayerSelection from './components/PlayerSelection';
import CharacterCreator from './components/CharacterCreator';
import GameCanvas from './components/GameCanvas';
import VictoryScreen from './components/VictoryScreen';
import GameControls from './components/GameControls';

// ENB-561234: Player State Manager
const initialPlayerState = {
  player1: null,
  player2: null,
  currentPlayer: 1,
  gameData: {
    player1Health: 100,
    player2Health: 100,
    player1Position: { x: 150, y: 350 },
    player2Position: { x: 650, y: 350 },
    lastAction: null
  }
};

function App() {
  // ENB-945678: Game State Manager
  const [gameState, setGameState] = useState('menu'); // menu, player_selection, character_creation, playing, game_over
  const [playerState, setPlayerState] = useState(initialPlayerState);
  const [winner, setWinner] = useState(null);
  const [currentCreatingPlayer, setCurrentCreatingPlayer] = useState(null);

  // ENB-894567: Game Initialization
  const initializeGame = useCallback(() => {
    setGameState('player_selection');
  }, []);

  // ENB-347892: Player Selection
  const handlePlayerSelection = useCallback((playerNumber) => {
    setCurrentCreatingPlayer(playerNumber);
    setGameState('character_creation');
  }, []);

  // ENB-458923: Character Creator
  const handleCharacterCreated = useCallback((characterData) => {
    setPlayerState(prev => ({
      ...prev,
      [`player${currentCreatingPlayer}`]: characterData
    }));

    // Check if both players have been created
    if (currentCreatingPlayer === 1) {
      // Move to player 2 creation
      setCurrentCreatingPlayer(2);
    } else {
      // Both players created, start game
      setGameState('playing');
    }
  }, [currentCreatingPlayer]);

  // ENB-156789: Victory Detection
  const checkVictoryCondition = useCallback(() => {
    const { player1Health, player2Health } = playerState.gameData;
    
    if (player1Health <= 0) {
      setWinner('Player 2');
      setGameState('game_over');
    } else if (player2Health <= 0) {
      setWinner('Player 1');
      setGameState('game_over');
    }
  }, [playerState.gameData]);

  // ENB-489012: Health Management
  const updatePlayerHealth = useCallback((playerNumber, damage) => {
    setPlayerState(prev => {
      const healthKey = `player${playerNumber}Health`;
      const newHealth = Math.max(0, Math.min(100, prev.gameData[healthKey] - damage));
      
      return {
        ...prev,
        gameData: {
          ...prev.gameData,
          [healthKey]: newHealth
        }
      };
    });
  }, []);

  // Check for victory after health updates
  useEffect(() => {
    if (gameState === 'playing') {
      checkVictoryCondition();
    }
  }, [playerState.gameData.player1Health, playerState.gameData.player2Health, gameState, checkVictoryCondition]);

  // Game reset functionality
  const resetGame = useCallback(() => {
    setPlayerState(initialPlayerState);
    setGameState('menu');
    setWinner(null);
    setCurrentCreatingPlayer(null);
  }, []);

  const renderCurrentView = () => {
    switch (gameState) {
      case 'menu':
        return (
          <div className="container-fluid game-container">
            <div className="text-center">
              <h1 className="display-3 game-title mb-4">🥊 Stick Figure Fight 🥊</h1>
              <p className="lead text-white mb-4">A thrilling 2-player fighting game!</p>
              <button 
                className="btn btn-primary btn-lg px-5 py-3"
                onClick={initializeGame}
              >
                Start Game
              </button>
            </div>
          </div>
        );

      case 'player_selection':
        return (
          <PlayerSelection 
            onPlayerSelect={handlePlayerSelection}
            gameState={gameState}
          />
        );

      case 'character_creation':
        return (
          <CharacterCreator 
            playerNumber={currentCreatingPlayer}
            onCharacterCreated={handleCharacterCreated}
            existingPlayers={playerState}
          />
        );

      case 'playing':
        return (
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-12">
                <GameCanvas 
                  playerState={playerState}
                  onHealthUpdate={updatePlayerHealth}
                  gameState={gameState}
                />
                <GameControls />
              </div>
            </div>
          </div>
        );

      case 'game_over':
        return (
          <>
            <div className="container-fluid">
              <GameCanvas 
                playerState={playerState}
                onHealthUpdate={updatePlayerHealth}
                gameState={gameState}
              />
            </div>
            <VictoryScreen 
              winner={winner}
              onRestart={resetGame}
            />
          </>
        );

      default:
        return <div>Loading...</div>;
    }
  };

  return (
    <div className="App">
      <GameStateManager 
        currentState={gameState} 
        playerState={playerState} 
      />
      {renderCurrentView()}
    </div>
  );
}

export default App;