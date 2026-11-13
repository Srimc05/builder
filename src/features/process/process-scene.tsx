/**
 * The construction journey as a single SVG scene, choreographed by one
 * progress value (0 → 1). Each of the 7 stages occupies 1/7 of the range:
 *
 *   0 Consultation   – conversation bubbles and a project brief are drafted
 *   1 Site           – ground line, soil strata, pegs and a surveyor's laser
 *   2 Design         – a blueprint of the building draws itself; estimate bars grow
 *   3 Approvals      – estimate bars become a programme; a permit is stamped
 *   4 Construction   – crane rises, foundation and five floors are built
 *   5 Inspection     – a magnifier checks each floor, ticking them off
 *   6 Handover       – facade closes in, windows glow, trees grow, keys handed over
 */
import { motion, useTransform, type MotionValue } from "motion/react"

const N = 7
const GROUND = 460
const FLOOR_H = 52
const FLOORS = 5
const B_LEFT = 280
const B_RIGHT = 520
const COLUMNS = [280, 356, 432, 512]
const COL_W = 8

const C = {
  ink: "#222222",
  stone: "#9a9a9a",
  line: "#dedcd6",
  brand: "#6425E8",
  brandSoft: "#ece4fd",
  bronze: "#C58A50",
  glow: "#f2c48d",
  facade: "#2a2a2a",
  paper: "#ffffff",
}

/** Progress range for part of a stage, e.g. r(2, 0.5, 1) = second half of stage 3. */
const r = (stage: number, from = 0, to = 1) => [(stage + from) / N, (stage + to) / N] as const

type P = MotionValue<number>

/** Fade/scale in during `enter`, optionally out during `exit`. */
function useAppear(p: P, enter: readonly [number, number], exit?: readonly [number, number]) {
  return useTransform(p, exit ? [enter[0], enter[1], exit[0], exit[1]] : [...enter], exit ? [0, 1, 1, 0] : [0, 1])
}

const floorTop = (i: number) => GROUND - (i + 1) * FLOOR_H

export function ProcessScene({ progress, label }: { progress: P; label: string }) {
  return (
    <svg
      viewBox="0 0 800 600"
      role="img"
      aria-label={`Illustration of the construction process. Current stage: ${label}.`}
      className="size-full"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <defs>
        <pattern id="grid-dots" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill={C.line} />
        </pattern>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbfaf8" />
          <stop offset="1" stopColor="#f3f1ec" />
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      <rect width="800" height="600" fill="url(#sky)" />
      <rect width="800" height="600" fill="url(#grid-dots)" />

      <Sun p={progress} />
      <Ground p={progress} />
      <Consultation p={progress} />
      <SiteSurvey p={progress} />
      <Blueprint p={progress} />
      <PlanningPanel p={progress} />
      <Permit p={progress} />
      <Structure p={progress} />
      <Crane p={progress} />
      <Inspection p={progress} />
      <Handover p={progress} />
    </svg>
  )
}

/* ---------------------------------------------------------------- Ground */

function Ground({ p }: { p: P }) {
  const draw = useTransform(p, [...r(1, 0, 0.35)], [0, 1])
  const strata = useTransform(p, [...r(1, 0.2, 0.5)], [0, 1])
  return (
    <g>
      <motion.path d={`M30 ${GROUND} H770`} stroke={C.ink} strokeWidth="2" strokeLinecap="round" fill="none" style={{ pathLength: draw }} />
      <motion.g style={{ opacity: strata }} stroke={C.line} strokeWidth="1.5" fill="none">
        <path d={`M30 ${GROUND + 22} C 160 ${GROUND + 14}, 280 ${GROUND + 30}, 420 ${GROUND + 20} S 680 ${GROUND + 14}, 770 ${GROUND + 24}`} />
        <path d={`M30 ${GROUND + 48} C 180 ${GROUND + 40}, 300 ${GROUND + 58}, 460 ${GROUND + 46} S 700 ${GROUND + 42}, 770 ${GROUND + 52}`} />
        <path d={`M30 ${GROUND + 76} C 140 ${GROUND + 70}, 320 ${GROUND + 84}, 480 ${GROUND + 74} S 690 ${GROUND + 70}, 770 ${GROUND + 80}`} strokeDasharray="2 6" />
      </motion.g>
    </g>
  )
}

