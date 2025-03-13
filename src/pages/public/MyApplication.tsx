import React, { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { MoreVertical } from "lucide-react"
import useStore from "@/zustand/store/store"
import { selector } from "@/zustand/store/store.provider"
import { ApplicantList } from "@/config/admin"

interface ApplicantData {
  entryId: number
  applyingFor: string
  department: string
  status: string
  entryCreatedAt: string
  fullName: string
  // ...any other fields from your API
}

const MyApplication: React.FC = () => {
  const user = useStore(selector("user"))
  const accountId = user.info?.accountId
  const [allApps, setAllApps] = useState<ApplicantData[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const fetchApps = async () => {
    try {
      if (!accountId) return
      const res = await ApplicantList(accountId)
      if (res?.results) {
        setAllApps(res.results)
      }
    } catch (error) {
      console.error("Error fetching applicant:", error)
    }
  }

  useEffect(() => {
    fetchApps()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountId])

  // Adjust logic to match your actual statuses
  const activeApps = allApps.filter(
    (app) => app.status !== "COMPLETED" && app.status !== "DRAFT"
  )
  const completedApps = allApps.filter((app) => app.status === "COMPLETED")
  const draftApps = allApps.filter((app) => app.status === "DRAFT")

  const filterApps = (apps: ApplicantData[]) => {
    return apps.filter((app) =>
      app.applyingFor.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <h1 className="mb-1 text-2xl font-bold text-gray-800">My Applications</h1>
      <p className="mb-6 text-sm text-gray-600">
        View and manage all your job applications in one place
      </p>

      <Tabs defaultValue="active" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="active">Active Applications</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
          </TabsList>
          <div className="max-w-sm w-full">
            <Input
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <TabsContent value="active">
          {filterApps(activeApps).length === 0 ? (
            <p className="mt-4 text-sm text-gray-500">
              No active applications found.
            </p>
          ) : (
            <div className="mt-4 space-y-2">
              {filterApps(activeApps).map((app) => (
                <div
                  key={app.entryId}
                  className="flex items-center justify-between rounded-md bg-white p-4 shadow-sm transition hover:bg-gray-50"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {app.applyingFor}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Submitted:{" "}
                      {new Date(app.entryCreatedAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      Status: {app.status}
                    </p>
                  </div>
                  <MoreVertical className="h-5 w-5 text-gray-400 cursor-pointer" />
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed">
          {filterApps(completedApps).length === 0 ? (
            <p className="mt-4 text-sm text-gray-500">
              No completed applications found.
            </p>
          ) : (
            <div className="mt-4 space-y-2">
              {filterApps(completedApps).map((app) => (
                <div
                  key={app.entryId}
                  className="flex items-center justify-between rounded-md bg-white p-4 shadow-sm transition hover:bg-gray-50"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {app.applyingFor}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Submitted:{" "}
                      {new Date(app.entryCreatedAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      Status: {app.status}
                    </p>
                  </div>
                  <MoreVertical className="h-5 w-5 text-gray-400 cursor-pointer" />
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="drafts">
          {filterApps(draftApps).length === 0 ? (
            <p className="mt-4 text-sm text-gray-500">No drafts found.</p>
          ) : (
            <div className="mt-4 space-y-2">
              {filterApps(draftApps).map((app) => (
                <div
                  key={app.entryId}
                  className="flex items-center justify-between rounded-md bg-white p-4 shadow-sm transition hover:bg-gray-50"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {app.applyingFor}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(app.entryCreatedAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      Status: {app.status}
                    </p>
                  </div>
                  <MoreVertical className="h-5 w-5 text-gray-400 cursor-pointer" />
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <h2 className="mb-4 text-lg font-bold text-gray-800">
          Application Status Guide
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Submitted</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Application received and awaiting initial review.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-semibold">
                Document Verification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Credentials and documents being verified.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Under Review</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Application being evaluated by the hiring committee.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Interview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Scheduled for interview process.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default MyApplication
