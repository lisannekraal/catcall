import React from 'react'
import { Player } from '@lottiefiles/react-lottie-player';

function Loading() {
  return (
    <div data-testid="page-not-found" className="not-found-container">
      <div className="header-footer"></div>
      <div data-testid="page-not-found" className="not-found">
        <h1>Loading</h1>
        <Player
          autoplay
          loop
          src="https://assets8.lottiefiles.com/packages/lf20_vndsLD.json"
          style={{ height: '300px', width: '300px' }}
        >
        </Player>
      </div>
      <div className="header-footer"></div>
    </div>
  )
}

export default Loading
