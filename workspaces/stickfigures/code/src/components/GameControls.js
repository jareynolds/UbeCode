import React from 'react';

function GameControls() {
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-6">
          <div className="card bg-dark text-white">
            <div className="card-body">
              <h5 className="card-title">Player 1 Controls</h5>
              <ul className="list-unstyled mb-0">
                <li><kbd>W</kbd> - Jump</li>
                <li><kbd>A</kbd> / <kbd>D</kbd> - Move</li>
                <li><kbd>F</kbd> - Punch</li>
                <li><kbd>G</kbd> - Kick</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="card bg-dark text-white">
            <div className="card-body">
              <h5 className="card-title">Player 2 Controls</h5>
              <ul className="list-unstyled mb-0">
                <li><kbd>&uarr;</kbd> - Jump</li>
                <li><kbd>&larr;</kbd> / <kbd>&rarr;</kbd> - Move</li>
                <li><kbd>K</kbd> - Punch</li>
                <li><kbd>L</kbd> - Kick</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameControls;