/* ---------------------------------------------------------- Consultation */

function Consultation({ p }: { p: P }) {
  const exit = r(1, 0, 0.3)
  const bubbleA = useAppear(p, r(0, 0, 0.3), exit)
  const bubbleB = useAppear(p, r(0, 0.2, 0.5), exit)
  const sheet = useAppear(p, r(0, 0.35, 0.65), exit)
  const lines = useTransform(p, [...r(0, 0.5, 0.95)], [0, 1])
  const lift = useTransform(p, [...exit], [0, -24])
  const scaleA = useTransform(bubbleA, [0, 1], [0.85, 1])
  const scaleB = useTransform(bubbleB, [0, 1], [0.85, 1])

  return (
    <motion.g style={{ y: lift }}>
      <motion.g style={{ opacity: bubbleA, scale: scaleA, originX: 0, originY: 1 }}>
        <path d="M120 128 h150 a14 14 0 0 1 14 14 v44 a14 14 0 0 1 -14 14 h-110 l-18 16 v-16 h-22 a14 14 0 0 1 -14 -14 v-44 a14 14 0 0 1 14 -14z" fill={C.paper} stroke={C.ink} strokeWidth="1.5" />
        <rect x="128" y="150" width="96" height="6" rx="3" fill={C.ink} opacity=".85" />
        <rect x="128" y="166" width="130" height="6" rx="3" fill={C.line} />
        <rect x="128" y="180" width="80" height="6" rx="3" fill={C.line} />
      </motion.g>
      <motion.g style={{ opacity: bubbleB, scale: scaleB, originX: 1, originY: 1 }}>
        <path d="M530 86 h130 a14 14 0 0 1 14 14 v36 a14 14 0 0 1 -14 14 h-12 v16 l-18 -16 h-100 a14 14 0 0 1 -14 -14 v-36 a14 14 0 0 1 14 -14z" fill={C.brandSoft} stroke={C.brand} strokeWidth="1.5" />
        <rect x="532" y="106" width="110" height="6" rx="3" fill={C.brand} opacity=".8" />
        <rect x="532" y="122" width="72" height="6" rx="3" fill={C.brand} opacity=".35" />
      </motion.g>
      <motion.g style={{ opacity: sheet }}>
        <rect x="320" y="200" width="170" height="210" rx="10" fill={C.paper} stroke={C.ink} strokeWidth="1.5" />
        <rect x="320" y="200" width="170" height="38" rx="10" fill={C.ink} />
        <rect x="320" y="226" width="170" height="12" fill={C.ink} />
        <text x="336" y="224" fill={C.paper} fontSize="11" fontWeight="700" letterSpacing="2">PROJECT BRIEF</text>
        {[262, 290, 318, 346, 374].map((y, i) => (
          <g key={y}>
            <motion.path d={`M340 ${y} l6 6 l10 -12`} stroke={C.brand} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ pathLength: lines }} />
            <motion.path d={`M368 ${y + 1} H${[460, 440, 470, 430, 452][i]}`} stroke={C.line} strokeWidth="6" strokeLinecap="round" style={{ pathLength: lines }} />
          </g>
        ))}
      </motion.g>
    </motion.g>
  )
}

/* ----------------------------------------------------------- Site survey */

