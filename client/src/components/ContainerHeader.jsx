import React from 'react'

const ContainerHeader = ({children}) => {
  return (
    <div className="flex items-center justify-between mb-4">
      {children}
    </div>
  )
}

export default ContainerHeader