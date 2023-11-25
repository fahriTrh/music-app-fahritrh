import navBottomMenuClick from './funct_navBot'

const NavbarBottomMobile = () => {
    return (
        <div className='navbar-bot-wrapp'>
            <nav className='bottom-nav'>
                <ul>
                    <li className='home'>
                        <div className='target target-home' onClick={navBottomMenuClick}></div>
                        <svg
                            role="img"
                            height={23}
                            width={23}
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            data-encore-id="icon"
                            stroke='rgb(177, 177, 177)'
                            className='nav-logo'
                        >
                            <path d="M13.5 1.515a3 3 0 0 0-3 0L3 5.845a2 2 0 0 0-1 1.732V21a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6h4v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7.577a2 2 0 0 0-1-1.732l-7.5-4.33z" />
                        </svg>
                        <span>Home</span>
                    </li>
                    <li className='search'>
                        <div className='target target-search' onClick={navBottomMenuClick}></div>
                        <svg
                            role="img"
                            height={23}
                            width={23}
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            data-encore-id="icon"
                            fill='rgb(177, 177, 177)'
                            className='nav-logo'
                        >
                            <path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 1 0 1.414-1.414l-4.344-4.344a9.157 9.157 0 0 0 2.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z" />
                        </svg>
                        <span>Search</span>
                    </li>
                    <li className='library'>
                        <div className='target' onClick={navBottomMenuClick}></div>
                        <svg
                            role="img"
                            height={23}
                            width={23}
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            data-encore-id="icon"
                            fill='rgb(177, 177, 177)'
                            className='nav-logo'
                        >
                            <path d="M14.5 2.134a1 1 0 0 1 1 0l6 3.464a1 1 0 0 1 .5.866V21a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V3a1 1 0 0 1 .5-.866zM16 4.732V20h4V7.041l-4-2.309zM3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zm6 0a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1z" />
                        </svg>
                        <span>Your Library</span>
                    </li>
                    <li className='get-app'>
                        <div className='target' onClick={navBottomMenuClick}></div>
                        <svg
                            role="img"
                            height={23}
                            width={23}
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            data-encore-id="icon"
                            fill='rgb(177, 177, 177)'
                            className='nav-logo'
                        >
                            <path d="M12 1a11 11 0 1 0 0 22 11 11 0 0 0 0-22zm5.045 15.866a.686.686 0 0 1-.943.228c-2.583-1.579-5.834-1.935-9.663-1.06a.686.686 0 0 1-.306-1.337c4.19-.958 7.785-.546 10.684 1.226a.686.686 0 0 1 .228.943zm1.346-2.995a.858.858 0 0 1-1.18.282c-2.956-1.817-7.464-2.344-10.961-1.282a.856.856 0 0 1-1.11-.904.858.858 0 0 1 .611-.737c3.996-1.212 8.962-.625 12.357 1.462a.857.857 0 0 1 .283 1.179zm.116-3.119c-3.546-2.106-9.395-2.3-12.78-1.272a1.029 1.029 0 0 1-.597-1.969c3.886-1.18 10.345-.952 14.427 1.471a1.029 1.029 0 0 1-1.05 1.77z" />
                        </svg>
                        <span>Get App</span>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default NavbarBottomMobile