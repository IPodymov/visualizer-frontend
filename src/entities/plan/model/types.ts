export type Discipline = {
  id: number
  name: string
  domain_type: string | null
  layer_type: string | null
}

export type PlanItem = {
  id: number
  semester: number
  total_hours: number
  lecture_hours: number
  practice_hours: number
  lab_hours: number
  self_study_hours: number
  control_type: string | null
  discipline_id: number
  discipline: Discipline
}

export type AcademicPlan = {
  id: number
  admission_year: number
  specialty_id: number
  items: PlanItem[]
  created_at: string
}

