import { useEffect, useRef, useState } from "react"
import FooterMobile from "../components/FooterMobile"
import LeftNavbar from "../components/LeftNavbar"
import NavDesktop from "../components/NavDesktop"
import NavbarBottomMobile from "../components/NavbarBottomMobile"
import { useParams } from "react-router-dom"
import GetArtistAlbum from "../components/GetArtistAlbum"
import SimilarArtist from "../components/SimilarArtist"
import AudioPlayer from "../components/AudioPlayer"
import useMusicStore from "../music_store/Index"
import usePlayOrPause from "../music_store/PlayOrPause"
import useDataMusic from "../music_store/DataMusic"
import Color, { useColor } from "color-thief-react"
import getColorsPaletteFromImgUrl from "color-thief-react/lib/utils/getColorsPaletteFromImgUrl"
import { prominent } from "color.js"

const Artist = () => {
    const [token, setToken] = useState('')
    const client_id = process.env.REACT_APP_CLIENT_ID
    const client_secret = process.env.REACT_APP_CLIENT_SECRET
    const { id } = useParams()
    const [artist, setArtist] = useState('')
    const totalFollower = artist ? artist.followers.total : ''
    const [topTracks, setTopTracks] = useState('')
    const [src, setSrc] = useState()
    const [count, setCount] = useState(0)
    const { setMusic } = useMusicStore()
    const { play, setPlay } = usePlayOrPause()
    const { data, setData } = useDataMusic()
    const banner = useRef(null)

    useEffect(() => {
        document.querySelector('main').scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [artist])

    useEffect(() => {
        if (artist) {
            prominent(artist.images[1].url, { amount: 1 }).then(color => {
                banner.current.style.backgroundImage = `linear-gradient(rgb(${color[0]}, ${color[1]}, ${color[2]}), rgba(22, 22, 22, .6))`
            })
        }
    }, [artist])

    // get token
    useEffect(() => {
        const authParameters = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`
        }

        fetch('https://accounts.spotify.com/api/token', authParameters)
            .then(result => result.json())
            .then(data => {
                setToken(data.access_token)
            })
    }, [play])

    // get artist
    useEffect(() => {
        const albumParams = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        }
        fetch(`https://api.spotify.com/v1/artists/${id}`, albumParams)
            .then(ress => ress.json())
            .then(data => {
                if (!data.error) {
                    setArtist(data)
                }
            })
    }, [token, id])

    // get artist top tracks
    useEffect(() => {
        const topTracksParams = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        }
        fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=ID`, topTracksParams)
            .then(ress => ress.json())
            .then(data => {
                if (!data.error) {
                    setTopTracks(data)
                }
            }).catch(error => {
                console.error("Error fetching data:", error);
            });
    }, [token, id, topTracks])

    useEffect(() => {
        if (topTracks) {
            setSrc(topTracks.tracks[0].preview_url);
        }
    }, [])


    useEffect(() => {
        document.querySelector('.nav-desktop').style.width = document.querySelector('main').clientWidth + 'px'
        document.querySelector('.top-banner').style.width = document.querySelector('.about-musician').clientWidth + 'px'
    }, [data])

    useEffect(() => {
        document.querySelector('main').addEventListener('scroll', () => {
            document.querySelector('.nav-desktop').classList.toggle('nav-desk-effect', document.querySelector('main').scrollTop > 0)
        })

        document.querySelector('.about-musician').addEventListener('scroll', () => {
            document.querySelector('.top-banner').classList.toggle('nav-desk-effect', document.querySelector('.about-musician').scrollTop > 0)
        })
    }, [])

    useEffect(() => {

        window.onresize = () => {
            document.querySelector('.nav-desktop').style.width = document.querySelector('main').clientWidth + 'px'
            document.querySelector('.top-banner').style.width = document.querySelector('.about-musician').clientWidth + 'px'
        }
    }, [data])

    const millisecondsToReadableTime = (milliseconds) => {
        const date = new Date(milliseconds);
        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        const seconds = date.getUTCSeconds();

        let result = '';

        if (hours > 0) {
            result += hours + ' hours ';
        }

        if (minutes > 0 || hours > 0) {
            result += minutes + ' minutes ';
        }

        result += seconds + ' seconds';

        return result;
    }

    const playMusic = (event) => {

        setPlay(false)
        setMusic(topTracks.tracks[0].preview_url)

        setData({
            title: topTracks.tracks[0].name,
            image_artist: artist.images[1].url,
            image: topTracks.tracks[0].album.images[1].url,
            artist: artist.name,
            followers: totalFollower.toLocaleString()
        })


        setTimeout(() => {
            setPlay(true)
        }, 1000);
    }

    const stopMusic = () => {
        setPlay(false)
    }

    const playMusicByList = (event) => {
        setPlay(false)
        setMusic(event.target.getAttribute('data-preview'))

        setData({
            title: event.target.getAttribute('data-title'),
            image_artist: artist.images[1].url,
            image: event.target.getAttribute('data-image'),
            artist: artist.name,
            followers: totalFollower.toLocaleString()
        })


        setTimeout(() => {
            setPlay(true)
        }, 1000);
    }

    return (
        <>
            <header className='detail-header-mobile'>
                <nav className='detail-navbar-mobile'>
                    <div className='wrapp'>
                        <div className='back'>
                            <svg
                                data-encore-id="icon"
                                role="img"
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                fill='white'
                                width={23}
                                height={23}
                            >
                                <path d="M13.414 3.5a.999.999 0 0 0-1.707-.707l-9.207 9.2 9.207 9.202a1 1 0 1 0 1.414-1.413L6.335 13H20.5a1 1 0 0 0 0-2H6.322l6.799-6.794a.999.999 0 0 0 .293-.707z" />
                            </svg>
                        </div>
                    </div>
                </nav>
            </header>

            <div className='beauty-desktop'>
                <LeftNavbar />
                <main className='detail-main'>
                    <NavDesktop />
                    <div className='background-banner' ref={banner}></div>
                    <div className='detail-content'>
                        <div className='desktop-butterfly'>
                            {
                                artist && (
                                    <div className='detail-image' id='image-artist' style={{ backgroundImage: `url(${artist.images[1].url})` }}></div>
                                )
                            }
                            <div className='detail-text'>
                                <div className='verified-artist'>
                                    <div className='verifed-logo'>
                                        <svg
                                            data-encore-id="icon"
                                            role="img"
                                            aria-hidden="true"
                                            width={20}
                                            height={20}
                                            viewBox="0 0 24 24"
                                            fill='dodgerblue'
                                        >
                                            <path d="M10.814.5a1.658 1.658 0 0 1 2.372 0l2.512 2.572 3.595-.043a1.658 1.658 0 0 1 1.678 1.678l-.043 3.595 2.572 2.512c.667.65.667 1.722 0 2.372l-2.572 2.512.043 3.595a1.658 1.658 0 0 1-1.678 1.678l-3.595-.043-2.512 2.572a1.658 1.658 0 0 1-2.372 0l-2.512-2.572-3.595.043a1.658 1.658 0 0 1-1.678-1.678l.043-3.595L.5 13.186a1.658 1.658 0 0 1 0-2.372l2.572-2.512-.043-3.595a1.658 1.658 0 0 1 1.678-1.678l3.595.043L10.814.5zm6.584 9.12a1 1 0 0 0-1.414-1.413l-6.011 6.01-1.894-1.893a1 1 0 0 0-1.414 1.414l3.308 3.308 7.425-7.425z" />
                                        </svg>
                                    </div>
                                    <span>Verified artist</span>
                                </div>
                                {
                                    artist && (
                                        <>
                                            <h1 className='title'>{artist.name}</h1>
                                            <h2 className='sub-title'>{
                                                totalFollower && (
                                                    totalFollower.toLocaleString() + ' followers'
                                                )
                                            }</h2>
                                        </>
                                    )
                                }
                            </div>
                        </div>

                        <div className='actions'>
                            <div className='action-one'>
                                {
                                    play ? (
                                        <div className='play' onClick={stopMusic}>
                                            <svg
                                                data-encore-id="icon"
                                                role="img"
                                                aria-hidden="true"
                                                viewBox="0 0 24 24"
                                                width={23}
                                                height={23}
                                                className="Svg-sc-ytk21e-0 iYxpxA"
                                            >
                                                <path d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z" />
                                            </svg>

                                        </div>
                                    ) : (
                                        <div className='play' onClick={playMusic} >
                                            <svg
                                                data-encore-id="icon"
                                                role="img"
                                                aria-hidden="true"
                                                viewBox="0 0 24 24"
                                                width={23}
                                                height={23}
                                                fill='#000'
                                            >
                                                <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z" />
                                            </svg>
                                        </div>
                                    )
                                }



                                <div className='follow-icon'>
                                    <span>Follow</span>
                                </div>

                                <div className='share-icon'>
                                    <svg
                                        data-encore-id="icon"
                                        role="img"
                                        aria-hidden="true"
                                        viewBox="0 0 24 24"
                                        fill='white'
                                        width={23}
                                        height={23}
                                    >
                                        <path d="M18.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM15 5.5a3.5 3.5 0 1 1 1.006 2.455L9 12l7.006 4.045a3.5 3.5 0 1 1-.938 1.768l-6.67-3.85a3.5 3.5 0 1 1 0-3.924l6.67-3.852A3.513 3.513 0 0 1 15 5.5zm-9.5 5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm13 6.5a1.5 1.5 0 1 0-.001 3 1.5 1.5 0 0 0 .001-3z" />
                                    </svg>
                                </div>

                                <div className='option-icon'>
                                    <svg
                                        data-encore-id="icon"
                                        role="img"
                                        aria-hidden="true"
                                        viewBox="0 0 24 24"
                                        fill='white'
                                        width={23}
                                        height={23}
                                    >
                                        <path d="M10.5 4.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0zm0 15a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0zm0-7.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0z" />
                                    </svg>

                                </div>
                            </div>

                            {
                                play ? (
                                    <div className='action-two'>
                                        <div className='play' onClick={stopMusic}>
                                            <svg
                                                data-encore-id="icon"
                                                role="img"
                                                aria-hidden="true"
                                                viewBox="0 0 24 24"
                                                width={23}
                                                height={23}
                                                fill='#000'
                                            >
                                                <path d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z" />
                                            </svg>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='action-two'>
                                        <div className='play' onClick={playMusic}>
                                            <svg
                                                data-encore-id="icon"
                                                role="img"
                                                aria-hidden="true"
                                                viewBox="0 0 24 24"
                                                width={23}
                                                height={23}
                                                fill='#000'
                                            >
                                                <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z" />
                                            </svg>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        <div className='line'></div>
                    </div>

                    <div className='list-of-artist'>
                        {
                            topTracks && (
                                topTracks.tracks.map(topTrack => (
                                    <>
                                        <div key={topTrack.id} className='list-card'>
                                            <div className='main-content'>
                                                <div className='list-image' style={{ backgroundImage: `url(${topTrack.album.images[1].url})` }}></div>
                                                <div className='list-text'>
                                                    <h2>{topTrack.name}</h2>
                                                    <h3 className='list-musician'>
                                                        {millisecondsToReadableTime(topTrack.duration_ms)}
                                                    </h3>
                                                </div>
                                            </div>

                                            <div className='option-icon'>
                                                <svg
                                                    width={15}
                                                    height={15}
                                                    data-encore-id="icon"
                                                    role="img"
                                                    aria-hidden="true"
                                                    viewBox="0 0 16 16"
                                                    fill='white'
                                                >
                                                    <path d="M3 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm6.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM16 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                                </svg>
                                            </div>

                                            <div className="overlay" data-id={topTrack.id} data-preview={topTrack.preview_url} data-title={topTrack.name} data-image={topTrack.album.images[1].url} onClick={playMusicByList}></div>
                                        </div>
                                    </>
                                ))
                            )
                        }
                    </div>

                    {/* <FooterDesk /> */}
                    {/* <GetArtistAlbum id={id} token={token} title={"Artist's Albums"} /> */}
                    <SimilarArtist id={id} token={token} />
                </main>


                <div className={`about-musician`} style={{ display: Object.keys(data).length !== 0 ? '' : 'none' }}>
                    <div className='top-banner'>
                        <h1>
                            {
                                data.title &&
                                data.title
                            }
                        </h1>
                        {/* <div className='close-icon'>
                            <svg
                                width={15}
                                height={15}
                                data-encore-id="icon"
                                role="img"
                                aria-hidden="true"
                                viewBox="0 0 16 16"
                                fill='white'
                            >
                                <path d="M1.47 1.47a.75.75 0 0 1 1.06 0L8 6.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L9.06 8l5.47 5.47a.75.75 0 1 1-1.06 1.06L8 9.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L6.94 8 1.47 2.53a.75.75 0 0 1 0-1.06z" />
                            </svg>
                        </div> */}
                    </div>

                    <div className='music-card'>
                        <div className='music-image' style={{ backgroundImage: data.image ? `url(${data.image})` : '' }}></div>
                        <h2 className='music-title'>
                            {
                                data.title ?
                                    data.title : (
                                        <span>Title</span>
                                    )
                            }
                        </h2>
                        <h3 className='musician-name'>
                            {
                                data.artist ?
                                    data.artist : (
                                        <span>Dua Lipa</span>
                                    )
                            }
                        </h3>

                        <div className='actions'>
                            <div className='like-icon'>
                                <svg
                                    width={15}
                                    height={15}
                                    data-encore-id="icon"
                                    role="img"
                                    aria-hidden="true"
                                    viewBox="0 0 16 16"
                                    fill='white'
                                >
                                    <path d="M1.69 2A4.582 4.582 0 0 1 8 2.023 4.583 4.583 0 0 1 11.88.817h.002a4.618 4.618 0 0 1 3.782 3.65v.003a4.543 4.543 0 0 1-1.011 3.84L9.35 14.629a1.765 1.765 0 0 1-2.093.464 1.762 1.762 0 0 1-.605-.463L1.348 8.309A4.582 4.582 0 0 1 1.689 2zm3.158.252A3.082 3.082 0 0 0 2.49 7.337l.005.005L7.8 13.664a.264.264 0 0 0 .311.069.262.262 0 0 0 .09-.069l5.312-6.33a3.043 3.043 0 0 0 .68-2.573 3.118 3.118 0 0 0-2.551-2.463 3.079 3.079 0 0 0-2.612.816l-.007.007a1.501 1.501 0 0 1-2.045 0l-.009-.008a3.082 3.082 0 0 0-2.121-.861z" />
                                </svg>
                            </div>
                            <div className='option-icon'>
                                <svg
                                    width={15}
                                    height={15}
                                    data-encore-id="icon"
                                    role="img"
                                    aria-hidden="true"
                                    viewBox="0 0 16 16"
                                    fill='white'
                                >
                                    <path d="M3 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm6.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM16 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className='musician-card'>
                        <div className='musician-image' style={{ backgroundImage: data.image_artist ? `url(${data.image_artist})` : '' }}></div>
                        <div className='wrapper'>
                            <h2 className='musician-name'>
                                {
                                    data.artist ?
                                        data.artist : (
                                            <span>Dua Lipa</span>
                                        )
                                }
                            </h2>

                            <div className='listener'>
                                <div className='monthly-listener'>
                                    <h3>
                                        {
                                            data.followers ?
                                                data.followers : (
                                                    <span>999</span>
                                                )
                                        }
                                    </h3>
                                    <h3>followers</h3>
                                </div>
                                <button className='follow'>Follow</button>
                            </div>
                        </div>
                    </div>

                    <div className='next-card'>
                        <div className='headings'>
                            <h1>Next in queue</h1>
                            <h3>Open queue</h3>
                        </div>

                        <div className='next-music'>
                            <div className='icon'>
                                <svg
                                    width={17}
                                    height={17}
                                    data-encore-id="icon"
                                    role="img"
                                    aria-hidden="true"
                                    viewBox="0 0 16 16"
                                    fill='white'
                                >
                                    <path d="M10 2v9.5a2.75 2.75 0 1 1-2.75-2.75H8.5V2H10zm-1.5 8.25H7.25A1.25 1.25 0 1 0 8.5 11.5v-1.25z" />
                                </svg>

                            </div>
                            <div className='image'></div>

                            <div className='title-musician'>
                                <h1>At Last</h1>
                                <h2>Etta james</h2>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <NavbarBottomMobile />

            {/* audio player */}
            {/* <AudioPlayer /> */}

            {/* <FooterMobile /> */}
        </>
    )

}

export default Artist