import getOutline from '../get-outline'

const outlineTxt = `0:00:00 - Start
0:01:50 - Introducing Brett and SMACC
0:18:58 - Events in State Machines
0:21:01 - Clients and Client Behaviors
0:23:30 - State reactors
0:29:54 - Explaining dance bot + hierarchy in states
0:35:14 - Recovery states
0:38:07 - Origins of SMACC
0:56:47 - SMACC and market pull
1:05:31 - Robotics domains using SMACC
1:08:03 - A problem to push the limits of SMACC
1:12:50 - Making ROS packages smaller
1:18:17 - SMACC for industry users
1:22:23 - Making SMACC easy to use?
1:27:42 - Control in many robotics applications
1:31:16 - Comparing state machines to behavior trees
1:44:40 - Future of SMACC
1:47:01 - Advice for those starting out in robotics
1:50:16 - Links and getting involved`

describe('getOutline', () => {
  it('should return the correct outline', () => {
    expect(getOutline(outlineTxt)).toMatchSnapshot()
  })
})
