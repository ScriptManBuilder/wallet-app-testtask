import { useParams, useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import transactions from "../data/transactions.json";
import type { Transaction } from "../types/transaction";
import { formatAmount, formatDateTime } from "../utils/formatters";

export default function TransactionDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const transaction = (transactions as Transaction[]).find(
    (tx) => tx.id === Number(id)
  );

  const goBack = () => navigate("/");

  if (!transaction) {
    return (
      <div className="screen detail-screen">
        <header className="detail-header">
          <button className="back-btn" onClick={goBack} aria-label="Go back">
            <FaChevronLeft />
          </button>
        </header>
        <div className="not-found">
          <p>Transaction not found.</p>
        </div>
      </div>
    );
  }

  const { type, amount, name, description, date, pending } = transaction;

  return (
    <div className="screen detail-screen">
      <header className="detail-header">
        <button className="back-btn" onClick={goBack} aria-label="Go back">
          <FaChevronLeft />
        </button>
      </header>

      <div className="detail-body">
        <div className={`detail-amount ${type === "payment" ? "amount-payment" : ""}`}>
          {formatAmount(amount, type)}
        </div>
        <div className="detail-name">{name}</div>
        <div className="detail-date">{formatDateTime(date)}</div>

        <div className="detail-card">
          <div className="detail-card-section">
            <span className="detail-status">
              <strong>Status:</strong> {pending ? "Pending" : "Approved"}
            </span>
            <span className="detail-description">{description}</span>
          </div>
          <div className="detail-card-divider" />
          <div className="detail-row">
            <span className="detail-label">Total</span>
            <span className="detail-value">{formatAmount(amount, type)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
