import { Receipt } from "@/components/receipt";

export default async function IndexPage(props: any) {
    const { params:{ intentid } } = props

    return (
        <div className="flex justify-center items-center">
        <Receipt intentid={intentid} />
        </div>
    )
    }
