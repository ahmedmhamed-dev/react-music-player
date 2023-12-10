import { useState, useRef } from 'react'
import './MusicPlayer.css'
import Track from './components/Track'
import Controls from './components/Controls'
import ProgressBar from './components/ProgressBar'
import { playList } from './data/playList'

function MusicPlayer() {
  const [trackIndex, setTrackIndex] = useState(0);
  const [ currentTrack , setCurrentTrack ] = useState(playList[trackIndex]);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
 

  const audioRef = useRef();
  const progressBarRef = useRef();

  const handleNext = () => {
    if (trackIndex >= playList.length - 1) {
        setTrackIndex(0);
        setCurrentTrack(playList[0]);
    } else {
        setTrackIndex((prev) => prev + 1);
        setCurrentTrack(playList[trackIndex + 1]);
    }
};

  return (
    <div className="MusicPlayer">
      <div className="MusicPlayer-inner">
        <Track  {...{ currentTrack, audioRef, setDuration, progressBarRef,handleNext }} />
        <ProgressBar  {...{ progressBarRef, audioRef, timeProgress, duration }}/>
        <Controls {...{ audioRef, progressBarRef, duration, setTimeProgress, playList, trackIndex, setTrackIndex, setCurrentTrack,handleNext }} />
      
      </div>
    </div>
  )
}

export default MusicPlayer
