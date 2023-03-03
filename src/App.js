import './index.css';
import { useState } from 'react';
import Canvas from './components/Canvas';
import ColorControl from './components/ColorControl';
import ModeSwitch from './components/ModeSwitch';

function App() {
  const [color, setColor] = useState('#000000');
  const [mode, setMode] = useState('draw');

  return (
    <div className="App">
      <ColorControl color={color} setColor={setColor} />
      <ModeSwitch mode={mode} setMode={setMode} />
      <Canvas color={color} mode={mode} />
    </div>
  );
}

export default App;
