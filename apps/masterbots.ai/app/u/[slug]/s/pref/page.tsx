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
import { AArrowDown, AArrowUp, Plus, UserRoundX, MessageSquareX } from 'lucide-react'

export default async function PreferencePage() {
  return (
    <div className="max-w-screen-lg pb-10 mx-auto w-full py-[120px] px-[58px]">
      <Accordion type="single" collapsible defaultValue="1">
        <AccordionItem value="1" className="border-none">
          <AccordionTrigger>
            <p className="text-2xl ">General</p>
          </AccordionTrigger>
          <AccordionContent>
            <Card className="bg-transparent border-mirage">
              <CardContent className="px-4 py-8 flex flex-col justify-center items-center gap-y-4 w-full">
                <div className="flex justify-between items-center gap-x-5 px-4 border-b border-mirage pb-5 w-full">
                  <div className="flex flex-col items-start gap-y-0 text-left">
                    <p className="text-lg font-medium">Preferred Language</p>
                    <p className="text-sm font-normal text-[#A1A1AA]">
                      Receive emails about new products, features, and more.
                    </p>
                  </div>
                  <Switch className="data-[state=unchecked]:bg-mirage data-[state=checked]:bg-mirage [&>span[data-state=unchecked]]:bg-[#71717A] [&>span[data-state=checked]]:bg-accent" />
                </div>
                <div className="flex justify-between items-center gap-x-5 px-4 border-b border-mirage pb-5 w-full">
                  <div className="flex flex-col items-start gap-y-0 text-left">
                    <p className="text-lg font-medium">Masterbots theme</p>
                    <p className="text-sm font-normal text-[#A1A1AA]">
                      Change the default theme for the Masterbots site.
                    </p>
                  </div>
                  <Switch className="data-[state=unchecked]:bg-mirage data-[state=checked]:bg-mirage [&>span[data-state=unchecked]]:bg-[#71717A] [&>span[data-state=checked]]:bg-accent" />
                </div>
                <div className="flex justify-between items-center gap-x-5 px-4 w-full">
                  <div className="flex flex-col items-start gap-y-0 text-left">
                    <p className="text-lg font-medium">Default Font Size</p>
                    <p className="text-sm font-normal text-[#A1A1AA]">
                      Change overall font-size website (does not change your
                      browser font-size).
                    </p>
                  </div>
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
                  <div className="flex flex-col items-start gap-y-0 text-left">
                    <p className="text-lg font-medium">Always Web Search</p>
                    <p className="text-sm font-normal text-[#A1A1AA]">
                    Enable web search on every new thread created and on every request by default.
                    </p>
                  </div>
                  <Switch className="data-[state=unchecked]:bg-mirage data-[state=checked]:bg-mirage [&>span[data-state=unchecked]]:bg-[#71717A] [&>span[data-state=checked]]:bg-accent" />
                </div>
                <div className="flex justify-between items-center gap-x-5 px-4 w-full">
                  <div className="flex flex-col items-start gap-y-0 text-left">
                    <p className="text-lg font-medium">Always Pro Mode</p>
                    <p className="text-sm font-normal text-[#A1A1AA]">
                    Enable pro mode on every new thread created and on every request by default.
                    </p>
                  </div>
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
                  <div className="flex flex-col items-start gap-y-0 text-left">
                    <p className="text-lg font-medium">Marketing emails</p>
                    <p className="text-sm font-normal text-[#A1A1AA]">
                    Receive emails about new products, features, and more.
                    </p>
                  </div>
                  <Switch className="data-[state=unchecked]:bg-mirage data-[state=checked]:bg-mirage [&>span[data-state=unchecked]]:bg-[#71717A] [&>span[data-state=checked]]:bg-accent" />
                </div>
                <div className="flex justify-between items-center gap-x-5 px-4 w-full">
                  <div className="flex flex-col items-start gap-y-0 text-left">
                    <p className="text-lg font-medium">Security emails</p>
                    <p className="text-sm font-normal text-[#A1A1AA]">
                    Receive emails about your account security.
                    </p>
                  </div>
                  <Switch defaultChecked className="data-[state=unchecked]:bg-mirage data-[state=checked]:bg-mirage [&>span[data-state=unchecked]]:bg-[#71717A] [&>span[data-state=checked]]:bg-accent" />
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
            <Card className="bg-transparent border-mirage" >
              <CardContent className="px-4 py-8 flex flex-col justify-center items-center gap-y-4 w-full">
                <div className="flex justify-between items-center gap-x-5 px-4 border-b border-mirage pb-5 w-full">
                  <div className="flex flex-col items-start gap-y-0 text-left">
                    <p className="text-lg font-medium">Configure My Threads</p>
                    <p className="text-sm font-normal text-[#A1A1AA]">
                    Enable to give an unique touch to all your chatbots on any domain category!
                    </p>
                  </div>
                  <Switch defaultChecked className="data-[state=unchecked]:bg-mirage data-[state=checked]:bg-mirage [&>span[data-state=unchecked]]:bg-[#71717A] [&>span[data-state=checked]]:bg-accent" />
                </div>
                <div className="flex justify-between items-center gap-x-5 px-8 w-full border-b border-mirage pb-5">
                  <div className="flex flex-col items-start gap-y-0 text-left">
                    <p className="text-lg font-medium">Set new configuration</p>
                    <p className="text-sm font-normal text-[#A1A1AA]">
                    Create a new configuration for tone, style, length and complexity.
                    </p>
                  </div>
                  <Plus className="cursor-pointer" />
                </div>
                <div className="flex justify-between items-center gap-x-5 px-4 border-b border-mirage pb-5 w-full">
                  <div className="flex flex-col items-start gap-y-0 text-left">
                    <p className="text-lg font-medium">Configure My Chatbots</p>
                    <p className="text-sm font-normal text-[#A1A1AA]">
                    Enable to narrow the configuration for your chatbots to give your unique touch.
                    </p>
                  </div>
                  <Switch defaultChecked className="data-[state=unchecked]:bg-mirage data-[state=checked]:bg-mirage [&>span[data-state=unchecked]]:bg-[#71717A] [&>span[data-state=checked]]:bg-accent" />
                </div>
                <div className="flex justify-between items-center gap-x-5 px-8 w-full">
                  <div className="flex flex-col items-start gap-y-0 text-left">
                    <p className="text-lg font-medium">Set new configuration</p>
                    <p className="text-sm font-normal text-[#A1A1AA]">
                    Create a new configuration for tone, style, length and complexity.
                    </p>
                  </div>
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
                  <div className="flex flex-col items-start gap-y-0 text-left">
                    <p className="text-lg font-medium">Delete Your Account</p>
                    <p className="text-sm font-normal text-[#A1A1AA]">
                    Removes all your personal data and all your conversations and threads.
                    </p>
                  </div>
                  <Button className="bg-transparent border border-destructive text-destructive p-2 text-sm min-h-9">
                    <UserRoundX className="mr-1 size-4!" />
                    Delete Account
                  </Button>
                </div>
                <div className="flex justify-between items-center gap-x-5 px-4 w-full">
                  <div className="flex flex-col items-start gap-y-0 text-left">
                    <p className="text-lg font-medium">Delete All My Public Threads</p>
                    <p className="text-sm font-normal text-[#A1A1AA]">
                    Removes all your published threads and all your related content of your public threads.
                    </p>
                  </div>
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
    </div>
  )
}
