export interface Transaction {
  id: number;
  type: "payment" | "credit";
  amount: number;
  name: string;
  description: string;
  date: string;
  pending: boolean;
  authorizedUser: string | null;
}
