"use client"

import { ReactNode, createContext, useContext, useState } from "react"

interface QuotaState {
  quota: number
  setQuota: (quota: number) => void
}

interface QuotaProviderProps {
  children: ReactNode
}

const defaultContextState: QuotaState = {
  quota: 0,
  setQuota: () => {},
}

const QuotaContext = createContext(defaultContextState)

export const useQuota = () => useContext(QuotaContext)

export function QuotaProvider({ children }: QuotaProviderProps) {
  const [quota, setQuota] = useState<number>(0)

  return (
    <QuotaContext.Provider value={{ quota, setQuota }}>
      {children}
    </QuotaContext.Provider>
  )
}
