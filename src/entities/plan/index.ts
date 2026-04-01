export {
  planApi,
  useGetPlansQuery,
  useGetPlanByIdQuery,
  useGetSpecialtiesQuery,
  useGetSpecialtyByIdQuery,
  useGetFacultiesQuery,
  useGetFacultyByIdQuery,
} from '@/entities/plan/api/plan-api'

export { PlanCard } from '@/entities/plan/ui/plan-card'

export type { AcademicPlan, PlanItem, Discipline } from '@/entities/plan/model/types'
export type { Specialty, Faculty } from '@/entities/plan/model/faculty-types'
