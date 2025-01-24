"use client";

import { useState, useEffect } from "react";
import BetForm from "./BetForm";
import Player from "./Player";
import History from "./History";
import { Battle, Bet } from "@/types/type";

export default function Main() {
  const [bets, setBets] = useState<Bet[]>([]);
  const [players, setPlayers] = useState<Battle[]>([]);

  useEffect(() => {
    const storedPlayers = localStorage.getItem("players");
    if (storedPlayers) {
      setPlayers(JSON.parse(storedPlayers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  const updatePlayerStats = (bet: Bet) => {
    setPlayers((prevPlayers) => {
      const updatedPlayers = [...prevPlayers];

      // findIndex の戻り値を取得
      const winnerIndex: number = updatedPlayers.findIndex(
        (p) => p.name === bet.winner
      );
      const loserIndex: number = updatedPlayers.findIndex(
        (p) => p.name === bet.loser
      );

      const betAmount = bet.amount;

      // 勝者のデータを更新
      if (winnerIndex !== -1) {
        updatedPlayers[winnerIndex].wins += 1;
        updatedPlayers[winnerIndex].totalWon += betAmount;
      }

      // 敗者のデータを更新
      if (loserIndex !== -1) {
        updatedPlayers[loserIndex].losses += 1;
        updatedPlayers[loserIndex].totalLost += betAmount;
      }

      return updatedPlayers;
    });
  };

  const addBet = (bet: Bet) => {
    setBets((prev) => [bet, ...prev]);
    updatePlayerStats(bet);
  };

  const addPlayer = (playerName: string) => {
    if (playerName && !players.some((p) => p.name === playerName)) {
      const newPlayer: Battle = {
        name: playerName,
        wins: 0,
        losses: 0,
        totalWon: 0,
        totalLost: 0,
      };
      setPlayers((prev) => [...prev, newPlayer]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <BetForm players={players} onAddBet={addBet} onAddPlayer={addPlayer} />
        <Player players={players} />
        <History bets={bets} />
      </div>
    </div>
  );
}
