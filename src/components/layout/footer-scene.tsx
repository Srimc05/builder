/**
 * Footer illustration — a Chennai neighbourhood at dusk.
 *
 * Distant towers, apartment blocks with balconies, independent houses with
 * parapets, sunshades and rooftop water tanks, coconut palms, a building
 * still under construction with its crane, and a family walking home under
 * the street lamps. When the footer scrolls into view the windows light up
 * one by one — homes coming alive for the evening.
 *
 * Pure SVG (no images). Decorative only, hidden from assistive technology.
 */
import { motion, type Variants } from "motion/react"

const VB_W = 1600
const VB_H = 340
const GROUND = 318

const C = {
  far: "#2f2c28",
  farWin: "#3a3833",
  mid: "#211f1d",
  front: "#0d0d0c",
  detail: "#2a2927",
  glow: "#f2c48d",
  bronze: "#c58a50",
}

/** Small deterministic PRNG so the scene is identical on every render. */
function rng(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 2 ** 32
  }
}

interface Win {
  x: number
  y: number
  w: number
  h: number
  lit: boolean
  level: number
  delay: number
}

/** Window grid inside a facade. */
function windows(x: number, y: number, w: number, h: number, cols: number, rows: number, ww: number, wh: number, seed: number, litRatio: number): Win[] {
  const r = rng(seed)
  const out: Win[] = []
  const gx = (w - cols * ww) / (cols + 1)
  const gy = (h - rows * wh) / (rows + 1)
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const lit = r() < litRatio
      out.push({
        x: x + gx + col * (ww + gx),
        y: y + gy + row * (wh + gy),
        w: ww,
        h: wh,
        lit,
        level: 0.55 + r() * 0.45,
        delay: 0.2 + r() * 1.8,
      })
    }
  }
  return out
}

const lightUp: Variants = {
  off: { opacity: 0.08 },
  on: (w: Win) => ({ opacity: w.lit ? w.level : 0.08, transition: { duration: 0.6, delay: w.delay } }),
}

function Windows({ items, color = C.glow }: { items: Win[]; color?: string }) {
  return (
    <>
      {items.map((w, i) => (
        <motion.rect key={i} x={w.x} y={w.y} width={w.w} height={w.h} rx={1} fill={color} custom={w} variants={lightUp} />
      ))}
    </>
  )
}

/* ------------------------------------------------------------------ data */

const FAR_TOWERS = [
  [30, 90, 168], [140, 56, 120], [320, 104, 196], [452, 68, 140], [770, 120, 182],
  [1030, 78, 150], [1175, 128, 210], [1330, 66, 128], [1440, 110, 176], [1560, 60, 130],
] as const

const MID_BLOCKS = [
  { x: 70, w: 190, floors: 5 },
  { x: 410, w: 150, floors: 4 },
  { x: 880, w: 210, floors: 5 },
  { x: 1255, w: 175, floors: 4 },
] as const
const FLOOR = 26

interface House {
  x: number
  w: number
  storeys: 1 | 2 | 3
  balcony?: boolean
  tank?: boolean
}
const HOUSES: House[] = [
  { x: 0, w: 210, storeys: 2, balcony: true, tank: true },
  { x: 228, w: 170, storeys: 3, tank: true },
  { x: 990, w: 190, storeys: 2, balcony: true, tank: true },
  { x: 1196, w: 200, storeys: 3, balcony: true },
  { x: 1414, w: 186, storeys: 2, tank: true },
]
const STOREY = 46

/* ------------------------------------------------------------- pieces */

function FarLayer() {
  return (
    <g>
      {FAR_TOWERS.map(([x, w, h], i) => (
        <g key={i}>
          <rect x={x} y={GROUND - h} width={w} height={h} fill={C.far} />
          <Windows items={windows(x, GROUND - h, w, h - 20, Math.max(2, Math.floor(w / 18)), Math.floor(h / 22), 5, 7, 100 + i, 0.3)} color={C.glow} />
        </g>
      ))}
      {/* Distant crane */}
      <g stroke={C.far} strokeWidth="3" fill="none">
        <path d={`M262 ${GROUND} V96 M244 100 H352 M262 96 L322 100`} />
        <path d="M334 100 V132" strokeWidth="1.5" />
      </g>
    </g>
  )
}

