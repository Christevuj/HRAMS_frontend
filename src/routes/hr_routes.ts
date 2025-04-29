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
        path: '/HiredDetails/:accountId/:entryId', // Updated path for HiredDetails
        component: lazy(() => import("../pages/private/admin/HiredDetails")) // Updated import for HiredDetails
    },
    {
        path: '/RemoveApprove/:accountId/:entryId', 
        component: lazy(() => import("../pages/private/admin/RemoveApprove")), // Added RemoveApprove route
    },
    {
        path:'/Job-list',
        component: lazy(() => import("../pages/private/admin/Joblist"))
    },
]