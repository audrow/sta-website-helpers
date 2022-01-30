import PostLoader from '../post-loader'
import {join} from 'path'
import podcast from './data/podcast.config'

describe('PostLoader init', () => {
  {
    const dataDirectory = join(__dirname, 'data', 'posts')
    it('loads all the posts with debug', async () => {
      const ph = new PostLoader(podcast, {
        isDebug: true,
        isNewestPostFirst: true,
      })
      await ph.init(dataDirectory)

      expect(ph.getPosts().length).toBe(4)
      const slugs = ph.getSlugs()
      expect(slugs.length).toBe(4)
      expect(slugs).toEqual([
        '99-future-post',
        '11-cbq',
        '10-brett-aldrich',
        '0-welcome',
      ])
    })

    it('loads all the posts in reverse order with debug', async () => {
      const ph = new PostLoader(podcast, {
        isDebug: true,
        isNewestPostFirst: false,
      })
      await ph.init(dataDirectory)

      expect(ph.getPosts().length).toBe(4)
      const slugs = ph.getSlugs()
      expect(slugs.length).toBe(4)
      expect(slugs).toEqual([
        '0-welcome',
        '10-brett-aldrich',
        '11-cbq',
        '99-future-post',
      ])
    })

    it('loads past posts without debug', async () => {
      const ph = new PostLoader(podcast, {
        isDebug: false,
        isNewestPostFirst: true,
      })
      await ph.init(dataDirectory)

      expect(ph.getPosts().length).toBe(3)
      const slugs = ph.getSlugs()
      expect(slugs.length).toBe(3)
      expect(slugs).toEqual(['11-cbq', '10-brett-aldrich', '0-welcome'])
    })

    it('creates a tag list', async () => {
      const ph = new PostLoader(podcast, {
        isDebug: false,
        isNewestPostFirst: true,
      })
      await ph.init(dataDirectory)

      expect(ph.getTags()).toMatchSnapshot()
      const slugs = ph.getSlugsByTag('startup')
      const expectedSlugs = ['11-cbq', '10-brett-aldrich']
      expect(slugs).toEqual(expect.arrayContaining(expectedSlugs))
      const posts = ph.getPosts(slugs)
      expect(posts.map((p) => p.slug)).toEqual(expectedSlugs)
    })

    it('throws when you miss init', async () => {
      const ph = new PostLoader(podcast, {
        isDebug: true,
        isNewestPostFirst: true,
      })
      expect(() => ph.getSlugs()).toThrowError()
      expect(() => ph.getPosts()).toThrowError()
      expect(() => ph.getPostBySlug('0-welcome')).toThrowError()
      await ph.init(dataDirectory)
      expect(() => ph.getSlugs()).not.toThrowError()
      expect(() => ph.getPosts()).not.toThrowError()
      expect(() => ph.getPostBySlug('0-welcome')).not.toThrowError()
    })
  }

  {
    const dataDirectory = join(__dirname, 'data', 'duplicate-slugs')
    it('throws an error when there are duplicate slugs', async () => {
      const ph = new PostLoader(podcast, {
        isDebug: true,
        isNewestPostFirst: true,
      })
      expect(ph.init(dataDirectory)).rejects.toThrowError()
    })
  }
})

describe('PostLoader getPostBySlug', () => {
  const dataDirectory = join(__dirname, 'data', 'posts')
  it('gets a post with a number by slug', async () => {
    const ph = new PostLoader(podcast, {
      isDebug: false,
      isNewestPostFirst: true,
    })
    await ph.init(dataDirectory)
    const post = ph.getPostBySlug('11-cbq')
    expect(post.slug).toBe('11-cbq')
    expect(post).toMatchSnapshot()
  })
  it('gets a post with a custom slug by slug', async () => {
    const ph = new PostLoader(podcast, {
      isDebug: false,
      isNewestPostFirst: true,
    })
    await ph.init(dataDirectory)
    const post = ph.getPostBySlug('0-welcome')
    expect(post.slug).toBe('0-welcome')
    expect(post).toMatchSnapshot()
  })
  it('throws an error when there is no matching slug', async () => {
    const ph = new PostLoader(podcast, {
      isDebug: false,
      isNewestPostFirst: true,
    })
    await ph.init(dataDirectory)
    expect(() => ph.getPostBySlug('not-a-slug')).toThrowError()
  })
})
