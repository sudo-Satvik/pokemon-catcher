import { useEffect, useState, useRef, useCallback } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import Card from "./Card";
import SkeletonCard from "./SkeletonCard"; // Skeleton loading component

const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleItems, setVisibleItems] = useState({});
  const itemsPerPage = 10;
  const observer = useRef(null);

  const API = "https://pokeapi.co/api/v2/pokemon?limit=500";

  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();

      if (!data.results) {
        throw new Error("Invalid API response structure");
      }

      const mappedData = data.results.map((poke, index) => ({
        id: index + 1,
        name: poke.name,
        url: poke.url,
        details: null
      }));

      setPokemon(mappedData);
      setFilteredPokemon(mappedData);
    } catch (err) {
      console.error("Error fetching Pokémon:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPokemonDetails = async (index) => {
    if (!pokemon[index]?.details) {
      try {
        const res = await fetch(pokemon[index].url);
        const details = await res.json();
        setPokemon((prev) =>
          prev.map((poke, i) => (i === index ? { ...poke, details } : poke))
        );
        setVisibleItems((prev) => ({ ...prev, [index]: true }));
      } catch (err) {
        console.error("Error fetching Pokémon details:", err);
      }
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredPokemon(pokemon);
    } else {
      setFilteredPokemon(
        pokemon.filter((poke) =>
          poke.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    setCurrentPage(1);
  }, [searchTerm, pokemon]);

  const totalPages = Math.ceil(filteredPokemon.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPokemon.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (e) => {
    let newPage = parseInt(e.target.value, 10);
    if (!isNaN(newPage) && newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const lastPokemonRef = useCallback(
    (node) => {
      if (loading || !node) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          const index = indexOfFirstItem + currentItems.length - 1;
          fetchPokemonDetails(index);
        }
      });
      observer.current.observe(node);
    },
    [loading, currentItems, indexOfFirstItem, fetchPokemonDetails]
  );

  return (
    <>
      <h1 className="text-center mt-5 text-5xl font-semibold">
        Pokemon Catcher
      </h1>

      {/* Search Bar */}
      <div className="flex items-center justify-center mt-6">
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Search Pokémon..."
            className="w-full px-4 py-2 pl-10 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Pokémon Cards */}
          <div className="container h-full w-full mx-auto grid grid-cols-5 gap-y-10 mt-10 mb-20">
            {currentItems.length > 0 ? (
              currentItems.map((currVal, index) => {
                return (
                  <div
                    key={currVal.id}
                    ref={
                      index === currentItems.length - 1 ? lastPokemonRef : null
                    }
                  >
                    {visibleItems[indexOfFirstItem + index] ||
                    currVal.details ? (
                      currVal.details ? (
                        <Card data={currVal} />
                      ) : (
                        <SkeletonCard />
                      )
                    ) : (
                      <SkeletonCard />
                    )}
                  </div>
                );
              })
            ) : (
              <p className="col-span-5 text-center text-xl font-semibold text-gray-500">
                No Pokémon found!
              </p>
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center my-6">
              <button
                className={`px-4 py-2 mx-2 rounded-lg ${
                  currentPage === 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="inline-block w-5 h-5" />
              </button>

              <span className="text-lg font-semibold">
                Page{" "}
                <input
                  type="number"
                  className="w-14 text-center border border-gray-400 rounded-md px-2"
                  value={currentPage}
                  onChange={handlePageChange}
                  min="1"
                  max={totalPages}
                />{" "}
                of {totalPages}
              </span>

              <button
                className={`px-4 py-2 mx-2 rounded-lg ${
                  currentPage === totalPages
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="inline-block w-5 h-5" />
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export { Pokemon };
