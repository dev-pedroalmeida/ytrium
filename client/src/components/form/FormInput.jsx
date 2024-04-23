import React from 'react'

const FormInput = ({id, type='text', name='null', onChange, value, required=false, placeholder='', defaultValue, autoFocus=false}) => {
  return (
    <input 
      className="p-2 border-2 border-zinc-100 rounded-md text-zinc-700 outline-none
       focus:border-amber-200 hover:ring-2 hover:ring-amber-300 transition placeholder:text-zinc-300"
      type={type}
      name={name}
      onChange={onChange}
      value={value}
      required={required}
      id={id}
      autoFocus={autoFocus}
      placeholder={placeholder}
      defaultValue={defaultValue}
    />
  )
}

export default FormInput