function SiteSurvey({ p }: { p: P }) {
  const pegs = useAppear(p, r(1, 0.3, 0.5), r(4, 0, 0.15))
  const tripod = useAppear(p, r(1, 0.35, 0.6), r(2, 0.6, 0.9))
  const tripodY = useTransform(p, [...r(1, 0.35, 0.6)], [30, 0])
  const laser = useTransform(p, [...r(1, 0.55, 0.85)], [0, 1])
  const laserOut = useAppear(p, r(1, 0.55, 0.6), r(2, 0.6, 0.9))
  const dim = useAppear(p, r(1, 0.7, 0.95), r(2, 0.6, 0.9))

  return (
    <g>
      <motion.g style={{ opacity: pegs }}>
        {[240, 560].map((x) => (
          <g key={x}>
            <path d={`M${x} ${GROUND} V${GROUND - 34}`} stroke={C.ink} strokeWidth="2" />
            <path d={`M${x} ${GROUND - 34} l16 6 l-16 6z`} fill={C.bronze} />
          </g>
        ))}
      </motion.g>
      <motion.g style={{ opacity: tripod, y: tripodY }}>
        <path d={`M690 ${GROUND} L706 ${GROUND - 70} L722 ${GROUND}`} stroke={C.ink} strokeWidth="2" fill="none" strokeLinejoin="round" />
        <path d={`M706 ${GROUND - 70} V${GROUND}`} stroke={C.ink} strokeWidth="1.5" />
        <rect x="692" y={GROUND - 92} width="28" height="20" rx="4" fill={C.ink} />
        <circle cx="692" cy={GROUND - 82} r="5" fill={C.brand} />
      </motion.g>
      <motion.path
        d={`M688 ${GROUND - 82} L240 ${GROUND - 28}`}
        stroke={C.brand}
        strokeWidth="1.5"
        strokeDasharray="6 5"
        fill="none"
        style={{ pathLength: laser, opacity: laserOut }}
      />
      <motion.g style={{ opacity: dim }}>
        <path d={`M240 ${GROUND + 104} H560 M240 ${GROUND + 98} v12 M560 ${GROUND + 98} v12`} stroke={C.ink} strokeWidth="1.2" />
        <rect x="364" y={GROUND + 94} width="72" height="20" rx="10" fill={C.paper} stroke={C.ink} strokeWidth="1.2" />
        <text x="400" y={GROUND + 108} textAnchor="middle" fontSize="10" fontWeight="700" fill={C.ink} letterSpacing="1">
          36.0 M
        </text>
      </motion.g>
    </g>
  )
}

/* ------------------------------------------------------------- Blueprint */

function Blueprint({ p }: { p: P }) {
  const draw = useTransform(p, [...r(2, 0, 0.6)], [0, 1])
  const opacity = useTransform(p, [...r(2, 0, 0.05), ...r(4, 0.3, 0.8), ...r(6, 0.05, 0.3)], [0, 1, 1, 0.45, 0.45, 0])
  const dims = useAppear(p, r(2, 0.5, 0.75), r(4, 0, 0.2))

  const top = GROUND - FLOORS * FLOOR_H
  const outline = `M${B_LEFT} ${GROUND} V${top - 8} H${B_RIGHT} V${GROUND}`
  const floorsPath = Array.from({ length: FLOORS - 1 }, (_, i) => `M${B_LEFT} ${floorTop(i)} H${B_RIGHT}`).join(" ")
  const bays = COLUMNS.slice(1, -1).map((x) => `M${x + COL_W / 2} ${GROUND} V${top}`).join(" ")

  return (
    <motion.g style={{ opacity }} fill="none" stroke={C.brand} strokeWidth="1.4">
      <motion.path d={outline} style={{ pathLength: draw }} />
      <motion.path d={floorsPath} strokeDasharray="5 4" style={{ pathLength: draw }} />
      <motion.path d={bays} strokeDasharray="2 5" opacity=".7" style={{ pathLength: draw }} />
      <motion.g style={{ opacity: dims }} stroke={C.ink} strokeWidth="1.1">
        <path d={`M560 ${GROUND} V${top - 8} M554 ${GROUND} h12 M554 ${top - 8} h12`} />
        <rect x="540" y={(GROUND + top) / 2 - 10} width="40" height="20" rx="10" fill={C.paper} />
        <text x="560" y={(GROUND + top) / 2 + 4} textAnchor="middle" fontSize="9.5" fontWeight="700" fill={C.ink} stroke="none" letterSpacing="0.5">
          18 M
        </text>
        <path d={`M${B_LEFT} ${top - 36} H${B_RIGHT} M${B_LEFT} ${top - 42} v12 M${B_RIGHT} ${top - 42} v12`} />
        <rect x="378" y={top - 46} width="44" height="20" rx="10" fill={C.paper} />
        <text x="400" y={top - 32} textAnchor="middle" fontSize="9.5" fontWeight="700" fill={C.ink} stroke="none" letterSpacing="0.5">
          24 M
        </text>
      </motion.g>
    </motion.g>
  )
}

