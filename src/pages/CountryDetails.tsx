import axios from "axios";
import { ArrowArcLeft, ArrowElbowLeft, ArrowLeft } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container } from "../components/Container";

interface CountryDetails {
  name: {
    common: string;
    native: string;
  };
  population: string;
  capital: string;
  region: string;
  flag: string;
  subregion: string;
  tld: string[];
  currency: string;
  languages: string;
}

export const CountryDetails = () => {
  const [country, setCountry] = useState<CountryDetails>();
  const countryName = useParams().countryName;

  useEffect(() => {
    const getCountryDetails = async () => {
      const country = await axios(
        `https://restcountries.com/v3.1/name/${countryName}`
      ).then((res) => {
        return res.data[0];
      });

      const nativeNameId = Object.keys(country.name.nativeName);
      const currenciesId = Object.keys(country.currencies);
      const languages = Object.values(country.languages).join(", ");
      console.log(languages);

      console.log(country, currenciesId);

      const countryFormatted: CountryDetails = {
        name: {
          common: country.name.common,
          native: country.name.nativeName[nativeNameId[0]]?.common,
        },
        currency: country.currencies[currenciesId[0]].name,
        population: country.population,
        capital: country.capital[0],
        region: country.region,
        flag: country.flags?.svg,
        subregion: country.subregion,
        tld: country.tld[0],
        languages: languages,
      };

      setCountry(countryFormatted);
    };

    getCountryDetails();
  }, []);

  return (
    <>
      {country ? (
        <>
          <Container>
            <Link
              className="py-2 px-6 text-sm inline-flex items-center gap-2 bg-light-white drop-shadow-lg rounded-md my-20 border-[1px] hover:border-blue-500 font-semibold transition-all duration-200"
              to="/"
            >
              <ArrowLeft size={20} />
              Back
            </Link>
            <div className="flex gap-20">
              <img
                className="max-w-lg"
                src={country.flag}
                alt={`${country.name.common} flag`}
              />
              <div className="w-full">
                <h1 className="text-[32px] font-bold text-light-dark-blue mb-8">
                  {country.name.common}
                </h1>
                <div className="flex flex-auto gap-4">
                  <div className="flex flex-col gap-2 flex-auto">
                    <span>
                      <strong>Native name: </strong>
                      {country.name.native}
                    </span>
                    <span>
                      <strong>Population:</strong>{" "}
                      {country.population.toLocaleString()}
                    </span>
                    <span>
                      <strong>Region: </strong>
                      {country.region}
                    </span>
                    <span>
                      <strong>Sub region: </strong>
                      {country.subregion}
                    </span>
                    <span>
                      <strong>Capital: </strong>
                      {country.capital}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 flex-auto">
                    <span>
                      <strong>Top Level Domain: </strong>
                      {country.tld}
                    </span>
                    <span>
                      <strong>Currency: </strong>
                      {country.currency}
                    </span>
                    <span>
                      <strong>Languages: </strong>
                      {country.languages}
                    </span>
                  </div>
                </div>
                <div>
                  <strong>Border countries: </strong>
                </div>
              </div>
            </div>
          </Container>
        </>
      ) : null}
    </>
  );
};
