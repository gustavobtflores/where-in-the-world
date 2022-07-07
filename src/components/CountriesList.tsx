import { AnimatePresence } from "framer-motion";
import { Country, CountryItem } from "./CountryItem";

interface CountriesListProps {
  countries: Country[];
}

export function CountriesList({ countries }: CountriesListProps) {
  return (
    <>
      <div className="grid grid-cols-countryItem gap-[3.75rem] mt-4">
        {countries.map((country) => {
          return <CountryItem key={country.name} country={country} />;
        })}
      </div>
    </>
  );
}