function Palm({ x, height, lean = 1, color }: { x: number; height: number; lean?: number; color: string }) {
  const topX = x + 18 * lean
  const topY = GROUND - height
  // [end dx, end dy, lift] — long fronds arc up and droop outward
  const fronds = [
    [-66, 30, 26], [-56, 52, 18], [-30, 62, 10], [28, 60, 10], [56, 50, 18], [68, 28, 26], [-44, 8, 30], [44, 6, 30], [0, -8, 28],
  ] as const
  return (
    <g stroke={color} fill="none" strokeLinecap="round">
      <path d={`M${x} ${GROUND} Q${x + 4 * lean} ${GROUND - height * 0.55} ${topX} ${topY}`} strokeWidth="5" />
      {fronds.map(([dx, dy, lift], i) => (
        <path key={i} d={`M${topX} ${topY} Q${topX + dx * 0.45} ${topY - lift} ${topX + dx} ${topY + dy}`} strokeWidth="3" />
      ))}
      <g fill={color} stroke="none">
        <circle cx={topX - 4} cy={topY + 6} r={4} />
        <circle cx={topX + 4} cy={topY + 7} r={4} />
        <circle cx={topX} cy={topY + 11} r={3.5} />
      </g>
    </g>
  )
}

function MidLayer() {
  return (
    <g>
      {MID_BLOCKS.map((b, i) => {
        const h = b.floors * FLOOR + 10
        const top = GROUND - h
        return (
          <g key={i}>
            <rect x={b.x} y={top} width={b.w} height={h} fill={C.mid} />
            {/* parapet + water tanks */}
            <rect x={b.x - 3} y={top - 5} width={b.w + 6} height={5} fill={C.mid} />
            <rect x={b.x + b.w * 0.2} y={top - 17} width={16} height={12} rx={3} fill={C.mid} />
            <rect x={b.x + b.w * 0.62} y={top - 15} width={20} height={10} fill={C.mid} />
            {/* balcony slabs */}
            {Array.from({ length: b.floors - 1 }, (_, f) => (
              <rect key={f} x={b.x - 4} y={top + 10 + (f + 1) * FLOOR - 2} width={b.w + 8} height={3} fill={C.detail} />
            ))}
            <Windows items={windows(b.x, top + 10, b.w, h - 10, Math.floor(b.w / 30), b.floors, 14, 13, 200 + i, 0.45)} />
          </g>
        )
      })}
      <Palm x={300} height={150} color={C.mid} />
      <Palm x={1120} height={164} lean={-1} color={C.mid} />
      <Palm x={1460} height={140} color={C.mid} />
    </g>
  )
}

