import { lazy } from "react";

export const AdminRoutes = [
    {
        path:'/Admin/Dashboard',
        component: lazy(() => import("../pages/private/admin/Dashboard"))
    },
    {
        path: '/ApplicantDetails/:entryId',
        component: lazy(() => import("../pages/private/admin/ApplicantDetails")),
    },
    {
        path: '/HiredDetails/:entryId', // New route for HiredDetails
        component: lazy(() => import("../pages/private/admin/HiredDetails")), // Make sure to import the correct path
    },
    {
        path: '/RemoveApprove/:entryId',
        component: lazy(() => import("../pages/private/admin/RemoveApprove")), // Added RemoveApprove route
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
