import { CheckIcon } from '@heroicons/react/24/outline';
import { InputProps } from "@/app/interfaces/inputInterface";

export default function Checkbox({ title, type, name, value, data, changeCheckbox }: InputProps) {
    return (
    <label className='relative'>
            <input className='peer sr-only' type={type} onChange={changeCheckbox} name={name} value={value} checked={data === value} />
            <div className="absolute top-[4px] z-10 w-[13.5px] h-[13.5px] border border-black rounded-sm"></div>
            <CheckIcon className='mr-3 absolute top-[4px] size-3 text-black hidden peer-checked:block'/>
            <p className='ml-6 text-base font-normal text-gray-30 peer-checked:text-black'>{title}</p>
    </label>
)
}