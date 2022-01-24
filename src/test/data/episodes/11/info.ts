import EpisodeYamlData from "../../../../types/EpisodeYamlData"

const title = 'Commercial-grade Autonomous Mowers, Safety, and Dogfooding'
const description = `
In this episode, Audrow Nash speaks to Charles Brian Quinn (aka, CBQ), CEO and a Co-Founder of Greenzie.
Greenzie make an autonomous driving system for commercial lawn mowers.
We talk about Greenzie's autonomous mowing system, how Greenzie has worked with manufacturers to up-fit their system into comercial mowers, how Greenzie does dog-fooding, safety and standards, and about CBQ's experiences bootstrapping and with venture capital.
`.replace(/\n/g, ' ')

const ep: EpisodeYamlData = {
  guests: 'CBQ',
  title,
  description,
  excerpt: "CBQ is the CEO and a Co-Founder of Greenzie.",
  duration: {
    hours: 1,
    minutes: 51,
    seconds: 46,
  },
  tags: ['startup', 'software', 'sensor fusion', 'autonomous driving', 'mowers', 'safety', 'dogfooding'],
  links: [
    {
      name: "CBQ's website",
      url: "https://www.seebq.com/",
    },
    {
      name: "Greenzie's website",
      url: "https://www.greenzie.com/",
    },
    {
      name: "Greenzie's YouTube channel",
      url: "https://www.youtube.com/c/Greenzie",
    },
  ],
  publishDate: new Date(2021, 1, 11),
  youtube: {
    mainInterview: {
      baseTitle: title,
      videoId: "pBWLSmoBj54",
    },
    clips: [
      {
        baseTitle: "Does it Detect Sprinkler Heads?",
        videoId: "ahUd_2Uydps"
      },
      {
        baseTitle: "Making Perfect Turns",
        videoId: "odAvY-ojVAA",
      },
      {
        baseTitle: "Seasonal Workers",
        videoId: "6CfAz0z07I4",
      },
      {
        baseTitle: "Leap of Faith",
        videoId: "8oVBa43dQGw",
      },
      {
        baseTitle: "Differences Between Kids and Poles",
        videoId: "HrraVxtyxok"
      },
    ],
  }
}

export default ep;