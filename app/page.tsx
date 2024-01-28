import Converter from "@/app/components/converter"

// TODO switch flags
// TODO remove twitter icon
// TODO replace github icon
// TODO make inputs draggable
// TODO long tab for delete (dropdown?)
// TODO redesign converter (widget)
// TODO add offilne mode

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
