import { useEffect, useState } from 'react'

export const checkDeviceType = () => {
  const [deviceType, setDeviceType] = useState<string>('')

  useEffect(() => {
    const checkDeviceType = () => {
      const screenWidth = window.innerWidth

      if (screenWidth < 768) {
        setDeviceType('phone')
      } else if (screenWidth >= 768 && screenWidth < 1024) {
        setDeviceType('tablet')
      } else {
        setDeviceType('desktop')
      }
    }
    checkDeviceType()
    window.addEventListener('resize', checkDeviceType)
    return () => {
      window.removeEventListener('resize', checkDeviceType)
    }
  }, [])

  return deviceType
}
