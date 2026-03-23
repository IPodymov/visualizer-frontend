import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '../../../shared/api/base-query'
import type { AcademicPlan } from '../model/types'
import type { Faculty, Specialty } from '../model/faculty-types'

export const planApi = createApi({
  reducerPath: 'planApi',
  baseQuery,
  tagTypes: ['Plan', 'Specialty', 'Faculty'],
  endpoints: (builder) => ({
    getPlans: builder.query<AcademicPlan[], { skip?: number; limit?: number }>({
      query: ({ skip = 0, limit = 100 } = {}) => ({
        url: '/plans/',
        params: { skip, limit },
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
  }),
})

export const {
  useGetPlansQuery,
  useGetPlanByIdQuery,
  useGetSpecialtiesQuery,
  useGetSpecialtyByIdQuery,
  useGetFacultiesQuery,
  useGetFacultyByIdQuery,
} = planApi