/* ----------------------------------------- Estimate → programme panel */

const BARS = [
  { est: 110, gx: 0, gw: 46 },
  { est: 72, gx: 30, gw: 52 },
  { est: 92, gx: 64, gw: 40 },
  { est: 48, gx: 86, gw: 34 },
]

function PlanningPanel({ p }: { p: P }) {
  const panel = useAppear(p, r(2, 0.35, 0.55), r(4, 0, 0.2))
  const estLabel = useAppear(p, r(2, 0.35, 0.5), r(3, 0.05, 0.2))
  const progLabel = useAppear(p, r(3, 0.15, 0.3))
  return (
    <motion.g style={{ opacity: panel }}>
      <rect x="40" y="40" width="190" height="150" rx="12" fill={C.paper} stroke={C.ink} strokeWidth="1.5" />
      <motion.text x="58" y="66" fontSize="10" fontWeight="700" letterSpacing="2" fill={C.ink} style={{ opacity: estLabel }}>
        ESTIMATE
      </motion.text>
      <motion.text x="58" y="66" fontSize="10" fontWeight="700" letterSpacing="2" fill={C.brand} style={{ opacity: progLabel }}>
        PROGRAMME
      </motion.text>
      <path d="M58 78 H212" stroke={C.line} strokeWidth="1" />
      {BARS.map((bar, i) => (
        <PlanBar key={i} p={p} index={i} {...bar} />
      ))}
    </motion.g>
  )
}

function PlanBar({ p, index, est, gx, gw }: { p: P; index: number; est: number; gx: number; gw: number }) {
  const MAX = 150
  const grow = r(2, 0.45 + index * 0.08, 0.65 + index * 0.08)
  const morph = r(3, 0.1, 0.4)
  const scaleX = useTransform(p, [grow[0], grow[1], morph[0], morph[1]], [0, est / MAX, est / MAX, gw / MAX])
  const x = useTransform(p, [...morph], [0, gx])
  const y = 94 + index * 22
  return (
    <motion.rect
      x={58}
      y={y}
      width={MAX}
      height="10"
      rx="5"
      fill={index === 0 ? C.brand : index === 2 ? C.bronze : C.ink}
      opacity={index === 0 ? 1 : 0.85}
      style={{ scaleX, x, originX: 0 }}
    />
  )
}

/* ---------------------------------------------------------------- Permit */

function Permit({ p }: { p: P }) {
  const doc = useAppear(p, r(3, 0, 0.3), r(4, 0, 0.2))
  const slide = useTransform(p, [...r(3, 0, 0.3)], [60, 0])
  const lines = useTransform(p, [...r(3, 0.2, 0.5)], [0, 1])
  const stamp = useTransform(p, [...r(3, 0.5, 0.65)], [0, 1])
  const stampScale = useTransform(p, [...r(3, 0.5, 0.65)], [1.6, 1])
  const tick = useTransform(p, [...r(3, 0.65, 0.85)], [0, 1])

  return (
    <motion.g style={{ opacity: doc, x: slide }}>
      <rect x="590" y="40" width="160" height="196" rx="10" fill={C.paper} stroke={C.ink} strokeWidth="1.5" />
      <text x="608" y="66" fontSize="10" fontWeight="700" letterSpacing="2" fill={C.ink}>
        PERMIT
      </text>
      {[86, 104, 122, 140].map((y, i) => (
        <motion.path key={y} d={`M608 ${y} H${[728, 700, 716, 690][i]}`} stroke={C.line} strokeWidth="6" strokeLinecap="round" style={{ pathLength: lines }} />
      ))}
      <motion.g style={{ opacity: stamp, scale: stampScale, rotate: -12, originX: 0.5, originY: 0.5 }}>
        <circle cx="690" cy="190" r="30" fill="none" stroke={C.brand} strokeWidth="2.5" />
        <circle cx="690" cy="190" r="24" fill="none" stroke={C.brand} strokeWidth="1" strokeDasharray="2 3" />
        <text x="690" y="194" textAnchor="middle" fontSize="8.5" fontWeight="800" letterSpacing="1.2" fill={C.brand}>
          APPROVED
        </text>
      </motion.g>
      <motion.path d="M610 196 l10 10 l20 -24" stroke={C.brand} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ pathLength: tick }} />
    </motion.g>
  )
}

