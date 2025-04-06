import { useEffect, useState } from "react";
import { AllOpenJobs } from "@/config/admin";
import { AllOpenJobsResponse, Job } from "@/types";
import { Pencil, Trash2, MoreVertical } from "lucide-react";
import { DropdownMenu } from "@/components/ui/dropdown_menu";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const Jobs = () => {
    const [jobsList, setJobsList] = useState<Job[]>([]);
    const [activeTab, setActiveTab] = useState<string>("all"); // Track the active tab

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

    const handleEdit = (jobId: string) => {
        console.log("Edit clicked for Job ID:", jobId);
    };

    const handleDelete = (jobId: string) => {
        console.log("Delete clicked for Job ID:", jobId);
    };

    // Filter jobs based on the selected tab
    const filteredJobs = jobsList.filter((job) => {
        if (activeTab === "open") {
            return job.status === "Open";
        } else if (activeTab === "closed") {
            return job.status === "Closed";
        }
        return true; // "all" tab shows all jobs
    });

    return (
        <main className="p-6">
            <h1 className="text-xl font-semibold">Office Head Reports</h1>

            {/* Tabs */}
            <Tabs className="w-full mt-6" defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                    <TabsTrigger className="px-8" value="all">All Reports</TabsTrigger>
                    <TabsTrigger className="px-8" value="open">Done</TabsTrigger>
                    <TabsTrigger className="px-8" value="closed">Archived</TabsTrigger>
                </TabsList>
                </Tabs>
                
        </main>
    );
};

export default Jobs;