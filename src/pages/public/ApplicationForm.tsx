import { FileDragger } from "@/components/ui/file_dragger";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SubmitApplicationRegistry } from "@/config/applicant";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function ApplicationForm() {
  const location = useLocation();
  const { jobPosition, jobDepartment } = location.state || {};
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    middleName: "",
    email: "",
    contactNumber: "",
    address: "",
    degree: "",
    job: jobPosition || "",
    department: jobDepartment || "",
  });

  const [files, setFiles] = useState<{
    transcriptRecord: File | null;
    diploma: File | null;
    applicationLetter: File | null;
    resume: File | null;
  }>({
    transcriptRecord: null,
    diploma: null,
    applicationLetter: null,
    resume: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (field: string, file: File | null) => {
    setFiles((prev) => ({ ...prev, [field]: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const submissionData = new FormData();
      Object.keys(formData).forEach((key) => {
        submissionData.append(key, (formData as any)[key]);
      });
      Object.keys(files).forEach((key) => {
        const file = (files as any)[key];
        if (file) {
          submissionData.append(key, file);
        }
      });
  
      const response = await fetch("http://localhost:3006/api/v1/applicant/submit-applicant-registry", {
        method: "POST",
        body: submissionData,
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to submit application");
      }
  
      toast.success("Application submitted successfully!");
      setFormData({
        lastName: "",
        firstName: "",
        middleName: "",
        email: "",
        contactNumber: "",
        address: "",
        degree: "",
        job: "",
        department: "",
      });
      setFiles({
        transcriptRecord: null,
        diploma: null,
        applicationLetter: null,
        resume: null,
      });
      navigate("/My-Application");
    } catch (error: any) {
      console.error("Error submitting application:", error);
      toast.error(`Error submitting application: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    console.log("Canceled");
  };

  return (
    <div className="mx-auto max-w-2xl p-4">
      <button
        onClick={() => window.history.back()}
        className="mb-4 flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800"
      >
        <span>⬅</span>
        <span>Back</span>
      </button>

      <h1 className="mb-2 text-xl font-semibold">Instructions</h1>
      <p className="mb-6 text-sm text-gray-700">
        Please complete all fields and upload the required documents: Resume,
        TOR, Diploma, and Application Letter.
        <br />
        <strong>Accepted Formats:</strong> PDF, JPG, PNG (use ZIP for multiple
        files).
        <br />
        If the form doesn&apos;t load, try logging out of Google or clearing
        your browser cache.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            className="w-full rounded border border-gray-300 p-2 text-sm"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            className="w-full rounded border border-gray-300 p-2 text-sm"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Middle Name
          </label>
          <input
            type="text"
            name="middleName"
            className="w-full rounded border border-gray-300 p-2 text-sm"
            value={formData.middleName}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            className="w-full rounded border border-gray-300 p-2 text-sm"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Contact Number
          </label>
          <input
            type="text"
            name="contactNumber"
            className="w-full rounded border border-gray-300 p-2 text-sm"
            value={formData.contactNumber}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Complete Address
          </label>
          <input
            type="text"
            name="address"
            className="w-full rounded border border-gray-300 p-2 text-sm"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Education / Degree
          </label>
          <Select
            value={formData.degree}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, degree: value }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select your degree" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Bachelors">Bachelor&apos;s Degree</SelectItem>
              <SelectItem value="Masters">Master&apos;s Degree</SelectItem>
              <SelectItem value="Doctorate">Doctorate</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Job Position
          </label>
          <input
            type="text"
            name="job"
            readOnly
            value={formData.job}
            className="w-full rounded border border-gray-300 p-2 text-sm bg-gray-100"
          />
        </div>
        {formData.department && (
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Department
            </label>
            <input
              type="text"
              name="department"
              readOnly
              value={formData.department}
              className="w-full rounded border border-gray-300 p-2 text-sm bg-gray-100"
            />
          </div>
        )}
        <FileDragger
          label="Upload Transcript of Records (TOR)"
          accept={{
            "application/pdf": [".pdf"],
            "image/*": [".png", ".jpg", ".jpeg"],
          }}
          onFilesSelected={(file: File | null) =>
            handleFileChange("transcriptRecord", file)
          }
        />
        <FileDragger
          label="Upload Diploma"
          accept={{
            "application/pdf": [".pdf"],
            "image/*": [".png", ".jpg", ".jpeg"],
          }}
          onFilesSelected={(file: File | null) =>
            handleFileChange("diploma", file)
          }
        />
        <FileDragger
          label="Upload Application Letter"
          accept={{
            "application/pdf": [".pdf"],
            "image/*": [".png", ".jpg", ".jpeg"],
          }}
          onFilesSelected={(file: File | null) =>
            handleFileChange("applicationLetter", file)
          }
        />
        <FileDragger
          label="Upload Résumé"
          accept={{
            "application/pdf": [".pdf"],
            "image/*": [".png", ".jpg", ".jpeg"],
          }}
          onFilesSelected={(file: File | null) =>
            handleFileChange("resume", file)
          }
        />

        <div className="mt-6 text-sm">
          <h2 className="mb-2 font-semibold">Terms and Conditions</h2>
          <ol className="list-decimal space-y-1 pl-4 text-gray-700">
            <li>Submissions are subject to review and verification.</li>
            <li>Only complete applications will be processed.</li>
            <li>
              False information or forged documents will result in
              disqualification or termination.
            </li>
            <li>
              Data will be used only for employment purposes and handled
              according to UIC&apos;s privacy policy.
            </li>
          </ol>
        </div>

        <div className="mt-4 text-sm">
          <h2 className="mb-2 font-semibold">Acknowledgement</h2>
          <p className="text-gray-700">
            By submitting, I confirm that:
            <br />• I have provided accurate and authentic information.
            <br />• I allow UIC to use my data and documents for application
            processing and record-keeping.
            <br />• I understand my application may be disqualified if
            information is found to be false or incomplete.
          </p>
        </div>

        <div className="mt-6 flex items-center space-x-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}