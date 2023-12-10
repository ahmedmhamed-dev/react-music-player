import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Track = ({currentTrack,audioRef, setDuration, progressBarRef,handleNext}) => {

    const onLoadedMetadata = () => {
        console.log(audioRef.current.duration);
        const seconds = audioRef.current.duration;
        setDuration(seconds);
        progressBarRef.current.max = seconds;
      };

    return <div>
        <audio src={currentTrack.src} ref={audioRef} onLoadedMetadata={onLoadedMetadata} onEnded={handleNext} />
        <div className="trackInfo">
             <img src={currentTrack.cover} className="trackInfo_cover" />   
             <div className='trackDetails'>
                <h1>{currentTrack.title}</h1>
                <h2>{ currentTrack.author }</h2>
             </div>
        </div>
    </div>;
  };
  export default Track;