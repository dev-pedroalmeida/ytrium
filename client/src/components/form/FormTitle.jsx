import React from 'react'

const FormTitle = ({children, border=true}) => {
  return (
    <div className={`text-3xl font-bold pb-2 
                    ${border ? 'border-b-2 border-zinc-100' : ''}`}>
      {children}
    </div>
  )
}

export default FormTitle