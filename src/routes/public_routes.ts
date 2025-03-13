import { lazy } from "react";

export const PublicRoutes = [
    {
        path:'/',
        component: lazy(() => import("../pages/public/landing"))
    },
    {
        path:'/application_form',
        component: lazy(() => import("../pages/public/ApplicationForm"))
    },
    {
        path:'/My-Application',
        component: lazy(() => import("../pages/public/MyApplication"))
    }
]