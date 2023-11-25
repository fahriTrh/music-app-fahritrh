const GetListApi = (token, que, params) => {
    const searchParameters = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
    }

    fetch(`https://api.spotify.com/v1/${que}?${params}`, searchParameters)
        .then(ress => ress.json())
        .then(data => {
            if (!data.error) {
               return data
            }
        })
}
export default GetListApi
