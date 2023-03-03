import React from 'react';

function ModeSwitch({ onSwitch }) {
  return (
    <div className="mode-switch">
      <button className="mode-switch__button mode-switch__button--paint" onClick={() => onSwitch('paint')}>Paint Mode</button>
      <button className="mode-switch__button mode-switch__button--select" onClick={() => onSwitch('select')}>Select Mode</button>
    </div>
  );
}

export default ModeSwitch;
