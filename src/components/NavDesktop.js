import { useEffect } from "react"

const NavDesktop = () => {


  const back = () => {
    window.history.back()
  }

  const forward = () => {
    window.history.forward()
  }
  
  return (
    <nav className='nav-desktop'>
      <ul className='next-prev-page'>
        <li className='prev' style={{ cursor: 'pointer' }} onClick={back}>
          <svg
            width={15}
            height={15}
            fill='white'
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            viewBox="0 0 16 16"
          >
            <path d="M11.03.47a.75.75 0 0 1 0 1.06L4.56 8l6.47 6.47a.75.75 0 1 1-1.06 1.06L2.44 8 9.97.47a.75.75 0 0 1 1.06 0z" />
          </svg>
        </li>
        <li className='next' style={{ cursor: 'pointer' }} onClick={forward}>
                <svg
                  width={15}
                  height={15}
                  fill='white'
                  data-encore-id="icon"
                  role="img"
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.97.47a.75.75 0 0 0 0 1.06L11.44 8l-6.47 6.47a.75.75 0 1 0 1.06 1.06L13.56 8 6.03.47a.75.75 0 0 0-1.06 0z" />
                </svg>
              </li>
      </ul>

      <ul className='service-group'>
        <li>
          <button className='premium'>

            Explore Premium
          </button>
        </li>
        <li>
          <button className='install-app'>
            <svg
              data-encore-id="icon"
              role="img"
              aria-hidden="true"
              viewBox="0 0 16 16"
              fill='white'
              width={15}
              height={15}
            >
              <path d="M4.995 8.745a.75.75 0 0 1 1.06 0L7.25 9.939V4a.75.75 0 0 1 1.5 0v5.94l1.195-1.195a.75.75 0 1 1 1.06 1.06L8 12.811l-.528-.528a.945.945 0 0 1-.005-.005L4.995 9.805a.75.75 0 0 1 0-1.06z" />
              <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13z" />
            </svg>
            <span>Install App</span>
          </button>
        </li>
        <li className='notification' style={{ cursor: 'not-allowed' }}>
          <svg
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            fill='white'
            width={15}
            height={15}
            viewBox="0 0 16 16"
          >
            <path d="M8 1.5a4 4 0 0 0-4 4v3.27a.75.75 0 0 1-.1.373L2.255 12h11.49L12.1 9.142a.75.75 0 0 1-.1-.374V5.5a4 4 0 0 0-4-4zm-5.5 4a5.5 5.5 0 0 1 11 0v3.067l2.193 3.809a.75.75 0 0 1-.65 1.124H10.5a2.5 2.5 0 0 1-5 0H.957a.75.75 0 0 1-.65-1.124L2.5 8.569V5.5zm4.5 8a1 1 0 1 0 2 0H7z" />
          </svg>

        </li>

        <li className='profile' style={{ cursor: 'not-allowed' }}>
          <svg
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            data-testid="user-icon"
            viewBox="0 0 16 16"
            width={15}
            height={15}
            fill='white'
          >
            <path d="M6.233.371a4.388 4.388 0 0 1 5.002 1.052c.421.459.713.992.904 1.554.143.421.263 1.173.22 1.894-.078 1.322-.638 2.408-1.399 3.316l-.127.152a.75.75 0 0 0 .201 1.13l2.209 1.275a4.75 4.75 0 0 1 2.375 4.114V16H.382v-1.143a4.75 4.75 0 0 1 2.375-4.113l2.209-1.275a.75.75 0 0 0 .201-1.13l-.126-.152c-.761-.908-1.322-1.994-1.4-3.316-.043-.721.077-1.473.22-1.894a4.346 4.346 0 0 1 .904-1.554c.411-.448.91-.807 1.468-1.052zM8 1.5a2.888 2.888 0 0 0-2.13.937 2.85 2.85 0 0 0-.588 1.022c-.077.226-.175.783-.143 1.323.054.921.44 1.712 1.051 2.442l.002.001.127.153a2.25 2.25 0 0 1-.603 3.39l-2.209 1.275A3.25 3.25 0 0 0 1.902 14.5h12.196a3.25 3.25 0 0 0-1.605-2.457l-2.209-1.275a2.25 2.25 0 0 1-.603-3.39l.127-.153.002-.001c.612-.73.997-1.52 1.052-2.442.032-.54-.067-1.097-.144-1.323a2.85 2.85 0 0 0-.588-1.022A2.888 2.888 0 0 0 8 1.5z" />
          </svg>
        </li>
      </ul>
    </nav>
  )
}

export default NavDesktop