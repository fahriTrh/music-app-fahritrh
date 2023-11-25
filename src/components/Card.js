import { Link } from "react-router-dom"


const Card = (props) => {
    const { to, img = '', name, artist = '', isArtist } = props

    const handleOnClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    
    return (
        <Link to={to} onClick={handleOnClick}>
            <div className='card' >
                <div className={`card-image ${isArtist}`} style={{ backgroundImage: `url(${img})` }}></div>
                <h1 className='card-title'>{ name }</h1>
                <p className='description'>{ artist }</p>
                <div className='play'>
                    <div className="play-icon">
                        <svg
                            width={23}
                            height={23}
                            data-encore-id="icon"
                            role="img"
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            fill='#000'
                        >
                            <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z" />
                        </svg>

                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Card