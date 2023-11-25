import { Link } from "react-router-dom"

const LeftNavbar = () => {
    return (
        <nav className='left-navbar'>
            <ul>
                <li>
                    <div className='left-menu-home'>
                        <Link to='/'>
                            <svg
                                width={25}
                                height={25}
                                data-encore-id="icon"
                                role="img"
                                aria-hidden="true"
                                fill='white'
                                viewBox="0 0 24 24"
                            >
                                <path d="M13.5 1.515a3 3 0 0 0-3 0L3 5.845a2 2 0 0 0-1 1.732V21a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6h4v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7.577a2 2 0 0 0-1-1.732l-7.5-4.33z" />
                            </svg>
                        </Link>

                    </div>
                </li>

                <li>
                    <div className='left-menu-search' style={{ cursor: 'not-allowed' }}>
                        <svg
                            width={25}
                            height={25}
                            data-encore-id="icon"
                            role="img"
                            aria-hidden="true"
                            fill='white'
                            viewBox="0 0 24 24"
                        >
                            <path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 1 0 1.414-1.414l-4.344-4.344a9.157 9.157 0 0 0 2.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z" />
                        </svg>

                    </div>
                </li>
            </ul>
            <ul>
                <li>
                    <div className='left-menu-library' style={{ cursor: 'not-allowed' }}>
                        <svg
                            data-encore-id="icon"
                            role="img"
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            fill='white'
                            width={25}
                            height={25}
                        >
                            <path d="M14.5 2.134a1 1 0 0 1 1 0l6 3.464a1 1 0 0 1 .5.866V21a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V3a1 1 0 0 1 .5-.866zM16 4.732V20h4V7.041l-4-2.309zM3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zm6 0a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1z" />
                        </svg>

                    </div>
                </li>

            </ul>
        </nav>
    )
}

export default LeftNavbar