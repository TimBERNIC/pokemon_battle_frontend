import type { PokemonType } from "../../types/types";
import "./LibraryBox.scss";
import pikachu from "../../assets/pikachu.png";
import carapuce from "../../assets/carapuce.png";
import salameche from "../../assets/salameche.png";
import bulbizarre from "../../assets/bulbizarre.png";
import mew from "../../assets/mew.png";
import evoli from "../../assets/evoli.png";
import other from "../../assets/unown.png";

const LibraryBox = ({ id, name, type, hp, att, def }: PokemonType) => {
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
      : name === "Squirtle"
      ? carapuce
      : name === "Charmander"
      ? salameche
      : name === "Bulbasaur"
      ? bulbizarre
      : name === "Mew"
      ? mew
      : name === "Evoli"
      ? evoli
      : other;

  return (
    <div className="lb-global-box" key={id}>
      <h2 className="lb-name">{name}</h2>
      <div className="lb-pict-box">
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
          <button>Ajouter au combat</button>
          <button>Modifier</button>
          <button>Supprimer</button>
        </div>
      </div>
    </div>
  );
};

export default LibraryBox;
