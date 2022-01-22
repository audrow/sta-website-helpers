TODO
====

- [x] Setup Mergify and Dependabot
- [x] Try locally installing this package and using it
- [x] Plan what I want this to do
- [x] Establish types for podcast episode and podcast config
- [ ] Get information necessary for generating posts and RSS feed
  - [ ] Parse podcast YAML files
  - [ ] Infer mp3 size from URL
  - [ ] Check uniqueness of post slugs
  - [ ] Check that episode title meets certain constraints (not over 100 chars)
  - [ ] Markup the transcript from SRT to HTML
  - [ ] Include the timing outline
- [ ] Access episodes and their fields
  - [ ] `getEpisodeSlugs(): string[]`
  - [ ] `getEpisodeBySlug(slug: string, fields: string[])`
  - [ ] `getAllEpisodes(fields: string[])`
- [ ] Upload and title correctly the mp3
- [ ] Generate content from episode data
  - [ ] RSS feed
    - [ ] Uses CDATA for richer descriptions
  - [ ] Robohub post
  - [ ] YouTube video description
- [ ] Tag support
  - [ ] `getEpisodeTags()`
  - [ ] `getEpisodesWithTags(tags: string[])`

Consider
--------
- [ ] Create a tool to upload the MP3 (hosting site) and MP4 (Youtube with cover image)
  - [ ] Figure out a way to read MP3 size
  - [ ] Infer MP3 duration
  - [ ] Get the address it's stored on the hosting site
  - [ ] Get the YouTube video ID
- [ ] Automatically Tweet when a new episode is published
