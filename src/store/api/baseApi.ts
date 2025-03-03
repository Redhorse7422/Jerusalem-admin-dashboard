/* eslint-disable @typescript-eslint/no-explicit-any */
// Need to use the React-specific entry point to import createApi

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}`,
        // credentials: "include",
        prepareHeaders: (headers) => {
            const token = Cookies.get("auth_token"); // Retrieve token from cookies
            if (token) {
                headers.set("Authorization", `Bearer ${token}`); // Set Authorization header
            }
            return headers;
        },
    }),
    tagTypes: [
        "User",
        "SingleUser",
        "Category",
        "SingleCategory",
        "Menu",
        "SingleMenu"
    ],

    endpoints: () => ({}),
});
