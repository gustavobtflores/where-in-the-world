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
  const [regions, setRegions] = useState<string[]>([]);
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

  useEffect(() => {
    const getRegions = () => {
      var uniqueRegions: string[] = [];

      countries.forEach((country) => {
        if (uniqueRegions.includes(country.region)) return;
        uniqueRegions.push(country.region);
      });

      setRegions(uniqueRegions);
    };

    getRegions();
  }, [countries]);

  const handleCountrySearch = (event: FormEvent<HTMLInputElement>) => {
    setCountrySearch(event.currentTarget.value);
  };

  const handleCountryPageOpen = (countryName: string) => {
    const countryId = countryName.toLowerCase().replaceAll(" ", "");
    console.log(countryId);
  };

  return (
    <>
      <Header />
      <Container>
        <header className="flex justify-between items-center mt-8">
          <input
            placeholder="Search for a country..."
            type="text"
            className="font-[Nunito Sans] max-w-xs w-full py-4 pl-8 shadow-md bg-light-white rounded-lg outline-none focus:placeholder:invisible focus:border-light-dark-blue border-solid border-[1px] transition-colors"
            onChange={handleCountrySearch}
          />
          <select name="" id="">
            {regions.map((region) => {
              return (
                <option value={region.toLowerCase()} key={region}>
                  {region}
                </option>
              );
            })}
          </select>
        </header>
        <div className="grid grid-cols-countryItem gap-[3.75rem] mt-4">
          {filteredCountries.map((country) => {
            return <CountryItem key={country.name} country={country} onClick={handleCountryPageOpen} />;
          })}
        </div>
      </Container>
    </>
  );
}

export default App;