function HouseShape({ h, seed }: { h: House; seed: number }) {
  const height = h.storeys * STOREY
  const top = GROUND - height
  const r = rng(seed)
  const wins: Win[] = []
  const perFloor = Math.max(2, Math.floor(h.w / 62))
  for (let s = 0; s < h.storeys; s++) {
    const y = GROUND - (s + 1) * STOREY + 12
    const gap = (h.w - perFloor * 24) / (perFloor + 1)
    for (let c = 0; c < perFloor; c++) {
      wins.push({ x: h.x + gap + c * (24 + gap), y, w: 24, h: 22, lit: r() < 0.62, level: 0.7 + r() * 0.3, delay: 0.3 + r() * 1.6 })
    }
  }
  return (
    <g>
      <rect x={h.x} y={top} width={h.w} height={height} fill={C.front} />
      {/* parapet with a small step, typical of flat-roofed homes */}
      <path d={`M${h.x - 4} ${top} V${top - 10} H${h.x + h.w * 0.55} V${top - 16} H${h.x + h.w + 4} V${top} Z`} fill={C.front} />
      {h.tank && (
        <g fill={C.front}>
          <rect x={h.x + h.w * 0.68} y={top - 40} width={24} height={22} rx={5} />
          <rect x={h.x + h.w * 0.68 - 4} y={top - 20} width={32} height={4} />
        </g>
      )}
      <Windows items={wins} />
      {wins.map((w, i) => (
        <path key={`m${i}`} d={`M${w.x + w.w / 2} ${w.y} v${w.h} M${w.x} ${w.y + w.h * 0.45} h${w.w}`} stroke={C.front} strokeWidth="1.6" />
      ))}
      {/* concrete sunshades (chajjas) above each window */}
      {wins.map((w, i) => (
        <rect key={i} x={w.x - 6} y={w.y - 6} width={w.w + 12} height={3} fill={C.detail} />
      ))}
      {h.balcony && (
        <g stroke={C.detail} strokeWidth="1.5">
          <path d={`M${h.x + 10} ${GROUND - STOREY - 2} H${h.x + h.w - 10}`} strokeWidth="3" />
          {Array.from({ length: Math.floor((h.w - 20) / 9) }, (_, i) => (
            <path key={i} d={`M${h.x + 14 + i * 9} ${GROUND - STOREY - 2} v-14`} />
          ))}
          <path d={`M${h.x + 10} ${GROUND - STOREY - 16} H${h.x + h.w - 10}`} />
        </g>
      )}
      {/* compound wall with gate */}
      <rect x={h.x} y={GROUND - 22} width={h.w * 0.38} height={22} fill={C.front} stroke={C.detail} strokeWidth="1" />
      <rect x={h.x + h.w * 0.62} y={GROUND - 22} width={h.w * 0.38} height={22} fill={C.front} stroke={C.detail} strokeWidth="1" />
      <g stroke={C.detail} strokeWidth="1.5">
        {Array.from({ length: 6 }, (_, i) => (
          <path key={i} d={`M${h.x + h.w * 0.4 + i * (h.w * 0.2) / 5} ${GROUND} v-18`} />
        ))}
      </g>
    </g>
  )
}

