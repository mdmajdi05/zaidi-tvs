"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { wa } from "@data/site";

const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(n) ? Math.max(0, Math.round(n)) : 0);

/** Quick price presets so users do not have to guess a number. */
const PRESETS: Array<{ label: string; price: number }> = [
  { label: "Radeon", price: 60000 },
  { label: "Jupiter", price: 76000 },
  { label: "Ntorq 125", price: 86000 },
  { label: "Apache 160", price: 120000 },
  { label: "Apache 310", price: 245000 },
];

const TENURES = [6, 12, 18, 24, 36, 48];

export default function FinanceCalculator() {
  const [price, setPrice] = useState(86000);
  const [down, setDown] = useState(15000);
  const [months, setMonths] = useState(24);
  const [rate, setRate] = useState(9.5);

  const { emi, loan, interest, total } = useMemo(() => {
    const loanAmount = Math.max(0, price - down);
    const monthlyRate = rate / 12 / 100;
    const factor = Math.pow(1 + monthlyRate, months);
    const emiValue =
      monthlyRate === 0
        ? loanAmount / months
        : (loanAmount * monthlyRate * factor) / (factor - 1);
    const totalPayable = emiValue * months;
    return {
      emi: emiValue,
      loan: loanAmount,
      interest: totalPayable - loanAmount,
      total: totalPayable,
    };
  }, [price, down, months, rate]);

  const applyPreset = (p: number) => {
    setPrice(p);
    setDown(Math.round(p * 0.15));
  };

  const waHref = wa(
    [
      "Hi Zaidi TVS! I'd like a finance / EMI quote.",
      "",
      `Vehicle price: ${inr(price)}`,
      `Down payment: ${inr(down)}`,
      `Tenure: ${months} months`,
      `Interest rate: ${rate}% p.a.`,
      "",
      `Estimated EMI: ${inr(emi)}/month`,
    ].join("\n")
  );

  return (
    <section className="zFinance dark" id="finance">
      <div className="zFinanceHead reveal">
        <div className="eyebrow red">▣ &nbsp; FINANCE &amp; EMI</div>
        <h2>
          RIDE NOW.
          <br />
          <span>PAY EASY.</span>
        </h2>
        <p>
          Plan your purchase in seconds — move the sliders to see an instant EMI
          estimate, then send your quote straight to our showroom on WhatsApp.
        </p>
      </div>

      <div className="zFinanceBody">
        <div className="zFinanceCopy">
          <ul className="zFinanceList">
            <li>
              <i aria-hidden="true">✦</i> Low down-payment plans with same-day
              in-principle approval.
            </li>
            <li>
              <i aria-hidden="true">✦</i> Flexible tenure from 6 to 48 months —
              pick what suits your budget.
            </li>
            <li>
              <i aria-hidden="true">✦</i> Insurance, RTO and full paperwork
              handled at our showroom.
            </li>
            <li>
              <i aria-hidden="true">✦</i> Exchange bonus can be adjusted against
              your down payment.
            </li>
          </ul>
          <div className="hero-buttons">
            <Link className="btn ghost" href="/offers">
              VIEW OFFERS <span aria-hidden="true">→</span>
            </Link>
          </div>
          <p className="zFinanceNote">
            *Estimates for reference only. Final EMI depends on the lender,
            scheme and on-road price. Visit or call Zaidi TVS for an exact quote.
          </p>
        </div>

        <div className="zCalc reveal">
          <div className="zCalcPresets" role="group" aria-label="Quick price presets">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                className={price === p.price ? "on" : undefined}
                onClick={() => applyPreset(p.price)}
              >
                {p.label}
              </button>
            ))}
          </div>

          <label className="zCalcRow">
            <span className="zCalcLabel">
              Vehicle price <b>{inr(price)}</b>
            </span>
            <input
              type="range"
              min={40000}
              max={300000}
              step={1000}
              value={price}
              onChange={(event) => {
                const v = Number(event.target.value);
                setPrice(v);
                setDown((d) => Math.min(d, v));
              }}
            />
          </label>

          <label className="zCalcRow">
            <span className="zCalcLabel">
              Down payment <b>{inr(Math.min(down, price))}</b>
            </span>
            <input
              type="range"
              min={0}
              max={price}
              step={1000}
              value={Math.min(down, price)}
              onChange={(event) => setDown(Number(event.target.value))}
            />
          </label>

          <label className="zCalcRow">
            <span className="zCalcLabel">
              Tenure <b>{months} months</b>
            </span>
            <input
              type="range"
              min={0}
              max={TENURES.length - 1}
              step={1}
              value={Math.max(0, TENURES.indexOf(months))}
              onChange={(event) => setMonths(TENURES[Number(event.target.value)] ?? 24)}
            />
          </label>

          <label className="zCalcRow">
            <span className="zCalcLabel">
              Interest rate <b>{rate.toFixed(2)}% p.a.</b>
            </span>
            <input
              type="range"
              min={7}
              max={16}
              step={0.25}
              value={rate}
              onChange={(event) => setRate(Number(event.target.value))}
            />
          </label>

          <div className="zCalcResult">
            <small>Estimated monthly EMI</small>
            <b>
              {inr(emi)}
              <span>/mo</span>
            </b>
            <div className="zCalcBreak">
              <div>
                <small>Loan amount</small>
                <b>{inr(loan)}</b>
              </div>
              <div>
                <small>Total interest</small>
                <b>{inr(interest)}</b>
              </div>
              <div>
                <small>Total payable</small>
                <b>{inr(total)}</b>
              </div>
            </div>
          </div>

          <a
            className="btn primary"
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            GET THIS EMI ON WHATSAPP <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
