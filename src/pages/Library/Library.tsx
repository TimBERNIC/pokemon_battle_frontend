import axios from "axios";
import { useEffect, useState } from "react";
import LibraryBox from "../../components/LibraryBox/LibraryBox";
import "./Library.scss";
import type {
  PokemonType,
  PokemonBattleType,
  BattleProps,
} from "../../types/types";
import pikachu from "../../assets/pikachu.png";
import carapuce from "../../assets/carapuce.png";
import salameche from "../../assets/salameche.png";
import bulbizarre from "../../assets/bulbizarre.png";
import mew from "../../assets/mew.png";
import evoli from "../../assets/evoli.png";
import other from "../../assets/unown.png";

const Library = ({ battleTab, setBattleTab }: BattleProps) => {
  const [pokemonList, setPokemonList] = useState<PokemonType[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isNewPokemonVisible, setIsNewPokemonSivisible] =
    useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [hp, setHp] = useState<string>("");
  const [att, setAtt] = useState<string>("");
  const [def, setDef] = useState<string>("");
  const [type1, setType1] = useState<string>("");
  const [type2, setType2] = useState<string>("");
  const [searchingWord, setSearchingWord] = useState<string>("");

  useEffect(() => {
    if (type1 || type2) {
      fetchPokemonByType(type1, type2);
    }
  }, [type1, type2]);

  useEffect(() => {
    if (searchingWord) searchingPokemon(searchingWord as string);
  }, [searchingWord]);

  const searchingPokemon = async (name: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/pokemon/name?name=${name}`
      );
      setPokemonList(response.data.message);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/pokemons/");
      setPokemonList(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchPokemonByType = async (t1: string, t2: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/pokemons/types?type=${t1}&type=${t2}`
      );
      setPokemonList(response.data.message);
      console.log(response.data.message);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const sendNewPokemon = async () => {
    if (name !== "" && type !== "") {
      try {
        await axios.post("http://localhost:3000/pokemon/", {
          name: name,
          type: type,
          hp: Number(hp),
          att: Number(att),
          def: Number(def),
        });
        alert(`Le pokémon ${name} a bien été créé`);
        fetchData();
      } catch (error) {
        alert(`Erreur lors de l'envoi`);
        console.log(error);
      }
    } else {
      alert("Veuillez remplir au minimum un nom et un type");
    }
  };

  return isLoading ? (
    <div>chargement en cours...</div>
  ) : (
    <div className="library-global-box">
      <div>
        <input
          type="text"
          value={searchingWord}
          onChange={(event) => {
            setSearchingWord(event.target.value);
          }}
          placeholder="Recherche par nom"
          className="search-input"
        />
        <p
          style={{
            width: "100%",
            textAlign: "center",
            margin: "10px 0",
          }}>
          OU
        </p>
        <div className="select-box">
          <select
            value={type1}
            onChange={(event) => {
              setIsLoading(true);
              setType1(event.target.value);
            }}>
            <option value="">-- Choisir un type --</option>
            <option value="fire">Feu</option>
            <option value="water">Eau</option>
            <option value="plant">Plante</option>
            <option value="electrick">Electrique</option>
            <option value="normal">Normal</option>
            <option value="psy">Psychique</option>
          </select>
          <select
            value={type2}
            onChange={(event) => {
              setIsLoading(true);
              setType2(event.target.value);
            }}>
            <option value="">-- Choisir un type --</option>
            <option value="fire">Feu</option>
            <option value="water">Eau</option>
            <option value="plant">Plante</option>
            <option value="electrick">Electrique</option>
            <option value="normal">Normal</option>
            <option value="psy">Psychique</option>
          </select>
        </div>
      </div>
      <button onClick={() => setIsNewPokemonSivisible(!isNewPokemonVisible)}>
        AJOUTER UN POKEMON
      </button>
      {isNewPokemonVisible ? (
        <div className="">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              sendNewPokemon();
            }}>
            <input
              type="text"
              value={name}
              placeholder="name"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <input
              type="text"
              value={type}
              placeholder="fire/water/normal"
              onChange={(event) => {
                setType(event.target.value);
              }}
            />
            <input
              type="number"
              value={hp}
              placeholder="hp max"
              onChange={(event) => {
                setHp(event.target.value);
              }}
            />
            <input
              type="number"
              value={att}
              placeholder="attack"
              onChange={(event) => {
                setAtt(event.target.value);
              }}
            />
            <input
              type="number"
              placeholder="defense"
              value={def}
              onChange={(event) => {
                setDef(event.target.value);
              }}
            />
            <button>Créer</button>
          </form>
        </div>
      ) : null}
      <div className="l-battle">
        <h2 className="l-battle-title">Bataille</h2>
        <div className="l-battleList">
          {battleTab?.map((pokemon, index) => {
            const { id, name } = pokemon;
            const pokepict: string =
              name === "Pikachu"
                ? pikachu
                : name === "Carapuce"
                ? carapuce
                : name === "Salamèche"
                ? salameche
                : name === "Bulbizarre"
                ? bulbizarre
                : name === "Mew"
                ? mew
                : name === "Evoli"
                ? evoli
                : other;

            return (
              <>
                <div key={id} className="l-battle-pokebox">
                  <div className="l-battle-pic-box">
                    <img
                      src={pokepict}
                      alt="photo de pokemon"
                      className="l-battle-pic"
                    />
                  </div>
                  <div className="l-battle-name">{name}</div>
                </div>
                {battleTab.length === 2 && index !== 1 && (
                  <p className="l-battle-Versus">VS</p>
                )}
              </>
            );
          })}
        </div>
      </div>
      <div className="library-pokemon-box-box">
        {pokemonList && pokemonList.length > 0 ? (
          pokemonList
            ?.sort((a, b) => a.name.localeCompare(b.name))
            .map((pokemon: PokemonType) => {
              return (
                <LibraryBox
                  pokemon={pokemon}
                  fetchData={fetchData}
                  battleTab={battleTab}
                  setBattleTab={setBattleTab}
                />
              );
            })
        ) : (
          <div>Aucun pokémon trouvé</div>
        )}
      </div>
    </div>
  );
};

export default Library;
