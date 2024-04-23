import React from 'react'

const NavItem = ({children}) => {
  return (
    <div className="cursor-pointer text-sm text-zinc-800 font-semibold py-1 px-2 rounded-lg transition
          hover:text-amber-800 hover:bg-orange-200">
      {children}
    </div>
  )
}

export default NavItem