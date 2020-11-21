import { useEffect, useState } from 'react';


export default (initialMastQuery, initialData) => {
  const [data, setData] = useState(initialData)
  const [query, setQuery] = useState(initialMastQuery)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  function queryToUrl (params) {
    let url = new URL(`${process.env.REACT_APP_BASE_URL}/masts`)
    url.search = new URLSearchParams(params).toString()
    return url
  }

  function updateData(result) {
    setData({
      type: 'FeatureCollection',
      features: result.map((mast) => {
        return {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [mast.longitude, mast.latitude],
          },
          properties: {
            id: mast._id,
            operator: mast.operator,
            latitude: mast.latitude,
            longitude: mast.longitude,
          },
        }
      }),
    })
  }

  useEffect(() => {
    async function fetchData () {
      setIsError(false)
      setIsLoading(true)

      try {
        let result = await import('../data/all_data.json').then(mastData => mastData.default)
        updateData(result)
        setIsLoading(false)
        result = await fetch(queryToUrl(query)).then(response => response.json())
        updateData(result)
      }
      catch (error) {
        console.error(error)
        setIsError(true)
      }
      setIsLoading(false)
    }

    fetchData()
  }, [query])

  return [{ data, isLoading, isError }, setQuery]
}
