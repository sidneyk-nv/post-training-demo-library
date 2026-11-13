/**
 * The before-and-after appeal for the Healthcare (R1) Results tab, from R1's
 * "R1 × NVIDIA · The appeal room" recorded replay
 * (R1-NVIDIA-GTC-Rooms-Replay.html), room 03. Synthetic case.
 *
 * Copied verbatim from the replay's saved data, don't edit: the appeal
 * excerpts and highlights, the cited evidence and the evaluator results
 * (`passingDraws`). The other text (headline, description, dispute, captions,
 * annotations) is our plain-language rewording of the replay's labels.
 *
 * Note: the replay names the "before" model "Earlier R1-super" (an earlier
 * training iteration, not the untrained base model) and the "after" model
 * "R1-super". The badges read "Base Model" and "Post-Trained" by request.
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
  category: string
  headline: string
  /** What goes wrong before post-training. */
  description: string
  dispute: string
  before: AppealSide
  after: AppealSide
}

export const appeal: AppealExample = {
  id: "room-03",
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
}
