import { FormEvent } from "react";

interface SearchInputProps {
  onChange: (event: FormEvent<HTMLInputElement>) => void;
}

export function SearchInput({ onChange }: SearchInputProps) {
  return (
    <input
      placeholder="Search for a country..."
      type="text"
      className="font-[Nunito Sans] max-w-md w-full h-12 py-4 pl-8 shadow-md bg-light-white dark:bg-elements-dark dark:text-text-dark rounded-[4px] outline-none focus:placeholder:invisible focus:border-light-dark-blue border-solid border-[1px] border-transparent transition-colors"
      onChange={onChange}
    />
  );
}
