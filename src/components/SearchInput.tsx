import { FormEvent } from "react";

interface SearchInputProps {
  onChange: (event: FormEvent<HTMLInputElement>) => void;
}

export function SearchInput({ onChange }: SearchInputProps) {
  return (
    <input
      placeholder="Search for a country..."
      type="text"
      className="font-[Nunito Sans] max-w-xs w-full py-4 pl-8 shadow-md bg-light-white rounded-lg outline-none focus:placeholder:invisible focus:border-light-dark-blue border-solid border-[1px] transition-colors"
      onChange={onChange}
    />
  );
}
