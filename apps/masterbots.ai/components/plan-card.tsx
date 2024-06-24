import { PlanCardProps } from '@/lib/types';
import { cn } from '../lib/utils';

export default function PlanCard({
  selectedPlan,
  handlePlanChange,
  plan,
}: PlanCardProps) {
  const duration = plan.unit_amount === 0 ? 'free' : plan.recurring.interval
  const price = (plan.unit_amount ? plan.unit_amount / 100 : 0).toFixed(2)

  return (
    <div
      className={cn(
        'border-gradient w-full h-[275px] dark:[&>_div]:hover:bg-tertiary     [&>_div]:hover:tertiarylight',
        {
          'selected': selectedPlan === duration
        },
      )}
      id={plan.id}
    >
      <div className={cn(
        'transition-all size-[calc(100%_-_10px)] absolute top-[5px] left-[5px] rounded-[11px] bg-transparent',
        {
          'dark:bg-tertiary bg-tertiarylight': selectedPlan === duration
        }
      )} />
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
      <label
        htmlFor={duration}
        className="w-full h-full justify-center items-center flex"
      >
        <div className="flex flex-col  inner-content dark:bg-[url(/paid_plan_bg.png)] bg-[url(/paid_plan_bg_light.png)] my-auto p-5">
          <div className="flex justify-between w-full">
            <div>
              <span className="text-muted-foreground font-extrabold text-[16px] capitalize">
                {duration}
              </span>
              <h3 className="dark:text-white  text-black text-[36px] font-bold">
                ${plan.product.name.toLowerCase().includes('year') ? Number(price) / 12 : price}
                <span className="text-[24px]">/mo</span>{' '}
              </h3>
            </div>
            <span
              className={cn(
                'h-3.5 w-3.5 rounded-full border-[3px] border-border/80',
                selectedPlan === duration ? 'dark:bg-tertiary   bg-tertiarylight' : 'bg-mirage'
              )}
            />
          </div>
          <div className="dark:text-white  text-black space-y-1">
            <p>
              {plan.product.description?.split(/\*\*(.*?)\*\*/g).map((text, index) => (
                index % 2 === 0 ? text : <strong key={index}>{text}</strong>
              )).filter(Boolean)}
            </p>
            <ul className="list-disc pl-5">
              {plan.product.marketing_features.map((feature, index) => (
                <li key={`feature-${index}`}>
                  {/* // Grab content that it is between ** ** and make it bold */}
                  {feature.name?.split(/\*\*(.*?)\*\*/g).map((text, index) => (
                    index % 2 === 0 ? text : <strong key={index}>{text}</strong>
                  )).filter(Boolean)}
                </li>
              ))}
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
