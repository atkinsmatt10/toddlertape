import Link from "next/link"

export default function CheckoutReturnPage() {
  return (
    <main className="min-h-screen bg-[#FFFBF5] px-4 py-24 text-[#1A1A1A]">
      <section className="mx-auto flex max-w-xl flex-col items-center text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#4ECDC4]/20 text-3xl">
          OK
        </div>
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
          Order received
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[#1A1A1A]/65 sm:text-lg">
          Thanks for buying Toddler Tape. Stripe will email your receipt after
          the payment is confirmed.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/#packs"
            className="rounded-full bg-[#1A1A1A] px-6 py-3 text-sm font-bold text-[#FFFBF5] transition-colors hover:bg-[#E8735A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8735A] focus-visible:ring-offset-2"
          >
            Shop More Tapes
          </Link>
          <Link
            href="/"
            className="rounded-full border border-[#1A1A1A]/15 px-6 py-3 text-sm font-bold text-[#1A1A1A] transition-colors hover:border-[#E8735A] hover:text-[#E8735A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8735A] focus-visible:ring-offset-2"
          >
            Back Home
          </Link>
        </div>
      </section>
    </main>
  )
}
