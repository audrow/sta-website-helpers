# README

This repo exposes posts through the `PostLoader` class, which loads all posts and their includes in a directory.
Post data can be formatted in Typescript (and will be dynamically imported, which may not work in all settings) or YAML.
Note that posts need to match the types in `PostFileData`, and the `getPost` method returns a `Post` or `SerializedPost` object, which has additional data inferred; for example:

- SRT files are turned into lists of objects with who is speaking and the time they started
- Outline files are turned into lists of objects with the time the started and the title
- The MP3 url and the post url are inferred

In addition, a list of tags are computed for the posts and posts can be searched by tag.

A convenient way to get an initialized `PostLoader` is to use the `createPostLoader` function that is the default export.

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
