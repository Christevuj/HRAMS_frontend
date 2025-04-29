export interface ApplicantData {
    applyingFor: string
    accountId: number
    completeAddress: string
    contactNumber: string
    documents: ApplicantDocument[]
    educationDegree: string
    email: string
    entryCreatedAt: string
    entryId: number
    firstName: string
    fullName: string
    lastName: string
    middleName: string
    status: string
    userType: string
    department:string
  }

  export interface ApplicantDocument {
    name: any
    id: number
    fileName: string
    fileUrl: string
    fileType: string
  }

// Example interface based on your sample data
export interface Job {
  jobId: number
  position: string
  department: string
  requirements: string // HTML string
  status: string
  createdAt: string     // ISO date string
  type: string
}

  
  export interface AllOpenJobsResponse {
    success: number
    results: Job[]
  }