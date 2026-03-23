export {
  planApi,
  useGetPlansQuery,
  useGetPlanByIdQuery,
  useGetSpecialtiesQuery,
  useGetSpecialtyByIdQuery,
  useGetFacultiesQuery,
  useGetFacultyByIdQuery,
} from './api/plan-api'

export { PlanCard } from './ui/plan-card'

export type { AcademicPlan, PlanItem, Discipline } from './model/types'
export type { Specialty, Faculty } from './model/faculty-types'
