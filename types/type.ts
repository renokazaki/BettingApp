export type Bet = {
  id: number;
  datetime: string;
  winner: string;
  loser: string;
  amount: number;
};

export type Battle = {
  name: string;
  wins: number;
  losses: number;
  totalWon: number;
  totalLost: number;
};


export type BetFormProps = {
  players: Battle[];
  onAddBet: (bet: {
    id: number;
    datetime: string;
    winner: string;
    loser: string;
    amount: number;
  }) => void;
  onAddPlayer: (playerName: string) => void;
};