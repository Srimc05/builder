"use client";
/**
 * Apple Cards Carousel — adapted from Aceternity UI
 * (ui.aceternity.com/components/apple-cards-carousel).
 *
 * Kept from the source: layout, sizes, timings, the open/close animation and
 * the scroll-back-on-close behaviour. Changes (see the integration notes):
 * plain <img> instead of next/image, Escape only listened for while a card is
 * open, page scroll restored on unmount, dialog semantics + focus handling,
 * labelled arrow buttons, and the track's left padding aligned to the page grid.
 */
import React, {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  createContext,
  useContext,
  type ImgHTMLAttributes,
  type ReactElement,
} from "react";
import { IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";

interface CarouselProps {
  items: ReactElement[];
  initialScroll?: number;
  /** Advance one card at a time automatically (off by default). */
  autoplay?: boolean;
  /** Milliseconds between automatic advances. */
  autoplayInterval?: number;
}

/** Pause autoplay this long after the visitor scrolls, swipes or clicks. */
const INTERACTION_PAUSE_MS = 6000;

type Card = {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
  /** Optional responsive sources for the cover image. */
  srcSet?: string;
  alt?: string;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0, autoplay = false, autoplayInterval = 4000 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [inView, setInView] = useState(false);
  const lastInteraction = useRef(0);
  const autoplayOn = autoplay && !reduceMotion;
  const playing = autoplayOn && !hovered && !focusWithin && inView;

  // Only run while the carousel is actually on screen.
  useEffect(() => {
    if (!autoplayOn || !wrapperRef.current) return;
    const io = new IntersectionObserver(([entry]) => setInView(!!entry?.isIntersecting), { threshold: 0.35 });
    io.observe(wrapperRef.current);
    return () => io.disconnect();
  }, [autoplayOn]);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      const el = carouselRef.current;
      if (!el || document.visibilityState !== "visible") return;
      // Never move while an article (or any other overlay) is open, or right after the visitor interacted.
      if (document.body.style.overflow === "hidden" || document.body.hasAttribute("data-scroll-locked")) return;
      if (Date.now() - lastInteraction.current < INTERACTION_PAUSE_MS) return;
      const first = el.querySelector<HTMLElement>("[data-carousel-item]");
      const step = (first?.offsetWidth ?? 288) + 16; // card width + gap-4
      const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 4;
      const next = atEnd ? 0 : (Math.round(el.scrollLeft / step) + 1) * step;
      el.scrollTo({ left: next, behavior: "smooth" });
    }, autoplayInterval);
    return () => window.clearInterval(id);
  }, [playing, autoplayInterval]);

  const noteInteraction = () => {
    lastInteraction.current = Date.now();
  };
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) carouselRef.current.scrollLeft = initialScroll;
  }, [initialScroll]);

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 288; // (md:w-72)
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const isMobile = () => {
    return window && window.innerWidth < 768;
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div
        ref={wrapperRef}
        className="relative w-full"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocusWithin(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocusWithin(false);
        }}
      >
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-10 [scrollbar-width:none] md:py-14"
          ref={carouselRef}
          onPointerDown={noteInteraction}
          onTouchStart={noteInteraction}
          onWheel={noteInteraction}
        >
          <div
            className={cn(
              "absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l",
            )}
          ></div>

          <div
            className={cn(
              // Left padding matches the page container so the first card
              // lines up with the section heading.
              "flex flex-row justify-start gap-4 pl-5 sm:pl-8 lg:pl-12",
              "mx-auto max-w-7xl", // remove max-w-4xl if you want the carousel to span the full width of its container
            )}
          >
            {items.map((item, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: "easeOut",
                  },
                }}
                key={"card" + index}
                data-carousel-item
                className="rounded-media last:pr-[5%] md:last:pr-[33%]"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: Card;
  index: number;
  layout?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const { onCardClose } = useContext(CarouselContext);

  const handleClose = useCallback(() => {
    setOpen(false);
    onCardClose(index);
    triggerRef.current?.focus({ preventScroll: true });
  }, [index, onCardClose]);

  // Latest close handler, so the open/close effect doesn't re-run every render.
  const closeHandlerRef = useRef(handleClose);
  useEffect(() => {
    closeHandlerRef.current = handleClose;
  });

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeHandlerRef.current();
      }
    }

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previous;
    };
  }, [open]);

  useOutsideClick(containerRef, () => handleClose());

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 h-screen overflow-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 h-full w-full bg-black/80 backdrop-blur-lg"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={containerRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              layoutId={layout ? `card-${card.title}` : undefined}
              className="relative z-[60] mx-auto my-10 h-fit max-w-5xl rounded-panel bg-white p-4 font-sans md:p-10 dark:bg-neutral-900"
            >
              <button
                ref={closeRef}
                type="button"
                aria-label="Close"
                className="sticky top-4 right-0 ml-auto flex h-9 w-9 items-center justify-center rounded-btn bg-black dark:bg-white"
                onClick={handleClose}
              >
                <IconX aria-hidden className="h-6 w-6 text-neutral-100 dark:text-neutral-900" />
              </button>
              <motion.p
                layoutId={layout ? `category-${card.title}` : undefined}
                className="text-base font-medium text-black dark:text-white"
              >
                {card.category}
              </motion.p>
              <motion.p
                id={titleId}
                layoutId={layout ? `title-${card.title}` : undefined}
                className="mt-4 text-2xl font-semibold text-neutral-700 md:text-5xl dark:text-white"
              >
                {card.title}
              </motion.p>
              <div className="py-10">{card.content}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <motion.button
        ref={triggerRef}
        type="button"
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleOpen}
        className="relative z-10 flex h-80 w-56 flex-col items-start justify-start overflow-hidden rounded-media bg-gray-100 md:h-[30rem] md:w-72 dark:bg-neutral-900"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b from-black/50 via-transparent to-transparent" />
        <div className="relative z-40 p-6 md:p-7">
          <motion.p
            layoutId={layout ? `category-${card.category}` : undefined}
            className="text-left font-sans text-sm font-medium text-white md:text-base"
          >
            {card.category}
          </motion.p>
          <motion.p
            layoutId={layout ? `title-${card.title}` : undefined}
            className="mt-2 max-w-xs text-left font-sans text-xl font-semibold [text-wrap:balance] text-white md:text-2xl"
          >
            {card.title}
          </motion.p>
        </div>
        <BlurImage
          src={card.src}
          srcSet={card.srcSet}
          sizes="(min-width: 768px) 288px, 224px"
          alt={card.alt ?? card.title}
          className="absolute inset-0 z-10 object-cover"
        />
      </motion.button>
    </>
  );
};

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}: ImgHTMLAttributes<HTMLImageElement>) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <img
      className={cn(
        "h-full w-full transition duration-300",
        isLoading ? "blur-sm" : "blur-0",
        className,
      )}
      onLoad={() => setLoading(false)}
      src={src}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      alt={alt ? alt : "Background of a beautiful view"}
      {...rest}
    />
  );
};
