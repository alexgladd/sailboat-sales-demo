import React from 'react';
import { Listbox } from '@headlessui/react';
import { UpCarat, DownCarat } from './Icons';

export type SelectOption = {
  key: string | number;
  label: string;
}

export type SelectOptions = [SelectOption, ...SelectOption[]]

type SelectProps = {
  label?: string;
  value: SelectOption;
  options: SelectOptions;
  onChange: (value: SelectOption) => void;
}

export default function Select({ label, value, options, onChange }: SelectProps) {
  return (
    <Listbox value={value} onChange={onChange}>
      <Listbox.Button className="w-full py-2 pl-2 pr-1 flex justify-between items-center bg-yellow-50 rounded border-2 border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-600">
        {({open}) => (
          <>
            <span className="text-yellow-900">{`${label ? `${label}: ` : ''}${value.label}`}</span>
            { open ? <UpCarat extraStyles="text-yellow-700" /> : <DownCarat extraStyles="text-yellow-700" /> }
          </>
        )}
      </Listbox.Button>
      <Listbox.Options className="absolute w-full py-1 mt-1 text-yellow-900 bg-yellow-50 rounded shadow border-2 border-yellow-500 z-40 focus:outline-none">
        {options.map(option => (
          <Listbox.Option
            key={option.key}
            value={option}
            className={({active, selected}) => `${selected && 'bg-yellow-200 font-bold'} ${active && !selected && 'bg-yellow-100'} py-1 px-4 cursor-default`}>
            {option.label}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}
