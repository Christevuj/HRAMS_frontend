import { Button } from "@/components/ui/button"

export default function AboutUIC() {
  return (
    <section id="about"
      className="relative flex h-[450px] w-full items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('bg.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-[#e65b7a]/40" />
      <div className="relative z-10 flex max-w-6xl gap-12 flex-col items-center px-4 text-center text-white md:flex-row md:text-left">
        <div className="mb-6 flex w-full items-center justify-center md:mb-0 md:w-1/3 md:justify-start">
          <img
            src="/logo.png"
            alt="UIC Logo"
            className="h-32 w-auto object-contain md:h-40"
          />
        </div>
        <div className="md:w-2/3">
          <h2 className="mb-3 text-2xl font-bold md:text-3xl">About UIC</h2>
          <p className="mb-4 text-sm leading-relaxed md:text-base">
            119 years of Transformative Ignatian Marian Service and Commitment to
            Christian Education. Producer of top-notch graduates in the fields of
            allied health, technology, engineering and architecture, education, music,
            and the arts.
          </p>
          <Button
            variant="outline"
            className="border-white text-black hover:bg-white hover:text-black"
          >
            Read More
          </Button>
        </div>
      </div>
    </section>
  )
}
