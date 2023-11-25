import { useEffect, useState } from "react"
import FooterMobile from "../components/FooterMobile"
import LeftNavbar from "../components/LeftNavbar"
import NavDesktop from "../components/NavDesktop"
import NavbarBottomMobile from "../components/NavbarBottomMobile"
import { useParams } from "react-router-dom"
import GetArtistAlbum from "../components/GetArtistAlbum"

const Album = () => {

    const [token, setToken] = useState('')
    const client_id = process.env.REACT_APP_CLIENT_ID
    const client_secret = process.env.REACT_APP_CLIENT_SECRET
    const {id} = useParams()
    const [album, setAlbum] = useState('')
    const [items, setItems] = useState('')
    const [artistID, setArtistID] = useState('')
    const [trackArtists, setTrackArtists] = useState('')

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
    }, [])

    // get Album 
    useEffect(() => {

      const albumParams = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      }
  
      fetch(`https://api.spotify.com/v1/albums/${id}`, albumParams)
        .then(ress => ress.json())
        .then(data => {
          if (!data.error) {
            setAlbum(data)
            setItems(data.tracks.items);
            console.log(data.tracks.items);
            setArtistID(data.artists[0].id)
          }
        })
  
    }, [token,id])

    useEffect(() => {
      if (Array.isArray(items)) {
        items.map(item => {
          setTrackArtists(item.artists)
        })
      }
    },[items])

    useEffect(() => {
      if (Array.isArray(trackArtists)) {
        trackArtists.map(artist => {
          // console.log(artist)
        })
      }
    }, [trackArtists])


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
          <div className='background-banner'></div>
          <div className='detail-content'>
            {
              album && (
                <div className='desktop-butterfly'>
                <div className='detail-image' style={{ backgroundImage: `url(${album.images[0].url})` }}></div>
                  <div className='detail-text'>
                    <h1 className='title'>{album.name}</h1>
                    <h2 className='sub-title'>
                      {
                        album.artists && (
                          album.artists.map(artist => (
                            artist.name
                          ))
                        )
                      }
                    </h2>
                    <div className='logo'>
                      <div className='icon'>
                        <svg
                          role="img"
                          height={25}
                          width={25}
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          data-encore-id="icon"
                          // fill='rgb(177, 177, 177)'
                          fill='#1ED760'
                          className='nav-logo'>
                          <path d="M12 1a11 11 0 1 0 0 22 11 11 0 0 0 0-22zm5.045 15.866a.686.686 0 0 1-.943.228c-2.583-1.579-5.834-1.935-9.663-1.06a.686.686 0 0 1-.306-1.337c4.19-.958 7.785-.546 10.684 1.226a.686.686 0 0 1 .228.943zm1.346-2.995a.858.858 0 0 1-1.18.282c-2.956-1.817-7.464-2.344-10.961-1.282a.856.856 0 0 1-1.11-.904.858.858 0 0 1 .611-.737c3.996-1.212 8.962-.625 12.357 1.462a.857.857 0 0 1 .283 1.179zm.116-3.119c-3.546-2.106-9.395-2.3-12.78-1.272a1.029 1.029 0 0 1-.597-1.969c3.886-1.18 10.345-.952 14.427 1.471a1.029 1.029 0 0 1-1.05 1.77z" />
                        </svg>
                      </div>
                      <span>Spotify</span>
                    </div>
                    <span className='duration'>1 hr 8 min</span>
                  </div>
                </div>
              )
            }
            

            <div className='actions'>
              <div className='action-one'>
                <div className='play'>
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

                <div className='like-icon'>
                  <svg
                    data-encore-id="icon"
                    role="img"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill='white'
                    width={23}
                    height={23}
                  >
                    <path d="M5.21 1.57a6.757 6.757 0 0 1 6.708 1.545.124.124 0 0 0 .165 0 6.741 6.741 0 0 1 5.715-1.78l.004.001a6.802 6.802 0 0 1 5.571 5.376v.003a6.689 6.689 0 0 1-1.49 5.655l-7.954 9.48a2.518 2.518 0 0 1-3.857 0L2.12 12.37A6.683 6.683 0 0 1 .627 6.714 6.757 6.757 0 0 1 5.21 1.57zm3.12 1.803a4.757 4.757 0 0 0-5.74 3.725l-.001.002a4.684 4.684 0 0 0 1.049 3.969l.009.01 7.958 9.485a.518.518 0 0 0 .79 0l7.968-9.495a4.688 4.688 0 0 0 1.049-3.965 4.803 4.803 0 0 0-3.931-3.794 4.74 4.74 0 0 0-4.023 1.256l-.008.008a2.123 2.123 0 0 1-2.9 0l-.007-.007a4.757 4.757 0 0 0-2.214-1.194z" />
                  </svg>
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

              <div className='action-two'>
                <div className='play'>
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
                <div className='pause' style={{ display: 'none' }}>
                  <svg
                    data-encore-id="icon"
                    role="img"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill='white'
                    width={23}
                    height={23}
                  >
                    <path d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className='line'></div>
          </div>

          <div className='next-list'>
            
            {
              items && (
                items.map(item => (
                  <div key={item.id} className='list-card'>

                    <div className='main-content'>
                      <div className='list-image' style={{ backgroundImage: `url(${album.images[0].url})` }}></div>
                      <div className='list-text'>
                        <h2>{item.name}</h2>
                        <h3 className='list-musician'>{millisecondsToReadableTime(item.duration_ms)}</h3>
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
                  </div>
                ))
              )
            }
            
          </div>
          {
            artistID && (
              <GetArtistAlbum id={artistID} token={token} title='Similar Albums' />
            )
          }
          {/* <FooterDesk /> */}
        </main>

        <div className='about-musician'>
          <div className='top-banner'>
            <h1>What A Wonderful World</h1>
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
            <div className='music-image'></div>
            <h2 className='music-title'>What A Wonderfull World</h2>
            <h3 className='musician-name'>Louis Amstrong</h3>

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
            <div className='musician-image'></div>
            <div className='wrapper'>
              <h2 className='musician-name'>Louis Amstrong</h2>

              <div className='listener'>
                <div className='monthly-listener'>
                  <h3>10,095,368</h3>
                  <h3>monthly listener</h3>
                </div>
                <button className='follow'>Follow</button>
              </div>

              <p className='description'>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam, cum!
              </p>
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
      <div className='audio-player'>

        <div className='content'>
          <div className='image'></div>
          <div className='text'>
            <h3 className='title'>Hello Morning</h3>
            <p className='musician'>Ari</p>
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

          <div className='play'>
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
        </div>
      </div>

      <FooterMobile />
    </>
    )
}

export default Album