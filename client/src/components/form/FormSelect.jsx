import React from "react";
import Select from "react-select";

const FormSelect = ({
  name = "null",
  options=[],
  onChange,
  isMulti=false,
  noOptionsMessage = "Nada encontrado!",
}) => {
  return <Select 
    options={options}
    name={name} 
    onChange={onChange}
    isMulti={isMulti}
    closeMenuOnSelect={!isMulti}
    noOptionsMessage={() => noOptionsMessage}
    placeholder={"Selecione..."}
    unstyled
    isClearable={true}
    classNames={{
      control: (state) => `bg-white p-2 rounded-md border-2 border-zinc-100 hover:ring-2 hover:ring-amber-300 transition
                          ${state.isFocused && 'border-amber-200'}`,
      menu: () => 'bg-white py-1 rounded-md mt-2',
      option: () => 'py-1 px-4 text-lg hover:bg-amber-100',
      clearIndicator: () => 'rounded-md cursor-pointer hover:bg-red-100 hover:text-red-500',
      multiValue: () => 'mr-1 pl-1 rounded',
      multiValueRemove: () => 'rounded cursor-pointer hover:bg-red-100 hover:text-red-500'
    }}
  />;
};

export default FormSelect;
