import { IconHelp, IconCreditCard} from '@/components/ui/icons'
export function Checkout() {
  return (
    <div className="h-full w-full  dark:bg-[#18181B]  bg-[#F4F4F5]">
     <div className='max-w-[24rem]  mx-auto'>
      <div className="text-center pt-2 text-gray-600 ">
        <span className="font-bold text-[16px] ">
          Subscribe using{' '}
          <span className="text-[#837de6]">Stripe</span>{' '}
        </span>
      </div>
      <div className="text-left mt-5 ">
        <div className="w-40  leading-[14.88px]">
          <span className="text-[12px] font-bold   text-[#71717A] w-10">
            Pay The Yearly Plan Subscription
          </span>
        </div>
        <h2 className="font-bold text-[32px]">$47.88</h2>
        <div className="flex  space-x-3 items-center bg-white dark:bg-[#1E293B] p-3">
            <IconCreditCard className="text-white fill-black dark:fill-white"  />
          <span>
            Subscribing with card ending with <strong>****4242</strong>
          </span>
        </div>
      </div>
      <div className="w-full mt-5">
        <div className="flex justify-between ">
          <div className="flex flex-col">
            <span>
              {' '}
              <strong>Masterbots Pro year </strong> subscription*
            </span>
            <span className="text-[#71717A] font-normal text-[11px]">
              *charged once every May 30th
            </span>
          </div>
          <span>$53.88</span>
        </div>
        <div className="flex justify-between text-gray-400 mt-3">
          <span>
            {' '}
            <strong>Year Plan</strong> subscription discount
          </span>
          <span>-$6.00</span>
        </div>
        <div className="flex justify-between  mt-5 pb-4 border-b">
          <span className="font-bold"> Subtotal</span>
          <span>$47.88</span>
        </div>
        <div className="flex justify-between  mt-3 pb-4 border-b">
          <div className="flex flex-col text-gray-400">
            <div className="flex space-x-1 items-center  content-center">
            <span>
              <strong>Additional Fees* </strong>
            </span>
              <IconHelp className='mt-4 w-7 h-7' />
            </div>
          
            <span className="font-normal text-[11px]">
              *calculated by country regulations.
            </span>
            <a href="#" className="text-blue-400 text-[11px]">
              Terms and Conditions.
            </a>
          </div>
          <span className='text-gray-400'>$0.00</span>
        </div>

        <div className="flex justify-between  mt-3 pb-4 border-b">
          <span className="font-bold"> Total Due</span>
          <span>$47.88</span>
        </div>
      </div>

      
      </div>
      <div className='dark:bg-black border  border-t-black bg-white p-5 flex justify-center items-center space-x-10'>
          <button className='text-black dark:text-white font-bold hover:border-b  border-black pb-2  text-center'>
          Go Back
          </button>
          <button  type='submit'  className='dark:bg-white  bg-black text-white dark:text-black rounded-full font-bold py-2 px-4'>
          Pay Subscription
          </button>
      </div>
    </div>
  )
}
