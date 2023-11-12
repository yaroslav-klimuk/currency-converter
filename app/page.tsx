import Converter from "./components/converter"

export default async function IndexPage() {
  return (
    <section className="container flex flex-col items-center justify-center gap-6 pb-8 pt-6 md:py-10">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
        Currency Converter
      </h1>

      <Converter />
    </section>
  )
}
