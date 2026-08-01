"use client";

/**
 * 3D motion primitives — drop-in wrappers that give any component a
 * perspective-aware entrance + optional hover tilt. Built on framer-motion.
 *
 * Variants are tuned for editorial pacing (slower, with intent) — not the
 * bouncy default. Neon glow hooks come from .glow-neon / .text-glow in
 * globals.css; pair them with the optional `glow` prop to highlight a card.
 */

import { motion, useMotionValue, useSpring, useTransform, type HTMLMotionProps, type Variants } from "framer-motion";
import { type ReactNode, useRef } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24, rotateX: -12, z: -80 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    z: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const slideRight: Variants = {
  hidden: { opacity: 0, x: -32, rotateY: 18 },
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    transition: { duration: 0.65, ease: EASE },
  },
};

const slideLeft: Variants = {
  hidden: { opacity: 0, x: 32, rotateY: -18 },
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    transition: { duration: 0.65, ease: EASE },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9, rotateX: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotateX: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

/** Wraps children in a perspective container that animates them in
 *  with a 3D fade+lift when the section enters the viewport. */
export function FadeIn3D({
  children,
  className,
  delay = 0,
  as: As = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "header" | "footer" | "main";
}) {
  // motion.div is fine — these are HTML elements that motion handles.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MotionEl: any = (motion as any)[As];
  return (
    <MotionEl
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: { opacity: 0, y: 32, rotateX: -10, z: -60 },
        visible: {
          opacity: 1,
          y: 0,
          rotateX: 0,
          z: 0,
          transition: { duration: 0.8, ease: EASE, delay },
        },
      }}
    >
      {children}
    </MotionEl>
  );
}

/** Container that staggers its `StaggerItem` children in with 3D depth. */
export function StaggerContainer({
  children,
  className,
  as: As = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol" | "section";
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MotionEl: any = (motion as any)[As];
  return (
    <MotionEl
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={stagger}
    >
      {children}
    </MotionEl>
  );
}

/** Use as children of `StaggerContainer`. Variant chooses the entrance direction. */
export function StaggerItem({
  children,
  className,
  variant = "up",
  as: As = "div",
}: {
  children: ReactNode;
  className?: string;
  variant?: "up" | "right" | "left" | "scale";
  as?: "div" | "li" | "article" | "section";
}) {
  const variantMap = {
    up: fadeInUp,
    right: slideRight,
    left: slideLeft,
    scale: scaleIn,
  } as const;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MotionEl: any = (motion as any)[As];
  return (
    <MotionEl className={className} variants={variantMap[variant]}>
      {children}
    </MotionEl>
  );
}

/** Hover-tilting 3D card. Tracks the cursor and tilts the surface toward it,
 *  with a soft spring. Add `glow` to overlay a neon edge glow on hover. */
export function Card3D({
  children,
  className,
  glow = false,
  intensity = 12,
  ...rest
}: HTMLMotionProps<"div"> & {
  children: ReactNode;
  glow?: boolean;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rx = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), {
    stiffness: 220,
    damping: 22,
  });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), {
    stiffness: 220,
    damping: 22,
  });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className={`${className ?? ""} ${glow ? "hover:glow-neon transition-shadow duration-300" : ""}`}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Animated number — fades up with a slight 3D tilt when in view. */
export function PopIn({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.7, rotateX: -20 }}
      whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
}