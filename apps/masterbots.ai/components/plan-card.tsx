
type PlanCardProps = {
    selectedPlan: string
    handlePlanChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    plan: any
 }

export default function PlanCard({ selectedPlan, handlePlanChange, plan}: PlanCardProps) {

  const duration = plan.unit_amount === 0 ? 'free' : plan.recurring.interval
  const price = (plan.unit_amount / 100).toFixed(1)

    return (
        <div
        className={`border-gradient  w-full h-[275px] ${selectedPlan === duration ? 'selected' : ''}`}
      >
        <input
          type="radio"
          name="plan"
          id={duration}
          value={duration}
          onChange={handlePlanChange}
          checked={selectedPlan === duration}
          className="hidden"
          required
        />
        <label htmlFor={duration} className="w-full h-full justify-center items-center flex">
          <div className="flex flex-col  inner-content dark:bg-[url(/paid_plan_bg.png)] bg-[url(/paid_plan_bg_light.png)] my-auto p-5"
         >
          <div className="flex justify-between w-full">
            <div>
              <span className='dark:text-white  text-[#71717A]  font-[800] text-[16px] capitalize'>{ duration }</span>
              <h3 className="dark:text-white  text-black text-[36px] font-bold">${price}<span className='text-[24px]'>/mo</span> </h3>
            </div>
            <span
              className={`h-3 w-3 rounded-full ${selectedPlan === duration ? 'dark:bg-green-500 bg-[#BE17E8] ' : 'dark:bg-gray-500  bg-gray-300'}`}
            />
          </div>
          <div className="dark:text-white  text-black space-y-1">
               <p>{ plan.product.name}:</p>
               <ul className="list-disc pl-5">
                  <li>{ plan.product.description}</li>
               </ul>
               {/* <p>{ plan.product.description}</p> */}
               
                {/* <ul className="list-disc pl-5">
                { plan.features.map((feature, index) => (
                    <li key={`feature-${index}`}>{ feature }</li>
                ))}
                </ul> */}
              </div>

          </div>
          </label>
        </div>
    )
}