import { useEffect, useState } from "react"
import CardContainer from "./CardContainer"
import Card from "./Card"

const SimilarArtist = (props) => {
    const {id, token} = props
    const [similars, setSimilars] = useState('')

    useEffect(() => {
        const newReleaseParams = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            }
          }
      
          fetch(`https://api.spotify.com/v1/artists/${id}/related-artists?limit=7`, newReleaseParams)
            .then(ress => ress.json())
            .then(data => {
              if (!data.error) {
                setSimilars(data.artists)
              }
            })
    },[token])

    return (
        <div className="original-and-exclusive">
            <h1>Fans Also Like</h1>
            <CardContainer>
                {
                    similars && (
                        similars.slice(0,7).map(artist => (
                            <Card key={artist.id} to={`/artist/${artist.id}`} img={artist.images[1].url} name={artist.name} artist={artist.type} isArtist='card-image-artist'/>
                        ))
                    )
                }
            </CardContainer>
        </div>
    )
}

export default SimilarArtist