import { Button } from "@/components/ui/button"
import { AllOpenJobs } from "@/config/admin"
import { AllOpenJobsResponse, Job } from "@/types"
import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"

export default function JobCards() {
  const [jobsList, setJobsList] = useState<Job[]>([])

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res: AllOpenJobsResponse = await AllOpenJobs()
        if (res && res.success === 1) {
          setJobsList(res.results)
        }
      } catch (error) {
        console.error("Error fetching jobs:", error)
      }
    }
    fetchJobs()
  }, [])

  return (
    <div className="w-full px-4 py-20">
      <div className="flex items-center justify-center mb-8">
        <h2 className="max-w-4xl mb-6 text-4xl font-semibold italic text-center text-gray-800">
          Step into success with our vibrant career opportunities— where your passion meets potential, and your dream job awaits!
        </h2>
      </div>
      <Swiper
        effect="coverflow"
        centeredSlides
        slidesPerView={3}
        grabCursor
        loop
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        coverflowEffect={{ rotate: 0, stretch: -50, depth: 150, modifier: 1, slideShadows: false }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper !py-20 !pt-12"
      >
        {jobsList.map((job) => (
          <SwiperSlide key={job.jobId}>
            <div className="h-[350px] flex flex-col justify-between p-6 transition duration-300 transform bg-white rounded-lg shadow-sm hover:scale-105 hover:shadow-lg">
              <div className="flex-grow overflow-hidden">
                <p className="mb-2 text-sm font-medium text-gray-600">
                  {new Date(job.createdAt).toLocaleDateString()}
                </p>
                <h3 className="mb-2 text-xl font-semibold text-gray-800">
                  {job.position}
                </h3>
                <div className="inline-block px-3 py-1 text-sm text-gray-700 bg-gray-200 rounded-full">
                  {job.type}
                </div>
                <div className="mt-4 text-sm text-gray-700 line-clamp-6 text-pretty">
                  <div dangerouslySetInnerHTML={{ __html: job.requirements }} />
                </div>
              </div>
              <div className="mt-6">
                <Button variant="default" className="bg-black text-white hover:bg-gray-800">
                  Apply Now
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
