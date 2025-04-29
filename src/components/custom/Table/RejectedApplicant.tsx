import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { ApplicantData } from "@/types";
import { dateStringFormatter } from "@/utils";
import { Eye, Inbox } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AllOpenJobsResponse, Job } from "@/types";
import { AllOpenJobs } from "@/config/admin"; // Importing function to get all open jobs

const RejectedApplicantTable = ({
  rejectedApps,
}: {
  rejectedApps: ApplicantData[];
}) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [jobsList, setJobsList] = useState<Job[]>([]);

  
    // Fetch all available job positions for the dropdown
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

  const NoDataDesign = ({ message }: { message: string }) => (
    <div className="flex flex-col items-center justify-center w-full border min-h-[100px] py-10">
      <Inbox className="h-12 w-12 text-gray-400" />
      <p className="mt-4 text-lg text-gray-500">{message}</p>
    </div>
  );

  const filteredApps = selectedCategory
    ? rejectedApps.filter((app) => app.applyingFor === selectedCategory)
    : rejectedApps;

  const allSelected =
    filteredApps.length > 0 &&
    filteredApps.every((app) =>
      selectedRowIds.includes(app.entryId.toString())
    );

  const toggleRow = (entryId: number) => {
    const idStr = entryId.toString();
    setSelectedRowIds((prev) =>
      prev.includes(idStr)
        ? prev.filter((id) => id !== idStr)
        : [...prev, idStr]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = filteredApps.map((app) => app.entryId.toString());
      setSelectedRowIds(allIds);
    } else {
      setSelectedRowIds([]);
    }
  };

  const handleExport = () => {
    const selectedApps = rejectedApps.filter((app) =>
      selectedRowIds.includes(app.entryId.toString())
    );

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        ["Full Name", "Degree", "Category", "Status", "Date Applied", "Documents"],
        ...selectedApps.map((app) => [
          app.fullName,
          app.educationDegree,
          app.applyingFor,
          app.status,
          dateStringFormatter(app.entryCreatedAt),
          app.documents?.length || 0,
        ]),
      ]
        .map((row) => row.join(","))
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "rejected_applicants.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Fetch all available job positions for the dropdown (similar to PendingApplicantTable)
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Replace with your actual API or data fetching logic
        const jobsList = [
          { jobId: "1", position: "Administrative Assistant" },
          { jobId: "2", position: "Finance Staff" },
          { jobId: "3", position: "College Instructors" },
          { jobId: "4", position: "College Faculty" },
        ];
        setJobsList(jobsList);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div>
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
        <Button
          variant="default"
          style={{ backgroundColor: "black", color: "white" }}
          onClick={handleExport}
        >
          Export
        </Button>
      </div>

      {selectedRowIds.length > 0 && (
        <div className="mb-4 flex items-center justify-between rounded bg-blue-50 p-2">
          <p className="text-sm text-blue-700">
            {selectedRowIds.length} selected
          </p>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              Bulk Action
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setSelectedRowIds([])}>
              Clear Selection
            </Button>
          </div>
        </div>
      )}

      {filteredApps.length === 0 ? (
        <NoDataDesign message="No applications found." />
      ) : (
        <div className="overflow-x-auto rounded bg-white shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="h-4 w-4 cursor-pointer"
                  />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Degree</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Applied</TableHead>
                <TableHead>Documents</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApps.map((app, i) => (
                <TableRow key={i} className="hover:bg-gray-50 transition-colors">
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedRowIds.includes(app.entryId.toString())}
                      onChange={() => toggleRow(app.entryId)}
                      className="h-4 w-4 cursor-pointer"
                    />
                  </TableCell>
                  <TableCell>{app.fullName}</TableCell>
                  <TableCell>{app.educationDegree}</TableCell>
                  <TableCell>{app.applyingFor}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{app.status}</Badge>
                  </TableCell>
                  <TableCell>{dateStringFormatter(app.entryCreatedAt)}</TableCell>
                  <TableCell>{app.documents?.length || 0}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      onClick={() =>
                        navigate(
                          `/ApplicantDetails/${app.accountId}/${app.entryId}`
                        )
                      }
                      size="icon"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default RejectedApplicantTable;
