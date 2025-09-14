import type { BattleProps, PokemonBattleType } from "../../types/types";
import { useState } from "react";
import BattleBox from "../../components/BattleBox/BattleBox";

import "./Battle.scss";
import { Link } from "react-router-dom";
import pikachu from "../../assets/pikachu.png";
import carapuce from "../../assets/carapuce.png";
import salameche from "../../assets/salameche.png";
import bulbizarre from "../../assets/bulbizarre.png";
import mew from "../../assets/mew.png";
import evoli from "../../assets/evoli.png";
import other from "../../assets/unown.png";

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

  const [isPJTurn, setIsPJTurn] = useState<boolean>(true);

  const getPokemonImage = (pokemonName: string): string => {
    switch (pokemonName) {
      case "Pikachu":
        return pikachu;
      case "Carapuce":
        return carapuce;
      case "Salamèche":
        return salameche;
      case "Bulbizarre":
        return bulbizarre;
      case "Mew":
        return mew;
      case "Evoli":
        return evoli;
      default:
        return other;
    }
  };
  const deadPokemon = (pokemonName: string) => {
    setBattleTab((prev) => {
      const copy: PokemonBattleType[] = [...prev];
      const indexToRemove = copy.findIndex((p) => p.name === pokemonName);

      if (indexToRemove === -1) {
        return prev;
      }

      copy.splice(indexToRemove, 1);
      return copy;
    });
  };

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

  const normAttack = (index: number, att: number) => {
    setCurrentHeal(null);
    setCurrentAttacker(battleTab[index].name);

    setBattleTab((prevBattleTab) => {
      const ennemiIndex: number = index === 0 ? 1 : 0;
      const ennemi: PokemonBattleType = prevBattleTab[ennemiIndex];
      const copy: PokemonBattleType[] = [...prevBattleTab];

      let fdm = Math.floor(
        att + Math.floor(Math.random() * 10) - ennemi.def / 1.25
      );
      let dm = Math.floor(Math.random() * 20) === 0 ? fdm * 2 : fdm;
      if (dm < 0) dm = 0;
      setCurrentDm(dm);

      copy[ennemiIndex].currentHp = Math.max(
        0,
        copy[ennemiIndex].currentHp - dm
      );

      if (copy[ennemiIndex].currentHp === 0) {
        setTimeout(() => deadPokemon(copy[ennemiIndex].name), 1000);
      }

      return copy;
    });
  };

  const elemAttack = (index: number, att: number, type: string) => {
    setCurrentHeal(null);
    setCurrentAttacker(battleTab[index].name);

    setBattleTab((prevBattleTab) => {
      if (prevBattleTab.length < 2) return prevBattleTab;

      const ennemiIndex: number = index === 0 ? 1 : 0;
      const ennemi: PokemonBattleType = prevBattleTab[ennemiIndex];
      const copy = [...prevBattleTab];

      let curAtt: number = att;
      const def: number = ennemi.def;

      if (type === "fire" && ennemi.type === "plant") curAtt *= 1.5;
      if (type === "water" && ennemi.type === "fire") curAtt *= 1.5;
      if (type === "plant" && ennemi.type === "water") curAtt *= 1.5;
      if (type === "electrick" && ennemi.type === "water") curAtt *= 1.5;
      if (type === "psy" && ennemi.type === "normal") curAtt *= 1.5;

      if (type === "fire" && ennemi.type === "water") curAtt /= 1.5;
      if (type === "water" && ennemi.type === "plant") curAtt /= 1.5;
      if (type === "plant" && ennemi.type === "fire") curAtt /= 1.5;
      if (type === "normal" && ennemi.type === "psy") curAtt /= 1.5;
      if (type === "psy" && ennemi.type === "electrick") curAtt /= 1.5;

      let fdm: number = Math.floor(
        curAtt + Math.floor(Math.random() * 20) - def / 1.25
      );

      let dm: number;
      if (Math.floor(Math.random() * 20) === 0) {
        dm =
          Math.floor(curAtt + Math.floor(Math.random() * 20) - def / 1.5) * 2;
        alert(`${copy[index].name} inflige des dégâts critiques !`);
      } else {
        dm = fdm;
      }

      if (dm < 1) dm = 1;
      setCurrentDm(dm);

      copy[ennemiIndex].currentHp = Math.max(
        0,
        copy[ennemiIndex].currentHp - dm
      );

      playAttackAnimation(ennemiIndex, type);

      if (copy[ennemiIndex].currentHp === 0) {
        setTimeout(() => deadPokemon(copy[ennemiIndex].name), 1000);
      }

      return copy;
    });
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
  // Adversaire autonome.
  const autoAttack = () => {
    setIsPJTurn(false);

    setTimeout(() => {
      if (battleTab.length < 2) return;

      const PCCaract = battleTab[1];
      const attackTab = [
        () => normAttack(1, PCCaract.att),
        () => elemAttack(1, PCCaract.att, PCCaract.type),
        () => heal(1, PCCaract.hp, PCCaract.def),
      ];

      const randomNumber = Math.floor(Math.random() * attackTab.length);
      attackTab[randomNumber]();
      setIsPJTurn(true);
    }, 4000);
  };

  return (
    <div className="battle-global-box">
      <h2 className="battle-title">Bataille</h2>
      {currentDm !== null && battleTab.length !== 1 && (
        <div className="dm-box">
          {currentAttacker} inflige {currentDm} à son adversaire
        </div>
      )}
      {currentHeal !== null && battleTab.length !== 1 && (
        <div className="dm-box">
          {currentAttacker} se soigne de {currentHeal} points de vie
        </div>
      )}
      <div className="battleList-box">
        {battleTab.length === 1 ? (
          <div className="winner-box">
            <div className="winner-pic-box">
              <img
                src={getPokemonImage(battleTab[0].name)}
                alt="photo de pokemon"
                className="winner-pic"
              />
            </div>
            <div className="winner-message">
              🏆 {battleTab[0].name} est vainqueur ! 🏆
            </div>
            <div className="return-button">
              <Link to="/Library">Retour à la bibliothèque</Link>
            </div>
          </div>
        ) : (
          battleTab?.map((pokemon: PokemonBattleType, index: number) => {
            return (
              <BattleBox
                isPJTurn={isPJTurn}
                index={index}
                pokemon={pokemon}
                currentAttackType={currentAttackType}
                currentAttackerIndex={currentAttackerIndex}
                isAttackCooldown={isAttackCooldown}
                AttackCooldownLauncher={AttackCooldownLauncher}
                autoAttack={autoAttack}
                battleTab={battleTab}
                normAttack={normAttack}
                elemAttack={elemAttack}
                heal={heal}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Battle;
