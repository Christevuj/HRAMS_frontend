import api from "./axios";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const ApplicantList = async (entryId?: string) => {
  try {
    const res = await api.get(`/admin/applicant-list`, {
      params: {
        ...(entryId ? { entryId } : {}),
      },
    });
    if (res.status !== 200 || res.data.success === 0) {
      throw new Error(res.data.message || "Failed");
    }
    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Failed"
    );
  }
};
export const AllOpenJobs = async () => {
    try {
      const res = await api.get(`/admin/job-list`);
      if (res.status !== 200 || res.data.success === 0) {
        throw new Error(res.data.message || "Failed");
      }
      return res.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || error.message || "Failed"
      );
    }
  };
export const UpdateApplicantStatus = async (data:any) => {
    try {
      const res = await api.put(`/admin/applicant-status`,data );
      if (res.status !== 200 || res.data.success === 0) {
        throw new Error(res.data.message || "Failed");
      }
      return res.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || error.message || "Failed"
      );
    }

  };

  export const CreateJob = async (jobData: any) => {
    try {
      const res = await api.post(`/admin/create-job`, jobData); // Call the backend API
      if (res.status !== 200 || res.data.success === false) {
        throw new Error(res.data.message || "Failed to create job.");
      }
      return res.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || error.message || "Failed to create job."
      );
    }
  };

