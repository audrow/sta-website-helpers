import Link from './Link'

type PodcastConfig = {
  name: string
  tagline: string
  description: string
  copyright: string
  github: {
    organization: string
    repository: string
  }
  owner: {
    name: string
    email: string
  }
  hosting: {
    baseMp3Url: string
  }
  itunes: {
    feedFile: string
    feedUrl: string
    categories: string[]
    isExplicit: boolean
    type: 'episodic' | 'serial'
    image: string
    language: string
  }
  siteUrl: string
  links: {
    podcast: Link[]
    social: Link[]
  }
}

export default PodcastConfig
