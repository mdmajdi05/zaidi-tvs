import { CONTACT } from "@data/site";
import styles from "./RideJourney.module.css";

type Stage = {
  no: string;
  stage: string;
  title: string;
  desc: string;
  chips: string[];
  metric: string;
  metricLabel: string;
};

const STAGES: Stage[] = [
  {
    no: "01",
    stage: "Enquiry",
    title: "Reach out",
    desc: "Call, WhatsApp or walk in. Tell us your bike and what it needs — our desk logs the job and gives you a clear, fixed estimate.",
    chips: ["Call / WhatsApp", "Job logged", "Fixed estimate"],
    metric: "1 min",
    metricLabel: "to log your job",
  },
  {
    no: "02",
    stage: "Booking",
    title: "Slot booked",
    desc: "Pick a time that suits you. We reserve a service bay and, if you want, arrange doorstep pickup for your ride.",
    chips: ["Pick a slot", "Bay reserved", "Pickup option"],
    metric: "Same day",
    metricLabel: "slots available",
  },
  {
    no: "03",
    stage: "Service",
    title: "In the bay",
    desc: "Diagnostics, genuine parts and careful work by factory-trained hands — with a call before anything extra is taken up.",
    chips: ["Diagnostics", "Genuine parts", "Transparent bill"],
    metric: "100%",
    metricLabel: "genuine parts",
  },
  {
    no: "04",
    stage: "Delivery",
    title: "Ready to ride",
    desc: "Road-tested, washed and polished, then handed back with a service record and a reminder for your next visit.",
    chips: ["Road test", "Wash & polish", "Service record"],
    metric: "4.9/5",
    metricLabel: "customer rating",
  },
];

export default function RideJourney() {
  return (
    <section
      className={styles.section}
      aria-labelledby="ride-journey-title"
    >
      <div className={styles.inner}>
        <header className={styles.head}>
          <div className={styles.headCopy}>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowNo} aria-hidden="true">
                03
              </span>
              <span aria-hidden="true">/</span>
              <span>How it works</span>
            </p>
            <h2 className={styles.title} id="ride-journey-title">
              Enquiry to ride-out.
            </h2>
            <p className={styles.lede}>
              Four simple steps from your first message to the moment you ride
              away.
            </p>
          </div>

          <p className={styles.note}>
            Clear estimates. Genuine parts. No surprises.
          </p>
        </header>

        <div className={styles.route} aria-hidden="true">
          <svg
            className={styles.routeSvg}
            viewBox="0 0 1000 96"
            role="presentation"
            focusable="false"
          >
            <path className={styles.routeLine} d="M 70 48 L 930 48" />
            {[70, 356.67, 643.33, 930].map((x, i) => (
              <g key={x} transform={`translate(${x} 48)`}>
                <circle className={styles.routeHalo} r="20" />
                <circle className={styles.routeDot} r="15" />
                <text className={styles.routeNo} x="0" y="4">
                  {STAGES[i].no}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <ol className={styles.stages}>
          {STAGES.map((stage) => {
            const headingId = `ride-journey-stage-${stage.no}`;
            return (
              <li className={styles.stageItem} key={stage.no}>
                <article
                  className={styles.card}
                  aria-labelledby={headingId}
                  aria-describedby={`${headingId}-desc`}
                >
                  <div className={styles.cardTop}>
                    <span className={styles.stepNo} aria-hidden="true">
                      {stage.no}
                    </span>
                    <span className={styles.stageLabel}>{stage.stage}</span>
                  </div>

                  <h3 className={styles.cardTitle} id={headingId}>
                    {stage.title}
                  </h3>
                  <p className={styles.cardDesc} id={`${headingId}-desc`}>
                    {stage.desc}
                  </p>

                  <ul className={styles.chips} aria-label={`${stage.stage} details`}>
                    {stage.chips.map((chip) => (
                      <li className={styles.chip} key={chip}>
                        {chip}
                      </li>
                    ))}
                  </ul>

                  <p className={styles.metric}>
                    <strong className={styles.metricValue}>{stage.metric}</strong>
                    <span className={styles.metricLabel}>{stage.metricLabel}</span>
                  </p>
                </article>
              </li>
            );
          })}
        </ol>

        <footer className={styles.actions}>
          <p className={styles.actionsText}>
            Ready when you are — book a slot or speak to our service desk.
          </p>
          <div className={styles.actionLinks}>
            <a className={styles.primaryCta} href="/service">
              Book a service
              <span className={styles.arrow} aria-hidden="true">
                →
              </span>
            </a>
            <a
              className={styles.secondaryCta}
              href={CONTACT.servicePhoneHref}
              aria-label={`Call ${CONTACT.servicePhone}`}
            >
              Call {CONTACT.servicePhone}
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
}
