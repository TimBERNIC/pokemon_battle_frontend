export interface PokemonType {
  id: number;
  name: string;
  type: string;
  hp: number;
  att: number;
  def: number;
}
export interface PokemonBattleType extends PokemonType {
  currentHp: number;
}

export interface BattleProps {
  battleTab: PokemonBattleType[];
  setBattleTab: React.Dispatch<React.SetStateAction<PokemonBattleType[]>>;
}
