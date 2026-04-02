import { useMemo } from "react";
import { FaCreditCard, FaCheckCircle, FaStar } from "react-icons/fa";
import { calculateDailyPoints, formatPoints } from "../utils/dailyPoints";

const CARD_LIMIT = 1500;

function getCardBalance(): number {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const pseudo = ((seed * 9301 + 49297) % 233280) / 233280;
  return Math.round(pseudo * CARD_LIMIT * 100) / 100;
}

export default function SummaryCards() {
  const balance = useMemo(() => getCardBalance(), []);
  const available = CARD_LIMIT - balance;
  const points = useMemo(() => calculateDailyPoints(), []);

  return (
    <div className="summary-cards">
      <div className="summary-card card-balance">
        <div className="card-icon">
          <FaCreditCard />
        </div>
        <span className="card-label">Card Balance</span>
        <span className="card-value">${balance.toFixed(2)}</span>
        <span className="card-sub">${available.toFixed(2)} Available</span>
      </div>

      <div className="summary-card no-payment">
        <div className="no-payment-text">
          <span className="card-label">No Payment Due</span>
          <span className="card-sub">You've paid your balance.</span>
        </div>
        <div className="no-payment-check">
          <FaCheckCircle />
        </div>
      </div>

      <div className="summary-card daily-points">
        <div className="card-icon blue">
          <FaStar />
        </div>
        <span className="card-label">Daily Points</span>
        <span className="card-value">{formatPoints(points)}</span>
      </div>
    </div>
  );
}
