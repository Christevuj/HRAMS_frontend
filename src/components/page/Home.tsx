import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { FilePlus, Folder, Upload, HelpCircle } from "lucide-react";
import JobCards from "./JobCards";

const BG_IMAGE_URL = "/bg.jpg";

const Home = () => {
  return (
    <div className="relative w-full h-auto min-h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${BG_IMAGE_URL})`,
        }}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-24 text-center text-white">
        <h2 className="text-xl font-semibold">HRAMS Portal</h2>
        <h1 className="text-3xl font-bold md:text-5xl">
          Welcome to UIC Human Resource Applicant Management System
        </h1>
        <p className="mt-2 max-w-2xl text-gray-200 md:text-lg">
          Welcome to the HRAMS Portal of the Human Resource Office at the
          University of the Immaculate Conception (UIC). This platform allows
          applicants to submit their required documents securely and
          efficiently.
        </p>
      </div>

      {/* Quick Actions Section (on a light background below the hero) */}
      <section id="quickAction" className="relative z-10 mt-8 bg-white px-4 py-12">
        <div className="container mx-auto max-w-7xl">
          <h2 className="mb-6 text-xl font-bold md:text-2xl">Quick Actions</h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Card 1: Apply Now */}
            <Card className="bg-violet-50 shadow-md">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <FilePlus className="h-5 w-5 text-violet-700" />
                  <CardTitle>Apply Now</CardTitle>
                </div>
                <CardDescription>Submit a new job application</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="default">Start</Button>
              </CardContent>
            </Card>

        

          </div>
          <JobCards />
        </div>
      </section>
    </div>
  );
};

export default Home;
