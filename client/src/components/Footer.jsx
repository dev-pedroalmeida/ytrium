import React from 'react'
import YtriumLogo from "../assets/YtriumLogo"
import YtriumText from "../assets/YtriumText"

const Footer = () => {
  return (
    <div className="bg-gradient-to-tr from-orange-500/90 to-amber-400/90 px-24 py-4 mt-4">
      <div className="flex items-center justify-end gap-1">
        <YtriumLogo color="white" />
      </div>
    </div>
  )
}

export default Footer