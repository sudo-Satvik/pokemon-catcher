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
      <h1 className="text-center mt-5 text-5xl font-semibold">Pokemon Catcher</h1>
      <p className="p-4 m-4"></p>
      {/* <Card /> */}

      <div className="container h-full w-full mx-auto grid grid-cols-5 gap-y-10 mb-20">
        <Card img={} name={} style={} exp={} atk={} abl={} hgt={} wgt={} spd={} />
      </div>

    </>
  );
};

export { Pokemon };
