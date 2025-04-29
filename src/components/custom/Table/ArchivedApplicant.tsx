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
import { ApplicantData, Job } from "@/types";
import { dateStringFormatter } from "@/utils";
import { Eye, Inbox } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { AllOpenJobs } from "@/config/admin"; // Import function to fetch job categories

const ArchivedApplicantTable = ({
  archivedApps,
}: {
  archivedApps: ApplicantData[];
}) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [jobsList, setJobsList] = useState<Job[]>([]);

  // Fetch available job positions for the dropdown
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await AllOpenJobs();
        if (res && res.success === 1) {
          setJobsList(res.results); // Set the list of jobs for category selection
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  // No Data design component
  const NoDataDesign = ({ message }: { message: string }) => (
    <div className="flex flex-col items-center justify-center w-full border min-h-[100px] py-10">
      <Inbox className="h-12 w-12 text-gray-400" />
      <p className="mt-4 text-lg text-gray-500">{message}</p>
    </div>
  );

  // Filter archived applications by category (applyingFor)
  const filteredApps = selectedCategory
    ? archivedApps.filter((app) => app.applyingFor === selectedCategory)
    : archivedApps;

  // Determine if all filtered rows are selected
  const allSelected =
    filteredApps.length > 0 &&
    filteredApps.every((app) => selectedRowIds.includes(app.entryId.toString()));

  // Toggle selection for a single row
  const toggleRow = (entryId: number) => {
    const idStr = entryId.toString();
    setSelectedRowIds((prev) =>
      prev.includes(idStr)
        ? prev.filter((id) => id !== idStr)
        : [...prev, idStr]
    );
  };

  // Toggle select/deselect all rows in filteredApps
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = filteredApps.map((app) => app.entryId.toString());
      setSelectedRowIds(allIds);
    } else {
      setSelectedRowIds([]);
    }
  };

  // Export functionality
  const handleExport = () => {
    const exportData = filteredApps.map((app) => ({
      Name: app.fullName,
      Degree: app.educationDegree,
      Category: app.applyingFor,
      Status: app.status,
      "Date Applied": dateStringFormatter(app.entryCreatedAt),
      "Document Count": app.documents?.length || 0,
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Archived Applicants");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "ArchivedApplicants.xlsx");
  };

  return (
    <div>
      {/* Search and Filter Row */}
      <div className="mb-4 flex flex-col items-center gap-2 sm:flex-row sm:gap-2">
        <Input type="text" placeholder="Search applicants" className="flex-1" />
        <Select onValueChange={(value) => setSelectedCategory(value)} defaultValue="">
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
        <Button variant="outline" className="bg-black text-white" onClick={handleExport}>
          Export
        </Button>
      </div>

      {/* Bulk Action Bar */}
      {selectedRowIds.length > 0 && (
        <div className="mb-4 flex items-center justify-between rounded bg-blue-50 p-2">
          <p className="text-sm text-blue-700">{selectedRowIds.length} selected</p>
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

      {/* Render Table or No Data */}
      {filteredApps.length === 0 ? (
        <NoDataDesign message="No applications found." />
      ) : (
        <div className="overflow-x-auto rounded bg-white shadow">
          <Table>
            <TableHeader>
              <TableRow>
                {/* Header Checkbox */}
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
                  {/* Row Checkbox */}
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
                        navigate(`/ApplicantDetails/${app.accountId}/${app.entryId}`)
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

export default ArchivedApplicantTable;
