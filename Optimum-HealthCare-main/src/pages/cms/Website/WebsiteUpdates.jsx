import React from 'react'
import Website from './Website'
import Gallery from '../Gallery'

const WebsiteUpdates = () => {
  return (
    <div className='flex gap-4 p-2'>
        <div>
            <Website/>
           
        </div>
        <div className='w-full'>
        <Gallery/>
        </div>
    </div>
  )
}

export default WebsiteUpdates