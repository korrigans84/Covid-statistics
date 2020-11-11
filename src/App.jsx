
import SignUp from "./Components/Auth/SignUp";
import UserProvider from "./providers/UserProvider";
import {usePaginatedFetch} from "./hooks/useFetch";
import {useEffect} from "react";
import CardCountry from "./Components/CardCountry";

export default function App() {
    const { items, load, loading, count, hasMore} = usePaginatedFetch('https://api.covid19api.com/summary')
    useEffect(() => { load() }, [])
    console.log(items)
  return (
      <UserProvider>
      <h1 className="text-primary">Covid - statistics
      </h1>
          <div className="container">
              <div className="row">
                  {items.map(item => <CardCountry country={item} key={item.Country}/>)}
              </div>
          </div>
      </UserProvider>
  );
}
