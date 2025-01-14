import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '@/components/ui/accordion'
import { Card, CardContent } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Button } from '@/components/ui/button'
import {
  AArrowDown,
  AArrowUp,
  Plus,
  UserRoundX,
  MessageSquareX
} from 'lucide-react'
import { PreferenceItemTitle } from './preference-item'

export function Preferences() {
  return (
    <>
      <Accordion type="single" collapsible defaultValue="1">
        <AccordionItem value="1" className="border-none">
          <AccordionTrigger>
            <p className="text-2xl ">General</p>
          </AccordionTrigger>
          <AccordionContent>
            <Card className="bg-transparent border-mirage">
              <CardContent className="px-4 py-8 flex flex-col justify-center items-center gap-y-4 w-full">
                <div className="flex justify-between items-center gap-x-5 px-4 border-b border-mirage pb-5 w-full">
                  <PreferenceItemTitle
                    title={'Preferred Language'}
                    description={
                      'Receive emails about new products, features, and more.'
                    }
                  />
                  <Switch className="data-[state=unchecked]:bg-mirage data-[state=checked]:bg-mirage [&>span[data-state=unchecked]]:bg-[#71717A] [&>span[data-state=checked]]:bg-accent" />
                </div>
                <div className="flex justify-between items-center gap-x-5 px-4 border-b border-mirage pb-5 w-full">
                  <PreferenceItemTitle
                    title={'Masterbots Theme'}
                    description={
                      'Change the default theme for the Masterbots site.'
                    }
                  />
                  <Switch className="data-[state=unchecked]:bg-mirage data-[state=checked]:bg-mirage [&>span[data-state=unchecked]]:bg-[#71717A] [&>span[data-state=checked]]:bg-accent" />
                </div>
                <div className="flex justify-between items-center gap-x-5 px-4 w-full">
                  <PreferenceItemTitle
                    title={'Default Font Size'}
                    description={
                      'Change overall font-size website (does not change your browser font-size).'
                    }
                  />
                  <ToggleGroup
                    type="single"
                    defaultValue="b"
                    className="gap-0 border rounded-full border-mirage h-7"
                  >
                    <ToggleGroupItem
                      value="a"
                      className="h-full px-2 hover:rounded-none hover:rounded-l-full data-[state=on]:rounded-none data-[state=on]:rounded-l-full data-[state=on]:text-white data-[state=on]:bg-accent"
                    >
                      <AArrowDown />
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="b"
                      className="h-full px-2 border-x border-x-gray-700 rounded-none text-base font-medium text-white data-[state=on]:text-white data-[state=on]:bg-accent"
                    >
                      MD
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="c"
                      className="h-full px-2 hover:rounded-none hover:rounded-r-full data-[state=on]:rounded-none data-[state=on]:rounded-r-full data-[state=on]:text-white data-[state=on]:bg-accent"
                    >
                      <AArrowUp />
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="single" collapsible defaultValue="1">
        <AccordionItem value="1" className="border-none">
          <AccordionTrigger className="border-none">
            <p className="text-2xl ">Thread Preferences</p>
          </AccordionTrigger>
          <AccordionContent>
            <Card className="bg-transparent border-mirage">
              <CardContent className="px-4 py-8 flex flex-col justify-center items-center gap-y-4 w-full">
                <div className="flex justify-between items-center gap-x-5 px-4 border-b border-mirage pb-5 w-full">
                  <PreferenceItemTitle
                    title={'Always Web Search'}
                    description={
                      'Enable web search on every new thread created and on every request by default.'
                    }
                  />

                  <Switch className="data-[state=unchecked]:bg-mirage data-[state=checked]:bg-mirage [&>span[data-state=unchecked]]:bg-[#71717A] [&>span[data-state=checked]]:bg-accent" />
                </div>
                <div className="flex justify-between items-center gap-x-5 px-4 w-full">
                  <PreferenceItemTitle
                    title={'Always Pro Mode'}
                    description={
                      'Enable pro mode on every new thread created and on every request by default.'
                    }
                  />
                  <Switch className="data-[state=unchecked]:bg-mirage data-[state=checked]:bg-mirage [&>span[data-state=unchecked]]:bg-[#71717A] [&>span[data-state=checked]]:bg-accent" />
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="single" collapsible defaultValue="1">
        <AccordionItem value="1" className="border-none">
          <AccordionTrigger className="border-none">
            <p className="text-2xl ">Email Notifications</p>
          </AccordionTrigger>
          <AccordionContent>
            <Card className="bg-transparent border-mirage">
              <CardContent className="px-4 py-8 flex flex-col justify-center items-center gap-y-4 w-full">
                <div className="flex justify-between items-center gap-x-5 px-4 border-b border-mirage pb-5 w-full">
                  <PreferenceItemTitle
                    title={'Marketing emails'}
                    description={
                      'Receive emails about new products, features, and more.'
                    }
                  />
                  <Switch className="data-[state=unchecked]:bg-mirage data-[state=checked]:bg-mirage [&>span[data-state=unchecked]]:bg-[#71717A] [&>span[data-state=checked]]:bg-accent" />
                </div>
                <div className="flex justify-between items-center gap-x-5 px-4 w-full">
                  <PreferenceItemTitle
                    title={'Security emails'}
                    description={'Receive emails about your account security.'}
                  />

                  <Switch
                    defaultChecked
                    className="data-[state=unchecked]:bg-mirage data-[state=checked]:bg-mirage [&>span[data-state=unchecked]]:bg-[#71717A] [&>span[data-state=checked]]:bg-accent"
                  />
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="single" collapsible defaultValue="1">
        <AccordionItem value="1" className="border-none">
          <AccordionTrigger className="border-none">
            <p className="text-2xl ">Advance Configuration</p>
          </AccordionTrigger>
          <AccordionContent>
            <Card className="bg-transparent border-mirage">
              <CardContent className="px-4 py-8 flex flex-col justify-center items-center gap-y-4 w-full">
                <div className="flex justify-between items-center gap-x-5 px-4 border-b border-mirage pb-5 w-full">
                  <PreferenceItemTitle
                    title={'Configure My Threads'}
                    description={
                      'Enable to give an unique touch to all your chatbots on any domain category!'
                    }
                  />

                  <Switch
                    defaultChecked
                    className="data-[state=unchecked]:bg-mirage data-[state=checked]:bg-mirage [&>span[data-state=unchecked]]:bg-[#71717A] [&>span[data-state=checked]]:bg-accent"
                  />
                </div>
                <div className="flex justify-between items-center gap-x-5 px-8 w-full border-b border-mirage pb-5">
                  <PreferenceItemTitle
                    title={'Set new configuration'}
                    description={
                      'Create a new configuration for tone, style, length and complexity.'
                    }
                  />

                  <Plus className="cursor-pointer" />
                </div>
                <div className="flex justify-between items-center gap-x-5 px-4 border-b border-mirage pb-5 w-full">
                  <PreferenceItemTitle
                    title={'Configure My Chatbots'}
                    description={
                      'Enable to narrow the configuration for your chatbots to give your unique touch.'
                    }
                  />

                  <Switch
                    defaultChecked
                    className="data-[state=unchecked]:bg-mirage data-[state=checked]:bg-mirage [&>span[data-state=unchecked]]:bg-[#71717A] [&>span[data-state=checked]]:bg-accent"
                  />
                </div>
                <div className="flex justify-between items-center gap-x-5 px-8 w-full">
                  <PreferenceItemTitle
                    title={'Set new configuration'}
                    description={
                      'Create a new configuration for tone, style, length and complexity.'
                    }
                  />

                  <Plus className="cursor-pointer" />
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="single" collapsible defaultValue="1">
        <AccordionItem value="1" className="border-none">
          <AccordionTrigger className="border-none">
            <p className="text-2xl ">Danger Zone</p>
          </AccordionTrigger>
          <AccordionContent>
            <Card className="bg-transparent border-destructive">
              <CardContent className="px-4 py-8 flex flex-col justify-center items-center gap-y-4 w-full">
                <div className="flex justify-between items-center gap-x-5 px-4 border-b border-destructive pb-5 w-full">
                  <PreferenceItemTitle
                    title={'Delete Your Account'}
                    description={
                      'Removes all your personal data and all your conversations and threads.'
                    }
                  />

                  <Button className="bg-transparent border border-destructive text-destructive p-2 text-sm min-h-9">
                    <UserRoundX className="mr-1 size-4!" />
                    Delete Account
                  </Button>
                </div>
                <div className="flex justify-between items-center gap-x-5 px-4 w-full">
                  <PreferenceItemTitle
                    title={'Delete All My Public Threads'}
                    description={
                      'Removes all your published threads and all your related content of your public threads.'
                    }
                  />

                  <Button className="bg-transparent border border-destructive text-destructive p-2 text-sm min-h-9">
                    <MessageSquareX className="mr-1 size-4!" />
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  )
}
