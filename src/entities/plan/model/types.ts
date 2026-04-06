export type StudyForm = 'full_time' | 'part_time' | 'distance'

export type ComputingDomain =
  | 'Computer Engineering'
  | 'Computer Science'
  | 'Cybersecurity'
  | 'Information Systems'
  | 'Information Technology'
  | 'Software Engineering'
  | 'Data Science'
  | 'General / Other'

export type ComputingLayer =
  | 'Hardware Architecture'
  | 'Systems Infrastructure'
  | 'Software Methods'
  | 'Application Technologies'
  | 'Organizational Issues'
  | 'Theory / Principles'

export type Discipline = {
  id: number
  name: string
  domain_type: ComputingDomain | null
  layer_type: ComputingLayer | null
}

export type DisciplineUpdate = {
  name?: string | null
  domain_type?: ComputingDomain | null
  layer_type?: ComputingLayer | null
}

export type PlanItem = {
  id: number
  semester: number
  block: string | null
  code: string | null
  part: string | null
  total_hours: number
  lecture_hours: number
  practice_hours: number
  lab_hours: number
  self_study_hours: number
  credits: number
  control_type: string | null
  discipline_id: number
  discipline: Discipline
}

export type AcademicPlan = {
  id: number
  admission_year: number
  profile: string | null
  study_form: StudyForm | null
  qualification: string | null
  study_duration: string | null
  specialty_id: number
  items: PlanItem[]
  created_at: string
}

export type AcademicPlanCreate = {
  admission_year: number
  profile?: string | null
  study_form?: StudyForm | null
  qualification?: string | null
  study_duration?: string | null
  specialty_id: number
}

export type SpecialtySummary = {
  id: number
  code: string
  name: string
}

export type AcademicPlanSummary = {
  id: number
  admission_year: number
  profile: string | null
  study_form: StudyForm | null
  created_at: string
  specialty_id: number
  specialty: SpecialtySummary | null
}

export type UserHistoryItem = {
  id: number
  plan_id: number
  viewed_at: string
  plan: AcademicPlanSummary | null
}

export type UploadResponse = {
  message: string
  plan_id: number
}

