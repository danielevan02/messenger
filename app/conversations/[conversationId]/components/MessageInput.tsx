'use client'

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

type MessageInputProps = {
  id: string
  placeholder?: string
  type?: string
  required?: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
}

const MessageInput: React.FC<MessageInputProps> = ({errors, id, register, placeholder, required, type}) => {
  return (
    <div className="relative w-full ">
      <input 
        id={id} 
        type={type} 
        autoComplete={id} 
        {...register('message', {required})} 
        placeholder={placeholder}
        className="text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none"
      />
    </div>
  );
}
 
export default MessageInput;