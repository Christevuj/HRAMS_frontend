import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Button } from "@/components/ui/button"

interface NewsItem {
  category: string
  title: string
  date: string
  image: string
}

const newsEvents: NewsItem[] = [
  {
    category: "INSTITUTE OF TOURISM AND HOTEL MANAGEMENT",
    title: "Tamaraws score wins in Tourism and Hospitality Skills Olympics",
    date: "March 7, 2025",
    image: "https://artisthubhq.com/wp-content/uploads/2018/04/ultimate-guide.jpg",
  },
  {
    category: "INSTITUTE OF ARTS AND SCIENCES",
    title: "10 undergrad groups vie for awards in comm colloquium",
    date: "March 6, 2025",
    image: "https://static1.squarespace.com/static/5e8e1ae7081c307617d8e5e1/60a31dd074a43a2fd1eaf681/62e597dab676bf414434dc24/1659214260073/best-extracurricular-activities-for-college.jpg?format=1500w",
  },
  {
    category: "INSTITUTE OF TOURISM AND HOTEL MANAGEMENT",
    title: "Six couples exchange vows at 10th TamVows",
    date: "March 5, 2025",
    image: "https://procaffenation.com/wp-content/uploads/2020/06/Buzz-Session.jpg",
  },
  {
    category: "INSTITUTE OF TOURISM AND HOTEL MANAGEMENT",
    title: "Six couples exchange vows at 10th TamVows",
    date: "March 5, 2025",
    image: "https://www.willgetyouin.com/wp-content/uploads/2023/02/image-9.png",
  },
  {
    category: "INSTITUTE OF TOURISM AND HOTEL MANAGEMENT",
    title: "Six couples exchange vows at 10th TamVows",
    date: "March 5, 2025",
    image: "https://www.willgetyouin.com/wp-content/uploads/2023/02/image-9.png",
  },
]

export default function NewsAndEventsSwiper() {
  return (
    <section id="announcement" className="container mx-auto w-full px-4 py-20">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#e65b7a]">
          University News and Events
        </h2>
        <Button variant="outline" className="border-[#e65b7a] text-[#e65b7a] hover:bg-green-50">
          View All News
        </Button>
      </div>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        className="h-auto"
      >
        {newsEvents.map((item) => (
          <SwiperSlide key={item.title}>
            <div className="rounded-md overflow-hidden shadow hover:shadow-lg transition duration-300 bg-white">
              <img
                src={item.image}
                alt={item.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <p className="mb-1 text-sm font-semibold uppercase text-[#e65b7a]">
                  {item.category}
                </p>
                <h3 className="mb-2 text-lg font-semibold text-gray-800">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500">{item.date}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
