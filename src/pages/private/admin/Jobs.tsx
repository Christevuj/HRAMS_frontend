import { useEffect, useState } from "react";
import { AllOpenJobs } from "@/config/admin";
import { AllOpenJobsResponse, Job } from "@/types";
import { Pencil, Archive, MoreVertical } from "lucide-react";
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

    const handleArchive = (jobId: string) => {
        console.log("Archive/Unarchive clicked for Job ID:", jobId);
        setJobsList((prevList) =>
            prevList.map((job) =>
                job.jobId === jobId
                    ? {
                        ...job,
                        status: job.status === "Archived" ? "Open" : "Archived",
                    }
                    : job
            )
        );
    };


    // Filter jobs based on the selected tab
    const filteredJobs = jobsList.filter((job) => {
        if (activeTab === "open") {
            return job.status === "Open";
        } else if (activeTab === "closed") {
            return job.status === "Closed";
        } else if (activeTab === "archived") {
            return job.status === "Archived";
        }
        return true; // "all" tab shows all jobs
    });

    return (
        <main className="p-6">
            <h1 className="text-xl font-semibold">Job Listings</h1>

            {/* Tabs */}
            <Tabs className="w-full mt-6" defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                    <TabsTrigger className="px-8" value="all">All Jobs</TabsTrigger>
                    <TabsTrigger className="px-8" value="open">Open</TabsTrigger>
                    <TabsTrigger className="px-8" value="closed">Closed</TabsTrigger>
                    <TabsTrigger className="px-8" value="archived">Archived</TabsTrigger> {/* New Archived Tab */}
                </TabsList>

                {/* Tab Contents */}
                <TabsContent value="all">
                    <div className="mt-1">
                        {filteredJobs.length === 0 ? (
                            <p className="text-gray-500">No job listings available.</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {filteredJobs.map((job) => (
                                    <div
                                        key={job.jobId}
                                        className="relative bg-white p-6 rounded-2xl shadow hover:shadow-md transition"
                                    >
                                        {/* 3 Dots Menu */}
                                        <div className="absolute top-4 right-4">
                                            <DropdownMenu
                                                menuItems={[
                                                    {
                                                        label: "Edit",
                                                        onClick: () => handleEdit(job.jobId),
                                                        icon: <Pencil className="w-4 h-4 mr-2" />,
                                                    },
                                                    {
                                                        label: job.status === "Archived" ? "Unarchive" : "Archive", // Change Archive if job is already archived
                                                        onClick: () => handleArchive(job.jobId),
                                                        icon: <Archive className="w-4 h-4 mr-2" />,
                                                    },
                                                ]}
                                            >
                                                <MoreVertical className="w-5 h-5 text-gray-600" />
                                            </DropdownMenu>
                                        </div>

                                        <h2 className="text-xl font-semibold text-gray-900 mb-1">
                                            {job.position}
                                        </h2>
                                        <p className="text-sm text-gray-600 mb-1">
                                            <span className="font-medium">Department:</span> {job.department || "N/A"}
                                        </p>
                                        <p className={`text-sm mb-1 ${job.status === "Open" ? "text-green-600" : job.status === "Closed" ? "text-red-600" : "text-gray-600"}`}>
                                            <span className="font-medium">Status:</span> {job.status}
                                        </p>
                                        <p className="text-sm text-gray-600 mb-1">
                                            <span className="font-medium">Type:</span> {job.type}
                                        </p>
                                        <p className="text-sm text-gray-500 mb-3">
                                            <span className="font-medium">Created:</span>{" "}
                                            {new Date(job.createdAt).toLocaleDateString()}
                                        </p>

                                        <div className="text-sm text-gray-700 mb-4 line-clamp-5">
                                            <span className="font-medium">Requirements:</span>
                                            <div
                                                className="mt-1 text-pretty"
                                                dangerouslySetInnerHTML={{ __html: job.requirements }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="open">
                    <div className="mt-1">
                        {filteredJobs.length === 0 ? (
                            <p className="text-gray-500">No open job listings available.</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {filteredJobs.map((job) => (
                                    job.status === "Open" && (
                                        <div
                                            key={job.jobId}
                                            className="relative bg-white p-6 rounded-2xl shadow hover:shadow-md transition"
                                        >
                                            {/* 3 Dots Menu */}
                                            <div className="absolute top-4 right-4">
                                                <DropdownMenu
                                                    menuItems={[
                                                        {
                                                            label: "Edit",
                                                            onClick: () => handleEdit(job.jobId),
                                                            icon: <Pencil className="w-4 h-4 mr-2" />,
                                                        },
                                                        {
                                                            label: "Archive",
                                                            onClick: () => handleArchive(job.jobId),
                                                            icon: <Archive className="w-4 h-4 mr-2" />,
                                                        },
                                                    ]}
                                                >
                                                    <MoreVertical className="w-5 h-5 text-gray-600" />
                                                </DropdownMenu>
                                            </div>

                                            <h2 className="text-xl font-semibold text-gray-900 mb-1">
                                                {job.position}
                                            </h2>
                                            <p className="text-sm text-gray-600 mb-1">
                                                <span className="font-medium">Department:</span> {job.department || "N/A"}
                                            </p>
                                            <p className="text-sm text-green-600 mb-1">
                                                <span className="font-medium">Status:</span> {job.status}
                                            </p>
                                            <p className="text-sm text-gray-600 mb-1">
                                                <span className="font-medium">Type:</span> {job.type}
                                            </p>
                                            <p className="text-sm text-gray-500 mb-3">
                                                <span className="font-medium">Created:</span>{" "}
                                                {new Date(job.createdAt).toLocaleDateString()}
                                            </p>

                                            <div className="text-sm text-gray-700 mb-4 line-clamp-5">
                                                <span className="font-medium">Requirements:</span>
                                                <div
                                                    className="mt-1 text-pretty"
                                                    dangerouslySetInnerHTML={{ __html: job.requirements }}
                                                />
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="closed">
                    <div className="mt-1">
                        {filteredJobs.length === 0 ? (
                            <p className="text-gray-500">No closed job listings available.</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {filteredJobs.map((job) => (
                                    job.status === "Closed" && (
                                        <div
                                            key={job.jobId}
                                            className="relative bg-white p-6 rounded-2xl shadow hover:shadow-md transition"
                                        >
                                            {/* 3 Dots Menu */}
                                            <div className="absolute top-4 right-4">
                                                <DropdownMenu
                                                    menuItems={[
                                                        {
                                                            label: "Edit",
                                                            onClick: () => handleEdit(job.jobId),
                                                            icon: <Pencil className="w-4 h-4 mr-2" />,
                                                        },
                                                        {
                                                            label: "Archive",
                                                            onClick: () => handleArchive(job.jobId),
                                                            icon: <Archive className="w-4 h-4 mr-2" />,
                                                        },
                                                    ]}
                                                >
                                                    <MoreVertical className="w-5 h-5 text-gray-600" />
                                                </DropdownMenu>
                                            </div>

                                            <h2 className="text-xl font-semibold text-gray-900 mb-1">
                                                {job.position}
                                            </h2>
                                            <p className="text-sm text-gray-600 mb-1">
                                                <span className="font-medium">Department:</span> {job.department || "N/A"}
                                            </p>
                                            <p className="text-sm text-red-600 mb-1">
                                                <span className="font-medium">Status:</span> {job.status}
                                            </p>
                                            <p className="text-sm text-gray-600 mb-1">
                                                <span className="font-medium">Type:</span> {job.type}
                                            </p>
                                            <p className="text-sm text-gray-500 mb-3">
                                                <span className="font-medium">Created:</span>{" "}
                                                {new Date(job.createdAt).toLocaleDateString()}
                                            </p>

                                            <div className="text-sm text-gray-700 mb-4 line-clamp-5">
                                                <span className="font-medium">Requirements:</span>
                                                <div
                                                    className="mt-1 text-pretty"
                                                    dangerouslySetInnerHTML={{ __html: job.requirements }}
                                                />
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="archived">
                    <div className="mt-1">
                        {filteredJobs.length === 0 ? (
                            <p className="text-gray-500">No archived job listings available.</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {filteredJobs.map((job) => (
                                    job.status === "Archived" && (
                                        <div
                                            key={job.jobId}
                                            className="relative bg-white p-6 rounded-2xl shadow hover:shadow-md transition"
                                        >
                                            {/* 3 Dots Menu */}
                                            <div className="absolute top-4 right-4">
                                                <DropdownMenu
                                                    menuItems={[
                                                        {
                                                            label: "Unarchive",
                                                            onClick: () => handleArchive(job.jobId),
                                                            icon: <Archive className="w-4 h-4 mr-2" />,
                                                        },
                                                    ]}
                                                >
                                                    <MoreVertical className="w-5 h-5 text-gray-600" />
                                                </DropdownMenu>
                                            </div>

                                            <h2 className="text-xl font-semibold text-gray-900 mb-1">
                                                {job.position}
                                            </h2>
                                            <p className="text-sm text-gray-600 mb-1">
                                                <span className="font-medium">Department:</span> {job.department || "N/A"}
                                            </p>
                                            <p className="text-sm font-bold text-black mb-1">
                                                <span className="font-medium">Status:</span> {job.status}
                                            </p>
                                            <p className="text-sm text-gray-600 mb-1">
                                                <span className="font-medium">Type:</span> {job.type}
                                            </p>
                                            <p className="text-sm text-gray-500 mb-3">
                                                <span className="font-medium">Created:</span>{" "}
                                                {new Date(job.createdAt).toLocaleDateString()}
                                            </p>

                                            <div className="text-sm text-gray-700 mb-4 line-clamp-5">
                                                <span className="font-medium">Requirements:</span>
                                                <div
                                                    className="mt-1 text-pretty"
                                                    dangerouslySetInnerHTML={{ __html: job.requirements }}
                                                />
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                        )}
                    </div>
                </TabsContent>
            </Tabs>
        </main>
    );
};

export default Jobs;
