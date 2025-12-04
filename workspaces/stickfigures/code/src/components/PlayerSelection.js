import React from 'react';

// ENB-347892: Player Selection
// Routes players to 1st or 2nd player creation flow
const PlayerSelection = ({ onPlayerSelect }) => {
  return (
    <div className="container-fluid game-container">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="text-center mb-5">
            <h2 className="game-title mb-4">Choose Your Fighter Order</h2>
            <p className="text-white lead">Who will create their character first?</p>
          </div>
          
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="card h-100 shadow">
                <div className="card-body text-center">
                  <h3 className="card-title text-primary">🥇 Player 1</h3>
                  <p className="card-text">Go first and create your stick figure warrior!</p>
                  <button 
                    className="btn btn-primary btn-lg w-100"
                    onClick={() => onPlayerSelect(1)}
                  >
                    I'm Player 1
                  </button>
                </div>
              </div>
            </div>
            
            <div className="col-md-6 mb-3">
              <div className="card h-100 shadow">
                <div className="card-body text-center">
                  <h3 className="card-title text-success">🥈 Player 2</h3>
                  <p className="card-text">Create your character and prepare for battle!</p>
                  <button 
                    className="btn btn-success btn-lg w-100"
                    onClick={() => onPlayerSelect(2)}
                  >
                    I'm Player 2
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-4">
            <small className="text-white-50">
              Both players will create their characters before the fight begins!
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerSelection;