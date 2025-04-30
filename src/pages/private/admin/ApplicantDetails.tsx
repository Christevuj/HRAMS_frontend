import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Download, Eye, MoreHorizontal, FileText } from "lucide-react";
import { toast } from "react-hot-toast";
import { ApplicantList, UpdateApplicantStatus } from "@/config/admin";
import { ApplicantData, ApplicantDocument } from "@/types";
import useStore from "@/zustand/store/store";
import { selector } from "@/zustand/store/store.provider";

export default function ApplicantDetails() {
  const navigate = useNavigate(); // Use navigate to go back to the previous page or dashboard
  const user = useStore(selector("user"));
  const {entryId } = useParams();
  const [info, setInfo] = useState<ApplicantData[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<ApplicantDocument | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const Fetch = async () => {
    try {
      const res = await ApplicantList( entryId);
      if (res?.results) setInfo(res.results);
    } catch (error) {
      console.error("Error fetching applicant:", error);
    }
  };

  useEffect(() => {
    Fetch();
  }, [entryId]);

  const applicant = info[0];
  if (!applicant) return <div className="p-4">No applicant found.</div>;

  const fullName = `${applicant.firstName} ${applicant.middleName} ${applicant.lastName}`.trim();

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
      Fetch();
   } catch (error) {
  if (error instanceof Error) {
    toast.error(error.message);
  } else {
    toast.error("An unexpected error occurred.");
  }
}
finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* MAIN CONTAINER */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8 relative">
        {/* Close Button */}
        <button
          onClick={() => navigate(-1)} // Navigate back to the previous page (or Dashboard if you prefer)
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold p-4"
        >
          &times;
        </button>

        <h1 className="text-3xl font-bold text-gray-800 mb-6">Applicant Details</h1>

        {/* GRID: Personal Info + Documents */}
        <div className="grid grid-cols-1 md:grid-cols-2 p-4 bg-[#FFFFFF] gap-4">
          {/* PERSONAL INFO */}
<div className="space-y-5">
  <h2 className="text-xl font-semibold text-gray-800 mb-6">Personal Information</h2>
  <div className="space-y-4 text-base text-gray-700">
    <p><span className="font-medium">Full Name:</span> {applicant.fullName}</p>
    <p><span className="font-medium">Email:</span> {applicant.email}</p>
    <p><span className="font-medium">Phone:</span> {applicant.contactNumber}</p>
    <p><span className="font-medium">Address:</span> {applicant.completeAddress}</p>
    <p><span className="font-medium">Education:</span> {applicant.educationDegree}</p>

    {/* Status placed below Education */}
    <p>
      <span className="font-medium">Status:</span>{" "}
      <span className={`inline-block px-2 py-1 border text-sm rounded-sm 
        ${applicant.status === "APPROVED" ? "border-green-600 text-green-600" : 
        applicant.status === "REJECTED" ? "border-red-600 text-red-600" :
        "border-pink-600 text-pink-600"}`}>
        {applicant.status}
      </span>
    </p>
  </div>
</div>


         {/* DOCUMENTS */}
<div className="space-y-6 mb-[50px]">
  <h2 className="text-xl font-semibold text-gray-800 mb-6">Uploaded Documents</h2>
  {applicant.documents?.length > 0 ? (
    <ul className="space-y-5">
      {applicant.documents.map((doc, idx) => (
        <li key={doc.id || idx} className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <FileText className="text-pink-600 w-6 h-6" />
            <div>
              <p className="font-medium text-sm text-gray-800">{doc.fileName}</p>
              <p className="text-xs text-gray-500">{doc.fileType}</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <Button variant="ghost" size="icon" onClick={() => window.open(doc.fileUrl, "_blank")}>
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => handleViewDoc(doc)}>
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

        </div>

        {/* ACTION BUTTONS */}
        {user.info.userType !== "hr" ? (
          <div className="flex justify-end space-x-4 -t border-gray-300">
            <Button
  disabled={isUpdating}
  style={{
    backgroundColor: applicant.status === "APPROVED" ? "#ffffff" : "#e65a96",
    color: applicant.status === "APPROVED" ? "#e65a96" : "#ffffff",
    border: `1px solid #e65a96`,
  }}
  onClick={() => handleApplicantStatusChange("APPROVED")}
>
  Approve
</Button>
<Button
  disabled={isUpdating}
  style={{
    backgroundColor: applicant.status === "ARCHIVED" ? "#ffffff" : "#e65a96",
    color: applicant.status === "ARCHIVED" ? "#e65a96" : "#ffffff",
    border: "1px solid #e65a96",
  }}
  onClick={() => handleApplicantStatusChange("ARCHIVED")}
>
  Archive
</Button>

<Button
  disabled={isUpdating}
  style={{
    backgroundColor: applicant.status === "REJECTED" ? "#ffffff" : "#e65a96",
    color: applicant.status === "REJECTED" ? "#e65a96" : "#ffffff",
    border: "1px solid #e65a96",
  }}
  onClick={() => handleApplicantStatusChange("REJECTED")}
>
  Reject
</Button>

          </div>
        ) : (
          <div className="text-right pt-8 border-t border-gray-300">
            <p className="bg-white text-pink-600 border border-pink-600 px-4 py-2 inline-block rounded-sm text-sm font-medium">
              {applicant.status}
            </p>
          </div>
        )}
      </div>

      {/* DIALOG: View Document */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Document Preview</DialogTitle>
            <DialogDescription>
              Preview of {selectedDoc?.fileName}
            </DialogDescription>
          </DialogHeader>
          {selectedDoc && (
            <div className="mt-6">
              <img
                src={selectedDoc.fileUrl}
                alt={selectedDoc.fileName}
                className="max-h-[600px] w-auto mx-auto"
              />
            </div>
          )}
          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}