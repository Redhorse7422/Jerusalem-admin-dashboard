import { baseApi } from "../../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategories: builder.query({
            query: () => ({
                url: "/home/categories",
                method: "GET",
            }),
            providesTags: ["Category"],
            // Add this to debug
            onQueryStarted: async (arg, { queryFulfilled }) => {
                try {
                    const result = await queryFulfilled;
                    // console.log("API Response:", result);
                } catch (error) {
                    console.error("API Error:", error);
                }
            },
        }),
        // getSingleMenu: builder.query({
        //     query: (id) => ({
        //         url: `/menu/${id}`,
        //         method: "GET",
        //     }),
        //     providesTags: (result, error, id) => [{ type: "SingleMenu", id }],
        // }),
        createCategory: builder.mutation({
            query: (body) => ({
                url: "/admin/category-store",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Category"],
        }),
        updateCategory: builder.mutation({
            query: (body) => ({
                url: `/admin/category-update`,
                method: "POST",
                body,
            }),
            invalidatesTags: (result, error, { id }) => [
                "Category",
                { type: "SingleCategory", id },
            ],
        }),
        deleteCategory: builder.mutation({
            query: (id: string) => ({
                url: `/admin/category-delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [
                "Category",
                { type: "SingleCategory", id },
            ],
        }),
    }),
});

export const {
    useGetAllCategoriesQuery,
    // useGetSingleMenuQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} = categoryApi;
