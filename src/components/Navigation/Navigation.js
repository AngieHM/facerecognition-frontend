import React from 'react'

const Navigation = ({onRouteChange, isSignedIn}) => {
  if(isSignedIn) {
    return (
      <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
        <p
          onClick={()=>onRouteChange('signin')}
          className="f3 link black dim pa3 underline pointer">
            Sign out</p>
      </nav>
    )
  }
  else {
    return (
      <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
        <p
          onClick={()=>onRouteChange('signin')}
          className="f3 link black dim pa3 underline pointer">
            Sign in</p>
            <p
        onClick={()=>onRouteChange('register')}
        className="f3 link black dim pa3 underline pointer">
          Register</p>
      </nav>
    )
  }
}

export default Navigation;
