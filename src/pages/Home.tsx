import axios from "axios";
import { useState, useEffect, FormEvent } from "react";
import { Container } from "../components/Container";
import { CountriesList } from "../components/CountriesList";
import { Country } from "../components/CountryItem";
import { SearchInput } from "../components/SearchInput";
import { Select } from "../components/Select";

export interface CountryResponse {
  name: {
    common: string;
  };
  population: number;
  capital: [string];
  flags: {
    png: string;
  };
  region: string;
  cioc: string;
}

export const Home = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [countrySearch, setCountrySearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [filteredCountries, setFilteredCountries] = useState<Country[] | null>(
    null
  );

  function meetsSearchCriteria(country: Country) {
    return country.name.toLowerCase().includes(countrySearch.toLowerCase());
  }

  function meetsRegionCriteria(country: Country) {
    return country.region.toLowerCase() === selectedRegion.toLowerCase();
  }

  useEffect(() => {
    async function getCountries() {
      const countries = await axios(
        "https://restcountries.com/v3.1/all?fields=name,population,capital,region,flags,cioc"
      ).then((response) => {
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
          code: country.cioc,
        };
      });

      setCountries(countriesFormatted);
    }

    getCountries();
  }, []);

  useEffect(() => {
    var result = countries;

    if (countrySearch.length > 0) {
      result = result.filter(meetsSearchCriteria);
    }

    if (selectedRegion !== "") {
      result = result.filter(meetsRegionCriteria);
    }

    setFilteredCountries(result);
  }, [countrySearch, selectedRegion, countries]);

  function onRegionSelected(region: string) {
    setSelectedRegion(region);
  }

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

  return (
    <div className="pt-8 bg-background-light dark:bg-background-dark min-h-screen pb-8">
      <Container>
        <header className="flex justify-between items-center">
          <SearchInput onChange={handleCountrySearch} />
          <Select onRegionSelected={onRegionSelected} options={regions} />
        </header>
        <CountriesList
          countries={filteredCountries ? filteredCountries : countries}
        />
      </Container>
    </div>
  );
};
