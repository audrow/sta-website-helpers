# RECORD

This will be a document where I record some thoughts on this project.

- [2022-01-27: Added Several Tools for QoL](#2022-01-27-added-several-tools-for-qol)
- [2022-01-26: Updating How Episodes are Obtained](#2022-01-26-updating-how-episodes-are-obtained)
- [2022-01-25: Use Episode Numbers Rather than Slugs](#2022-01-25-use-episode-numbers-rather-than-slugs)
- [2022-01-22: Storing Large Files](#2022-01-22-storing-large-files)

## 2022-01-27: Added Several Tools for QoL

I added or updated several static tests after watching the Static Analysis Testing section of the [Testing Javascript course](https://testingjavascript.com/), including

- Prettier for code formatting
- ESLint for linting
- Husky for precommit hooks
- `lint-staged` for automatically formatting and performing simple linting the staged files

I also setup testing to work with Typescript directly, reorganized my `package.json` scripts, and updated the README.

My next steps are as follows:

- (Possible) Clean up the build process.
- Refactor the episodes API: separate out utils and core logic.
- Update the episodes API to be a posts API, since I may have posts that are not episodes, and use memoization in getting the posts content. This will make it possible to search for posts by slug, while having custom slugs.

## 2022-01-26: Updating How Episodes are Obtained

The slug of an episode is a computed property, usually it uses the guests, but sometimes it is a custom slug.
One challenge is that I want to get a post from the slug.
I think that the best way to do this is memoization.
I should compute and sort all of the posts and then store those posts in a data structure.
From there, I can use the data structure to conveniently access fields of the posts.

## 2022-01-25: Use Episode Numbers Rather than Slugs

Rather than copying NextJS's blog example, I should use episode numbers to get the episode data, not slugs.
The slug is unimportant and is generated from the episode data.
Episode numbers are fixed and this information is given by the folder.
This will be a better and easier way to keep track of things.
The slug can be a derived property.
I will want to get all of the slugs, but I can do this from all of the episode numbers.

## 2022-01-22: Storing Large Files

I think that I should not store episode MP3s and MP4s in the STA website repository.
Doing so would bloat the repository, making clone times much slower.
It is also not the case that we want to use them here other than to extract some meta data from them.
I am thus proposing the following:

- Put MP3 files in the STA website repository initially
- If this program sees them, have it upload them to their desired locations, filling in the required data
- Once the upload is complete, they are safe to ignore or delete

This gives a few benefits.

1. I have the option to get meta data from the files, if I can figure out how to store it
2. I don't bloat the repository
3. I can take advantage of upload scripts

Alternatively, these files never need to go into the repository at all.
Probably better is to have a tool that just exports them appropriately.
This tool could also return the desired metadata:

- Video
  - The YouTube video ID for the main interview and clips
- Audio
  - The audio length of the interview
  - The file size of the interview
  - The URL of the MP3

The YouTube video needs a cover image.
The cover image isn't used anywhere else in this pipeline, except for manually being put into wordpress and twitter posts.

Perhaps I can have the following podcast organization:

- SSD
  - FCP library with episodes
  - Cover image
  - Exports: MP3 and MP4
- STA Website Repo
  - Episode
    - YAML description
      - Audio and video information
      - Episode description and links
    - Transcript SRT file
    - Outline text file
  - YAML podcast description

That seems okay to me.

In summary,

- Don't upload the MP3, MP4, or cover art to the STA website repo - store it on my SSD
- Store the podcast and episode description files with the STA website repo
- Make scripts to upload the MP3 and MP4 files and, optionally, conveniently get the needed meta data
