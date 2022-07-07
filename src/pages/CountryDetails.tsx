import axios from "axios";
import { ArrowLeft } from "phosphor-react";
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
  borders: string[];
}

export const CountryDetails = () => {
  const [country, setCountry] = useState<CountryDetails>();
  const countryCode = useParams().countryCode;

  useEffect(() => {
    const getCountryDetails = async () => {
      const country = await axios(
        `https://restcountries.com/v3.1/alpha/${countryCode}`
      ).then((res) => {
        return res.data[0];
      });

      const nativeNameId = Object.keys(country.name.nativeName);
      const currenciesId = Object.keys(country.currencies);
      const languages = Object.values(country.languages).join(", ");

      if (country.borders) {
        var borders = await axios(
          `https://restcountries.com/v3.1/alpha?codes=${country.borders.join(
            ","
          )}&fields=name`
        ).then((res) => {
          return res.data.map((border: { name: { common: string } }) => {
            return border.name.common;
          });
        });
      }

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
        borders: borders,
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
            <div className="flex gap-20 items-center">
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
                {country.borders ? (
                  <div className="mt-8 flex items-start">
                    <strong>Border countries:</strong>
                    <div className="max-w-xl flex flex-wrap ml-4 gap-2">
                      {country.borders.map((border) => {
                        return (
                          <span
                            key={border}
                            className="flex items-center justify-center py-1 px-4 min-w-[80px] drop-shadow-sm border-gray-100 border-[1px] bg-light-white"
                          >
                            {border}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </Container>
        </>
      ) : null}
    </>
  );
};
