import { useEffect, useState } from 'react'

export default (id) => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    async function fetchData () {
      setIsError(false)
      setIsLoading(true)
      try {
        const result = await fetch(`${process.env.REACT_APP_BASE_URL}/masts/${id}`)
          .then(response => response.json())
        setData(result)
      }
      catch (error) {
        setIsError(true)
      }
      setIsLoading(false)
    }

    const isIdValid = !!id
    if (!isIdValid) return

    fetchData()
  }, [id])

  return [{ data, isLoading, isError }]
}
