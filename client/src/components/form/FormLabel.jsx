import React from 'react'

const FormLabel = ({children}) => {
  return (
    <label className="flex flex-col gap-1 text-zinc-500 text-sm">
      {children}
    </label>
  )
}

export default FormLabel