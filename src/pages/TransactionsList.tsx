import SummaryCards from "../components/SummaryCards";
import TransactionItem from "../components/TransactionItem";
import transactions from "../data/transactions.json";
import type { Transaction } from "../types/transaction";

export default function TransactionsList() {
  return (
    <div className="screen transactions-list">
      <header className="screen-header">
        <h1>My Wallet</h1>
      </header>

      <SummaryCards />

      <section className="transactions-section">
        <h2>Latest Transactions</h2>
        <div className="transactions">
          {(transactions as Transaction[]).map((tx) => (
            <TransactionItem key={tx.id} transaction={tx} />
          ))}
        </div>
      </section>
    </div>
  );
}
