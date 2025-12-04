import React from 'react';

function VictoryScreen({ winner, onRestart }) {
  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', zIndex: 1000 }}
    >
      <div className="text-center text-white">
        <h1 className="display-1 mb-4">Victory!</h1>
        <h2 className="display-4 mb-5">{winner} Wins!</h2>
        <button
          className="btn btn-primary btn-lg px-5 py-3"
          onClick={onRestart}
        >
          Play Again
        </button>
      </div>
    </div>
  );
}

export default VictoryScreen;
