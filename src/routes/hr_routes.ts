import { lazy } from "react";

export const HeadRoutes = [
    {
        path:'/OfficeHead/Dashboard',
        component: lazy(() => import("../pages/private/hr/Dashboard"))
    },
    {
        path:'/ApplicantDetails/:accountId/:entryId',
        component: lazy(() => import("../pages/private/admin/ApplicantDetails"))
    },
    {
        path:'/Job-list',
        component: lazy(() => import("../pages/private/admin/Joblist"))
    },
]