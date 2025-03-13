import { lazy } from "react";

export const AuthenticatedRoutes = [
    {
        path:'/login',
        component: lazy(() => import("../pages/public/login"))
    },
    {
        path:'/register',
        component: lazy(() => import("../pages/public/register"))
    },
]