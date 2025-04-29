import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AllOpenJobsResponse, ApplicantData, Job } from "@/types";
import { dateStringFormatter } from "@/utils";
import { Inbox } from "lucide-react";
import { useEffect, useState } from "react";
import { AllOpenJobs } from "@/config/admin";

const AllApplicantTableOH = ({ allAppsOH }: { allAppsOH : ApplicantData[] }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [jobsList, setJobsList] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res: AllOpenJobsResponse = await AllOpenJobs();
        if (res && res.success === 1) {
          setJobsList(res.results);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  // Component for displaying "no data" state
  const NoDataDesign = ({ message }: { message: string }) => (
    <div className="flex flex-col items-center justify-center w-full border min-h-[100px] py-10">
      <Inbox className="h-12 w-12 text-gray-400" />
      <p className="mt-4 text-lg text-gray-500">{message}</p>
    </div>
  );

  const selectedJob = jobsList.find((job) => job.position === selectedCategory);

  // Filter applications by the selected category (if any)
  const filteredApps = selectedCategory
    ? allAppsOH .filter((app) => app.applyingFor === selectedCategory)
    : allAppsOH ;

  return (
    <div>
      {/* Search and Filter Row */}
      <div className="mb-4 flex flex-col items-center gap-2 sm:flex-row sm:gap-2">
        <Input type="text" placeholder="Search applicants" className="flex-1" />
        <Select
          onValueChange={(value) => setSelectedCategory(value)}
          defaultValue=""
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            {jobsList.map((job) => (
              <SelectItem key={job.jobId} value={job.position}>
                {job.position}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedCategory && selectedJob && (
          <Input
            type="text"
            placeholder="Department"
            value={selectedJob.department}
            readOnly
            className="w-48"
          />
        )}
      </div>

      {/* Table or No Data */}
      {filteredApps.length === 0 ? (
        <NoDataDesign message="No applications found." />
      ) : (
        <div className="overflow-x-auto rounded bg-white shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Degree</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Applied</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApps.map((app, i) => (
                <TableRow key={i} className="hover:bg-gray-50 transition-colors">
                  <TableCell>{app.fullName}</TableCell>
                  <TableCell>{app.educationDegree}</TableCell>
                  <TableCell>{app.applyingFor}</TableCell>
                  <TableCell>{app.department}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{app.status}</Badge>
                  </TableCell>
                  <TableCell>{dateStringFormatter(app.entryCreatedAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AllApplicantTableOH;