export {
  planApi,
  useGetPlansQuery,
  useGetPlanByIdQuery,
  useCreatePlanMutation,
  useUploadPlanMutation,
  useGetSpecialtiesQuery,
  useGetSpecialtyByIdQuery,
  useGetSpecialtyPlansQuery,
  useGetFacultiesQuery,
  useGetFacultyByIdQuery,
  useGetFacultySpecialtiesQuery,
  useUpdateDisciplineMutation,
  useGetFavoritesQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
  useGetHistoryQuery,
  useAddToHistoryMutation,
} from '@/entities/plan/api/plan-api'
export type { PlansQueryParams } from '@/entities/plan/api/plan-api'

export { PlanCard } from '@/entities/plan/ui/plan-card'

export type {
  AcademicPlan,
  AcademicPlanCreate,
  AcademicPlanSummary,
  PlanItem,
  Discipline,
  DisciplineUpdate,
  StudyForm,
  ComputingDomain,
  ComputingLayer,
  SpecialtySummary,
  UserHistoryItem,
  UploadResponse,
} from '@/entities/plan/model/types'
export type { Specialty, Faculty } from '@/entities/plan/model/faculty-types'
