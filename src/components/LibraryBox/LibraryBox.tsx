import { useState } from "react";
import axios from "axios";
import type { PokemonType, PokemonBattleType } from "../../types/types";
import "./LibraryBox.scss";
import pikachu from "../../assets/pikachu.png";
import carapuce from "../../assets/carapuce.png";
import salameche from "../../assets/salameche.png";
import bulbizarre from "../../assets/bulbizarre.png";
import mew from "../../assets/mew.png";
import evoli from "../../assets/evoli.png";
import other from "../../assets/unown.png";

interface PokemonTypePropsBox {
  pokemon: PokemonType;
  fetchData: () => void;
  battleTab: PokemonBattleType[];
  setBattleTab: React.Dispatch<React.SetStateAction<PokemonBattleType[]>>;
}

const LibraryBox = ({
  pokemon,
  fetchData,
  battleTab,
  setBattleTab,
}: PokemonTypePropsBox) => {
  const { id, name, type, hp, att, def } = pokemon;
  const [isUpdatePokemon, setIsUpdatePokemon] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>(name);
  const [newType, setNewType] = useState<string>(type);
  const [newHp, setNewHp] = useState<string>(hp.toString());
  const [newAtt, setNewAtt] = useState<string>(att.toString());
  const [newDef, setNewDef] = useState<string>(def.toString());

  const typeColor: string =
    type === "fire"
      ? "lb-type t-fire"
      : type === "water"
      ? "lb-type t-water"
      : type === "plant"
      ? "lb-type t-plant"
      : type === "electrick"
      ? "lb-type t-electrick"
      : type === "psy"
      ? "lb-type t-psy"
      : "lb-type t-base";

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

  const updatePokemon = async () => {
    try {
      await axios.put(`http://localhost:3000/pokemon/${id}`, {
        name: newName,
        type: newType,
        hp: Number(newHp),
        att: Number(newAtt),
        def: Number(newDef),
      });
      alert(`${name} modifié`);
      fetchData();
    } catch (error) {
      console.log(error);
      alert(`Erreur lors de la modification`);
    }
  };
  const deletePokemon = async () => {
    try {
      await axios.delete(`http://localhost:3000/pokemon/${id}`);
      alert(`${name} a bien été supprimé`);
      fetchData();
    } catch (error) {
      console.log(error);
      alert("Erreur lors de la supression");
    }
  };

  const addToBattle = () => {
    if (battleTab.length < 2) {
      const copy = [...battleTab];
      const BattlePokemon = { ...pokemon, currentHp: hp };
      copy.push(BattlePokemon);
      setBattleTab(copy);
    } else {
      const copy = [...battleTab];
      copy.splice(0, 1);
      const BattlePokemon = { ...pokemon, currentHp: hp };
      copy.push(BattlePokemon);
      setBattleTab(copy);
    }
  };
  return (
    <div className="lb-global-box" key={id}>
      <h2 className="lb-name">{name}</h2>
      <div
        className="lb-pict-box"
        onClick={() => {
          addToBattle();
        }}>
        <img src={pokepict} alt="image du pokemon" className="lb-pict" />
      </div>
      <p className={typeColor}>{type}</p>
      <div>
        <div className="lb-carac">
          <p className="lb-hp">HP : {hp}</p>
          <p className="lb-att">Attack : {att}</p>
          <p className="lb-def">Defense : {def}</p>
        </div>
        <div className="lb-button-box">
          {isUpdatePokemon ? (
            <div className="">
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setIsUpdatePokemon(!isUpdatePokemon);
                  updatePokemon();
                }}>
                <input
                  type="text"
                  value={newName}
                  placeholder="name"
                  onChange={(event) => {
                    setNewName(event.target.value);
                  }}
                />
                <input
                  type="text"
                  value={newType}
                  placeholder="fire/water/normal"
                  onChange={(event) => {
                    setNewType(event.target.value);
                  }}
                />
                <input
                  type="number"
                  value={newHp}
                  placeholder="hp max"
                  onChange={(event) => {
                    setNewHp(event.target.value);
                  }}
                />
                <input
                  type="number"
                  value={newAtt}
                  placeholder="attack"
                  onChange={(event) => {
                    setNewAtt(event.target.value);
                  }}
                />
                <input
                  type="number"
                  placeholder="defense"
                  value={newDef}
                  onChange={(event) => {
                    setNewDef(event.target.value);
                  }}
                />
                <button>Envoyer</button>
              </form>
              <button
                onClick={() => {
                  setIsUpdatePokemon(false);
                }}>
                Fermer
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => {
                  addToBattle();
                }}>
                Ajouter au combat
              </button>
              <button onClick={() => setIsUpdatePokemon(!isUpdatePokemon)}>
                Modifier
              </button>
              <button
                onClick={() => {
                  if (
                    confirm("Etes-vous sûr de vouloir supprimer ce pokémon?")
                  ) {
                    deletePokemon();
                  } else {
                    return;
                  }
                }}>
                Supprimer
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LibraryBox;
