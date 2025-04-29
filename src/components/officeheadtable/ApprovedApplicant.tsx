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
import { ApplicantData } from "@/types";
import { dateStringFormatter } from "@/utils";
import { Inbox } from "lucide-react";
import { useState } from "react";

const ApprovedApplicantTableOH = ({
  approvedAppsOH,
}: {
  approvedAppsOH: ApplicantData[];
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // No Data design component
  const NoDataDesign = ({ message }: { message: string }) => (
    <div className="flex flex-col items-center justify-center w-full border min-h-[100px] py-10">
      <Inbox className="h-12 w-12 text-gray-400" />
      <p className="mt-4 text-lg text-gray-500">{message}</p>
    </div>
  );

  // Filter approved applications by category (applyingFor)
  const filteredApps = selectedCategory
    ? approvedAppsOH.filter((app) => app.applyingFor === selectedCategory)
    : approvedAppsOH;

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
            <SelectItem value="Bachelors">Administrative Assistant</SelectItem>
            <SelectItem value="Masters">Finance Staff</SelectItem>
            <SelectItem value="CollegeInstructors">
              College Instructors
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Render Table or No Data */}
      {filteredApps.length === 0 ? (
        <NoDataDesign message="No approved applications found." />
      ) : (
        <div className="overflow-x-auto rounded bg-white shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Degree</TableHead>
                <TableHead>Category</TableHead>
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

export default ApprovedApplicantTableOH;