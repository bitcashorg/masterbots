import { auth } from "@/auth";
import BrowseUserDetails from "@/components/browse-user-details";
import { Receipt } from "@/components/receipt";
import { isTokenExpired } from "mb-lib";
import { redirect } from "next/navigation";

import { User } from 'mb-genql'
import { getBrowseThreads } from "@/services/hasura";


interface IndexPageProps {
    params: {
      intentid: string;
    };
  }
  
export default async function IndexPage(props:IndexPageProps) {
    const { params:{ intentid } } = props


    const session = await auth()
    // NOTE: maybe we should use same expiration time
    const jwt = session?.user?.hasuraJwt
    if (!jwt || isTokenExpired(jwt)) {
      redirect(`/sign-in`)
    }
  
    const threads = await getBrowseThreads({
        userId: session?.user.id,
        limit: 1
      })
      let user;
      if(threads.length > 0){
        user = threads[0]?.user
      }else{
        user = {
            username: session?.user.name,
            email: session?.user.email,
            profilePicture: session?.user.image
        } as  User;
      }

      const UserInfo = () => (
          user ? <BrowseUserDetails user={user} /> : null
        );

        const SubscriptionHeader = () => (
          <div className="text-center w-full dark:bg-[#09090B] bg-white py-5 ">
            <h2 className="text-[36px] font-bold">
              Masterbots Pro <br/> Subscription
            </h2>
          </div>
        );
     
    return (
        <div className="flex flex-col w-full">
            <UserInfo />
            <SubscriptionHeader />
            <Receipt intentid={intentid} />
        </div>
    )
    }
