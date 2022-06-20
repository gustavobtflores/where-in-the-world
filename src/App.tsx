import axios from "axios";
import { useEffect, useState } from "react";
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

  return (
    <>
      <Header />
      <Container className="grid grid-cols-countryItem gap-[3.75rem] bg-light-gray mt-4">
        {countries.map((country) => {
          return <CountryItem key={country.name} country={country} onClick={() => {}} />;
        })}
      </Container>
    </>
  );
}

export default App;
