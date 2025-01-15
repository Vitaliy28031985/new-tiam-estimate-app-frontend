'use client'

import { useEffect, useState } from 'react'

export default function Loader() {
const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setIsVisible(false)
    }, 1000) 

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-blue-30 rounded-lg z-50">
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-32 h-32">
        <g clipPath="url(#clip0_525_3388)">
          <path className="animate-fill" d="M60.3945 8.10703C62.4494 10.8718 63.701 14.5705 63.757 19.4649C63.4768 35.3621 68.4085 63.4579 44.5533 63.7568C28.656 63.4766 0.560283 68.4083 0.242712 44.5344C0.522922 28.6558 -4.3901 0.560036 19.4651 0.242464C32.0933 0.466633 52.4179 -2.597 60.3945 8.08835" fill="#0C4A6E"/>
          <path className="animate-draw" d="M55.4441 59.8338H31.234C31.1219 59.8338 31.0472 59.7591 31.0472 59.647V38.6126C31.0472 38.5005 30.9724 38.4258 30.8603 38.4258H19.0355C18.8487 38.4258 18.7739 38.2016 18.9234 38.0895L58.7132 6.66862C58.7132 6.66862 58.9187 6.61258 58.9748 6.70598L61.067 9.33995C61.067 9.33995 61.123 9.54544 61.0296 9.60148L29.2538 34.6896H34.5965C34.7086 34.6896 34.7833 34.7644 34.7833 34.8764V55.9109C34.7833 56.023 34.858 56.0977 34.9701 56.0977H57.966C58.0781 56.0977 58.1528 56.1724 58.1528 56.2845V57.1251C58.1528 58.6196 56.9386 59.8338 55.4441 59.8338Z" fill="white"/>
        </g>
        <defs>
          <clipPath id="clip0_525_3388">
            <rect width="64" height="64" fill="white"/>
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}