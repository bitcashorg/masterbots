import { UserCard } from "@/components/routes/profile/user-card"
export function Hero() {
    return (
      <div className="relative bg-left-bottom py-10 bg-[url('/hero-bg.png')] bg-no-repeat ">
      <div className="absolute inset-0 bg-gradient-to-l from-mirage via-[#2B5D91]/80 to-[#388DE2]/80"></div>
      <div className="relative z-[2] ">
       <UserCard />
      </div>
    </div>
    )

}