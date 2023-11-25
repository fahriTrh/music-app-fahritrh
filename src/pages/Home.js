import { useEffect, useState } from 'react'
import HeaderMobile from '../components/HeaderMobile'
import LeftNavbar from '../components/LeftNavbar'
import NavDesktop from '../components/NavDesktop'
import FooterDesk from '../components/FooterDesk'
import FooterMobile from '../components/FooterMobile'
import NavbarBottomMobile from '../components/NavbarBottomMobile'
import PopularSpotify from '../components/PopularSpotify'
import PopularIndonesian from '../components/PopularIndonesian'
import NewReleaseAlbums from '../components/NewReleaseAlbums'
import AudioPlayer from '../components/AudioPlayer'
import useDataMusic from '../music_store/DataMusic'



const Home = () => {

  const [token, setToken] = useState('')
  const client_id = process.env.REACT_APP_CLIENT_ID
  const client_secret = process.env.REACT_APP_CLIENT_SECRET
  const {data} = useDataMusic()

  useEffect(() => {
    document.querySelector('.nav-desktop').style.width = document.querySelector('main').clientWidth + 'px'
    document.querySelector('.top-banner').style.width = document.querySelector('.about-musician').clientWidth + 'px'
  }, [])

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
  })

  // get Spotify Token
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
  }, [])

  return (
    <>
      <HeaderMobile />
      <div className='beauty-desktop'>
        <LeftNavbar />
        <main>
          <NavDesktop />

          {/* <NewReleaseAlbums token={token} /> */}

          <PopularSpotify token={token} />

          {/* <PopularIndonesian token={token} /> */}

        </main>

        <div className={`about-musician`} style={{ display: Object.keys(data).length !== 0 ? '' : 'none' }}>
                    <div className='top-banner'>
                        <h1>
                            {
                                data.title &&
                                data.title
                            }
                        </h1>
                        <div className='close-icon'>
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
                        </div>
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

export default Home