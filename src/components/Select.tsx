import { AnimatePresence, motion } from "framer-motion";
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
    onRegionSelected(region);
    setIsSelectOpen(false);
  };

  return (
    <div
      id="select"
      className="relative select-none w-full flex-auto max-w-[200px]"
    >
      <div
        id="select-box"
        onClick={handleSelectOpen}
        className="p-3 flex items-center justify-between cursor-pointer bg-light-white rounded-[4px] shadow-lg dark:bg-elements-dark dark:text-text-dark"
      >
        <span className="font-semibold">
          {selectedRegion || "Filter by region"}
        </span>
        <CaretDown
          className={
            isSelectOpen
              ? "rotate-180 transition-transform duration-300"
              : "transition-transform duration-200"
          }
        />
      </div>
      <AnimatePresence>
        {isSelectOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, transition: { duration: 0.2 }, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 0.9,
              transition: { opacity: { duration: 0.1 }, ease: "easeInOut" },
            }}
            id="select-options"
            className="bg-light-white dark:bg-elements-dark absolute z-10 left-0 top-[60px] w-full rounded-lg shadow-lg overflow-hidden text-text-dark"
          >
            <div
              onClick={() => handleSelectedRegion("")}
              className="p-4 font-semibold cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-100 ease-in-out"
            >
              Filter by region
            </div>
            {options.map((option) => {
              return (
                <div
                  onClick={() => {
                    handleSelectedRegion(option);
                  }}
                  className="p-4 font-semibold cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-100 ease-in-out"
                  key={option}
                >
                  {option}
                </div>
              );
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
