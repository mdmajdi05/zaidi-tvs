"use client";

import { useState } from "react";

/** Simple EMI estimator (flat inputs, no prices invented). */
export default function EmiCalc() {
  const [amount, setAmount] = useState(95000);
  const [downPct, setDownPct] = useState(20);
  const [months, setMonths] = useState(24);
  const principal = amount * (1 - downPct / 100);
  const r = 0.115 / 12; // ~11.5% reducing approx
  const emi =
    principal > 0 && months > 0
      ? (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1)
      : 0;

  return (
    <div className="emi-box">
      <div className="emi-row">
        <label htmlFor="emi-amt">On-road budget (₹)</label>
        <input
          id="emi-amt"
          type="range"
          min={40000}
          max={200000}
          step={1000}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <b>₹{amount.toLocaleString("en-IN")}</b>
      </div>
      <div className="emi-row">
        <label htmlFor="emi-down">Down payment ({downPct}%)</label>
        <input
          id="emi-down"
          type="range"
          min={10}
          max={80}
          step={5}
          value={downPct}
          onChange={(e) => setDownPct(Number(e.target.value))}
        />
        <b>₹{Math.round((amount * downPct) / 100).toLocaleString("en-IN")}</b>
      </div>
      <div className="emi-row">
        <label htmlFor="emi-mon">Tenure ({months} mo)</label>
        <input
          id="emi-mon"
          type="range"
          min={6}
          max={48}
          step={6}
          value={months}
          onChange={(e) => setMonths(Number(e.target.value))}
        />
        <b>{months} months</b>
      </div>
      <div className="emi-out">
        <small>ESTIMATED EMI*</small>
        <strong>₹{Math.round(emi).toLocaleString("en-IN")}/mo</strong>
        <p>
          *Indicative only — estimated at an assumed ~11.5% p.a. Final EMI depends on the
          lender, CIBIL score and the offers live at purchase time.
        </p>
      </div>
    </div>
  );
}
