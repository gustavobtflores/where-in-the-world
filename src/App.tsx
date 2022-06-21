import axios from "axios";
import { motion } from "framer-motion";
import { FormEvent, useEffect, useState } from "react";
import { Container } from "./components/Container";
import { Country, CountryItem } from "./components/CountryItem";
import { Header } from "./components/Header";

interface CountryResponse {
  name: {
    common: string;
  };
  population: number;
  capital: [string];
  flags: {
    png: string;
  };
  region: string;
}

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [countrySearch, setCountrySearch] = useState("");
  const filteredCountries = countrySearch ? countries.filter((country) => country.name.toLowerCase().includes(countrySearch.toLowerCase())) : countries;

  useEffect(() => {
    async function getCountries() {
      const countries = await axios("https://restcountries.com/v3.1/all?fields=name,population,capital,region,flags").then((response) => {
        const data = response.data;
        return data;
      });

      const countriesFormatted = countries.map((country: CountryResponse) => {
        return {
          name: country.name.common,
          population: country.population,
          capital: country.capital[0],
          region: country.region,
          flag: country.flags?.png,
        };
      });

      setCountries(countriesFormatted);
    }

    getCountries();
  }, []);

  const handleCountrySearch = (event: FormEvent<HTMLInputElement>) => {
    setCountrySearch(event.currentTarget.value);
  };

  return (
    <>
      <Header />
      <Container>
        <input
          placeholder="Search for a country..."
          type="text"
          className="font-[Nunito Sans] w-96 py-4 pl-8 shadow-md mt-8 bg-light-white rounded-lg outline-none focus:placeholder:invisible focus:border-light-dark-blue border-solid border-[1px] transition-colors"
          onChange={handleCountrySearch}
        />
        <div className="grid grid-cols-countryItem gap-[3.75rem] mt-4">
          {filteredCountries.map((country) => {
            return <CountryItem key={country.name} country={country} onClick={() => {}} />;
          })}
        </div>
      </Container>
    </>
  );
}

export default App;
