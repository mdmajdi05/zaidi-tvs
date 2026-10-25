"use client";

import {
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import type { FaqGroup } from "@/lib/faqs";
import styles from "./FaqAccordion.module.css";

type FlatItem = { q: string; a: string; group?: string };

export type FaqAccordionProps = {
  groups?: FaqGroup[];
  items?: Array<{ q: string; a: string }>;
  defaultOpen?: number;
};

export default function FaqAccordion({
  groups,
  items,
  defaultOpen,
}: FaqAccordionProps) {
  const uid = useId();
  const hasGroups = Boolean(groups && groups.length > 0);
  const [activeGroup, setActiveGroup] = useState(
    groups && groups.length > 0 ? groups[0].id : ""
  );
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(defaultOpen ?? -1);
  const buttonsRef = useRef<Array<HTMLButtonElement | null>>([]);

  const term = query.trim().toLowerCase();

  const activeItems = useMemo<FlatItem[]>(() => {
    if (hasGroups && groups) {
      const active = groups.find((group) => group.id === activeGroup);
      return active
        ? active.items.map((item) => ({ ...item, group: active.label }))
        : [];
    }
    return (items ?? []).map((item) => ({ ...item }));
  }, [hasGroups, groups, activeGroup, items]);

  const allGrouped = useMemo<FlatItem[]>(() => {
    if (!groups) return [];
    return groups.flatMap((group) =>
      group.items.map((item) => ({ ...item, group: group.label }))
    );
  }, [groups]);

  const visible = useMemo<FlatItem[]>(() => {
    if (!term) return activeItems;
    const source = hasGroups ? allGrouped : activeItems;
    return source.filter(
      (item) =>
        item.q.toLowerCase().includes(term) ||
        item.a.toLowerCase().includes(term)
    );
  }, [term, activeItems, allGrouped, hasGroups]);

  function toggle(index: number) {
    setOpen((current) => (current === index ? -1 : index));
  }

  function onHeaderKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const count = visible.length;
    if (count === 0) return;
    let next = -1;
    if (event.key === "ArrowDown") next = (index + 1) % count;
    else if (event.key === "ArrowUp") next = (index - 1 + count) % count;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = count - 1;
    if (next >= 0) {
      event.preventDefault();
      buttonsRef.current[next]?.focus();
    }
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.toolbar}>
        <div className={styles.searchField}>
          <span className={styles.searchIcon} aria-hidden="true">
            
          </span>
          <label className={styles.searchLabel} htmlFor={`${uid}-search`}>
            Search questions
          </label>
          <input
            id={`${uid}-search`}
            className={styles.searchInput}
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setOpen(-1);
            }}
            placeholder="Search questions…"
            autoComplete="off"
          />
        </div>
        <span className={styles.count} aria-live="polite">
          {visible.length} {visible.length === 1 ? "question" : "questions"}
        </span>
      </div>

      {hasGroups && groups ? (
        <div className={styles.tabs} role="group" aria-label="FAQ categories">
          {groups.map((group) => {
            const isActive = group.id === activeGroup;
            return (
              <button
                key={group.id}
                type="button"
                className={`${styles.tab} ${isActive ? styles.tabActive : ""}`}
                aria-pressed={isActive}
                onClick={() => {
                  setActiveGroup(group.id);
                  setOpen(-1);
                }}
              >
                {group.label}
              </button>
            );
          })}
        </div>
      ) : null}

      {visible.length === 0 ? (
        <p className={styles.empty} role="status">
          No questions matched “{query.trim()}”. Try another word or message us
          on WhatsApp.
        </p>
      ) : (
        <div className={styles.list}>
          {visible.map((item, index) => {
            const isOpen = open === index;
            const buttonId = `${uid}-btn-${index}`;
            const panelId = `${uid}-panel-${index}`;
            return (
              <div className={styles.item} key={`${item.q}-${index}`}>
                <h3 className={styles.heading}>
                  <button
                    id={buttonId}
                    type="button"
                    ref={(el) => {
                      buttonsRef.current[index] = el;
                    }}
                    className={`${styles.header} ${
                      isOpen ? styles.headerOpen : ""
                    }`}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(index)}
                    onKeyDown={(event) => onHeaderKeyDown(event, index)}
                  >
                    <span className={styles.question}>
                      {term && item.group ? (
                        <em className={styles.groupTag}>{item.group}</em>
                      ) : null}
                      {item.q}
                    </span>
                    <span className={styles.chevron} aria-hidden="true">
                      
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`${styles.panel} ${isOpen ? styles.panelOpen : ""}`}
                >
                  {isOpen ? <p className={styles.answer}>{item.a}</p> : null}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
