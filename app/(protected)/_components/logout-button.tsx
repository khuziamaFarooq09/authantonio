'use client';

import { logout } from "@/actions/logout";

interface LogoutButtonProps{
    children?: React.ReactNode   // must use ? with unexpected props may be or may not be
}


const LogoutButton= ({children} : LogoutButtonProps) => {
    const onClick = ()=> {
        logout();
    }
  return (
    <span onClick={onClick}>
      {children}
    </span>
  )
}

export default LogoutButton
