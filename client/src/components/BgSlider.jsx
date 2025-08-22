import React from 'react'
import { assets } from '../assets/assets'

const BgSlider = () => {

    const [sliderPosition, setSliderPosition] = React.useState(50)
    const handleSliderChange = (e) => {
        setSliderPosition(e.target.value)
    }


  return (
    <div className='pb-10 '>
        <h1 className='text-2xl md:text-3xl lg:text-4xl font-semibold text-neutral-700 leading-tight mb-10 text-center bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent'>Remove Background With High <br /> Quality And Accuracy</h1>
        <div className='relative w-full max-w-3xl overflow-hidden m-auto rounded-xl border border-gray-300 shadow-lg'>
            {/* Background image */}
            <img src={assets.image_w_bg} style={{clipPath:`inset(0 ${100.2 - sliderPosition}% 0 0)`}} alt="" />

            {/* Foreground image */}
            <img className='absolute top-0 left-0 w-full h-full' src={assets.image_wo_bg} style={{clipPath:`inset(0 0 0 ${ sliderPosition}%)`}} alt="" />

            {/* Slider */}
            <input className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full z-10 slider ' type="range" min={0} max={100} value={sliderPosition} onChange={handleSliderChange} />
        </div>

    </div>
  )
}

export default BgSlider