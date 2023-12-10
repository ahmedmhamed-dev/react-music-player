import React from 'react'
import ReactDOM from 'react-dom/client'
import '../node_modules/reset-css/reset.css';
import MusicPlayer from './MusicPlayer.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MusicPlayer />
  </React.StrictMode>,
)
