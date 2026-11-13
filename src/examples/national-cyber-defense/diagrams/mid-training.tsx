import { Arrow, BLUE, Box, Dataset, Label, WHITE } from '../../../diagrams/primitives'

/**
 * Dream, mid-training (continued pre-training): expert-curated security
 * sources become synthetic training data through six generation flows; an
 * LLM quality filter (Qwen3-30B-A3B) discards samples below 8/10; the model
 * learns the curated corpus by next-token prediction.
 * Canvas: 960 x 300 px (set in `index.ts`). White, with the accent (blue) on
 * the models.
 */
const SOURCES = [
  { name: 'Vulnerabilities & threat intel', eg: 'NVD/CVE, CTI feeds' },
  { name: 'Security taxonomies', eg: 'CWE, CAPEC, ATT&CK, D3FEND' },
  { name: 'Operational artifacts', eg: 'Sigma, Atomic Red Team, MISP' },
  { name: 'Defensive guidance', eg: 'OWASP, NIST, platform docs' },
]

export function DreamMidTraining() {
  return (
    <g color={WHITE}>
      {/* expert-curated sources */}
      <Label x={122} y={38} size={12.5} opacity={0.7} anchor="middle">EXPERT-CURATED SOURCES</Label>
      <Box x={14} y={50} w={216} h={200} radius={10} strokeWidth={1.8} dashed />
      {SOURCES.map((s, i) => (
        <g key={s.name}>
          <Label x={28} y={78 + i * 46} size={13}>{s.name}</Label>
          <Label x={28} y={95 + i * 46} size={12} italic opacity={0.7}>{s.eg}</Label>
        </g>
      ))}
      <Arrow points={[[236, 150], [266, 150]]} />

      {/* six generation flows → synthetic data */}
      <Box x={270} y={105} w={140} h={90} />
      <Label x={340} y={142} size={15} anchor="middle">synthetic data</Label>
      <Label x={340} y={164} italic opacity={0.7} anchor="middle">6 generation flows</Label>
      <Arrow points={[[414, 150], [444, 150]]} />

      {/* LLM quality filter */}
      <Box x={448} y={105} w={150} h={90} color={BLUE} radius={10} />
      <Label x={523} y={136} size={15} anchor="middle" color={BLUE}>quality filter</Label>
      <Label x={523} y={157} size={13} anchor="middle" color={BLUE}>Qwen3-30B-A3B</Label>
      <Label x={523} y={177} italic opacity={0.7} anchor="middle" color={BLUE}>keeps ≥ 8/10</Label>
      <Arrow points={[[602, 150], [632, 150]]} />

      {/* curated corpus → model */}
      <Dataset x={642} y={124} w={70} h={56} checkboxes={false} />
      <Label x={685} y={214} anchor="middle">curated corpus</Label>
      <Arrow points={[[734, 150], [768, 150]]} />

      <Box x={772} y={95} w={172} h={110} radius={13.5} strokeWidth={3.4} color={BLUE} />
      <Label x={858} y={136} size={17.8} anchor="middle" color={BLUE}>Nemotron 3.5</Label>
      <Label x={858} y={158} size={17.8} anchor="middle" color={BLUE}>Super VL</Label>
      <Label x={858} y={184} italic opacity={0.7} anchor="middle" color={BLUE}>next-token prediction</Label>

      <Label x={480} y={284} size={14.4} italic opacity={0.7} anchor="middle">
        high-quality synthetic data teaches domain knowledge
      </Label>
    </g>
  )
}
