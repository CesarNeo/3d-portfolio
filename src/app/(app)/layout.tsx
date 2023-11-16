import Navbar from '@/components/navbar'
import { ReactNode } from 'react'

function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

export default AppLayout
