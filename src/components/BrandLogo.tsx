/**
 * Zaidi TVS wordmark — theme aware.
 *
 * Two transparent PNGs ship with the site: a white "ZAIDI" lockup for dark
 * surfaces and a black one for light surfaces. Both are rendered and swapped
 * with CSS, so the correct logo paints on the very first frame — no JS, no
 * hydration hop and no flash of the wrong colour.
 *
 * Precedence:
 *   1. default             -> white lockup (this site is dark)
 *   2. :root[data-theme]   -> follows the site theme set on <html>
 *   3. `surface` prop      -> follows the surface this instance sits on
 *
 * Size comes from the `--logo-h` custom property (any CSS length), so a parent
 * can scale every instance with one rule, e.g. `.footer-brand { --logo-h: 34px }`.
 */
import type { CSSProperties } from "react";

/** White "ZAIDI" + red TVS — for dark surfaces. */
export const LOGO_ON_DARK =
  "/Website_Logo/Transparent/ZAIDI_TVS_Logo_ZAIDI_White_TVS_Red_Transparent.png";

/** Black "ZAIDI" + red TVS — for light surfaces. */
export const LOGO_ON_LIGHT =
  "/Website_Logo/Transparent/ZAIDI_TVS_Logo_ZAIDI_Black_TVS_Red_Transparent.png";

/** Intrinsic size of both PNGs, used to reserve layout space (no CLS). */
export const LOGO_INTRINSIC = { width: 822, height: 136 } as const;

type Props = {
  /** Extra class on the wrapper. */
  className?: string;
  /** Surface the lockup sits on. `auto` follows the site theme. */
  surface?: "auto" | "dark" | "light";
  /** Override the height (number = px, or any CSS length). */
  height?: number | string;
  /** Accessible name. Pass `""` when the logo is purely decorative. */
  alt?: string;
};

export default function BrandLogo({
  className,
  surface = "auto",
  height,
  alt = "Zaidi TVS",
}: Props) {
  const style = height
    ? ({
        "--logo-h": typeof height === "number" ? `${height}px` : height,
      } as CSSProperties)
    : undefined;

  return (
    <span
      className={`brand-logo${
        surface === "auto" ? "" : ` on-${surface}`
      }${className ? ` ${className}` : ""}`}
      style={style}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="bl-for-dark"
        src={LOGO_ON_DARK}
        alt={alt}
        width={LOGO_INTRINSIC.width}
        height={LOGO_INTRINSIC.height}
        decoding="async"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="bl-for-light"
        src={LOGO_ON_LIGHT}
        alt={alt}
        width={LOGO_INTRINSIC.width}
        height={LOGO_INTRINSIC.height}
        decoding="async"
      />
    </span>
  );
}
