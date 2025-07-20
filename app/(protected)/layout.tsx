import React from "react"
import ProtectedNavbar from "./_components/Navbar"


interface ProtectedLayoutProps {
    children : React.ReactNode
}
const ProtectedLayout = ({children} : ProtectedLayoutProps) => {
  return (
    <div className="flex flex-col  items-center justify-center w-full min-h-screen bg-sky-500">
        <div className="flex flex-col gap-y-10">

        <ProtectedNavbar/>
      {children}
        </div>
    </div>
  )
}

export default ProtectedLayout
