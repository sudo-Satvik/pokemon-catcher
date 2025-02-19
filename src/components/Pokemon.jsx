import { useEffect } from "react";
import Card from "./Card";

const Pokemon = () => {
  const API = "https://pokeapi.co/api/v2/pokemon?limit=100"; // Reduced limit

  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();

      if (!data.results) {
        throw new Error("Invalid API response structure");
      }

      // Fetch detailed data
      const detailedData = await Promise.all(
        data.results.map(async (currVal) => {
          const res = await fetch(currVal.url);
          const data = await res.json();
          return data;
        })
      );

      console.log("Pokemon Data:", detailedData);
    } catch (err) {
      console.error("Error fetching Pokémon:", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchPokemon();
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>Pokemon</h1>
      <p className="p-4 m-4"></p>
      <Card />
    </>
  );
};

export { Pokemon };
