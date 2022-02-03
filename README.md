# README

This repo exposes posts through the `PostLoader` class, which loads all posts and their includes in a directory.
The `PostLoader` infers some information and processes some information for convenience; for example:

- SRT files are turned into lists of objects with who is speaking and the time they started
- Outline files are turned into lists of objects with the time the started and the title
- The MP3 url and the post url are inferred

In addition, a list of tags are computed for the posts and posts can be searched by tag.

There are also convenience functions exposed for working with durations, including `toDuration`, `toDurationString`, and `sortDuration`.

## Setup

### Install

```bash
$ npm install @sta-podcast/post-loader
```

### For Local Development

Clone this repo then run

```bash
npm ci # clean install
npm run prepare # setup Git Hooks
```
