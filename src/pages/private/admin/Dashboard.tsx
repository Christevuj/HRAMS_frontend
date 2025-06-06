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
import AllApplicantTable from "@/components/custom/Table/AllApplicant"
import PendingApplicantTable from "@/components/custom/Table/PendingApplicant"
import ArchivedApplicantTable from "@/components/custom/Table/ArchivedApplicant"
import RejectedApplicantTable from "@/components/custom/Table/RejectedApplicant"
import ApprovedApplicantTable from "@/components/custom/Table/ApprovedApplicant"
import HiredApplicantTable from "@/components/custom/Table/HiredApplicant"

export default function AdminDashboard() {
  const [list, setList] = useState<ApplicantData[]>([])

  useEffect(() => {
    const Fetch = async () => {
      const res = await ApplicantList()
      if (res?.results) {
        setList(res.results)
      }
    }
    Fetch()
  }, [])

  const allApps = list
  const pendingApps = list.filter((app) => app.status === "PENDING")
  const shortlistedApps = list.filter((app) => app.status === "ARCHIVED")
  const approvedApps = list.filter((app) => app.status === "APPROVED")
  const rejectedApps = list.filter((app) => app.status === "REJECTED")
  const hiredApps = list.filter((app) => app.status === "HIRED") // Added hiredApps filter

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
      <Tabs className="w-full" defaultValue="pending">
        <TabsList className="mb-4">
          <TabsTrigger className="px-8" value="pending">Pending</TabsTrigger>
          <TabsTrigger className="px-8" value="approved">Approved</TabsTrigger>
          <TabsTrigger className="px-8" value="hired">Hired</TabsTrigger>
          <TabsTrigger className="px-8" value="rejected">Rejected</TabsTrigger>
          <TabsTrigger className="px-8" value="archived">Archived</TabsTrigger>
          <TabsTrigger className="px-8" value="all">History</TabsTrigger>
        </TabsList>

        {/* All Applications Tab */}
        <TabsContent value="all">
          <AllApplicantTable allApps={allApps} />
        </TabsContent>

        {/* Pending Tab */}
        <TabsContent value="pending">
          <PendingApplicantTable pendingApps={pendingApps} />
        </TabsContent>

        {/* Archived Tab */}
        <TabsContent value="archived">
          <ArchivedApplicantTable archivedApps={shortlistedApps} />
        </TabsContent>

        {/* Approved Tab */}
        <TabsContent value="approved">
          <ApprovedApplicantTable approvedApps={approvedApps} />
        </TabsContent>

        {/* Rejected Tab */}
        <TabsContent value="rejected">
          <RejectedApplicantTable rejectedApps={rejectedApps} />
        </TabsContent>

        {/* Hired Tab */}
        <TabsContent value="hired">
          <HiredApplicantTable hiredApps={hiredApps} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
