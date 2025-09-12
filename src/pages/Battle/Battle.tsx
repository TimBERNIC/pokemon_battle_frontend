import type { BattleProps, PokemonBattleType } from "../../types/types";
import { useState } from "react";
import pikachu from "../../assets/pikachu.png";
import carapuce from "../../assets/carapuce.png";
import salameche from "../../assets/salameche.png";
import bulbizarre from "../../assets/bulbizarre.png";
import mew from "../../assets/mew.png";
import evoli from "../../assets/evoli.png";
import other from "../../assets/unown.png";
import "./Battle.scss";

const Battle: React.FC<BattleProps> = ({ battleTab, setBattleTab }) => {
  const [currentDm, setCurrentDm] = useState<number | null>(null);
  const [currentAttacker, setCurrentAttacker] = useState<string>("");
  const [currentHeal, setCurrentHeal] = useState<number | null>(null);
  const [isAttackCooldown, setIsAttackCooldown] = useState<boolean>(false);
  const [currentAttackType, setCurrentAttackType] = useState<string | null>(
    null
  );
  const [currentAttackerIndex, setCurrentAttackerIndex] = useState<
    number | null
  >(null);

  const AttackCooldownLauncher = () => {
    setIsAttackCooldown(true);
    setTimeout(() => {
      setIsAttackCooldown(false);
    }, 4500);
  };

  const playAttackAnimation = (attackerIndex: number, type: string) => {
    setCurrentAttackType(type);
    setCurrentAttackerIndex(attackerIndex);
    setTimeout(() => {
      setCurrentAttackType(null);
      setCurrentAttackerIndex(null);
    }, 1500);
  };

  // Adversaire autonome.
  const normAttack = (index: number, att: number) => {
    setCurrentHeal(null);
    const ennemi: PokemonBattleType = index === 0 ? battleTab[1] : battleTab[0];
    const ennemieIndex: number = index === 0 ? 1 : 0;
    playAttackAnimation(ennemieIndex, "normal");
    const def: number = ennemi.def;
    let dm: number = 0;
    setCurrentAttacker(battleTab[index].name);
    let fdm: number = Math.floor(
      att + Math.floor(Math.random() * 10) - def / 1.25
    );
    if (Math.floor(Math.random() * 20) === 0) {
      dm = fdm * 2;
      alert(`${battleTab[index].name} inflige des dégats critiques`);
    } else {
      dm = fdm;
    }

    if (dm < 0) {
      dm = 0;
    }
    setCurrentDm(dm);
    const copy: PokemonBattleType[] = [...battleTab];
    if (index === 0) {
      copy[1].currentHp -= dm;
      if (copy[1].currentHp < 0) {
        copy[1].currentHp = 0;
      }
    } else {
      copy[0].currentHp -= dm;
      if (copy[0].currentHp < 0) {
        copy[0].currentHp = 0;
      }
    }
    if (ennemi.currentHp <= 0) {
      alert(`${currentAttacker} a battu ${ennemi.name} adverse!`);
      copy.splice(ennemieIndex, 1);
    }
    setBattleTab(copy);
  };

  const elemAttack = (index: number, att: number, type: string) => {
    setCurrentHeal(null);
    const ennemi: PokemonBattleType = index === 0 ? battleTab[1] : battleTab[0];
    const ennemieIndex: number = index === 0 ? 1 : 0;
    playAttackAnimation(ennemieIndex, type);
    setCurrentAttacker(battleTab[index].name);
    let curAtt: number = att;
    let def: number = ennemi.def;
    let dm: number = 0;

    // Conditions de dégats majorés par type

    type === "fire" && ennemi.type === "plant" && (curAtt *= 1.5);
    type === "water" && ennemi.type === "fire" && (curAtt *= 1.5);
    type === "plant" && ennemi.type === "water" && (curAtt *= 1.5);
    type === "electrick" && ennemi.type === "water" && (curAtt *= 1.5);
    type === "psy" && ennemi.type === "normal" && (curAtt *= 1.5);

    // Conditions de dégats minoré par type

    type === "fire" && ennemi.type === "water" && (curAtt /= 1.5);
    type === "water" && ennemi.type === "plant" && (curAtt /= 1.5);
    type === "plant" && ennemi.type === "fire" && (curAtt /= 1.5);
    type === "normal" && ennemi.type === "psy" && (curAtt /= 1.5);
    type === "psy" && ennemi.type === "electrick" && (curAtt /= 1.5);

    let fdm: number = Math.floor(
      curAtt + Math.floor(Math.random() * 20) - def / 1.25
    );

    // Gestion des crits
    if (Math.floor(Math.random() * 20) === 0) {
      dm = Math.floor(curAtt + Math.floor(Math.random() * 20) - def / 1.5) * 2;
      alert(`${battleTab[index].name} inflige des dégats critiques`);
    } else {
      dm = fdm;
    }

    if (dm < 1) {
      dm = 1;
    }
    setCurrentDm(dm);

    const copy: PokemonBattleType[] = [...battleTab];
    if (index === 0) {
      copy[1].currentHp -= dm;
      if (copy[1].currentHp < 0) {
        copy[1].currentHp = 0;
      }
    } else {
      copy[0].currentHp -= dm;
      if (copy[0].currentHp < 0) {
        copy[0].currentHp = 0;
      }
    }
    if (ennemi.currentHp <= 0) {
      alert(`${currentAttacker} a battu ${ennemi.name} adverse!`);
      copy.splice(ennemieIndex, 1);
    }
    setBattleTab(copy);
  };

  const heal = (index: number, hp: number, def: number) => {
    playAttackAnimation(index, "heal");
    setCurrentDm(null);
    setCurrentAttacker(battleTab[index].name);
    let totalHeal: number = Math.floor(
      (hp + def + Math.floor(Math.random() * 10)) * 0.25
    );

    const copy = [...battleTab];
    copy[index].currentHp += totalHeal;
    copy[index].currentHp > hp && (copy[index].currentHp = hp);
    setBattleTab(copy);
    setCurrentHeal(totalHeal);
    setTimeout(() => {
      setIsAttackCooldown(false);
    }, 4500);
  };

  const autoAttack = () => {
    setTimeout(() => {
      setBattleTab((prevBattleTab) => {
        if (prevBattleTab.length < 2) return prevBattleTab;

        const PCCaract = prevBattleTab[1];
        const attackTab = [
          () => normAttack(1, PCCaract.att),
          () => elemAttack(1, PCCaract.att, PCCaract.type),
          () => heal(1, PCCaract.hp, PCCaract.def),
        ];

        const randomNumber = Math.floor(Math.random() * attackTab.length);
        attackTab[randomNumber]();

        return prevBattleTab;
      });
    }, 4000);
  };

  return (
    <div className="battle-global-box">
      <h2 className="battle-title">Bataille</h2>
      {currentDm !== null && (
        <div className="dm-box">
          {currentAttacker} inflige {currentDm} à son adversaire
        </div>
      )}
      {currentHeal !== null && (
        <div>
          {currentAttacker} se soigne de {currentHeal} points de vie
        </div>
      )}
      <div className="battleList-box">
        {battleTab?.map((pokemon: PokemonBattleType, index: number) => {
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
                <div className="battle-pic-box">
                  <div className="battle-pokebox-picName">
                    <img
                      src={pokepict}
                      alt="photo de pokemon"
                      className="battle-pic"
                    />
                  </div>
                  <div className="battle-name">{name}</div>
                </div>
                {currentAttackType && currentAttackerIndex === index && (
                  <div
                    className={`attack-animation ${currentAttackType}-attack`}>
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
                {index === 0 ? (
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
        })}
      </div>
    </div>
  );
};

export default Battle;
