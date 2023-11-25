import React, { useState, useRef, useEffect } from 'react';
import useMusicStore from '../music_store/Index';
import usePlayOrPause from '../music_store/PlayOrPause';
import ReactDOM from 'react-dom';
import useDataMusic from '../music_store/DataMusic';
import Artist from '../pages/Artist';

const AudioPlayer = (props) => {
    const audioRef = useRef(null);
    const seekBarRef = useRef(null);
    const playPauseRef = useRef(null);
    const currentTimeRef = useRef(null);
    const [seebarVal, setSeekbarVal] = useState('0');
    const { music, setMusic } = useMusicStore()
    const { play, setPlay } = usePlayOrPause()
    const { data } = useDataMusic()
    const [volume, setVolume] = useState(50);

    useEffect(() => {
        // console.log(data);
        play ?
            audioRef.current.play() :
            audioRef.current.pause()
    }, [play])

    const togglePlayPause = () => {
        if (audioRef.current.paused) {
            setPlay(true)
        } else {
            setPlay(false)
        }
    }

    const updateAudioTime = () => {
        let seekPosition = seekBarRef.current.value
        let duration = audioRef.current.duration

        let currentTime = (seekPosition / 100) * duration
        audioRef.current.currentTime = currentTime
    }

    const handleTimeUpdate = () => {
        let duration = audioRef.current.duration
        let currentTime = audioRef.current.currentTime
        let percentage = (currentTime / duration) * 100
        setSeekbarVal(percentage)

        let minutes = Math.floor(currentTime / 60)
        let seconds = Math.floor(currentTime % 60)

        currentTimeRef.current.textContent = minutes + ':' + (seconds < 10 ? '0' : '') + seconds
    }

    const handleEnded = () => {
        setPlay(false)
    }


    // Fungsi untuk mengatur volume audio (harus disesuaikan dengan implementasi Anda)
    const setAudioVolume = (newVolume) => {
        // Misalnya, jika Anda memiliki elemen audio dengan useRef
        // const audioRef = useRef();
        audioRef.current.volume = newVolume / 100; // Volume biasanya diatur dalam rentang 0 hingga 1
    };

    // Handler untuk mengubah nilai volume
    const handleVolumeChange = (event) => {
        const newVolume = event.target.value;
        setVolume(newVolume);

        // Atur volume audio
        setAudioVolume(newVolume);
    };



    return ReactDOM.createPortal(
        <>
            <div className='audio-player'>
                <audio id='audioPlayer' ref={audioRef} src={music} onTimeUpdate={handleTimeUpdate} onEnded={handleEnded}>
                    {/* <source src="https://p.scdn.co/mp3-preview/f1d5e6f151c8497e01540e971bc10f8dc3841310?cid=573b406ead8947ba96bd65bc90ef36a1"/> */}
                    {/* <source src='' /> */}
                </audio>
                <input className='range' type="range" value={seebarVal} step='1' min='0' ref={seekBarRef} onInput={updateAudioTime} />
                <div className='content'>
                    <div className='image' style={{ backgroundImage: `url(${data.image})` }}></div>
                    <div className='text'>
                        <h3 className='title'>
                            {
                                data.title && (
                                    data.title
                                )
                            }
                        </h3>
                        <p className='musician'>
                            {
                                data.artist && (
                                    data.artist
                                )
                            }
                        </p>
                    </div>
                    <div className='like-icon' style={{ opacity: '0.5', cursor: 'not-allowed' }}>
                        <svg
                            data-encore-id="icon"
                            role="img"
                            aria-hidden="true"
                            viewBox="0 0 16 16"
                            width={16}
                            height={16}
                            fill='white'
                        >
                            <path d="M1.69 2A4.582 4.582 0 0 1 8 2.023 4.583 4.583 0 0 1 11.88.817h.002a4.618 4.618 0 0 1 3.782 3.65v.003a4.543 4.543 0 0 1-1.011 3.84L9.35 14.629a1.765 1.765 0 0 1-2.093.464 1.762 1.762 0 0 1-.605-.463L1.348 8.309A4.582 4.582 0 0 1 1.689 2zm3.158.252A3.082 3.082 0 0 0 2.49 7.337l.005.005L7.8 13.664a.264.264 0 0 0 .311.069.262.262 0 0 0 .09-.069l5.312-6.33a3.043 3.043 0 0 0 .68-2.573 3.118 3.118 0 0 0-2.551-2.463 3.079 3.079 0 0 0-2.612.816l-.007.007a1.501 1.501 0 0 1-2.045 0l-.009-.008a3.082 3.082 0 0 0-2.121-.861z" />
                        </svg>
                    </div>
                </div>

                <div className='actions-desk'>
                    <div className='action-icons'>
                        <div className='random-play-icon' style={{ opacity: '0.5', cursor: 'not-allowed' }}>
                            <svg
                                data-encore-id="icon"
                                role="img"
                                aria-hidden="true"
                                viewBox="0 0 16 16"
                                width={16}
                                height={16}
                                fill='white'
                            >
                                <path d="M13.151.922a.75.75 0 1 0-1.06 1.06L13.109 3H11.16a3.75 3.75 0 0 0-2.873 1.34l-6.173 7.356A2.25 2.25 0 0 1 .39 12.5H0V14h.391a3.75 3.75 0 0 0 2.873-1.34l6.173-7.356a2.25 2.25 0 0 1 1.724-.804h1.947l-1.017 1.018a.75.75 0 0 0 1.06 1.06L15.98 3.75 13.15.922zM.391 3.5H0V2h.391c1.109 0 2.16.49 2.873 1.34L4.89 5.277l-.979 1.167-1.796-2.14A2.25 2.25 0 0 0 .39 3.5z" />
                                <path d="m7.5 10.723.98-1.167.957 1.14a2.25 2.25 0 0 0 1.724.804h1.947l-1.017-1.018a.75.75 0 1 1 1.06-1.06l2.829 2.828-2.829 2.828a.75.75 0 1 1-1.06-1.06L13.109 13H11.16a3.75 3.75 0 0 1-2.873-1.34l-.787-.938z" />
                            </svg>
                        </div>

                        <div className='prev-icon' style={{ opacity: '0.5', cursor: 'not-allowed' }}>
                            <svg
                                data-encore-id="icon"
                                role="img"
                                aria-hidden="true"
                                viewBox="0 0 16 16"
                                width={16}
                                height={16}
                                fill='white'
                            >
                                <path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h1.6z" />
                            </svg>
                        </div>

                        {
                            play ? (
                                <div onClick={togglePlayPause} className='play-icon'>
                                    <svg
                                        data-encore-id="icon"
                                        role="img"
                                        aria-hidden="true"
                                        viewBox="0 0 16 16"
                                        width={16}
                                        height={16}
                                        fill='black'
                                    >
                                        <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z" />
                                    </svg>
                                </div>

                            ) : (
                                <div className={`play-icon`} ref={playPauseRef} onClick={music ? togglePlayPause : music} style={{ marginRight: '.3px', opacity: `${music ? '' : '0.5'}`, cursor: `${music ? 'pointer' : 'not-allowed'}` }}>
                                    <svg
                                        data-encore-id="icon"
                                        role="img"
                                        aria-hidden="true"
                                        viewBox="0 0 16 16"
                                        width={16}
                                        height={16}
                                        fill='#000'
                                    >
                                        <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z" />
                                    </svg>
                                </div>

                            )
                        }


                        <div className='next-icon' style={{ opacity: '0.5', cursor: 'not-allowed' }}>
                            <svg
                                data-encore-id="icon"
                                role="img"
                                aria-hidden="true"
                                viewBox="0 0 16 16"
                                width={16}
                                height={16}
                                fill='white'
                            >
                                <path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z" />
                            </svg>

                        </div>

                        <div className='loop-icon' style={{ opacity: '0.5', cursor: 'not-allowed' }}>
                            <svg
                                data-encore-id="icon"
                                role="img"
                                aria-hidden="true"
                                viewBox="0 0 16 16"
                                width={16}
                                height={16}
                                fill='white'
                            >
                                <path d="M0 4.75A3.75 3.75 0 0 1 3.75 1h8.5A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25h-8.5A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5z" />
                            </svg>

                        </div>
                    </div>

                    <div className='playing'>
                        <div className='currentTime' ref={currentTimeRef}>0:00</div>
                        <input className='range-desk' type="range" value={seebarVal} step='1' min='0' ref={seekBarRef} onInput={updateAudioTime} />
                    </div>
                </div>

                <div className='actions'>
                    <div className='like'>
                        <svg
                            role="img"
                            height={24}
                            width={24}
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            data-encore-id="icon"
                            fill='white'
                        >
                            <path d="M5.21 1.57a6.757 6.757 0 0 1 6.708 1.545.124.124 0 0 0 .165 0 6.741 6.741 0 0 1 5.715-1.78l.004.001a6.802 6.802 0 0 1 5.571 5.376v.003a6.689 6.689 0 0 1-1.49 5.655l-7.954 9.48a2.518 2.518 0 0 1-3.857 0L2.12 12.37A6.683 6.683 0 0 1 .627 6.714 6.757 6.757 0 0 1 5.21 1.57zm3.12 1.803a4.757 4.757 0 0 0-5.74 3.725l-.001.002a4.684 4.684 0 0 0 1.049 3.969l.009.01 7.958 9.485a.518.518 0 0 0 .79 0l7.968-9.495a4.688 4.688 0 0 0 1.049-3.965 4.803 4.803 0 0 0-3.931-3.794 4.74 4.74 0 0 0-4.023 1.256l-.008.008a2.123 2.123 0 0 1-2.9 0l-.007-.007a4.757 4.757 0 0 0-2.214-1.194z" />
                        </svg>
                    </div>

                    {
                        play ? (
                            <div className='play' onClick={togglePlayPause} style={{ cursor: 'pointer' }}>
                                <svg
                                    data-encore-id="icon"
                                    role="img"
                                    aria-hidden="true"
                                    viewBox="0 0 16 16"
                                    width={19}
                                    height={19}
                                    fill='white'
                                >
                                    <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z" />
                                </svg>

                            </div>
                        ) : (
                            <div id='playMusic' className='play' ref={playPauseRef} onClick={music ? togglePlayPause : music} style={{ marginRight: '.3px', opacity: `${music ? '' : '0.5'}`, cursor: `${music ? 'pointer' : 'not-allowed'}` }}>
                                {/* play-on-mobile */}
                                <svg
                                    role="img"
                                    height={24}
                                    width={24}
                                    aria-hidden="true"
                                    viewBox="0 0 24 24"
                                    data-encore-id="icon"
                                    fill='white'
                                >
                                    <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z" />
                                </svg>
                            </div>
                        )
                    }

                </div>

                <div className='actions-desk-left'>
                    <div className='now-play-icon' style={{ opacity: '0.5', cursor: 'not-allowed' }}>
                        <svg
                            data-encore-id="icon"
                            role="img"
                            aria-hidden="true"
                            viewBox="0 0 16 16"
                            width={16}
                            height={16}
                            fill='white'
                        >
                            <path d="M11.196 8 6 5v6l5.196-3z" />
                            <path d="M15.002 1.75A1.75 1.75 0 0 0 13.252 0h-10.5a1.75 1.75 0 0 0-1.75 1.75v12.5c0 .966.783 1.75 1.75 1.75h10.5a1.75 1.75 0 0 0 1.75-1.75V1.75zm-1.75-.25a.25.25 0 0 1 .25.25v12.5a.25.25 0 0 1-.25.25h-10.5a.25.25 0 0 1-.25-.25V1.75a.25.25 0 0 1 .25-.25h10.5z" />
                        </svg>
                    </div>

                    <div className='humber-icon' style={{ opacity: '0.5', cursor: 'not-allowed' }}>
                        <svg
                            data-encore-id="icon"
                            role="img"
                            aria-hidden="true"
                            viewBox="0 0 16 16"
                            width={16}
                            height={16}
                            fill='white'
                        >
                            <path d="M15 15H1v-1.5h14V15zm0-4.5H1V9h14v1.5zm-14-7A2.5 2.5 0 0 1 3.5 1h9a2.5 2.5 0 0 1 0 5h-9A2.5 2.5 0 0 1 1 3.5zm2.5-1a1 1 0 0 0 0 2h9a1 1 0 1 0 0-2h-9z" />
                        </svg>
                    </div>

                    <div className='connect-icon' style={{ opacity: '0.5', cursor: 'not-allowed' }}>
                        <svg
                            data-encore-id="icon"
                            role="presentation"
                            aria-hidden="true"
                            width={16}
                            height={16}
                            fill='white'
                            viewBox="0 0 16 16"
                        >
                            <path d="M6 2.75C6 1.784 6.784 1 7.75 1h6.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0 1 14.25 15h-6.5A1.75 1.75 0 0 1 6 13.25V2.75zm1.75-.25a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h6.5a.25.25 0 0 0 .25-.25V2.75a.25.25 0 0 0-.25-.25h-6.5zm-6 0a.25.25 0 0 0-.25.25v6.5c0 .138.112.25.25.25H4V11H1.75A1.75 1.75 0 0 1 0 9.25v-6.5C0 1.784.784 1 1.75 1H4v1.5H1.75zM4 15H2v-1.5h2V15z" />
                            <path d="M13 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm-1-5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                        </svg>
                    </div>

                    <div className='speaker-icon'>
                        <svg
                            data-encore-id="icon"
                            role="presentation"
                            aria-label="Volume high"
                            aria-hidden="true"
                            id="volume-icon"
                            viewBox="0 0 16 16"
                            width={16}
                            height={16}
                            fill='white'
                        >
                            <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z" />
                            <path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z" />
                        </svg>

                        <input type="range" className='range-desk-left' value={volume} onChange={handleVolumeChange} style={{ cursor: 'pointer' }} />
                    </div>
                </div>
            </div>
        </>,
        document.querySelector('#portal')
    )
};

export default AudioPlayer;
