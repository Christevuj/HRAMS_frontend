import { FC, useEffect, useState } from "react"
import { AllOpenJobs } from "@/config/admin"
import { Briefcase, ArrowRight } from "lucide-react"
import { AllOpenJobsResponse, Job } from "@/types"



const JobOpening: FC = () => {
  const [jobsList, setJobsList] = useState<Job[]>([])

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

  return (
    <section id="jobs" className="mx-auto container py-8">
      <h2 className="mb-4 text-xl font-bold">Current Job Openings</h2>

      <div className="flex flex-col space-y-3">
        {jobsList.map((job) => (
          <div
            key={job.jobId}
            className="flex items-center justify-between rounded-md bg-white p-4 shadow-sm transition hover:bg-gray-50"
          >
            {/* Left side: Icon + Job info */}
            <div className="flex items-center space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-50 text-violet-600">
                <Briefcase className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{job.position}</p>
                <p className="text-sm text-gray-500">
                  {job.department} | Posted: {new Date(job.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Right arrow */}
            <ArrowRight className="h-5 w-5 text-gray-400" />
          </div>
        ))}
      </div>
    </section>
  )
}

export default JobOpening
