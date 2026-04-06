import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '@/shared/api/base-query'
import type {
  AcademicPlan,
  AcademicPlanCreate,
  AcademicPlanSummary,
  Discipline,
  DisciplineUpdate,
  UploadResponse,
  UserHistoryItem,
} from '@/entities/plan/model/types'
import type { Faculty, Specialty } from '@/entities/plan/model/faculty-types'

export type PlansQueryParams = {
  skip?: number
  limit?: number
  year?: number | null
  faculty_id?: number | null
  level?: string | null
  search?: string | null
}

export const planApi = createApi({
  reducerPath: 'planApi',
  baseQuery,
  tagTypes: ['Plan', 'Specialty', 'Faculty', 'Favorites', 'History'],
  endpoints: (builder) => ({
    // ─── Plans ───────────────────────────────────────────────
    getPlans: builder.query<AcademicPlan[], PlansQueryParams>({
      query: ({ skip = 0, limit = 100, year, faculty_id, level, search } = {}) => ({
        url: '/plans/',
        params: {
          skip,
          limit,
          ...(year != null ? { year } : {}),
          ...(faculty_id != null ? { faculty_id } : {}),
          ...(level != null ? { level } : {}),
          ...(search ? { search } : {}),
        },
      }),
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Plan' as const, id })), { type: 'Plan', id: 'LIST' }]
          : [{ type: 'Plan', id: 'LIST' }],
    }),

    getPlanById: builder.query<AcademicPlan, number>({
      query: (id) => `/plans/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Plan', id }],
    }),

    createPlan: builder.mutation<AcademicPlan, AcademicPlanCreate>({
      query: (body) => ({
        url: '/plans/',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Plan', id: 'LIST' }],
    }),

    uploadPlan: builder.mutation<UploadResponse, FormData>({
      query: (body) => ({
        url: '/plans/upload',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Plan', id: 'LIST' }],
    }),

    // ─── Specialties ────────────────────────────────────────
    getSpecialties: builder.query<Specialty[], { skip?: number; limit?: number; faculty_id?: number }>({
      query: ({ skip = 0, limit = 100, faculty_id } = {}) => ({
        url: '/specialties/',
        params: { skip, limit, ...(faculty_id != null ? { faculty_id } : {}) },
      }),
      providesTags: [{ type: 'Specialty', id: 'LIST' }],
    }),

    getSpecialtyById: builder.query<Specialty, number>({
      query: (id) => `/specialties/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Specialty', id }],
    }),

    getSpecialtyPlans: builder.query<AcademicPlan[], number>({
      query: (specialtyId) => `/specialties/${specialtyId}/plans`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: 'Plan' as const, id }))
          : [],
    }),

    // ─── Faculties ──────────────────────────────────────────
    getFaculties: builder.query<Faculty[], { skip?: number; limit?: number }>({
      query: ({ skip = 0, limit = 100 } = {}) => ({
        url: '/faculties/',
        params: { skip, limit },
      }),
      providesTags: [{ type: 'Faculty', id: 'LIST' }],
    }),

    getFacultyById: builder.query<Faculty, number>({
      query: (id) => `/faculties/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Faculty', id }],
    }),

    getFacultySpecialties: builder.query<Specialty[], number>({
      query: (facultyId) => `/faculties/${facultyId}/specialties`,
      providesTags: [{ type: 'Specialty', id: 'LIST' }],
    }),

    // ─── Disciplines ────────────────────────────────────────
    updateDiscipline: builder.mutation<Discipline, { id: number; body: DisciplineUpdate }>({
      query: ({ id, body }) => ({
        url: `/disciplines/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [{ type: 'Plan', id: 'LIST' }],
    }),

    // ─── Favorites ──────────────────────────────────────────
    getFavorites: builder.query<AcademicPlanSummary[], void>({
      query: () => '/users/me/favorites',
      providesTags: [{ type: 'Favorites', id: 'LIST' }],
    }),

    addFavorite: builder.mutation<AcademicPlanSummary, number>({
      query: (planId) => ({
        url: `/users/me/favorites/${planId}`,
        method: 'POST',
      }),
      invalidatesTags: [{ type: 'Favorites', id: 'LIST' }],
    }),

    removeFavorite: builder.mutation<AcademicPlanSummary, number>({
      query: (planId) => ({
        url: `/users/me/favorites/${planId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Favorites', id: 'LIST' }],
    }),

    // ─── History ────────────────────────────────────────────
    getHistory: builder.query<UserHistoryItem[], { skip?: number; limit?: number }>({
      query: ({ skip = 0, limit = 20 } = {}) => ({
        url: '/users/me/history',
        params: { skip, limit },
      }),
      providesTags: [{ type: 'History', id: 'LIST' }],
    }),

    addToHistory: builder.mutation<UserHistoryItem, number>({
      query: (planId) => ({
        url: `/users/me/history/${planId}`,
        method: 'POST',
      }),
      invalidatesTags: [{ type: 'History', id: 'LIST' }],
    }),
  }),
})

export const {
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
} = planApi

