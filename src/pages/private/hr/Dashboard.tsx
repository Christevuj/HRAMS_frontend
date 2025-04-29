/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Users,
  ClipboardCheck,
  Hourglass,
  InboxIcon,
  CalendarCheck,
  CheckCircle,
  PlusCircle,
} from "lucide-react"

import { ApplicantList } from "@/config/admin"
import { ApplicantData } from "@/types"
import AllApplicantTableOH from "@/components/officeheadtable/AllApplicant"
import ApprovedApplicantTableOH from "@/components/officeheadtable/ApprovedApplicant"
import PendingApplicantTableOH from "@/components/officeheadtable/PendingApplicant"
import ArchivedApplicantTableOH from "@/components/officeheadtable/ArchivedApplicant"
import RejectedApplicantTableOH from "@/components/officeheadtable/RejectedApplicant"
import useStore from "@/zustand/store/store"
import { selector } from "@/zustand/store/store.provider"



export default function HeadDashboard() {
  const user = useStore(selector('user'))

  const [list, setList] = useState<ApplicantData[]>([])

  useEffect(() => {
    const Fetch = async () => {
      const res = await ApplicantList()
      if (res?.results) {
        const list = res?.results?.filter((v:any) => v.department === user.info?.department)
        setList(list)
      }
    }
    Fetch()
  }, [])

  const allApps = list
  const pendingApps = list.filter((app) => app.status === "PENDING")
  const approvedAppsOH = list.filter((app) => app.status === "APPROVED")
  const shortlistedApps = list.filter((app) => app.status === "ARCHIVED")
  const rejectedApps = list.filter((app) => app.status === "REJECTED")

  return (
    <div className="container mx-auto space-y-6 p-4 sm:p-6">
      {/* Page Title */}
      <h1 className="text-xl font-semibold">Applications Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {/* Total */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-sm uppercase text-gray-500">TOTAL</CardTitle>
              <p className="text-2xl font-bold">{allApps.length}</p>
              <CardDescription>Active applications</CardDescription>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
          </CardHeader>
        </Card>

        {/* Reviewed */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-sm uppercase text-gray-500">REVIEWED</CardTitle>
              <p className="text-2xl font-bold">156</p>
              <CardDescription>Applications processed</CardDescription>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
              <ClipboardCheck className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
        </Card>

        {/* Pending */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-sm uppercase text-gray-500">PENDING</CardTitle>
              <p className="text-2xl font-bold">{pendingApps.length}</p>
              <CardDescription>Awaiting review</CardDescription>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
              <Hourglass className="h-5 w-5 text-yellow-600" />
            </div>
          </CardHeader>
        </Card>

        {/* New Today */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-sm uppercase text-gray-500">NEW TODAY</CardTitle>
              <p className="text-2xl font-bold">12</p>
              <CardDescription>Recent applications</CardDescription>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <InboxIcon className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs className="w-full" defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger className="px-8" value="all">All Applications</TabsTrigger>

          <TabsTrigger className="px-8" value="pending">Pending</TabsTrigger>
          <TabsTrigger className="px-8" value="archived">Archived</TabsTrigger>
          <TabsTrigger className="px-8" value="approved">Approved</TabsTrigger>
          <TabsTrigger className="px-8" value="rejected">Rejected</TabsTrigger>
        </TabsList>

        {/* All Applications Tab */}
        <TabsContent value="all">
          <AllApplicantTableOH allAppsOH={allApps} />
        </TabsContent>

        {/* Pending Tab */}
        <TabsContent value="pending">
          <PendingApplicantTableOH pendingApps={pendingApps}  />
        </TabsContent>

        {/* Archived Tab */}
        <TabsContent value="archived">
         <ArchivedApplicantTableOH archivedApps={shortlistedApps} />
        </TabsContent>

           {/* Approved Tab */}
           <TabsContent value="approved">
          <ApprovedApplicantTableOH approvedAppsOH={approvedAppsOH} />
        </TabsContent>

        {/* Rejected Tab */}
        <TabsContent value="rejected">
        <RejectedApplicantTableOH rejectedApps={rejectedApps} />
        </TabsContent>
      </Tabs>

     
    </div>
  )
}
