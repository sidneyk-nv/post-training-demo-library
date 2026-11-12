import { Arrow, BLUE, Box, Dataset, Label, WHITE } from '../../../diagrams/primitives'

/**
 * Harvey, CFT (contrastive fine-tuning): implicit signals (click telemetry and
 * follow-ups / refinements mined from conversations) become training pairs: a
 * query, a positive and negatives. The embedding model is updated so each query
 * moves toward its positive and away from the negatives.
 * Canvas: 900 x 330 px (set in `index.ts`).
 * White, with the accent (blue) on the model.
 * Skeleton: how the pairs and negatives are built is still to be confirmed.
 */

export function HarveyCft() {
  return (
    <g color={WHITE}>
      {/* implicit signals */}
      <Label x={89} y={26} anchor="middle">implicit signals</Label>
      <Box x={14} y={40} w={150} h={56} />
      <Label x={89} y={64} size={14.4} anchor="middle">click</Label>
      <Label x={89} y={82} size={14.4} anchor="middle">telemetry</Label>
      <Box x={14} y={108} w={150} h={56} />
      <Label x={89} y={132} size={14.4} anchor="middle">follow-ups &amp;</Label>
      <Label x={89} y={150} size={14.4} anchor="middle">refinements</Label>
      <Label x={89} y={184} size={13} italic opacity={0.7} anchor="middle">mined from conversations</Label>

      {/* signals → training pairs */}
      <Arrow points={[[168, 68], [222, 96]]} smooth strokeWidth={2.5} headLength={13.5} headWidth={12} />
      <Arrow points={[[168, 136], [222, 116]]} smooth strokeWidth={2.5} headLength={13.5} headWidth={12} />
      <Dataset x={226} y={73} w={90} h={66} checkboxes={false} />
      <Label x={280} y={172} anchor="middle">training pairs</Label>
      <Label x={280} y={189} size={12.5} italic opacity={0.7} anchor="middle">[negatives: TBD]</Label>
      <Arrow points={[[346, 106], [388, 106]]} />

      {/* the embedding model */}
      <Box color={BLUE} x={392} y={61} w={142} h={90} radius={13.5} strokeWidth={3.4} />
      <Label color={BLUE} x={463} y={100} size={17.8} anchor="middle">Nemotron</Label>
      <Label color={BLUE} x={463} y={122} size={17.8} anchor="middle">Embed 3.5</Label>
      <Arrow points={[[538, 106], [580, 106]]} />

      {/* embedding space: the query moves toward its positive and away from negatives */}
      <Label x={731} y={28} size={12.5} opacity={0.7} anchor="middle">EMBEDDING SPACE</Label>
      <Box x={586} y={36} w={290} h={140} radius={10} strokeWidth={1.8} dashed />
      <circle cx={690} cy={106} r={9} fill="currentColor" />
      <Label x={690} y={134} size={12.5} anchor="middle">query</Label>
      <circle cx={750} cy={80} r={7} fill={BLUE} />
      <Label x={750} y={64} size={12.5} anchor="middle" color={BLUE}>positive</Label>
      <Arrow points={[[740, 86], [704, 102]]} strokeWidth={1.8} headLength={8} headWidth={8} color={BLUE} />
      {[[622, 74], [632, 138], [836, 132]].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={6} fill="currentColor" opacity={0.5} />
      ))}
      <Label x={632} y={160} size={12.5} opacity={0.7} anchor="middle">negatives</Label>

      {/* the contrastive loss flows back to the model */}
      <Label x={731} y={198} anchor="middle">Contrastive loss</Label>
      <Label x={731} y={215} anchor="middle">(distance based)</Label>
      <Arrow points={[[731, 226], [731, 262], [463, 262], [463, 155]]} headLength={13.5} headWidth={13.5} />
      <Label x={490} y={252} italic>update weights</Label>
      <Label x={490} y={286} italic opacity={0.7}>to reduce the contrastive loss</Label>
    </g>
  )
}
