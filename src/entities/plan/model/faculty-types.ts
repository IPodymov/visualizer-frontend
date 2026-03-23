import type { AcademicPlan } from './types'

export type Specialty = {
  id: number
  code: string
  name: string
  level: string
  faculty_id: number
  plans: AcademicPlan[]
}

export type Faculty = {
  id: number
  name: string
  short_name: string | null
  specialties: Specialty[]
}

