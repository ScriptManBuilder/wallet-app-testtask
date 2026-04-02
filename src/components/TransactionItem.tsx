import { useNavigate } from "react-router-dom";
import type { IconType } from "react-icons";
import {
  FaApple,
  FaCreditCard,
  FaCouch,
  FaMusic,
  FaBullseye,
  FaCar,
  FaAmazon,
  FaTv,
  FaShoppingCart,
  FaStore,
} from "react-icons/fa";
import type { Transaction } from "../types/transaction";
import { formatAmount, formatDate } from "../utils/formatters";

const iconMap: Record<string, IconType> = {
  "Apple Store": FaApple,
  "Payment Thank You": FaCreditCard,
  IKEA: FaCouch,
  Spotify: FaMusic,
  Target: FaBullseye,
  Uber: FaCar,
  Amazon: FaAmazon,
  Netflix: FaTv,
  Walmart: FaShoppingCart,
};

function getIcon(name: string): IconType {
  return iconMap[name] ?? FaStore;
}

interface TransactionItemProps {
  transaction: Transaction;
}

export default function TransactionItem({ transaction }: TransactionItemProps) {
  const navigate = useNavigate();
  const { id, type, amount, name, description, date, pending, authorizedUser } =
    transaction;

  const Icon = getIcon(name);
  const formattedDate = formatDate(date);
  const subtitle = pending ? `Pending - ${description}` : description;
  const dateLine = authorizedUser
    ? `${authorizedUser} - ${formattedDate}`
    : formattedDate;

  const handleClick = () => navigate(`/transaction/${id}`);
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className="transaction-item"
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div className="transaction-icon"><Icon /></div>
      <div className="transaction-body">
        <div className="transaction-row-top">
          <span className="transaction-name">{name}</span>
          <span className={`transaction-amount ${type === "payment" ? "amount-payment" : ""}`}>
            {formatAmount(amount, type)}
          </span>
        </div>
        <span className="transaction-desc">{subtitle}</span>
        <span className="transaction-date">{dateLine}</span>
      </div>
    </div>
  );
}
