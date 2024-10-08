import ky from 'ky'
import { useMemo } from 'react'

export const useApiClient = () => {
  return useMemo(
    () =>
      ky.create({
        retry: 0,
        timeout: 10000,
        hooks: {
          beforeRequest: [
            (request) => {
              request.headers.set('Content-Type', 'application/json')
            },
          ],
        },
      }),
    [],
  )
}
