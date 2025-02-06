import FooterCT from "@/components/layout/footer/footer-ct"

interface TermPoliciesLayoutProps {
  children: React.ReactNode
}

export default function TermPoliciesLayout({ children }: TermPoliciesLayoutProps) {
  return (
      <main className="flex flex-col h-[calc(100vh-theme(spacing.16))]">
        <section className="w-full px-8 overflow-auto group scrollbar md:px-0">
          {children}
          <FooterCT />
        </section>
      </main>
  )
}
