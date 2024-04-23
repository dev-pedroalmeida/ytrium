import React from 'react'

const FormTextarea = ({name='null', value, onChange, rows=2}) => {
  return (
    <textarea 
      className="p-2 border-2 border-zinc-100 rounded-md text-zinc-700 outline-none
      focus:border-amber-200 hover:ring-2 hover:ring-amber-300 transition placeholder:text-zinc-300"
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
    />
  )
}

export default FormTextarea