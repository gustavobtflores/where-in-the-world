export interface Country {
  name: string;
  population: number;
  capital: string;
  flag: string;
  region: string;
}

interface CountryItemProps {
  country: Country;
  onClick: (countryName: string) => void;
}

export function CountryItem({ country, onClick }: CountryItemProps) {
  return (
    <div
      onClick={() => onClick(country.name)}
      className="rounded-[4px] overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform ease-in-out duration-200 bg-white max-w-[300px] w-full mx-auto"
    >
      <img loading="lazy" className="w-full h-[160px] object-cover" src={country.flag} />
      <div className="p-6 pb-10 bg-light-white">
        <strong className="block text-xl font-bold mb-4">{country.name}</strong>
        <p>
          <strong>Population:</strong> {country.population.toLocaleString()}
        </p>
        <p>
          <strong>Region: </strong>
          {country.region}
        </p>
        <p>
          <strong>Capital: </strong>
          {country.capital || "Unknown"}
        </p>
      </div>
    </div>
  );
}
