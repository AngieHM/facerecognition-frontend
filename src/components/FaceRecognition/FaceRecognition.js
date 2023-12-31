import React from 'react'
import './FaceRecognition.css';

const  FaceRecognition= ({imageUrl, box}) => {
  return (
    <div className='center center-d ma'>
      <div className='absolute mt2'>
        <img alt='' id='imageId' src={imageUrl} width='500px'/>
        <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
      </div>
    </div>
  )
}

export default FaceRecognition;
