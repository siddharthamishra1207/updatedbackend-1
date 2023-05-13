import React from 'react'
import { JitsiMeeting } from '@jitsi/react-sdk';
const Meet = () => {
    return (
        <div>
            <JitsiMeeting
                roomName={'nothin'} getIFrameRef={node => { node.style.height = '800px'; node.style.width = '1600px' }} />
        </div>
    )
}

export default Meet