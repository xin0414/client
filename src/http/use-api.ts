import { useState, useEffect } from 'react'
import { AxiosResponse } from 'axios'
interface UseAPIOptions<TArgs, TData> {
  manual?: boolean
  deps?: React.DependencyList
  onSuccess?: (data: TData) => void
}

interface UseAPIResult<TData, TArgs> {
  data: TData | undefined
  loading: boolean
  error: Error | undefined
  run: (args?: TArgs) => Promise<TData>
}

export function useAPI<TData, TArgs>(
  promise: (args?: TArgs) => Promise<TData>,
  options?: UseAPIOptions<TArgs, TData>
): UseAPIResult<TData, TArgs> {
  const [data, setData] = useState<TData>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error>()

  const fetchData = async (args?: TArgs) => {
    setLoading(true)
    return new Promise<TData>((resolve, reject) => {
      promise(args)
        .then((response) => {
          setData(response)
          resolve(response)
        })
        .catch((err) => {
          reject(err)
          setError(error as Error)
        })
        .finally(() => {
          setLoading(false)
        })
    })
  }

  useEffect(() => {
    if (!options?.manual) {
      fetchData()
    }
  }, options?.deps)

  return { data, loading, error, run: fetchData }
}
