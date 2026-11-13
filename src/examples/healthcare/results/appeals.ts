/**
 * Before-and-after appeal examples for the Healthcare (R1) Results tab, from
 * R1's "R1 × NVIDIA · The appeal room" recorded replay
 * (R1-NVIDIA-GTC-Rooms-Replay.html), rooms 03 and 02. Synthetic cases.
 * Copied verbatim from the replay's saved data, don't edit: the appeal
 * excerpts and highlights, the cited evidence and the evaluator results
 * (`passingDraws`). The replay names the models "Earlier R1-super" (room 03,
 * before), "Base Nemotron" (room 02, before) and "R1-super" (after). The other text (titles, headlines,
 * descriptions, disputes, annotations) is our plain-language rewording of the
 * replay's labels.
 *
 * Note: in room 03 the "before" output is an earlier R1-super iteration, not
 * the base model; each side is labelled with the model the replay names.
 */

export type Evidence = { id: string; document: string; excerpt: string }
export type Passage = { text: string; highlight?: string }
export type AppealSide = {
  /** The model that wrote this appeal (badge label). */
  model: string
  headline: string
  passages: Passage[]
  evidence: Evidence[]
  annotation: string
  /** How many of the two evaluator draws the complete appeal passed. */
  passingDraws: 0 | 1 | 2
}
export type AppealExample = {
  id: string
  /** Label on the example switch. */
  title: string
  category: string
  headline: string
  /** What goes wrong before post-training. */
  description: string
  dispute: string
  before: AppealSide
  after: AppealSide
}

