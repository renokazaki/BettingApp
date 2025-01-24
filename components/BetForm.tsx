import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { BetFormProps } from "@/types/type";

export default function BetForm({
  players,
  onAddBet,
  onAddPlayer,
}: BetFormProps) {
  const [newBet, setNewBet] = useState({
    winner: "",
    loser: "",
    amount: "",
  });
  const [newPlayerName, setNewPlayerName] = useState("");

  const handleInputChange = (name: string, value: string) => {
    setNewBet((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bet = {
      id: Date.now(),
      datetime: new Date().toLocaleString(),
      winner: newBet.winner,
      loser: newBet.loser,
      amount: Number.parseFloat(newBet.amount),
    };
    onAddBet(bet);
    setNewBet({ winner: "", loser: "", amount: "" });
  };

  const addNewPlayer = () => {
    onAddPlayer(newPlayerName);
    setNewPlayerName("");
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Enhanced Betting Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="winner">Winner</Label>
              <Select
                onValueChange={(value) => handleInputChange("winner", value)}
                value={newBet.winner}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select winner" />
                </SelectTrigger>
                <SelectContent>
                  {players.map((player) => (
                    <SelectItem key={player.name} value={player.name}>
                      {player.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="loser">Loser</Label>
              <Select
                onValueChange={(value) => handleInputChange("loser", value)}
                value={newBet.loser}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select loser" />
                </SelectTrigger>
                <SelectContent>
                  {players.map((player) => (
                    <SelectItem key={player.name} value={player.name}>
                      {player.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                value={newBet.amount}
                onChange={(e) => handleInputChange("amount", e.target.value)}
                placeholder="Bet amount"
                required
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New Player
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Player</DialogTitle>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Enter player name"
                    value={newPlayerName}
                    onChange={(e) => setNewPlayerName(e.target.value)}
                  />
                  <Button onClick={addNewPlayer}>Add</Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button type="submit" className="bg-green-500 hover:bg-green-600">
              Record Bet
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
