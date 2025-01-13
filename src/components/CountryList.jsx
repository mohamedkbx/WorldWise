import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";
import { useCities } from "../context/CitiesProvider";
export default function CountryList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;
  if (!cities.length) return <Message message="Add your first Country by clicking on the Map" />;

  const contries = cities.reduce((acc, currCity) => {
    if (!acc.map((curr) => curr.country).includes(currCity.country)) {
      return [...acc, { country: currCity.country, emoji: currCity.emoji }];
    } else return acc;
  }, []);
  return (
    <ul className={styles.countryList}>
      {contries.map((country) => (
        <CountryItem key={country.country} country={country} />
      ))}
    </ul>
  );
}
