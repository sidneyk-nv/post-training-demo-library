import type { Hotspot } from '../types'
import type { StageId } from '../../diagrams'

/**
 * Hover popovers for the Legal Services (Harvey) diagrams.
 * This is unfinished! "[TBD]" marks what's still to
 * be confirmed.
 */
const model = 'Nemotron Embed 3.5'

// The Eval diagrams are shifted on their canvas (16px right, 25px up), so positions here include that shift.
const queries = (prefix: string): Hotspot => ({
  id: `${prefix}-queries`,
  x: 36,
  y: 35,
  width: 100,
  height: 50,
  title: 'Case law queries',
  body: '[TBD: how the evaluation set was built]',
  popoverWidth: 300,
  side: 'bottom',
})

const corpus = (prefix: string): Hotspot => ({
  id: `${prefix}-corpus`,
  x: 36,
  y: 155,
  width: 100,
  height: 70,
  title: 'US Caselaw',
  body: 'Delaware subset',
  popoverWidth: 240,
  side: 'right',
})

const space = (prefix: string): Hotspot => ({
  id: `${prefix}-space`,
  x: 436,
  y: 55,
  width: 220,
  height: 140,
  title: 'Retrieval',
  body: 'The cases nearest the query in the embedding space are retrieved',
  popoverWidth: 320,
  side: 'bottom',
})

const score = (prefix: string): Hotspot => ({
  id: `${prefix}-score`,
  x: 728,
  y: 76,
  width: 136,
  height: 110,
  title: 'Retrieval score',
  body: '[TBD: metric and result]',
  popoverWidth: 280,
  side: 'bottom',
})

export const popovers: Partial<Record<StageId, Hotspot[]>> = {
  eval: [
    queries('eval'),
    { id: 'eval-model', x: 222, y: 80, width: 142, height: 90, title: 'Base model', body: model, popoverWidth: 260 },
    corpus('eval'),
    space('eval'),
    score('eval'),
  ],
  cft: [
    {
      id: 'cft-synthetic',
      x: 14,
      y: 78,
      width: 150,
      height: 56,
      title: 'Synthetic data',
      body: '[TBD: how the synthetic data is generated]',
      popoverWidth: 320,
      side: 'bottom',
    },
    {
      id: 'cft-pairs',
      x: 226,
      y: 55,
      width: 108,
      height: 84,
      title: 'Training pairs',
      body: '[TBD: pairs and how negatives are chosen]',
      popoverWidth: 320,
      side: 'bottom',
    },
    { id: 'cft-model', x: 392, y: 61, width: 142, height: 90, title: 'Model', body: model, popoverWidth: 260 },
    {
      id: 'cft-space',
      x: 586,
      y: 36,
      width: 290,
      height: 140,
      title: 'Contrastive Loss',
      body: 'Calculated from similarity scores. Embedded passages should be close to the query if relevant (positive), and far away if not (negative)',
      popoverWidth: 320,
      side: 'bottom',
    },
  ],
  'eval-2': [
    queries('eval2'),
    {
      id: 'eval2-model',
      x: 222,
      y: 80,
      width: 142,
      height: 90,
      title: 'Post-trained model',
      body: `${model} after contrastive fine-tuning`,
      popoverWidth: 300,
    },
    corpus('eval2'),
    space('eval2'),
    score('eval2'),
  ],
}
