import { Arrow, Box, Database, Label, Line } from '../../../diagrams/primitives'

/**
 * The parts of the Eval diagrams that are the same before and after training.
 * An embedding model doesn't answer the query: it turns the query and every case
 * in the corpus into vectors, and the cases nearest the query are retrieved and
 * scored. So: the query and the corpus both go into the model, which places them
 * in an embedding space; the nearest cases are the results.
 *
 * The model (drawn by each diagram) is at x = 206, y = 105. Canvas px for the
 * 900 x 300 Eval diagrams; each diagram shifts the drawing to centre it.
 * Items still to be confirmed are written as "[... TBD]".
 */
export function Inputs() {
  return (
    <g>
      {/* the query */}
      <Box x={20} y={60} w={100} h={50} />
      <Line from={[34, 78]} to={[106, 78]} opacity={0.3} />
      <Line from={[34, 94]} to={[84, 94]} opacity={0.3} />
      <Label x={70} y={132} anchor="middle">case law query</Label>
      <Label x={70} y={149} size={12.5} italic opacity={0.7} anchor="middle">[eval set: TBD]</Label>
      <Arrow points={[[128, 85], [202, 125]]} smooth strokeWidth={2.5} headLength={13.5} headWidth={12} />

      {/* the corpus */}
      <Database x={20} y={180} w={100} h={70} />
      <Label x={70} y={272} anchor="middle">US Caselaw</Label>
      <Label x={70} y={289} italic opacity={0.7} anchor="middle">Delaware subset</Label>
      <Arrow points={[[128, 215], [202, 175]]} smooth strokeWidth={2.5} headLength={13.5} headWidth={12} />
    </g>
  )
}

/** The query and the cases as points; the cases nearest the query are retrieved. */
export function EmbeddingSpace({ accent }: { accent: string }) {
  const query = { x: 510, y: 150 }
  const nearest = [[535, 122], [547, 160], [488, 185]]
  const others = [[448, 110], [590, 104], [600, 190], [452, 196], [574, 204], [446, 150]]
  return (
    <g>
      <Arrow points={[[358, 150], [410, 150]]} />
      <Label x={530} y={72} size={12.5} opacity={0.7} anchor="middle">EMBEDDING SPACE</Label>
      <Box x={420} y={80} w={220} h={140} radius={10} strokeWidth={1.8} dashed />
      {others.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={6} fill="currentColor" opacity={0.5} />
      ))}
      <circle cx={query.x} cy={query.y} r={48} fill="none" stroke="currentColor" strokeOpacity={0.6} strokeWidth={1.5} strokeDasharray="4 4" />
      {nearest.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={7} fill={accent} />
      ))}
      <circle cx={query.x} cy={query.y} r={9} fill="currentColor" />
      <Label x={530} y={242} anchor="middle">nearest cases are retrieved</Label>
      <Arrow points={[[650, 150], [700, 150]]} />
    </g>
  )
}