export const appeals: AppealExample[] = [
  {
    id: "room-03",
    title: "Coding dispute",
    category: "R1-super · clinical precision",
    headline: "Information Integrity",
    description: "The earlier model presents its own explanation of the patient's condition as if it were the doctor's.",
    dispute: "The insurer questions whether the record supports the encephalopathy diagnosis.",
    before: {
      model: "Base Model",
      headline: "States its own interpretation as fact",
      passages: [
        { text: "The sedating and anticholinergic contributors were listed as contributors under consideration and did not displace the measured osmolar disturbance as the leading explanation, which the attending treated with fluid restriction.", highlight: "did not displace the measured osmolar disturbance as the leading explanation" },
      ],
      evidence: [
        { id: "EV-1011", document: "Emergency Department Physician Note — 2025-11-30", excerpt: "Sedating and anticholinergic medication exposure — two 25 mg diphenhydramine tablets at home about 22:00 on 2025-11-29 plus chronic oxybutynin 5 mg twice daily, and now a further 25 mg intravenous dose." },
        { id: "EV-1001", document: "Attending Progress Note — 2025-12-01", excerpt: "Assessment: acute metabolic encephalopathy secondary to hyponatremia, sodium 126 mmol/L on arrival and 128 mmol/L today. Plan: fluid restriction 1,200 mL per 24 hours, continue q4h neuro checks, EEG today." },
        { id: "EV-1002", document: "Attending Progress Note — 2025-12-01", excerpt: "The hypotonic hyponatremia with a urine osmolality of 410 mOsm/kg and urine sodium of 48 mmol/L in a euvolemic patient is most consistent with inappropriate antidiuresis; isotonic fluid produced only a 2 mmol/L correction overnight, which supports moving to water restriction rather than further saline." },
      ],
      annotation: "Only partly supported. The evaluator flagged its claim about which cause mattered most as the model's own inference.",
      passingDraws: 0,
    },
    after: {
      model: "Post-Trained",
      headline: "Sticks to what the record says",
      passages: [
        { text: "A sedating and anticholinergic exposure was present and was held or discontinued." },
        { text: "The record does not apportion improvement between sodium correction and the stopping of these agents.", highlight: "The record does not apportion improvement between sodium correction and the stopping of these agents." },
      ],
      evidence: [
        { id: "EV-93", document: "Emergency Department Physician Note — 2025-11-30", excerpt: "Sedating and anticholinergic medication exposure — two 25 mg diphenhydramine tablets at home about 22:00 on 2025-11-29 plus chronic oxybutynin 5 mg twice daily, and now a further 25 mg intravenous dose in this department at 14:35" },
        { id: "EV-571", document: "Nursing Shift Note, Day — 2025-12-02", excerpt: "Diphenhydramine discontinued; the only dose on this record remains the single 25 mg intravenous dose given in the emergency department on 2025-11-30 at 14:35" },
        { id: "EV-572", document: "Nursing Shift Note, Day — 2025-12-02", excerpt: "Home oxybutynin held and removed from the active list; no inpatient dose of oxybutynin has been given at any point during this stay." },
        { id: "EV-971", document: "Discharge Summary — 2025-12-04", excerpt: "The interval from the 133 mmol/L sodium and the medication discontinuation of 2025-12-02 08:00 to this examination is about 50 hours, and the record contains no entry apportioning the improvement between the correction of the sodium and the withdrawal of the sedating and anticholinergic agents; both are reasonably regarded as contributory" },
      ],
      annotation: "Both sentences are backed up by the notes they cite, including the discharge summary saying the record doesn't separate the two causes.",
      passingDraws: 2,
    },
  },
  {
    id: "room-02",
    title: "Length-of-stay dispute",
    category: "Medical necessity · length of stay",
    headline: "Information Integrity",
    description: "The base model cites evidence from the patient's record from outside the time period relevant to the appeal.",
    dispute: "The insurer says the patient didn't need to stay in the hospital after the first emergency treatment.",
    before: {
      model: "Base Nemotron",
      headline: "Cites treatment from before the denied dates",
      passages: [
        { text: "Northbend Community Hospital disputes that determination for the dates indicated because the record documents nocturnal noninvasive ventilation, intravenous corticosteroid, and continuous monitoring for persisting hypercapnia during the denied period.", highlight: "intravenous corticosteroid" },
      ],
      evidence: [
        { id: "EV-737", document: "Discharge Summary — 2025-12-05", excerpt: "2025-12-02: The overnight run ended at 05:45 after 8 hours 15 minutes, tolerated without mask removal, skin breakdown, or gastric distension." },
        { id: "EV-64", document: "Emergency Department Physician Note — 2025-12-01", excerpt: "Bilevel support started at 13:55 at IPAP 14 / EPAP 6 cmH2O, backup rate 12, FiO2 0.31 by full-face mask." },
        { id: "EV-61", document: "Emergency Department Physician Note — 2025-12-01", excerpt: "Methylprednisolone 125 mg intravenously at 11:35, witnessed and signed by Hollis Mbeki, RN." },
        { id: "EV-128", document: "Admission History and Physical with Admission Decision Note — 2025-12-01", excerpt: "Orders written at 15:15: admit to inpatient status, Unit 4 West telemetry, attending Amina Carmichael, MD. Continuous pulse oximetry and continuous cardiac telemetry." },
        { id: "EV-689", document: "Discharge Summary — 2025-12-05", excerpt: "Bilevel support resumed at 21:15 for persisting hypercapnia on that morning's gas." },
      ],
      annotation: "The steroid dose it cites was given in the emergency department, before the dates the insurer denied.",
      passingDraws: 0,
    },
    after: {
      model: "Post-Trained",
      headline: "Cites treatment given on the denied dates",
      passages: [
        { text: "Intravenous corticosteroid, scheduled nebulizers, and continuous oximetry and telemetry continued through the day.", highlight: "Intravenous corticosteroid, scheduled nebulizers, and continuous oximetry and telemetry continued through the day." },
      ],
      evidence: [
        { id: "EV-293", document: "Medication Administration Record — 2025-12-02", excerpt: "06:40 | Methylprednisolone sodium succinate 60 mg IV push over 2 min | right forearm 20 g peripheral IV | GIVEN" },
        { id: "EV-294", document: "Medication Administration Record — 2025-12-02", excerpt: "18:40 | Methylprednisolone sodium succinate 60 mg IV push over 2 min | right forearm 20 g peripheral IV | GIVEN" },
        { id: "EV-295", document: "Medication Administration Record — 2025-12-02", excerpt: "Albuterol 2.5 mg with ipratropium 0.5 mg nebulizers given at 08:05, 12:05, 16:10, and 20:05. Each administration was signed at the bedside" },
        { id: "EV-304", document: "Medication Administration Record — 2025-12-02", excerpt: "Continuous pulse oximetry and continuous cardiac telemetry in place throughout the 24 hours. Nursing reassessment every two hours; respiratory therapy bedside checks every four hours" },
      ],
      annotation: "Backed up by the medication record for one of the denied days.",
      passingDraws: 2,
    },
  },
]
