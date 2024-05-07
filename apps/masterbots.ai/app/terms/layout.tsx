import FooterCT from "@/components/footer-ct"

interface TermPoliciesLayoutProps {
  children: React.ReactNode
}

export default function TermPoliciesLayout({ children }: TermPoliciesLayoutProps) {
  return (
      <main className="flex flex-col h-[calc(100vh-theme(spacing.16))]">
        <section className="overflow-auto group scrollbar w-full px-8 md:px-0">
          {children}
          <FooterCT />
        </section>
      </main>
  )
}
