import { useState, useCallback, useRef, useEffect } from 'react'

export const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  const activeHttpRequests = useRef([])

  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {

      //const methodsWithBody = ["post", "POST", "put", "PUT", "patch", "PATCH"] 

      /*if (methodsWithBody.includes(method)) {
        headers = {"Content-Type": "application/json"}
      }*/

      setIsLoading(true)
      const httpAbortCtrl = new AbortController()
      activeHttpRequests.current.push(httpAbortCtrl)

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal
        })
        console.log(response)

        const responseData = await response.json()
        console.log(responseData)

        activeHttpRequests.current = activeHttpRequests.current.filter(
          reqCtrl => reqCtrl !== httpAbortCtrl
        )

        if (!response.ok) {
          throw new Error(responseData.message)
        }

        setIsLoading(false)
        return responseData
      } catch (error) {
        console.log(error.message)
        setError(error.message)
        setIsLoading(false)
        throw error
      }
    },
    []
  )

  const clearError = () => {
    setError(null)
  }

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort())
    }
  }, [])

  return [isLoading, error, sendRequest, clearError]
}