/* ------------------------------------------------------------- Structure */

function Structure({ p }: { p: P }) {
  const foundation = useTransform(p, [...r(4, 0.02, 0.15)], [0, 1])
  return (
    <g>
      <motion.rect x={B_LEFT - 12} y={GROUND} width={B_RIGHT - B_LEFT + 24} height="14" fill={C.ink} style={{ scaleX: foundation, originX: 0.5 }} />
      {Array.from({ length: FLOORS }, (_, i) => (
        <Floor key={i} p={p} index={i} />
      ))}
    </g>
  )
}

function Floor({ p, index }: { p: P; index: number }) {
  const span = 0.85 / FLOORS
  const start = 0.15 + index * span
  const cols = useTransform(p, [...r(4, start, start + span * 0.6)], [0, 1])
  const slab = useTransform(p, [...r(4, start + span * 0.45, start + span)], [0, 1])
  const top = floorTop(index)
  return (
    <g>
      {COLUMNS.map((x) => (
        <motion.rect key={x} x={x} y={top} width={COL_W} height={FLOOR_H} fill={C.ink} style={{ scaleY: cols, originY: 1 }} />
      ))}
      <motion.rect x={B_LEFT - 4} y={top - 6} width={B_RIGHT - B_LEFT + 8} height="7" rx="1" fill={C.ink} style={{ scaleX: slab, originX: 0 }} />
    </g>
  )
}

/* ----------------------------------------------------------------- Crane */

function Crane({ p }: { p: P }) {
  const mast = useTransform(p, [...r(4, 0, 0.12)], [0, 1])
  const jib = useTransform(p, [...r(4, 0.08, 0.18)], [0, 1])
  const visible = useAppear(p, r(4, 0, 0.04), r(6, 0, 0.25))
  const leave = useTransform(p, [...r(6, 0, 0.25)], [0, 40])
  const build = r(4, 0.15, 1)
  const steps = [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1].map((t) => build[0] + (build[1] - build[0]) * t)
  const trolleyX = useTransform(p, steps, [0, -110, -40, -120, -60, -100, -30, -70])
  const cable = useTransform(p, steps, [60, 250, 120, 210, 100, 170, 60, 110])

  const MAST_X = 640
  const TOP = 120

  return (
    <motion.g style={{ opacity: visible, y: leave }}>
      <motion.g style={{ scaleY: mast, originY: 1 }}>
        <rect x={MAST_X} y={TOP} width="14" height={GROUND - TOP} fill="none" stroke={C.bronze} strokeWidth="2" />
        <path
          d={Array.from({ length: 12 }, (_, i) => {
            const y = TOP + i * ((GROUND - TOP) / 12)
            const y2 = y + (GROUND - TOP) / 12
            return `M${MAST_X} ${y} L${MAST_X + 14} ${y2} M${MAST_X + 14} ${y} L${MAST_X} ${y2}`
          }).join(" ")}
          stroke={C.bronze}
          strokeWidth="1"
          opacity=".8"
        />
        <rect x={MAST_X - 6} y={TOP - 22} width="26" height="22" rx="3" fill={C.bronze} />
        <rect x={MAST_X} y={TOP - 16} width="10" height="9" rx="1.5" fill={C.paper} opacity=".8" />
      </motion.g>
      <motion.g style={{ scaleX: jib, originX: 0.69 }}>
        <path d={`M${MAST_X + 7} ${TOP - 54} L430 ${TOP - 4} M${MAST_X + 7} ${TOP - 54} L740 ${TOP - 4}`} stroke={C.bronze} strokeWidth="1.2" />
        <rect x="420" y={TOP - 4} width="330" height="10" fill="none" stroke={C.bronze} strokeWidth="2" />
        <path
          d={Array.from({ length: 22 }, (_, i) => `M${420 + i * 15} ${TOP - 4} L${435 + i * 15} ${TOP + 6}`).join(" ")}
          stroke={C.bronze}
          strokeWidth="1"
        />
        <path d={`M${MAST_X + 7} ${TOP - 54} V${TOP - 4}`} stroke={C.bronze} strokeWidth="2" />
        <rect x="712" y={TOP + 6} width="34" height="26" rx="2" fill={C.ink} />
        <motion.g style={{ x: trolleyX }}>
          <rect x="586" y={TOP + 4} width="18" height="8" rx="2" fill={C.ink} />
          <motion.rect x="594.4" y={TOP + 12} width="1.2" height="1" fill={C.ink} style={{ scaleY: cable, originY: 0 }} />
          <motion.g style={{ y: cable }}>
            <path d={`M595 ${TOP + 12} l-14 18 M595 ${TOP + 12} l14 18`} stroke={C.ink} strokeWidth="1" />
            <rect x="565" y={TOP + 30} width="60" height="7" fill={C.ink} />
          </motion.g>
        </motion.g>
      </motion.g>
    </motion.g>
  )
}

