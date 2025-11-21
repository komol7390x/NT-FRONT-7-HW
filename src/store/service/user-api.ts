import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface TaskList {
    title: string,
    desc: string,
    id?: string
}

export const taskApi = createApi({
    reducerPath: 'taskApi',
    tagTypes: ['task_list'],

    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3333',
        headers: {
            Authorization: 'feiwonfeiofieifj2iejfoefm'
        }
    }),

    endpoints: (build) => ({
        // --------------------GET--------------------
        getTaskList: build.query<TaskList[], string>({
            query: (name) => ({
                url: name
            }),
            providesTags: ['task_list']
        }),

        // --------------------GET ONE--------------------
        getTaskDetail: build.query<TaskList[], string>({
            query: (id: string) => `/task/${id}`
        }),

        // --------------------DELETE ONE--------------------
        deleteTask: build.mutation({
            query: (id) => ({
                url: `/task/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['task_list']
        }),

        // --------------------CREATE ONE--------------------
        createTask: build.mutation({
            query: (body: TaskList) => ({
                url: `/task`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['task_list']
        }),

        // --------------------UPDATE ONE--------------------
        updateTaskDetail: build.mutation({
            query: ({ id, body }: { id: string; body: TaskList }) => ({
                url: `/task/${id}`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['task_list'],
        })

    })
})

export const {
    useGetTaskDetailQuery,
    useGetTaskListQuery,
    useCreateTaskMutation,
    useUpdateTaskDetailMutation,
    useDeleteTaskMutation
} = taskApi