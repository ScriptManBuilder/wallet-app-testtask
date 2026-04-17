import { useNavigate } from "react-router-dom";
import type { IconType } from "react-icons";
import {
  FaApple,
  FaCreditCard,
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

interface BrandStyle {
  icon: IconType;
  bg: string;
  color: string;
}

const brandMap: Record<string, BrandStyle> = {
  "Apple Store": {
    icon: FaApple,
    bg: "linear-gradient(135deg, #fb8b24, #e5383b, #9b5de5, #4cc9f0)",
    color: "#fff",
  },
  "Payment Thank You": {
    icon: FaCreditCard,
    bg: "#1a1a2e",
    color: "#fff",
  },
  IKEA: {
    icon: FaStore,
    bg: "#003da5",
    color: "#ffcc00",
  },
  Target: {
    icon: FaBullseye,
    bg: "#ffffff",
    color: "#cc0000",
  },
  Uber: {
    icon: FaCar,
    bg: "#000000",
    color: "#fff",
  },
  Amazon: {
    icon: FaAmazon,
    bg: "#232f3e",
    color: "#ff9900",
  },
  Spotify: {
    icon: FaMusic,
    bg: "#1db954",
    color: "#fff",
  },
  Netflix: {
    icon: FaTv,
    bg: "#e50914",
    color: "#fff",
  },
  Walmart: {
    icon: FaShoppingCart,
    bg: "#0071ce",
    color: "#ffc220",
  },
};

const defaultBrand: BrandStyle = {
  icon: FaStore,
  bg: "#1a1a2e",
  color: "#fff",
};

function getBrand(name: string): BrandStyle {
  return brandMap[name] ?? defaultBrand;
}

interface TransactionItemProps {
  transaction: Transaction;
}

export default function TransactionItem({ transaction }: TransactionItemProps) {
  const navigate = useNavigate();
  const { id, type, amount, name, description, date, pending, authorizedUser } =
    transaction;

  const brand = getBrand(name);
  const Icon = brand.icon;
  const formattedDate = formatDate(date);
  const subtitle = pending ? `Pending - ${description}` : description;
  const dateLine = authorizedUser
    ? `${authorizedUser} - ${formattedDate}`
    : formattedDate;

  const iconStyle: React.CSSProperties = {
    background: brand.bg,
    color: brand.color,
  };

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
      <div className="transaction-icon" style={iconStyle}><Icon /></div>
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
