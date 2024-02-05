import Converter from "@/app/components/converter"

// TODO dependabot
// TODO switch flags
// TODO remove twitter icon
// TODO replace github icon
// TODO make inputs draggable
// TODO long tab for delete (dropdown?)
// TODO redesign converter (widget)
// TODO add offilne mode

export default async function IndexPage() {
  return (
    <section className="container flex flex-col items-center justify-center px-4 pb-8 pt-6 md:px-8 md:py-10">
      <Converter />
    </section>
  )
}
