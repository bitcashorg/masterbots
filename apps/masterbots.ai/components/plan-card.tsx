
import { Plan } from '../lib/utils'

type PlanCardProps = {
    selectedPlan: string
    handlePlanChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    plan: Plan
 }

export default function PlanCard({ selectedPlan, handlePlanChange, plan}: PlanCardProps) {
    return (
        <div
        className={`border-gradient  w-full h-[275px] ${selectedPlan === plan.duration ? 'selected' : ''}`}
      >
        <input
          type="radio"
          name="plan"
          id={plan.duration}
          value={plan.duration}
          onChange={handlePlanChange}
          checked={selectedPlan === plan.duration}
          className="hidden"
        />
        <label htmlFor={plan.duration} className="block w-full h-full justify-center items-center flex">
          <div className="flex flex-col  inner-content  my-auto p-5"
          style={{backgroundImage: 'url(/paid_plan_bg.png)' }}
          >
          <div className="flex justify-between w-full">
            <div>
              <span className='text-white  font-bold text-[16px capitalize'>{ plan.duration }</span>
              <h3 className="text-white text-[36px] font-bold">${plan.price}<span className='text-[24px]'>/mo</span> </h3>
            </div>
            <span
              className={`h-3 w-3 rounded-full`}
              style={{
                backgroundColor:
                  selectedPlan === plan.duration ? '#83E56A' : '#93abd3'
              }}
            ></span>
          </div>
          <div className="text-white space-y-1">
                <p  dangerouslySetInnerHTML={{ __html:  plan.features_title }} />
                {/* { plan.features_title } */}
              
                <ul className="list-disc pl-5">
                { plan.features.map((feature, index) => (
                    <li key={index}>{ feature }</li>
                ))}
                </ul>
              </div>

          </div>
          </label>
        </div>
    )
}