import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  memo,
} from "react";

const ANIMATION_CONFIG = {
  SMOOTH_TAU: 0.25,
  MIN_COPIES: 2,
  COPY_HEADROOM: 2,
};

const toCssLength = (value) =>
  typeof value === "number" ? `${value}px` : value ?? undefined;

const cx = (...parts) => parts.filter(Boolean).join(" ");

/* ---------------- Hooks ---------------- */

const useResizeObserver = (callback, elements, deps) => {
  useEffect(() => {
    if (!window.ResizeObserver) {
      const handleResize = () => callback();
      window.addEventListener("resize", handleResize);
      callback();
      return () => window.removeEventListener("resize", handleResize);
    }

    const observers = elements.map((ref) => {
      if (!ref.current) return null;
      const obs = new ResizeObserver(callback);
      obs.observe(ref.current);
      return obs;
    });

    callback();
    return () => observers.forEach((o) => o?.disconnect());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

const useImageLoader = (seqRef, onLoad, deps) => {
  useEffect(() => {
    const images = seqRef.current?.querySelectorAll("img") ?? [];
    if (!images.length) return onLoad();

    let remaining = images.length;
    const done = () => --remaining === 0 && onLoad();

    images.forEach((img) => {
      if (img.complete) return done();
      img.addEventListener("load", done, { once: true });
      img.addEventListener("error", done, { once: true });
    });

    return () =>
      images.forEach((img) => {
        img.removeEventListener("load", done);
        img.removeEventListener("error", done);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

const useAnimationLoop = (trackRef, targetVelocity, seqWidth, isHovered, pauseOnHover) => {
  const rafRef = useRef(null);
  const lastTime = useRef(null);
  const offset = useRef(0);
  const velocity = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReduced =
      window?.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (seqWidth > 0) {
      offset.current = ((offset.current % seqWidth) + seqWidth) % seqWidth;
      track.style.transform = `translate3d(${-offset.current}px,0,0)`;
    }

    if (prefersReduced) {
      track.style.transform = "translate3d(0,0,0)";
      return () => (lastTime.current = null);
    }

    const animate = (t) => {
      if (lastTime.current == null) lastTime.current = t;
      const dt = Math.max(0, t - lastTime.current) / 1000;
      lastTime.current = t;

      const target = pauseOnHover && isHovered ? 0 : targetVelocity;
      const ease = 1 - Math.exp(-dt / ANIMATION_CONFIG.SMOOTH_TAU);

      velocity.current += (target - velocity.current) * ease;

      if (seqWidth > 0) {
        offset.current = ((offset.current + velocity.current * dt) % seqWidth + seqWidth) % seqWidth;
        track.style.transform = `translate3d(${-offset.current}px,0,0)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTime.current = null;
    };
  }, [targetVelocity, seqWidth, isHovered, pauseOnHover, trackRef]);
};

/* ---------------- Component ---------------- */

export const LogoLoop = memo(
  ({
    logos,
    speed = 120,
    direction = "left",
    width = "90dvw",
    logoHeight = 28,
    gap = 32,
    pauseOnHover = true,
    fadeOut = false,
    fadeOutColor,
    scaleOnHover = false,
    ariaLabel = "Partner logos",
    className,
    style,
  }) => {
    const containerRef = useRef(null);
    const trackRef = useRef(null);
    const seqRef = useRef(null);

    const [seqWidth, setSeqWidth] = useState(0);
    const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES);
    const [isHovered, setIsHovered] = useState(false);

    const targetVelocity = useMemo(() => {
      const mag = Math.abs(speed);
      const dir = direction === "left" ? 1 : -1;
      return mag * dir * (speed < 0 ? -1 : 1);
    }, [speed, direction]);

    const updateDimensions = useCallback(() => {
      const containerW = containerRef.current?.clientWidth ?? 0;
      const seqW = seqRef.current?.getBoundingClientRect?.().width ?? 0;
      if (!seqW) return;
      setSeqWidth(Math.ceil(seqW));

      const neededCopies =
        Math.ceil(containerW / seqW) + ANIMATION_CONFIG.COPY_HEADROOM;
      setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, neededCopies));
    }, []);

    useResizeObserver(updateDimensions, [containerRef, seqRef], [logos, gap, logoHeight]);
    useImageLoader(seqRef, updateDimensions, [logos, gap, logoHeight]);
    useAnimationLoop(trackRef, targetVelocity, seqWidth, isHovered, pauseOnHover);

    const cssVars = useMemo(
      () => ({
        "--logoloop-gap": `${gap}px`,
        "--logoloop-logoHeight": `${logoHeight}px`,
        ...(fadeOutColor && { "--logoloop-fadeColor": fadeOutColor }),
      }),
      [gap, logoHeight, fadeOutColor]
    );

    const rootClasses = useMemo(
      () =>
        cx(
          "relative overflow-x-hidden group",
          "[--logoloop-gap:32px] [--logoloop-logoHeight:28px]",
          "[--logoloop-fadeColorAuto:#fff] dark:[--logoloop-fadeColorAuto:#0b0b0b]",
          scaleOnHover && "py-[calc(var(--logoloop-logoHeight)*0.1)]",
          className
        ),
      [scaleOnHover, className]
    );

    const renderLogo = useCallback(
      (item, key) => {
        const isNode = "node" in item;
        const commonClasses = cx(
          "motion-reduce:transition-none",
          scaleOnHover &&
            "transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-120"
        );

        const content = isNode ? (
          <span className={cx("inline-flex items-center", commonClasses)} aria-hidden={!!item.href && !item.ariaLabel}>
            {item.node}
          </span>
        ) : (
          <img
            className={cx(
              "h-[var(--logoloop-logoHeight)] w-auto block object-contain [-webkit-user-drag:none] pointer-events-none",
              "[image-rendering:-webkit-optimize-contrast]",
              commonClasses
            )}
            {...item}
            alt={item.alt ?? ""}
            draggable={false}
            loading="lazy"
            decoding="async"
          />
        );

        const label = isNode ? item.ariaLabel ?? item.title : item.alt ?? item.title;

        return (
          <li
            key={key}
            role="listitem"
            className={cx("flex-none mr-[var(--logoloop-gap)] text-[length:var(--logoloop-logoHeight)] leading-[1]", scaleOnHover && "overflow-visible group/item")}
          >
            {item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={label || "logo link"}
                className="inline-flex items-center no-underline rounded transition-opacity duration-200 ease-linear hover:opacity-80 focus-visible:outline focus-visible:outline-current focus-visible:outline-offset-2"
              >
                {content}
              </a>
            ) : (
              content
            )}
          </li>
        );
      },
      [scaleOnHover]
    );

    return (
      <div
        ref={containerRef}
        className={rootClasses}
        style={{ width: toCssLength(width) ?? "100%", ...cssVars, ...style }}
        role="region"
        aria-label={ariaLabel}
        onMouseEnter={() => pauseOnHover && setIsHovered(true)}
        onMouseLeave={() => pauseOnHover && setIsHovered(false)}
      >
        {fadeOut && (
          <>
            <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-[clamp(24px,8%,120px)] bg-[linear-gradient(to_right,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,transparent_100%)]" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-[clamp(24px,8%,120px)] bg-[linear-gradient(to_left,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,transparent_100%)]" />
          </>
        )}

        <div ref={trackRef} className="flex w-max will-change-transform select-none motion-reduce:transform-none">
          {Array.from({ length: copyCount }, (_, i) => (
            <ul
              key={i}
              ref={i === 0 ? seqRef : undefined}
              className="flex items-center"
              role="list"
              aria-hidden={i > 0}
            >
              {logos.map((logo, idx) => renderLogo(logo, `${i}-${idx}`))}
            </ul>
          ))}
        </div>
      </div>
    );
  }
);

LogoLoop.displayName = "LogoLoop";
export default LogoLoop;