/* ------------------------------------------------------------ Inspection */

function Inspection({ p }: { p: P }) {
  const lens = useAppear(p, r(5, 0, 0.1), r(5, 0.85, 1))
  const lensY = useTransform(p, [...r(5, 0.05, 0.85)], [floorTop(FLOORS - 1) + 20, floorTop(0) + 20])
  return (
    <g>
      <motion.g style={{ opacity: lens, y: lensY }}>
        <circle cx="574" cy="0" r="24" fill={C.paper} fillOpacity=".55" stroke={C.brand} strokeWidth="3" />
        <path d="M591 17 l22 22" stroke={C.brand} strokeWidth="6" strokeLinecap="round" />
        <path d="M562 -6 a14 14 0 0 1 10 -6" stroke={C.brand} strokeWidth="2" fill="none" strokeLinecap="round" opacity=".6" />
      </motion.g>
      {Array.from({ length: FLOORS }, (_, i) => (
        <FloorCheck key={i} p={p} index={i} />
      ))}
    </g>
  )
}

function FloorCheck({ p, index }: { p: P; index: number }) {
  const order = FLOORS - 1 - index // inspected top-down
  const show = useAppear(p, r(5, 0.12 + order * 0.15, 0.22 + order * 0.15), r(6, 0.2, 0.4))
  const tick = useTransform(p, [...r(5, 0.16 + order * 0.15, 0.26 + order * 0.15)], [0, 1])
  const cy = floorTop(index) + FLOOR_H / 2
  return (
    <motion.g style={{ opacity: show }}>
      <circle cx="252" cy={cy} r="10" fill={C.brand} />
      <motion.path d={`M247 ${cy} l3.5 3.5 l6 -7`} stroke={C.paper} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ pathLength: tick }} />
    </motion.g>
  )
}

/* -------------------------------------------------------------- Handover */

function Handover({ p }: { p: P }) {
  const keys = useAppear(p, r(6, 0.75, 0.95))
  const keysY = useTransform(p, [...r(6, 0.75, 0.95)], [16, 0])
  return (
    <g>
      {Array.from({ length: FLOORS }, (_, i) => (
        <Facade key={i} p={p} index={i} />
      ))}
      <Entrance p={p} />
      <Tree p={p} x={190} scale={1} delay={0} />
      <Tree p={p} x={612} scale={1.15} delay={0.06} />
      <Tree p={p} x={690} scale={0.8} delay={0.12} />
      <motion.g style={{ opacity: keys, y: keysY }}>
        <rect x="40" y="40" width="196" height="56" rx="28" fill={C.ink} />
        <circle cx="68" cy="68" r="16" fill={C.bronze} />
        <circle cx="64" cy="68" r="5" fill="none" stroke={C.ink} strokeWidth="2" />
        <path d="M69 68 h9 m-3 0 v4" stroke={C.ink} strokeWidth="2" strokeLinecap="round" />
        <text x="94" y="65" fontSize="10" fontWeight="700" letterSpacing="1.6" fill={C.paper} opacity=".6">
          COMPLETE
        </text>
        <text x="94" y="80" fontSize="12.5" fontWeight="700" fill={C.paper}>
          Keys handed over
        </text>
      </motion.g>
    </g>
  )
}

