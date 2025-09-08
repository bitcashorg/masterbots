import type { WorkspaceContextType } from '@/lib/hooks/use-workspace'

export const workspaceDocTemplates: WorkspaceContextType['templates'] = {
	text: {
		blank: {
			name: 'Blank Document',
			content: (name: string, project: string) =>
				`# ${name}\nThis is a new text document for ${project}.\n\n## Overview\nDocument overview and purpose.\n\n## Details\nDetailed content goes here.\n\n## Conclusion\nSummary and next steps.\n`,
		},
		'marketing-sales': {
			name: 'Marketing Sales',
			content: (name: string, project: string) => `# Sales Plan: ${name}

**Project:** ${project}

## 1. Executive Summary
A brief overview of the sales plan, including key goals, target markets, and expected outcomes.

## 2. Target Audience
- **Primary Persona:** 
- **Secondary Persona:** 

## 3. Sales Goals & KPIs
- **Revenue Target:** 
- **New Customers:** 
- **Key Performance Indicators (KPIs):** Conversion Rate, Average Deal Size, Sales Cycle Length.

## 4. Strategies & Tactics
- **Inbound:** Content Marketing, SEO, Social Media.
- **Outbound:** Cold Emailing, Networking, Events.

## 5. Budget
- **Marketing Spend:** 
- **Sales Team Costs:** 
- **Tools & Software:** 

## 6. Timeline
- **Q1:** 
- **Q2:** 
- **Q3:** 
- **Q4:** 
`,
		},
		'marketing-social': {
			name: 'Marketing Social Content',
			content: (
				name: string,
				project: string,
			) => `# Social Media Content Plan: ${name}

**Project:** ${project}

## Campaign Goals
- **Primary Goal:** 
- **Secondary Goal:** 

## Target Platforms
- [ ] Facebook
- [ ] Instagram
- [ ] Twitter (X)
- [ ] LinkedIn
- [ ] TikTok

## Content Pillars
1.  **Pillar 1 (e.g., Educational):** 
2.  **Pillar 2 (e.g., Behind-the-Scenes):** 
3.  **Pillar 3 (e.g., User-Generated Content):** 

## Content Calendar
| Date | Platform | Post Type (Image/Video/Text) | Caption | Hashtags | Status |
|------|----------|------------------------------|---------|----------|--------|
|      |          |                              |         |          | Draft  |
`,
		},
		pdr: {
			name: 'PDR',
			content: (
				name: string,
				project: string,
			) => `# Personal Development Review: ${name}

**Project/Team:** ${project}

## 1. Review Period
- **From:** 
- **To:** 

## 2. Self-Assessment
### Achievements
- 
### Areas for Improvement
- 

## 3. Goals for Next Period
### Professional Goals
1.  **Goal:** 
    - **Action Steps:** 
    - **Success Metric:** 
### Personal Development Goals
1.  **Goal:** 
    - **Action Steps:** 
    - **Success Metric:** 

## 4. Feedback
### Feedback from Manager
- 
### Feedback from Peers
- 

## 5. Required Support
- **Training, Mentorship, Resources:** 
`,
		},
		'planning-todo': {
			name: 'Planning/TODO',
			content: (
				name: string,
				project: string,
			) => `# Project Plan & TODOs: ${name}

**Project:** ${project}

## 1. Project Goals
- **Primary Objective:** 
- **Key Results:** 

## 2. Milestones
- **Milestone 1:** (Due: YYYY-MM-DD)
- **Milestone 2:** (Due: YYYY-MM-DD)

## 3. Task List
### To Do
- [ ] Task 1
- [ ] Task 2

### In Progress
- [ ] Task 3 (Owner: @name)

### Done
- [x] Task 4
`,
		},
	},
	image: {
		blank: {
			name: 'Blank Image Board',
			content: (name: string, project: string) =>
				`# ${name}\nVisual assets and images for ${project}.\n\n## Image Collection\nCollection of images related to this document.\n\n## Design Assets\nBrand and design materials.\n\n## Reference Materials\nReference images and inspiration.\n`,
		},
	},
	spreadsheet: {
		blank: {
			name: 'Blank Spreadsheet',
			content: (name: string, project: string) =>
				`# ${name}\nData and analysis for ${project}.\n\n## Data Overview\nSummary of data sources and structure.\n\n## Key Metrics\nImportant measurements and KPIs.\n\n## Analysis\nData analysis and insights.\n`,
		},
	},
}
