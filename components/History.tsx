import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Bet } from "@/types/type";

type BettingHistoryProps = {
  bets: Bet[];
};

export default function BettingHistory({ bets }: BettingHistoryProps) {
  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">履歴</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>時間</TableHead>
              <TableHead>勝ち</TableHead>
              <TableHead>負け</TableHead>
              <TableHead>金額</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bets.map((bet) => (
              <TableRow key={bet.id}>
                <TableCell>{bet.datetime}</TableCell>
                <TableCell className="font-medium text-green-600">
                  {bet.winner}
                </TableCell>
                <TableCell className="font-medium text-red-600">
                  {bet.loser}
                </TableCell>
                <TableCell>{bet.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
