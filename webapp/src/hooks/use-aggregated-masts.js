import { useEffect, useState } from 'react'

export default (masts) => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    async function fetchData () {
      if (!masts?.length) return;

      setIsError(false)
      setIsLoading(true)

      try {
        const mastsCommaSeparated = masts.map(mast => mast.id).join(',')
        const mastData = await fetch(
            `${process.env.REACT_APP_BASE_URL}/masts/list?ids=${mastsCommaSeparated}`
          )
          .then(response => response.json())

        const technologyColorMapping = {
          GSM: 'green',
          UMTS: 'cyan',
          LTE: 'blue',
        }

        const technologyGenerationMapping = {
          GSM: '2G',
          UMTS: '3G',
          LTE: '4G',
        }

        Object.keys(mastData).forEach(operator => {
          mastData[operator] = mastData[operator].map((streetObject) => {
            const technologies = {}

            Object.keys(streetObject.technologies).forEach(technology =>{
              technologies[technologyGenerationMapping[technology]] = {
                color: technologyColorMapping[technology],
                frequencies: streetObject.technologies[technology],
              }
            })

            return {
              ...streetObject,
              technologies
            }
          })
        })

        setData(mastData)
      }
      catch (error) {
        console.error(error)
        setIsError(true)
      }
      finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [masts])

  return [data, isLoading, isError]
}
