import { lazy } from "react";

export const AdminRoutes = [
    {
        path:'/Admin/Dashboard',
        component: lazy(() => import("../pages/private/admin/Dashboard"))
    },
    {
        path:'/ApplicantDetails/:accountId/:entryId',
        component: lazy(() => import("../pages/private/admin/ApplicantDetails"))
    },
    {
        path:'/Job-list',
        component: lazy(() => import("../pages/private/admin/Joblist"))
    },
    {
        path:'/Admin/Jobs',
        component: lazy(() => import("../pages/private/admin/Jobs")) // Assuming the file is Jobs.tsx
    },  
    {
        path:'/Admin/Reports',
        component: lazy(() => import("../pages/private/admin/Reports"))
    }   
]