'use server'

import { Dub } from 'dub'

const dub = new Dub({
  projectSlug: 'bitcash'
})

export async function shorten(_prevState: any, formData: any) {
  try {
    const url = formData.get('url')
    // Validate form data
    if (!url || typeof url !== 'string') {
      return {
        shortLink: 'Invalid URL'
      }
    }

    const resp = await dub.links.create({
      url,
      domain: 'mbots.to'
    })

    console.log('🤌🏻 dub response', resp)
    return {
      shortLink: ''
    }
  } catch (error) {
    console.log('ERROR', error)

    return {
      shortLink: 'Invalid data provided'
    }
  }
}
