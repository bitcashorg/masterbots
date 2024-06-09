import { Reciept } from "@/components/receipt";

export default async function IndexPage(props: any) {
    const { params:{ intentid } } = props

    // const response = await fetch(`/api/payment/subscription?paymentIntentId=${intentid}`, {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   });
    // const response = await fetch('http://localhost:3000/api/payment/subscription?paymentIntentId=pi_3PP0CJLGXyZrOxpN12gfoW1Z')
    // const data = await response.json()
    // console.log(data)
    return (
        <div className="flex justify-center items-center">
        <Reciept intentid={intentid} />
        </div>
    )
    }
