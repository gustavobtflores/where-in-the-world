import { CaretDown } from "phosphor-react";
import { useState } from "react";

interface SelectProps {
  options: string[];
  onRegionSelected: (region: string) => void;
}

export function Select({ options, onRegionSelected }: SelectProps) {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("");

  const handleSelectOpen = () => {
    setIsSelectOpen((value) => !value);
  };

  const handleSelectedRegion = (region: string) => {
    setSelectedRegion(region);
    setIsSelectOpen(false);
  };

  return (
    <div id="select" className="relative select-none w-full flex-auto max-w-[200px]">
      <div id="select-box" onClick={handleSelectOpen} className="p-4 flex items-center justify-between cursor-pointer bg-light-white rounded-lg shadow-lg">
        <span className="font-semibold">{selectedRegion || "Filter by region"}</span>
        <CaretDown />
      </div>
      {isSelectOpen ? (
        <div id="select-options" className="bg-light-white absolute z-10 left-0 top-[60px] w-full rounded-lg shadow-lg overflow-hidden">
          {options.map((option) => {
            return (
              <div
                onClick={() => {
                  handleSelectedRegion(option);
                  onRegionSelected(option);
                }}
                className="p-4 font-semibold cursor-pointer hover:bg-gray-200"
                key={option}
              >
                {option}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
