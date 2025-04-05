import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  const user = useStore(selector("user"));
  const { accountId, entryId } = useParams();
  const [info, setInfo] = useState<ApplicantData[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<ApplicantDocument | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const Fetch = async () => {
    try {
      const res = await ApplicantList(accountId, entryId);
      if (res?.results) setInfo(res.results);
    } catch (error) {
      console.error("Error fetching applicant:", error);
    }
  };

  useEffect(() => {
    Fetch();
  }, [accountId, entryId]);

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
    } catch (error: any) {
      console.error("Error updating status:", error);
      toast.error(error.message || "Error updating status.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* MAIN CONTAINER */}
      <div className="bg-gray-100 shadow-xl rounded-xl p-8 space-y-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Applicant Details</h1>

        {/* GRID: Personal Info + Documents */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* PERSONAL INFO */}
          <div className="bg-white p-8 rounded-lg border space-y-5">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Personal Information</h2>
            <div className="space-y-4 text-base text-gray-700">
              <p><span className="font-medium">Full Name:</span> {fullName}</p>
              <p><span className="font-medium">Email:</span> {applicant.email}</p>
              <p><span className="font-medium">Phone:</span> {applicant.contactNumber}</p>
              <p><span className="font-medium">Address:</span> {applicant.completeAddress}</p>
              <p><span className="font-medium">Education:</span> {applicant.educationDegree}</p>
            </div>
          </div>

          {/* DOCUMENTS */}
          <div className="bg-white p-8 rounded-lg border space-y-6">
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
          <div className="flex justify-end space-x-4 pt-8 border-t border-gray-300">
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
