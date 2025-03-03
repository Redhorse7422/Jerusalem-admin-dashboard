import { baseApi } from "../../api/baseApi";

const menuApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllMenus: builder.query({
            query: () => ({
                url: "/admin/menu",
                method: "GET",
            }),
            providesTags: ["Menu"],
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
        createMenu: builder.mutation({
            query: (body) => ({
                url: "/admin/menu-store",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Menu"],
        }),
        updateMenu: builder.mutation({
            query: (body) => ({
                url: `/admin/menu-update`,
                method: "POST",
                body,
            }),
            invalidatesTags: (result, error, { id }) => [
                "Menu",
                { type: "SingleMenu", id },
            ],
        }),
        deleteMenu: builder.mutation({
            query: (id: string) => ({
                url: `/admin/menu-delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [
                "Menu",
                { type: "SingleMenu", id },
            ],
        }),
    }),
});

export const {
    useGetAllMenusQuery,
    // useGetSingleMenuQuery,
    useCreateMenuMutation,
    useUpdateMenuMutation,
    useDeleteMenuMutation,
} = menuApi;
