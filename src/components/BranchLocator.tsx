"use client";

import {
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
} from "react";
import { ADDRESS_SHORT, wa } from "@data/site";
import { BRANCHES, DOORSTEP, type Branch } from "@/lib/branches";
import styles from "./BranchLocator.module.css";

// "Today" is a client-only value; read it through useSyncExternalStore so the
// server markup (null) and the hydrated client markup never drift.
const subscribeToNothing = () => () => {};
const getTodayIndex = () => (new Date().getDay() + 6) % 7;
const getServerTodayIndex = () => null;

function whatsappHref(branch: Branch): string {
  const text = `Hi Zaidi TVS, I have a question about the ${branch.name} (${branch.kind}).`;
  return wa(text);
}

function telHref(phone: string): string {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

export default function BranchLocator({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState(0);
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const todayIndex = useSyncExternalStore(
    subscribeToNothing,
    getTodayIndex,
    getServerTodayIndex
  );

  const branch = BRANCHES[active];

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      const next = event.key === "Home" ? 0 : BRANCHES.length - 1;
      setActive(next);
      tabsRef.current[next]?.focus();
      return;
    }
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const dir = event.key === "ArrowRight" ? 1 : -1;
    const next = (active + dir + BRANCHES.length) % BRANCHES.length;
    setActive(next);
    tabsRef.current[next]?.focus();
  };

  return (
    <div className={styles.wrap}>
      <div
        className={styles.tabs}
        role="tablist"
        aria-label="Choose a Zaidi TVS facility"
        onKeyDown={onKeyDown}
      >
        {BRANCHES.map((item, i) => {
          const isActive = i === active;
          return (
            <button
              key={item.id}
              ref={(el) => {
                tabsRef.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`branch-tab-${item.id}`}
              aria-selected={isActive}
              aria-controls="branch-panel"
              tabIndex={isActive ? 0 : -1}
              className={`${styles.tab} ${isActive ? styles.tabActive : ""}`.trim()}
              onClick={() => setActive(i)}
            >
              <span className={styles.tabName}>{item.name}</span>
              <span className={styles.tabKind}>{item.kind}</span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id="branch-panel"
        aria-labelledby={`branch-tab-${branch.id}`}
        className={styles.panel}
      >
        <div className={styles.layout}>
          <div className={styles.card}>
            <h2 className={styles.name}>{branch.name}</h2>
            <p className={styles.kind}>{branch.kind}</p>

            <dl className={styles.meta}>
              <div className={styles.metaRow}>
                <dt>Address</dt>
                <dd> {branch.address}</dd>
              </div>
              <div className={styles.metaRow}>
                <dt>Phone</dt>
                <dd>
                  <a href={telHref(branch.phone)}> {branch.phone}</a>
                </dd>
              </div>
              <div className={styles.metaRow}>
                <dt>WhatsApp</dt>
                <dd>
                  <a
                    href={whatsappHref(branch)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                     Chat with us
                  </a>
                </dd>
              </div>
            </dl>

            {branch.note ? <p className={styles.note}>{branch.note}</p> : null}

            <a
              className="btn primary"
              href={branch.mapsQuery}
              target="_blank"
              rel="noopener noreferrer"
            >
              GET DIRECTIONS <span>→</span>
            </a>
          </div>

          <div className={styles.hoursCard}>
            <h3 className={styles.sub}>TIMINGS</h3>
            <table className={styles.hours}>
              <caption className={styles.srOnly}>
                Opening hours for {branch.name}
              </caption>
              <tbody>
                {branch.hours.map((slot, i) => (
                  <tr
                    key={slot.day}
                    className={todayIndex === i ? styles.today : undefined}
                  >
                    <th scope="row">{slot.day}</th>
                    <td>
                      <span>{slot.time}</span>
                      {todayIndex === i ? (
                        <span className={styles.todayTag}>TODAY</span>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className={styles.note}>
              Timings may vary on public holidays — call ahead to confirm.
            </p>
          </div>
        </div>

        {compact ? null : (
          <div className={styles.mapFrame}>
            <iframe
              src={branch.mapEmbed}
              title={`Map of ${branch.name} — ${ADDRESS_SHORT}`}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        )}
      </div>

      <div className={styles.doorstep}>
        <div className={styles.doorstepHead}>
          <div className="eyebrow red"> &nbsp; WE COME TO YOU</div>
          <h3 className={styles.doorstepTitle}>{DOORSTEP.title.toUpperCase()}</h3>
          <p className={styles.doorstepText}>{DOORSTEP.text}</p>
        </div>
        <ol className={styles.steps}>
          {DOORSTEP.steps.map((step) => (
            <li key={step} className={styles.step}>
              {step}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
