'use client'

import { createContext, useContext } from 'react'

export const SidebarContext = createContext<{ sidebarOpen: boolean }>({
  sidebarOpen: false,
})

export const useSidebar = () => useContext(SidebarContext)
