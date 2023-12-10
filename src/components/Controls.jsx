import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faForward, faBackward, faBackwardStep, faForwardStep, faPlay, faPause, faStop, faL } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState, useRef, useCallback } from 'react';

const Controls = ({
    audioRef,
    progressBarRef,
    duration,
    setTimeProgress,
    playList,
    trackIndex,
    setTrackIndex,
    setCurrentTrack,
    handleNext
}) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const playAnimationRef = useRef();

    const repeat = useCallback(() => {
        const currentTime = audioRef.current.currentTime;
        setTimeProgress(currentTime);
        progressBarRef.current.value = currentTime;
        progressBarRef.current.style.setProperty(
            '--range-progress',
            `${(progressBarRef.current.value / duration) * 100}%`
        );

        playAnimationRef.current = requestAnimationFrame(repeat);
    }, [audioRef, duration, progressBarRef, setTimeProgress]);


    const skipForward = () => {
        audioRef.current.currentTime += 15;
    };

    const skipBackward = () => {
        audioRef.current.currentTime -= 15;
    };

    const handlePrevious = () => {
        if (trackIndex === 0) {
            let lastTrackIndex = playList.length - 1;
            setTrackIndex(lastTrackIndex);
            setCurrentTrack(playList[lastTrackIndex]);
        } else {
            setTrackIndex((prev) => prev - 1);
            setCurrentTrack(playList[trackIndex - 1]);
        }
    };



    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
            playAnimationRef.current = requestAnimationFrame(repeat);
        } else {
            audioRef.current.pause();
            cancelAnimationFrame(playAnimationRef.current);

        }
    }, [isPlaying, audioRef, repeat]);

    const playPauseHandler = () => {
        setIsPlaying(prev => !prev);
    }

    const stopHandler = () => {
        setIsPlaying(false);
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        playAnimationRef.current = requestAnimationFrame(repeat);
    }

    return <div className='controls'>
        <div className='controls-buttons'>
            <button onClick={handlePrevious}>
                <FontAwesomeIcon icon={faBackwardStep} />
            </button>
            <button  onClick={skipBackward}>
                <FontAwesomeIcon icon={faBackward} />
            </button>
            <button className='controls_playBtn' onClick={playPauseHandler}>
                {isPlaying ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
            </button>
            <button onClick={stopHandler}>
                <FontAwesomeIcon icon={faStop} />
            </button>
            <button  onClick={skipForward}>
                <FontAwesomeIcon icon={faForward} />
            </button>
            <button  onClick={handleNext}>
                <FontAwesomeIcon icon={faForwardStep} />
            </button>
        </div>

    </div>;
};
export default Controls;