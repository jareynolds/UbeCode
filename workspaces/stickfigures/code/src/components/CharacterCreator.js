import React, { useState } from 'react';

function CharacterCreator({ playerNumber, onCharacterCreated, existingPlayers }) {
  const [characterName, setCharacterName] = useState('');
  const [color, setColor] = useState(playerNumber === 1 ? '#ff6b6b' : '#4ecdc4');

  const colors = [
    { name: 'Red', value: '#ff6b6b' },
    { name: 'Blue', value: '#4ecdc4' },
    { name: 'Yellow', value: '#ffe66d' },
    { name: 'Purple', value: '#a29bfe' },
    { name: 'Green', value: '#55efc4' },
    { name: 'Orange', value: '#fd9644' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onCharacterCreated({
      name: characterName || `Player ${playerNumber}`,
      color: color,
      playerNumber: playerNumber
    });
  };

  return (
    <div className="container-fluid game-container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card bg-dark text-white">
            <div className="card-body text-center">
              <h2 className="card-title mb-4">
                Player {playerNumber} - Create Your Fighter
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="form-label">Fighter Name</label>
                  <input
                    type="text"
                    className="form-control bg-secondary text-white"
                    placeholder={`Player ${playerNumber}`}
                    value={characterName}
                    onChange={(e) => setCharacterName(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Fighter Color</label>
                  <div className="d-flex flex-wrap justify-content-center gap-2">
                    {colors.map((c) => (
                      <button
                        key={c.value}
                        type="button"
                        className={`btn ${color === c.value ? 'border-white border-3' : 'border-0'}`}
                        style={{
                          backgroundColor: c.value,
                          width: '50px',
                          height: '50px'
                        }}
                        onClick={() => setColor(c.value)}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Preview */}
                <div className="mb-4">
                  <label className="form-label">Preview</label>
                  <div className="d-flex justify-content-center">
                    <svg width="100" height="150" viewBox="0 0 100 150">
                      {/* Head */}
                      <circle cx="50" cy="25" r="15" fill={color} />
                      {/* Body */}
                      <line x1="50" y1="40" x2="50" y2="90" stroke={color} strokeWidth="3" />
                      {/* Arms */}
                      <line x1="50" y1="55" x2="25" y2="75" stroke={color} strokeWidth="3" />
                      <line x1="50" y1="55" x2="75" y2="75" stroke={color} strokeWidth="3" />
                      {/* Legs */}
                      <line x1="50" y1="90" x2="30" y2="130" stroke={color} strokeWidth="3" />
                      <line x1="50" y1="90" x2="70" y2="130" stroke={color} strokeWidth="3" />
                    </svg>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-lg px-5">
                  {playerNumber === 1 ? 'Create & Continue to Player 2' : 'Create & Start Fight!'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterCreator;
