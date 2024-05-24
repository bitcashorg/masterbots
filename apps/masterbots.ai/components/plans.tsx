


export  function Plans() {
    return (
        <div className="flex flex-col  w-full">
            <div className="text-center">
                <span className="font-bold text-[16px]">Subscribe using  <span className="text-[#635BFF]">Stripe</span> </span>
            </div>
            <div className="flex flex-col w-full mt-2 ">
               <div  className="bg-cover bg-center border-gradient   p-5"
                    style={{ backgroundImage: 'url(/free_plan_bg.png)' }} >
                   <div className="flex justify-between items-center  my-auto ">
                            <div className="flex flex-col space-y-2 ">
                                <span className="font-bold text-[13px] text-[#83E56A]">PURCHASED</span>
                                 <div className="text-white space-y-1">
                                    <p>With the <strong>Free</strong> plan you obtain:</p>
                                    <ul className="list-disc pl-5">
                                        <li>Browse any thread and category. </li>
                                        <li>Chat with the Masterbots.</li>
                                    </ul>
                                 </div>
                            </div>
                   </div>
                </div>
            </div>
        </div>
    )
    }