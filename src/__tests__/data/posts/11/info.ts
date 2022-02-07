import PostFileData from '../../../../__types__/PostFileData'
import dayjs from 'dayjs'

const description = `
In this episode, Audrow Nash speaks to Charles Brian Quinn (aka, CBQ), CEO and a Co-Founder of Greenzie.
Greenzie make an autonomous driving system for commercial lawn mowers.
We talk about Greenzie's autonomous mowing system, how Greenzie has worked with manufacturers to up-fit their system into comercial mowers, how Greenzie does dog-fooding, safety and standards, and about CBQ's experiences bootstrapping and with venture capital.
`
  .replace(/\n/g, ' ')
  .trim()

const post: PostFileData = {
  guests: 'CBQ',
  title: 'Commercial-grade Autonomous Mowers, Safety, and Dogfooding',
  description,
  excerpt: 'CBQ is the CEO and a Co-Founder of Greenzie.',
  duration: {
    hours: 1,
    minutes: 51,
    seconds: 46,
  },
  tags: [
    'startup',
    'software',
    'sensor fusion',
    'autonomous driving',
    'mowers',
    'safety',
    'dogfooding',
  ],
  links: [
    {
      name: "CBQ's website",
      url: 'https://www.seebq.com/',
    },
    {
      name: "Greenzie's website",
      url: 'https://www.greenzie.com/',
    },
    {
      name: "Greenzie's YouTube channel",
      url: 'https://www.youtube.com/c/Greenzie',
    },
  ],
  mp3SizeBytes: 225870038,
  publishDate: dayjs('2022-01-11'),
  youtube: {
    mainContentId: 'pBWLSmoBj54',
    clips: [
      {
        title: 'Does it Detect Sprinkler Heads?',
        videoId: 'ahUd_2Uydps',
      },
      {
        title: 'Making Perfect Turns',
        videoId: 'odAvY-ojVAA',
      },
      {
        title: 'Seasonal Workers',
        videoId: '6CfAz0z07I4',
      },
      {
        title: 'Leap of Faith',
        videoId: '8oVBa43dQGw',
      },
      {
        title: 'Differences Between Kids and Poles',
        videoId: 'HrraVxtyxok',
      },
    ],
  },
}

export default post
