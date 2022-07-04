import axios from "axios";
import { ArrowArcLeft, ArrowElbowLeft, ArrowLeft } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container } from "../components/Container";
import { Country } from "../components/CountryItem";

interface CountryDetails {
  name: {
    common: string;
    native: string;
  };
  population: string;
  capital: string;
  region: string;
  flag: string;
}

export const CountryDetails = () => {
  const [country, setCountry] = useState<CountryDetails>();
  const countryName = useParams().countryName;

  useEffect(() => {
    const getCountryDetails = async () => {
      const country = await axios(
        `https://restcountries.com/v3.1/name/${countryName}`
      ).then((res) => {
        console.log(res.data);
        return res.data[0];
      });

      const countryFormatted: CountryDetails = {
        name: {
          common: country.name.common,
          native: country.name.nativeName,
        },
        population: country.population,
        capital: country.capital[0],
        region: country.region,
        flag: country.flags?.png,
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
              className="py-2 px-6 text-sm inline-flex items-center gap-2 bg-light-white drop-shadow-lg rounded-md my-20 hover:bg-zinc-100 font-semibold transition-all duration-200"
              to="/"
            >
              <ArrowLeft size={20} />
              Back
            </Link>
            <div className="flex gap-20">
              <img src={country.flag} alt="" />
              <div>
                <h1 className="text-[32px] font-bold text-light-dark-blue">
                  {country.name.common}
                </h1>
                <div>
                  <span>Native name:</span>
                </div>
              </div>
            </div>
          </Container>
        </>
      ) : null}
    </>
  );
};
