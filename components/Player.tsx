import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Battle } from "@/types/type";

type PlayerStatisticsProps = {
  players: Battle[];
};

export default function PlayerStatistics({ players }: PlayerStatisticsProps) {
  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Player Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Player</TableHead>
              <TableHead>Wins</TableHead>
              <TableHead>Losses</TableHead>
              <TableHead>Total Won</TableHead>
              <TableHead>Total Lost</TableHead>
              <TableHead>Net Profit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {players.map((player) => (
              <TableRow key={player.name}>
                <TableCell className="font-medium">{player.name}</TableCell>
                <TableCell>{player.wins}</TableCell>
                <TableCell>{player.losses}</TableCell>
                <TableCell>${player.totalWon.toFixed(2)}</TableCell>
                <TableCell>${player.totalLost.toFixed(2)}</TableCell>
                <TableCell
                  className={
                    player.totalWon - player.totalLost > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  ${(player.totalWon - player.totalLost).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