/** A building still going up — concrete frame, scaffolding and a working crane. */
function UnderConstruction() {
  const x = 560
  const w = 190
  const floors = 3
  return (
    <g>
      {Array.from({ length: floors }, (_, f) => (
        <rect key={`s${f}`} x={x - 4} y={GROUND - (f + 1) * STOREY} width={w + 8} height={6} fill={C.front} />
      ))}
      {[0, 0.33, 0.66, 1].map((p, i) => (
        <rect key={`c${i}`} x={x + p * (w - 8)} y={GROUND - floors * STOREY} width={8} height={floors * STOREY} fill={C.front} />
      ))}
      <g stroke={C.detail} strokeWidth="1">
        {Array.from({ length: floors }, (_, f) => (
          <path key={f} d={`M${x + w + 12} ${GROUND - f * STOREY} L${x + w + 34} ${GROUND - (f + 1) * STOREY} M${x + w + 34} ${GROUND - f * STOREY} L${x + w + 12} ${GROUND - (f + 1) * STOREY}`} />
        ))}
        <path d={`M${x + w + 12} ${GROUND} V${GROUND - floors * STOREY - 10} M${x + w + 34} ${GROUND} V${GROUND - floors * STOREY - 10}`} strokeWidth="1.5" />
      </g>
      {/* Tower crane */}
      <g stroke={C.front} fill="none">
        <path d={`M${x + 70} ${GROUND} V60`} strokeWidth="9" />
        <path d={`M${x + 70} 64 H${x + 330} M${x + 70} 64 H${x + 10}`} strokeWidth="5" />
        <path d={`M${x + 70} 46 L${x + 300} 64 M${x + 70} 46 L${x + 18} 64`} strokeWidth="1.5" />
        <rect x={x + 6} y={64} width={22} height={18} fill={C.front} stroke="none" />
      </g>
      <motion.g
        animate={{ y: [0, 26, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d={`M${x + 250} 66 V150`} stroke={C.front} strokeWidth="1.5" />
        <rect x={x + 222} y={150} width={56} height={6} fill={C.front} />
      </motion.g>
      <motion.circle
        cx={x + 70}
        cy={58}
        r={3}
        fill="#e5533d"
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{ duration: 2.4, repeat: Infinity }}
      />
    </g>
  )
}

function StreetLamp({ x }: { x: number }) {
  return (
    <g>
      <motion.circle
        cx={x + 14}
        cy={GROUND - 92}
        r={46}
        fill="url(#lamp-glow)"
        variants={{ off: { opacity: 0 }, on: { opacity: 1, transition: { duration: 1.2, delay: 0.4 } } }}
      />
      <path d={`M${x} ${GROUND} V${GROUND - 96} Q${x} ${GROUND - 102} ${x + 14} ${GROUND - 100}`} stroke={C.front} strokeWidth="3.5" fill="none" />
      <rect x={x + 8} y={GROUND - 100} width={14} height={5} rx={2} fill={C.glow} opacity={0.9} />
    </g>
  )
}

/** A parent and child walking home, hand in hand. */
function Family({ x }: { x: number }) {
  return (
    <g fill={C.front}>
      <circle cx={x} cy={GROUND - 50} r={6} />
      <path d={`M${x - 7} ${GROUND - 42} h14 l3 22 h-5 l-2 20 h-3 l-1 -18 l-1 18 h-3 l-2 -20 h-5z`} />
      <circle cx={x + 22} cy={GROUND - 33} r={4.5} />
      <path d={`M${x + 17} ${GROUND - 27} h10 l2 14 h-3 l-1 13 h-2.5 l-1 -12 l-1 12 h-2.5 l-1 -13 h-3z`} />
      <path d={`M${x + 8} ${GROUND - 30} Q${x + 13} ${GROUND - 24} ${x + 18} ${GROUND - 22}`} stroke={C.front} strokeWidth="2.5" fill="none" />
    </g>
  )
}

function Birds() {
  return (
    <motion.g
      stroke="#3b3a36"
      strokeWidth="1.6"
      fill="none"
      strokeLinecap="round"
      animate={{ x: [0, 40, 0], y: [0, -6, 0] }}
      transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
    >
      <path d="M980 70 q6 -6 12 0 q6 -6 12 0" />
      <path d="M1012 58 q5 -5 10 0 q5 -5 10 0" />
      <path d="M1036 76 q4 -4 8 0 q4 -4 8 0" />
    </motion.g>
  )
}

export function FooterScene({ className }: { className?: string }) {
  return (
    <motion.svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="xMidYMax slice"
      aria-hidden
      focusable="false"
      className={className}
      initial="off"
      whileInView="on"
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
    >
      <defs>
        <radialGradient id="dusk" cx="50%" cy="100%" r="75%" gradientTransform="translate(0 0.2) scale(1 0.8)">
          <stop offset="0" stopColor={C.bronze} stopOpacity="0.38" />
          <stop offset="0.5" stopColor={C.bronze} stopOpacity="0.1" />
          <stop offset="1" stopColor={C.bronze} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="lamp-glow">
          <stop offset="0" stopColor={C.glow} stopOpacity="0.35" />
          <stop offset="1" stopColor={C.glow} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width={VB_W} height={VB_H} fill="url(#dusk)" />
      <Birds />
      <FarLayer />
      <MidLayer />
      <UnderConstruction />
      {HOUSES.map((h, i) => (
        <HouseShape key={h.x} h={h} seed={300 + i} />
      ))}
      <Palm x={455} height={176} color={C.front} />
      <Palm x={1405} height={162} lean={-1} color={C.front} />
      <StreetLamp x={800} />
      <StreetLamp x={1188} />
      <Family x={880} />
      {/* Street */}
      <rect y={GROUND} width={VB_W} height={VB_H - GROUND} fill="#090909" />
      <path d={`M0 ${GROUND + 11} H${VB_W}`} stroke={C.far} strokeWidth="2" strokeDasharray="26 22" />
    </motion.svg>
  )
}
