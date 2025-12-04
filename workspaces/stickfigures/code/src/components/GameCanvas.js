import React, { useRef, useEffect } from 'react';

function GameCanvas({ playerState, onHealthUpdate, gameState }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const { player1, player2, gameData } = playerState;

    // Clear canvas
    ctx.fillStyle = '#2d3436';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw ground
    ctx.fillStyle = '#636e72';
    ctx.fillRect(0, 400, canvas.width, 100);

    // Draw stick figures
    const drawStickFigure = (x, y, color, facing = 'right') => {
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = 3;

      // Head
      ctx.beginPath();
      ctx.arc(x, y - 50, 15, 0, Math.PI * 2);
      ctx.fill();

      // Body
      ctx.beginPath();
      ctx.moveTo(x, y - 35);
      ctx.lineTo(x, y + 15);
      ctx.stroke();

      // Arms
      const armDirection = facing === 'right' ? 1 : -1;
      ctx.beginPath();
      ctx.moveTo(x, y - 20);
      ctx.lineTo(x - 25, y);
      ctx.moveTo(x, y - 20);
      ctx.lineTo(x + 25 * armDirection, y - 30); // Fighting stance
      ctx.stroke();

      // Legs
      ctx.beginPath();
      ctx.moveTo(x, y + 15);
      ctx.lineTo(x - 20, y + 50);
      ctx.moveTo(x, y + 15);
      ctx.lineTo(x + 20, y + 50);
      ctx.stroke();
    };

    // Draw Player 1
    if (player1) {
      drawStickFigure(
        gameData.player1Position.x,
        gameData.player1Position.y,
        player1.color,
        'right'
      );
    }

    // Draw Player 2
    if (player2) {
      drawStickFigure(
        gameData.player2Position.x,
        gameData.player2Position.y,
        player2.color,
        'left'
      );
    }

  }, [playerState]);

  return (
    <div className="text-center mb-3">
      {/* Health Bars */}
      <div className="row mb-3">
        <div className="col-6">
          <div className="text-white mb-1">
            {playerState.player1?.name || 'Player 1'}: {playerState.gameData.player1Health}%
          </div>
          <div className="progress" style={{ height: '25px' }}>
            <div
              className="progress-bar bg-danger"
              style={{ width: `${playerState.gameData.player1Health}%` }}
            />
          </div>
        </div>
        <div className="col-6">
          <div className="text-white mb-1">
            {playerState.player2?.name || 'Player 2'}: {playerState.gameData.player2Health}%
          </div>
          <div className="progress" style={{ height: '25px' }}>
            <div
              className="progress-bar bg-info"
              style={{ width: `${playerState.gameData.player2Health}%` }}
            />
          </div>
        </div>
      </div>

      {/* Game Canvas */}
      <canvas
        ref={canvasRef}
        width={800}
        height={500}
        className="border border-secondary rounded"
        style={{ maxWidth: '100%' }}
      />
    </div>
  );
}

export default GameCanvas;