function Facade({ p, index }: { p: P; index: number }) {
  const close = useTransform(p, [...r(6, 0.05 + index * 0.05, 0.25 + index * 0.05)], [0, 1])
  const top = floorTop(index)
  const bays = COLUMNS.slice(0, -1).map((x, b) => ({ x: x + COL_W, w: (COLUMNS[b + 1] ?? B_RIGHT) - x - COL_W }))
  return (
    <motion.g style={{ opacity: close }}>
      <rect x={B_LEFT} y={top} width={B_RIGHT - B_LEFT} height={FLOOR_H} fill={C.facade} />
      {bays.map((bay, b) =>
        index === 0 && b === 1 ? null : <Window key={b} p={p} x={bay.x + 8} y={top + 8} w={bay.w - 16} h={FLOOR_H - 18} seq={index * 3 + b} />,
      )}
      <rect x={B_LEFT - 4} y={top - 6} width={B_RIGHT - B_LEFT + 8} height="7" fill={C.ink} />
    </motion.g>
  )
}

function Window({ p, x, y, w, h, seq }: { p: P; x: number; y: number; w: number; h: number; seq: number }) {
  const order = [3, 9, 1, 12, 6, 0, 10, 4, 13, 7, 2, 11, 5, 14, 8][seq] ?? seq
  const lit = useTransform(p, [...r(6, 0.3 + order * 0.03, 0.4 + order * 0.03)], [0, 1])
  const halo = useTransform(lit, [0, 1], [0, 0.35])
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="1.5" fill="#3b3b3b" />
      <motion.rect x={x} y={y} width={w} height={h} rx="1.5" fill={C.glow} style={{ opacity: lit }} />
      <motion.rect x={x - 4} y={y - 4} width={w + 8} height={h + 8} fill={C.bronze} filter="url(#glow)" style={{ opacity: halo }} />
      <path d={`M${x + w / 2} ${y} V${y + h}`} stroke={C.facade} strokeWidth="1.5" />
    </g>
  )
}

function Entrance({ p }: { p: P }) {
  const show = useTransform(p, [...r(6, 0.2, 0.4)], [0, 1])
  const x = COLUMNS[1]! + COL_W + 10
  const w = COLUMNS[2]! - COLUMNS[1]! - COL_W - 20
  return (
    <motion.g style={{ opacity: show }}>
      <rect x={x} y={GROUND - 40} width={w} height="40" fill={C.glow} />
      <path d={`M${x + w / 2} ${GROUND - 40} V${GROUND}`} stroke={C.bronze} strokeWidth="1.5" />
      <rect x={x - 8} y={GROUND - 46} width={w + 16} height="6" fill={C.bronze} />
    </motion.g>
  )
}

function Tree({ p, x, scale, delay }: { p: P; x: number; scale: number; delay: number }) {
  const grow = useTransform(p, [...r(6, 0.35 + delay, 0.7 + delay)], [0, scale])
  return (
    <motion.g style={{ scale: grow, originX: 0.5, originY: 1 }}>
      <path d={`M${x} ${GROUND} V${GROUND - 40}`} stroke="#6b5a45" strokeWidth="4" strokeLinecap="round" />
      <circle cx={x} cy={GROUND - 62} r="28" fill="#8f9a7a" />
      <circle cx={x - 14} cy={GROUND - 48} r="18" fill="#7d8869" />
      <circle cx={x + 16} cy={GROUND - 50} r="16" fill="#a3ad8c" />
    </motion.g>
  )
}

/* ------------------------------------------------------------------- Sun */

function Sun({ p }: { p: P }) {
  const rise = useTransform(p, [r(5, 0.6)[0], r(6, 0.3)[1]], [0, 1])
  const y = useTransform(p, [r(5, 0.6)[0], r(6, 1)[1]], [80, 0])
  return (
    <motion.g style={{ opacity: rise, y }}>
      <circle cx="430" cy="150" r="120" fill={C.bronze} opacity=".08" />
      <circle cx="430" cy="150" r="70" fill={C.bronze} opacity=".12" />
    </motion.g>
  )
}
