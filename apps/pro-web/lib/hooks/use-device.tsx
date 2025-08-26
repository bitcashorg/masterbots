import { useEffect, useState } from 'react'

export interface DeviceInfo {
	isMobile: boolean
	isTablet: boolean
	isDesktop: boolean
}

export function useDevice(): DeviceInfo {
	const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
		isMobile: false,
		isTablet: false,
		isDesktop: true,
	})

	useEffect(() => {
		const updateDeviceInfo = () => {
			const width = window.innerWidth
			setDeviceInfo({
				isMobile: width < 768,
				isTablet: width >= 768 && width < 1024,
				isDesktop: width >= 1024,
			})
		}

		//? Runs once on mount
		updateDeviceInfo()

		//? Add event listener
		window.addEventListener('resize', updateDeviceInfo)

		//? Cleanup
		return () => {
			window.removeEventListener('resize', updateDeviceInfo)
		}
	}, [])

	return deviceInfo
}
