import srtParser2 from 'srt-parser-2'
import {toDuration} from './utils'

import type Transcript from './__types__/Transcript'
import type TranscriptEntry from './__types__/TranscriptEntry'

const srtText = `1
00:00:02,700 --> 00:00:04,860
Audrow Nash: This is a
conversation with Brett Aldrich

2
00:00:04,890 --> 00:00:09,330
who is the CEO of a Robosoft AI.
Robosoft AI develops and

3
00:00:09,330 --> 00:00:12,750
maintains SMAC, which is a
library that aims to make it

4
00:00:12,780 --> 00:00:17,370
easier for roboticists to
control robot behavior. One of

5
00:00:17,370 --> 00:00:21,360
the key ideas in SMAC is that a
finite state machines, we'll be

6
00:00:21,360 --> 00:00:23,880
referring to finite state
machines a lot in this

7
00:00:23,880 --> 00:00:27,210
interview, so I'll explain what
they are. Before we start.

8
00:00:27,870 --> 00:00:32,430
Imagine that you have a lawn
mowing robot. Imagine that that

9
00:00:32,430 --> 00:00:35,160
robot is powered off, and that
you turn it on by pushing a

10
00:00:35,160 --> 00:00:40,590
button, it boots up and drives
to a field to mow. When it gets

11
00:00:40,590 --> 00:00:45,000
to the field, it starts mowing.
Once it finishes mowing, it

12
00:00:45,000 --> 00:00:50,550
drives home and powers off. This
robot has states like powered

13
00:00:50,550 --> 00:00:56,130
off, booting up driving, and
mowing. The robot also has

14
00:00:56,130 --> 00:01:01,170
transitions that occur on
events, such as when the robot

15
00:01:01,170 --> 00:01:05,340
is turned on by you pressing the
power button, or the robot

16
00:01:05,370 --> 00:01:10,980
arrives at the grass to mow
these transitions change the

17
00:01:10,980 --> 00:01:15,150
robot from one state to another.
For example, the event of

18
00:01:15,150 --> 00:01:18,690
arriving at the field to mow
could transition the robot from

19
00:01:18,690 --> 00:01:24,270
the state of driving to mowing.
So summarizing, a finite state

20
00:01:24,270 --> 00:01:30,300
machine is something made up of
states like driving, and mowing,

21
00:01:30,930 --> 00:01:36,180
and transitions when the robot
has reached the destination, or

22
00:01:36,210 --> 00:01:40,110
when it has finished mowing.
This is the sense think act

23
00:01:40,110 --> 00:01:44,100
Podcast. I'm Audrow Nash. Thank
you to our founding sponsor open

24
00:01:44,100 --> 00:01:48,660
robotics. And now here's my
conversation with Brett Aldrich.

25
00:01:50,670 --> 00:01:51,930
Would you introduce yourself?

26
00:01:52,800 --> 00:01:54,420
Brett Aldrich: My name is Brett
Aldrich, and I'm the author of

27
00:01:54,420 --> 00:01:57,720
Smak. State Machine library for
robotic applications written in

28
00:01:57,720 --> 00:02:02,190
C Plus Plus, I'm also the
founder of robust soft AI. Robot

29
00:02:02,190 --> 00:02:05,250
soft. We're the keepers of the
smack tool chain. We're also the

30
00:02:05,250 --> 00:02:08,490
creators of the smack to runtime
analyzer. A graphical

31
00:02:08,490 --> 00:02:10,980
application lets you visualize
your state machines both

32
00:02:10,980 --> 00:02:12,240
statically and at runtime.

33
00:02:13,020 --> 00:02:16,680
Audrow Nash: Hmm. And what so
can you start at a high level

34
00:02:16,680 --> 00:02:20,640
and explain what SMAC is, and
then what its motivation is?

35
00:02:21,030 --> 00:02:21,690
Sure.

36
00:02:22,110 --> 00:02:25,110
Brett Aldrich: SMACC is a state
machine library for robotic

37
00:02:25,110 --> 00:02:32,220
applications. I'd like to
describe it as dealing with the

38
00:02:32,340 --> 00:02:37,050
highest level of task planning
and management on a robotic

39
00:02:37,050 --> 00:02:42,390
system. It has many unique
features. And.
`

function getTranscript(srtText: string): Transcript {
  const parser = new srtParser2()
  const srt = parser
    .fromSrt(srtText)
    .map((s) => ({...s, text: s.text.replace(/\n/g, ' ')}))

  const dialog: Transcript = []
  for (const s of srt) {
    const match = s.text.match(/((?:(?:[A-Z][a-z]+)\s?)+): (.+)$/)
    if (match) {
      const entry: TranscriptEntry = {
        timeStamp: toDuration(s.startTime),
        speaker: match[1],
        text: match[2],
      }
      dialog.push(entry)
    } else {
      dialog.slice(-1)[0].text += ' ' + s.text
    }
  }
  return dialog
}

export default getTranscript

console.log(getTranscript(srtText))
