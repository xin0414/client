import { createContext, useContext, FC } from 'react'
import * as React from 'react'

export default function createService<T>(useFunc: (...args: any[]) => T) {
  const nullUseFunc: T = null as any
  const ServiceContext = createContext(nullUseFunc)

  const connect = function (Component: FC<any>, options?: any) {
    return (props: any) => {
      const value = useFunc(options)
      return (
        <ServiceContext.Provider value={value}>
          <Component {...props}></Component>
        </ServiceContext.Provider>
      )
    }
  }

  const useInject = function () {
    return useContext(ServiceContext)
  }

  return { connect, useInject, ServiceContext }
}
