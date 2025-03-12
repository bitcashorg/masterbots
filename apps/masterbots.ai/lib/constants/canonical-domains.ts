const canonicalPathnames = [
  '/healthcare/natural-health/healthbot',
  '/healthcare/holistic-health/holistibot',
  '/healthcare/nutrition/dietdocbot',
  '/healthcare/fitness-training/gymgenie',
  '/money/investment/moneybot',
  '/money/wealth-management/wealthwizbot',
  '/money/financial-wellness/debtzero',
  '/money/financial-planning/budgetbot',
  '/technology/computing/techbot', // updated from /technology/cybersecurity/techbot
  '/technology/software-development-architecture/codeguru',
  '/technology/technology-trends/techpulsebot',
  '/education/academic-productivity/edubot', // updated from /education/education/edubot
  '/education/academic-productivity/studyprobot',
  '/education/language-learning/lingobot',
  '/career/job-markets/jobbot',
  '/career/cover-letter-crafting/resumebot',
  '/career/interview-preparation/preptalkbot',
  '/career/career-exploration/skillsyncbot',
  '/science/science-research/scibot',
  '/science/biology/biobuddybot',
  '/science/chemistry/chemwizbot',
  '/science/robotics/buildbot', // updated from /science/electrical-engineering/buildbot
  '/travel/leisure/travelbot',
  '/travel/adventure-travel/wanderbot', // updated from /travel/travel/wanderbot
  '/travel/outdoor-activities/thrillbot',
  '/entertainment/media/mediabot', // updated from /entertainment/entertainment/mediabot
  '/entertainment/cinema/flickfinderbot',
  '/entertainment/music-curation/tunetailor',
  '/home/lifestyle/homebot',
  '/home/home-improvement/handybot',
  '/home/interior-design/decorbot',
  '/legal/bankruptcy-law/bankruptcybot',
  '/legal/legal-services/commonlawbot',
  '/legal/judicial-accountability/trusteecheckbot',
  '/legal/legal-regulations/lawbot',
  '/legal/startup-law/venturelawbot',
  '/legal/employment-law/workrightsbot',
  '/legal/consumer-rights-protection/consumerchampbot',
  '/legal/contract-law/contractbot',
  '/relationships/conflict-resolution/harmonybot',
  '/relationships/parenting/parentingbot', // updated from /relationships/child-development/parentingbot
  '/relationships/social-skills/socialqbot',
  '/sports/exercise/fitformbot',
  '/sports/sports-nutrition/fuelupbot',
  '/sports/sports-analytics/gamevisionbot',
  '/hobbies/diy-crafts/craftmasterbot',
  '/hobbies/music-education/musictutorbot',
  '/hobbies/photography/snapshotbot',
  '/startups/business-strategy/ideabot',
  '/startups/startup-financing/fundfinderbot',
  '/startups/startup-growth/blitzscalebot',
  '/startups/market-analysis/marketbot',
  '/environment/sustainable-living/greenbot',
  '/environment/wildlife-conservation/wildlifebot',
  '/environment/renewable-energy/renewabot',
  '/environment/sustainable-consumer-choices/ecochoicebot',
  '/environment/sustainable-mobility/greenriderbot',
  '/history/civilization-studies/histobot', // updated from /history/history/histobot
  '/history/civilization-studies/civbot',
  '/history/archaeology/archaeobot',
  '/history/cultural-anthropology/culturebot',
  '/philosophy/ethics/philosobot', // updated from /philosophy/philosophy/philosobot
  '/philosophy/ethics/ethicsbot',
  '/philosophy/existentialism/existentibot',
  '/philosophy/technology-ethics/techethicsbot',
  '/philosophy/biblical-studies/biblebot',
  '/real-estate/market-analysis/marketpulsebot', // updated from /real-state/market-analysis/marketpulsebot
  '/real-state/real-estate-investment/investsmartbot',
  '/real-state/home-buying-selling/homeguidebot',
  '/real-state/rental-management/rentwisebot',
  '/real-state/home-construction-design/homebuilderbot',
  '/auto/automotive-maintenance/mechanibot',
  '/auto/automotive-technology/autotechbot',
  '/auto/public-transportation/transitbot',
  '/fashion/style/stylebot', // updated from /fashion/fashion/stylebot
  '/fashion/makeup/glambot',
  '/fashion/skincare/glowbot',
  '/fashion/sustainable-fashion/ecofashionbot',
];

export const canonicalChatbotDomains = canonicalPathnames.map((pathname) => {
  // Split by "/" and filter out empty strings (as the string starts with a slash)
  const parts = pathname.split('/').filter(Boolean)
  const [topic, domain, chatbot] = parts
  return { name: chatbot, value: `${topic}/${domain}` } as const
})
