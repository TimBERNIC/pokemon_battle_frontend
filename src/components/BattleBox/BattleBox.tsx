import type { PokemonBattleType } from "../../types/types";
import "./BattleBox.scss";
import pikachu from "../../assets/pikachu.png";
import carapuce from "../../assets/carapuce.png";
import salameche from "../../assets/salameche.png";
import bulbizarre from "../../assets/bulbizarre.png";
import mew from "../../assets/mew.png";
import evoli from "../../assets/evoli.png";
import other from "../../assets/unown.png";

const BattleBox = ({
  isPJTurn,
  index,
  pokemon,
  currentAttackType,
  currentAttackerIndex,
  isAttackCooldown,
  AttackCooldownLauncher,
  autoAttack,
  battleTab,
  normAttack,
  elemAttack,
  heal,
}: {
  isPJTurn: boolean;
  index: number;
  pokemon: PokemonBattleType;
  currentAttackType: string | null;
  currentAttackerIndex: number | null;
  isAttackCooldown: boolean;
  AttackCooldownLauncher: () => void;
  autoAttack: () => void;
  battleTab: PokemonBattleType[];
  normAttack: (index: number, att: number) => void;
  elemAttack: (index: number, att: number, type: string) => void;
  heal: (index: number, hp: number, def: number) => void;
}) => {
  const { id, name, type, currentHp, hp, def, att } = pokemon;
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

  const typeColor: string =
    type === "fire"
      ? "battle-button b-fire"
      : type === "water"
      ? "battle-button b-water"
      : type === "plant"
      ? "battle-button b-plant"
      : type === "electrick"
      ? "battle-button b-electrick"
      : type === "psy"
      ? "battle-button b-psy"
      : "battle-button b-base";

  return (
    <div className="battle-global-pokebox" key={id}>
      <div className="battle-pokebox">
        <div className="battle-picNlifeNname-box">
          <div className="battle-pic-box">
            <div
              className={`battle-picNlifeNname-box ${
                (isPJTurn && index === 0) || (!isPJTurn && index === 1)
                  ? "battle-active"
                  : ""
              }`}>
              <img
                src={pokepict}
                alt="photo de pokemon"
                className="battle-pic"
              />
            </div>
            <div className="battle-name">{name}</div>
          </div>
          {currentAttackType && currentAttackerIndex === index && (
            <div className={`attack-animation ${currentAttackType}-attack`}>
              {currentAttackType === "normal"
                ? "💥"
                : currentAttackType === "fire"
                ? "🔥"
                : currentAttackType === "water"
                ? "💧"
                : currentAttackType === "plant"
                ? "🌿"
                : currentAttackType === "electrick"
                ? "⚡"
                : currentAttackType === "psy"
                ? "🔮"
                : currentAttackType === "heal"
                ? "💖"
                : "💥"}
            </div>
          )}
          {battleTab.length > 1 && (
            <div className="hp-container">
              <div className="hp-text">
                {currentHp}/{hp}
              </div>
              <div
                className="hp-fill"
                style={{
                  width: `${(currentHp / hp) * 100}%`,
                  backgroundColor:
                    currentHp / hp > 0.5
                      ? "#4caf50"
                      : currentHp / hp > 0.2
                      ? "#ff9800"
                      : "#f44336",
                }}></div>
            </div>
          )}
        </div>
        {index === 0 && battleTab.length > 1 ? (
          <div className="battle-pokebox-attacks">
            <button
              disabled={isAttackCooldown}
              className="battle-button"
              onClick={() => {
                normAttack(index, att);
                autoAttack();
                AttackCooldownLauncher();
              }}>
              Normal
            </button>
            <button
              disabled={isAttackCooldown}
              className={typeColor}
              onClick={() => {
                elemAttack(index, att, type);
                autoAttack();
                AttackCooldownLauncher();
              }}>
              Elementaire
            </button>
            <button
              disabled={isAttackCooldown}
              className="battle-button heal-button"
              onClick={() => {
                heal(index, hp, def);
                autoAttack();
                AttackCooldownLauncher();
              }}>
              Soins
            </button>
          </div>
        ) : (
          <div className="empty-zone"></div>
        )}
      </div>
      {battleTab.length === 2 && index !== 1 && (
        <p className="battle-Versus">VS</p>
      )}
    </div>
  );
};

export default BattleBox;
