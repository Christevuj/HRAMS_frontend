import api from "./axios";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const SubmitApplicationRegistry = async (data: any) => {
  try {
    const res = await api.post("/applicant/submit-applicant-registry", data);
    if (res.status !== 200 || res.data.success === 0) {
      throw new Error(res.data.message || "Failed");
    }
    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message || error.message || "Failed");
  }
};
export const CreateUser = async (data: any) => {
  try {
    const res = await api.post("/applicant/register-account", data);
    if (res.status !== 200 || res.data.success === 0) {
      throw new Error(res.data.message || "Failed");
    }
    return res.data;
  } catch (error: any) {
    throw new Error(error.message || "Failed");
  }
};
export const LoginAccount = async (data: any) => {
  try {
    const res = await api.post("/applicant/login-account", data);
    if (res.status !== 200 || res.data.success === 0) {
      throw new Error(res.data.results || "Failed");
    }
    return res.data;
  } catch (error: any) {
    console.log(error)
    throw new Error(error.message || "Failed");
  }
};


