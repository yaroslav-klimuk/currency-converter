import ConverterWidget from "@/app/components/converter-widget"

export default async function IndexPage() {
  return (
    <section className="container flex flex-col items-center justify-center px-2 pb-8 pt-6 md:px-8 md:py-10">
      <ConverterWidget />
    </section>
  )
}
