import axios from "axios";
import { useEffect, useState } from "react";
import LibraryBox from "../../components/LibraryBox/LibraryBox";
import "./Library.scss";
import type { PokemonType } from "../../types/types";

const Library = () => {
  const [pokemonList, setPokemonList] = useState<PokemonType[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  console.log(pokemonList);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/pokemons/");
        setPokemonList(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <div>chargement en cours...</div>
  ) : (
    <div className="library-global-box">
      <button>AJOTUER UN POKEMON</button>
      <div className="library-pokemon-box-box">
        {pokemonList?.map((pokemon: PokemonType) => {
          const { id, name, type, hp, att, def }: PokemonType = pokemon;
          return (
            <LibraryBox
              id={id}
              name={name}
              type={type}
              hp={hp}
              att={att}
              def={def}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Library;
