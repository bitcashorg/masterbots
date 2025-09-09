import type { WordwareFlow } from '@/types/wordware-flows.types'

export const wordwareFlows: WordwareFlow[] = [
	{
		id: '615f392b-5832-4948-87c5-2d8c32e32360',
		type: 'prompt',
		path: 'GenerateBlogArticle',
	},
	{
		id: 'f6ec7e3f-f707-49f2-8e01-2c1c075d3003',
		type: 'tool',
		path: 'SetBlogImages',
	},
	{
		id: '7044bf09-bf9e-430a-aa3b-c1cc69bdc3ef',
		type: 'generation',
		path: 'SetBlogSections',
	},
	{
		id: '82bc35f0-1542-4cf0-839b-06e622254417',
		type: 'generation',
		path: 'SetBlogOutlines',
	},
	{
		// id: '0ed65573-b939-40c4-b078-240d01fc19bf', // prompt_id
		id: 'c290c3dd-12d7-4fd2-9e03-1608bb9f7c84', // run_id
		type: 'prompt',
		path: 'webSearch',
	},
] as const
