/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// shadcn/ui components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import {
  Download,
  MoreHorizontal,
  User,
  Calendar,
  Activity,
  CheckCircle2,
  Eye,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { ApplicantList, UpdateApplicantStatus } from "@/config/admin";
import { ApplicantData, ApplicantDocument } from "@/types";
import useStore from "@/zustand/store/store";
import { selector } from "@/zustand/store/store.provider";

export default function ApplicantDetails() {

  const user = useStore(selector('user'))
  const { accountId, entryId } = useParams();
  const [info, setInfo] = useState<ApplicantData[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<ApplicantDocument | null>(
    null
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const Fetch = async () => {
    try {
      const res = await ApplicantList(accountId, entryId);
      if (res?.results) {
        setInfo(res.results);
      }
    } catch (error) {
      console.error("Error fetching applicant:", error);
    }
  };
  // Fetch data on mount
  useEffect(() => {

    Fetch();
  }, [accountId, entryId]);

  const applicant = info[0];
  if (!applicant) {
    return (
      <div className="p-4">
        <p>No applicant found.</p>
      </div>
    );
  }

  // Combine name
  const fullName =
    `${applicant.firstName} ${applicant.middleName} ${applicant.lastName}`.trim();

  // Format date
  function formatDate(dateString: string) {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString();
  }

  // Handle opening the dialog to preview a doc
  const handleViewDoc = (doc: ApplicantDocument) => {
    setSelectedDoc(doc);
    setOpenDialog(true);
  };
  const handleApplicantStatusChange = async (status: string) => {
    try {
      setIsUpdating(true);
      const formData = new FormData();
      formData.append("entryId", applicant.entryId.toString());
      formData.append("newStatus", status);
      const response = await UpdateApplicantStatus(formData);
      toast.success(response.results || "Status updated successfully.");
      Fetch()
    } catch (error: any) {
      console.error("Error updating status:", error);
      toast.error(error.message || "Error updating status.");
    } finally {
      setIsUpdating(false);
    }
  };
  return (
    <div className="container mx-auto space-y-6 p-4 lg:px-12 sm:p-6">
      {/* Header: Title + Action Buttons */}
<div className="flex items-center justify-between">
  <h1 className="text-xl font-semibold">Applicant Details</h1>

  {user.info.userType !== "hr" ? (
    <div className="flex space-x-2">
      <Button
        disabled={isUpdating}
        className={`${
          applicant.status === "APPROVED"
            ? "bg-white text-pink-500 border border-pink-500"
            : "bg-pink-500 text-white"
        }`}
        onClick={() => handleApplicantStatusChange("APPROVED")}
      >
        Approve
      </Button>

      <Button
        disabled={isUpdating}
        className={`${
          applicant.status === "ARCHIVED"
            ? "bg-white text-pink-500 border border-pink-500"
            : "bg-pink-500 text-white"
        }`}
        onClick={() => handleApplicantStatusChange("ARCHIVED")}
      >
        Archive
      </Button>

      <Button
        disabled={isUpdating}
        className={`${
          applicant.status === "REJECTED"
            ? "bg-white text-pink-500 border border-pink-500"
            : "bg-pink-500 text-white"
        }`}
        onClick={() => handleApplicantStatusChange("REJECTED")}
      >
        Reject
      </Button>
    </div>
  ) : (
    <p className="bg-pink-500 border border-pink-700 px-4 py-2 rounded-sm text-sm text-white">
      {applicant.status}
    </p>
  )}
</div>

      {/* Cards: Name/Position, Applied On, Match Score, Status */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {/* Card 1: Name & Position */}
        <Card>
          <CardHeader className="flex items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base">{fullName}</CardTitle>
              <CardDescription>
                {applicant.applyingFor || "N/A"}
              </CardDescription>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
              <User className="h-5 w-5 text-gray-600" />
            </div>
          </CardHeader>
          <CardFooter>
            <p className="text-xs text-gray-500">
              Applicant ID: #{applicant.accountId}
            </p>
          </CardFooter>
        </Card>

        {/* Card 2: Applied On */}
        <Card>
          <CardHeader className="flex items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base">Applied On</CardTitle>
              <CardDescription>
                {formatDate(applicant.entryCreatedAt)}
              </CardDescription>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
              <Calendar className="h-5 w-5 text-gray-600" />
            </div>
          </CardHeader>
          <CardFooter>
            {/* You can compute how many days ago if needed */}
            <p className="text-xs text-gray-500">Some time ago</p>
          </CardFooter>
        </Card>


        {/* Card 4: Status */}
        <Card>
          <CardHeader className="flex items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base">Status</CardTitle>
              <CardDescription>{applicant.status || "N/A"}</CardDescription>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardFooter>
            <p className="text-xs text-gray-500">Ready for interview</p>
          </CardFooter>
        </Card>
      </div>

      {/* Uploaded Documents */}
      <div>
        <h2 className="mb-3 text-lg font-semibold">Uploaded Documents</h2>
        {applicant.documents?.length > 0 ? (
          <ul className="divide-y">
            {applicant.documents.map((doc, idx) => (
              <li
                key={doc.id || idx}
                className="flex items-center justify-between py-3"
              >
                <div>
                  <p className="text-sm font-medium">{doc.fileName}</p>
                  {/* You could store an uploaded date if you want */}
                  <p className="text-xs text-gray-500">
                    File type: {doc.fileType}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => window.open(doc.fileUrl, "_blank")}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  {/* View / Preview in a dialog */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleViewDoc(doc)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No documents uploaded.</p>
        )}
      </div>

      {/* Personal Information */}
      <h2 className="mt-8 mb-3 text-lg font-semibold">Personal Information</h2>
      <div className="overflow-x-auto rounded bg-white shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Field</TableHead>
              <TableHead>Information</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell>{fullName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>{applicant.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Phone</TableCell>
              <TableCell>{applicant.contactNumber}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Address</TableCell>
              <TableCell>{applicant.completeAddress}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Education</TableCell>
              <TableCell>{applicant.educationDegree}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Dialog for viewing a document */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Document Preview</DialogTitle>
            <DialogDescription>
              Preview of {selectedDoc?.fileName}
            </DialogDescription>
          </DialogHeader>
          {/* Body of the dialog: show PDF or Image */}
          {selectedDoc && (
            <div className="mt-4">
              {selectedDoc.fileType.includes("pdf") ? (
            <img
            src={selectedDoc.fileUrl}
            alt={selectedDoc.fileName}
            className="max-h-[600px] w-auto mx-auto"
          />
              ) : (
                <img
                  src={selectedDoc.fileUrl}
                  alt={selectedDoc.fileName}
                  className="max-h-[600px] w-auto mx-auto"
                />
              )}
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
