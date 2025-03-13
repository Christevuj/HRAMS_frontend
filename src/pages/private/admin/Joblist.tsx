import { AllOpenJobs } from "@/config/admin"
import { AllOpenJobsResponse, Job } from "@/types"
import React, { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Joblist() {
  const [jobsList, setJobsList] = useState<Job[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDepartment, setFilterDepartment] = useState("all")

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res: AllOpenJobsResponse = await AllOpenJobs()
        if (res && res.success === 1) {
          setJobsList(res.results)
        }
      } catch (error) {
        console.error("Error fetching jobs:", error)
      }
    }
    fetchJobs()
  }, [])

  const departments = Array.from(new Set(jobsList.map((job) => job.department)))

  const filteredJobs = jobsList.filter((job) => {
    const matchesSearch =
      !searchTerm ||
      job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment =
      filterDepartment === "all" ? true : job.department === filterDepartment
    return matchesSearch && matchesDepartment
  })

  return (
    <div className="p-6 container mx-auto min-h-screen">
      <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <div className="flex w-full max-w-md gap-2">
          <Input
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
          />
        </div>
        <div className="flex items-center gap-2">
          <Select
            value={filterDepartment}
            onValueChange={(value) => setFilterDepartment(value)}
          >
            <SelectTrigger className="w-48 rounded-md border border-gray-300 bg-white shadow-sm">
              <SelectValue placeholder="Filter by Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {departments.map((dept, index) => (
                <SelectItem key={index} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredJobs.map((job) => (
          <div
            key={job.jobId}
            className="rounded-xl bg-white p-6 shadow-lg transition transform hover:-translate-y-1 hover:shadow-2xl border border-gray-200"
          >
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-800 mb-1">
                {job.position}
              </h2>
              <p className="text-sm text-gray-500">
                Job ID: <span className="font-medium">{job.jobId}</span>
              </p>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Department:{" "}
                <span className="font-medium text-indigo-600">
                  {job.department}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Status:{" "}
                <span className="font-medium text-green-600">{job.status}</span>
              </p>
              <p className="text-sm text-gray-600">
                Created:{" "}
                <span className="font-medium">
                  {new Date(job.createdAt).toLocaleDateString()}
                </span>
              </p>
            </div>
            <div>
              <h3 className="mb-1 text-sm font-semibold text-gray-700">
                Requirements:
              </h3>
              <div
                className="max-h-24 overflow-y-auto text-xs text-gray-600 pr-2"
                dangerouslySetInnerHTML={{ __html: job.requirements }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
