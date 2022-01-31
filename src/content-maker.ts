import {Podcast} from 'podcast'
import {memoize} from 'decko'
import urlJoin from 'proper-url-join'

import type {FeedOptions, ItemOptions} from 'podcast'

import PostLoader from './post-loader'

import type Link from './__types__/Link'
import type PodcastConfig from './__types__/PodcastConfig'
import Duration from './__types__/Duration'

export type YoutubePost = {
  videoId: string
  title: string
  description: string
  coverArtPath?: string
}

export type WordpressPost = {
  title: string
  postBody: string
  tags: string[]
  coverArtPath?: string
}

export type StaWebsitePost = {
  title: string
  videoId: string
  tags: string[]
  postBody: string
  transcript: string
}

class ContentMaker {
  postLoader: PostLoader
  podcastConfig: PodcastConfig

  constructor(postLoader: PostLoader, podcastConfig: PodcastConfig) {
    this.postLoader = postLoader
    this.podcastConfig = podcastConfig
  }

  async init(postsDirectory: string) {
    await this.postLoader.init(postsDirectory)
  }

  @memoize
  getRssFeed() {
    // Validated with
    // https://validator.w3.org/feed/

    const feedOptions: FeedOptions = {
      title: this.podcastConfig.name,
      description: this.podcastConfig.description,
      feedUrl: this.podcastConfig.itunes.feedUrl,
      siteUrl: this.podcastConfig.siteUrl,
      imageUrl: this.podcastConfig.itunes.image,
      managingEditor: this.podcastConfig.owner.email,
      webMaster: this.podcastConfig.owner.email,
      copyright: this.podcastConfig.copyright,
      language: this.podcastConfig.itunes.language,
      categories: this.podcastConfig.itunes.categories,
      itunesAuthor: this.podcastConfig.owner.name,
      itunesSubtitle: this.podcastConfig.tagline,
      itunesSummary: this.podcastConfig.description,
      itunesOwner: this.podcastConfig.owner,
      itunesExplicit: this.podcastConfig.itunes.isExplicit,
      itunesCategory: this.podcastConfig.itunes.categories.map((category) => ({
        text: category,
      })),
      itunesImage: this.podcastConfig.itunes.image,
      itunesType: this.podcastConfig.itunes.type,
    }

    const podcast = new Podcast(feedOptions)

    for (const post of this.postLoader.getPosts()) {
      const description = getDescriptionWithLinks({
        description: post.description,
        episodeLinks: post.links || [],
        podcastLinks: this.podcastConfig.links.podcast,
        socialLinks: this.podcastConfig.links.social,
        outline: post.includes?.outlineTxt,
      })
      const itemOptions: ItemOptions = {
        title: post.title,
        description: post.description,
        url: urlJoin(this.podcastConfig.siteUrl, 'episodes', post.slug),
        date: post.publishDate,
        enclosure: {
          url: post.mp3.url,
          size: post.mp3.sizeBytes,
          type: 'audio/mpeg',
        },
        itunesAuthor: this.podcastConfig.owner.name,
        itunesExplicit: this.podcastConfig.itunes.isExplicit,
        itunesSummary: description,
        itunesImage: this.podcastConfig.itunes.image,
        itunesDuration: durationToString(post.duration),
      }
      podcast.addItem(itemOptions)
    }
    return podcast
      .buildXml()
      .replace(
        /<itunes:explicit>false<\/itunes:explicit>/g,
        '<itunes:explicit>no</itunes:explicit>',
      )
      .replace(
        /<itunes:explicit>true<\/itunes:explicit>/g,
        '<itunes:explicit>yes</itunes:explicit>',
      )
  }

  getMainYoutubePost() {
    // TODO
  }

  getClipsYouTubePosts() {
    // TODO
  }

  getWordpressPosts() {
    // TODO
  }
}

function getDescriptionWithLinks(args: {
  description: string
  episodeLinks: Link[]
  podcastLinks: Link[]
  outline?: string
  socialLinks: Link[]
}) {
  const text = `${args.description}

EPISODE LINKS:
${getLinksHtml(args.episodeLinks)}

PODCAST INFO:
${getLinksHtml(args.podcastLinks)}

OUTLINE:
${args.outline}

SOCIAL:
${getLinksHtml(args.socialLinks)}
`
  return text
    .replace(/\n/g, '<br/>')
    .replace(/-/g, '&#8211;')
    .replace(/'/g, '&#8217;')
}

function getLinksHtml(links: Link[]) {
  return links
    .map((link) => `- ${link.name}: <a href="${link.url}">${link.url}</a>`)
    .join('\n')
}

function durationToString(duration: Duration) {
  const twoDigitString = (n: number) => ('00' + n).slice(-2)
  const hours = twoDigitString(duration.hours)
  const minutes = twoDigitString(duration.minutes)
  const seconds = twoDigitString(duration.seconds)
  return `${hours}:${minutes}:${seconds}`
}

export default ContentMaker

// import { join } from 'path'
// import podcastConfig from './__tests__/data/podcast.config'
// import fs from 'fs'

// async function main() {
//   const pl = new PostLoader(podcastConfig)

//   const dir = join(__dirname, '__tests__', 'data', 'posts')

//   const cm = new ContentMaker(pl, podcastConfig)
//   await cm.init(dir)
//   const rss = cm.getRssFeed()
//   console.log(rss)
//   // fs.writeFileSync('rss.xml', rss)
// }

// main()
