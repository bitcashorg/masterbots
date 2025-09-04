import OgBgImage from '@/components/shared/og-bg-image'
import type { Thread } from 'mb-genql'

export interface OgImageProps {
	thread?: Partial<Thread>
	question?: string
	answer?: string
	username?: string
	user_avatar?: string
	isLightTheme?: boolean
	ogType?: 'bot_thread' | 'user_thread' | 'bot_profile' | 'category_profile'
	botName?: string
	botAvatar?: string
	category?: string
	domain?: string
	description?: string
	title?: string
}

export default function OgImage(props: OgImageProps) {
	const {
		thread,
		question,
		answer,
		username,
		user_avatar,
		isLightTheme = false,
		ogType = '',
		botName,
		botAvatar,
		category,
		domain,
		description,
		title,
	} = props

	//? Ensures relative image URLs become absolute
	const makeAbsolute = (url?: string) => {
		if (!url) return undefined
		if (url.startsWith('http://') || url.startsWith('https://')) return url
		const base = process.env.BASE_URL || 'http://localhost:3000'
		return url.startsWith('/') ? `${base}${url}` : `${base}/${url}`
	}

	//? --- Bot Thread Layout ---
	if (ogType === 'bot_thread') {
		return (
			<div
				style={{
					width: '1200px',
					height: '630px',
					position: 'relative',
					overflow: 'hidden',
					display: 'flex',
					background: '#111',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
				}}
			>
				<OgBgImage isLightTheme={isLightTheme} />

				{/* Left Side - Message Block */}
				<div
					style={{
						flex: 1,
						padding: '64px',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
						position: 'relative',
						zIndex: 1,
					}}
				>
					{/* Logo/Icon */}
					<div
						style={{
							width: '48px',
							height: '48px',
							borderRadius: '50%',
							backgroundColor: '#fff',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							fontWeight: 700,
							fontSize: '18px',
							color: '#111',
						}}
					>
						MB
					</div>

					{/* Content Area */}
					<div
						style={{
							flex: 1,
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
						}}
					>
						{/* User message (main headline) */}
						<h1
							style={{
								fontSize: '48px',
								fontWeight: 700,
								color: '#fff',
								margin: '0 0 24px 0',
								lineHeight: 1.2,
								maxWidth: '500px',
							}}
						>
							{question || 'Please explain the term mooted'}
						</h1>

						{/* Bot response (short explanation) */}
						<p
							style={{
								fontSize: '20px',
								color: '#ccc',
								margin: 0,
								lineHeight: 1.5,
								maxWidth: '500px',
							}}
						>
							{answer || 'A brief explanation of the term...'}
						</p>
					</div>

					{/* Bot profile (bottom left corner) */}
					<div style={{ display: 'flex', alignItems: 'center' }}>
						{user_avatar ? (
							<img
								alt="user avatar"
								style={{
									width: '48px',
									height: '48px',
									borderRadius: '50%',
									border: '2px solid #00ff66',
									objectFit: 'cover',
									marginRight: '16px',
								}}
								src={makeAbsolute(user_avatar) || ''}
							/>
						) : (
							<div
								style={{
									width: '48px',
									height: '48px',
									borderRadius: '50%',
									backgroundColor: '#333',
									border: '2px solid #00ff66',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									marginRight: '16px',
								}}
							>
								<span
									style={{ color: '#fff', fontSize: '20px', fontWeight: 700 }}
								>
									{username?.replace('@', '')?.charAt(0) || 'U'}
								</span>
							</div>
						)}
						<span
							style={{
								color: '#fff',
								fontSize: '18px',
								fontWeight: 700,
								fontFamily: 'monospace',
								letterSpacing: '0.5px',
							}}
						>
							{username || '@user'}
						</span>
					</div>
				</div>

				{/* Right Side - Bot Profile Block */}
				<div
					style={{
						flex: 1,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						padding: '64px',
						position: 'relative',
						zIndex: 1,
					}}
				>
					{/* Circular Container */}
					<div
						style={{
							width: '200px',
							height: '200px',
							borderRadius: '50%',
							border: '4px solid #00ff66',
							backgroundColor: '#222',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							marginBottom: '24px',
							position: 'relative',
						}}
					>
						{/* Bot Avatar */}
						{botAvatar ? (
							<img
								src={makeAbsolute(botAvatar) || ''}
								alt="Bot avatar"
								style={{
									width: '160px',
									height: '160px',
									borderRadius: '50%',
									objectFit: 'cover',
								}}
							/>
						) : (
							<div
								style={{
									width: '160px',
									height: '160px',
									borderRadius: '50%',
									backgroundColor: '#333',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<span style={{ color: '#fff', fontSize: '48px' }}>@user</span>
							</div>
						)}
					</div>

					{/* Labels */}
					<div style={{ textAlign: 'center' }}>
						{/* Main Label */}
						<div
							style={{
								fontSize: '20px',
								fontWeight: 700,
								color: '#fff',
								marginBottom: '8px',
							}}
						>
							{botName || 'AI Assistant'}
						</div>
						{/* Sub Label */}
						<div
							style={{
								fontSize: '16px',
								color: '#00ff66',
								fontWeight: 500,
								textTransform: 'lowercase',
							}}
						>
							{category || 'technology'}
						</div>
					</div>
				</div>
			</div>
		)
	}

	//? --- User Thread Layout ---
	if (ogType === 'user_thread') {
		return (
			<div
				style={{
					width: '1200px',
					height: '630px',
					position: 'relative',
					overflow: 'hidden',
					display: 'flex',
					background: '#111',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
				}}
			>
				<OgBgImage isLightTheme={isLightTheme} />

				{/* Left Side - Message Block */}
				<div
					style={{
						flex: 1,
						padding: '64px',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
						position: 'relative',
						zIndex: 1,
					}}
				>
					{/* Logo/Icon */}
					<div
						style={{
							width: '48px',
							height: '48px',
							borderRadius: '50%',
							backgroundColor: '#fff',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							fontWeight: 700,
							fontSize: '18px',
							color: '#111',
						}}
					>
						MB
					</div>

					{/* Content Area */}
					<div
						style={{
							flex: 1,
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
						}}
					>
						{/* User message (main headline) */}
						<h1
							style={{
								fontSize: '48px',
								fontWeight: 700,
								color: '#fff',
								margin: '0 0 24px 0',
								lineHeight: 1.2,
								maxWidth: '500px',
							}}
						>
							{question || 'Please explain the term mooted'}
						</h1>

						{/* Bot response (short explanation) */}
						<p
							style={{
								fontSize: '20px',
								color: '#ccc',
								margin: 0,
								lineHeight: 1.5,
								maxWidth: '500px',
							}}
						>
							{answer || 'A brief explanation of the term...'}
						</p>
					</div>

					{/* User profile (bottom left corner) */}
					<div style={{ display: 'flex', alignItems: 'center' }}>
						{botAvatar ? (
							<img
								alt="bot avatar"
								style={{
									width: '48px',
									height: '48px',
									borderRadius: '50%',
									border: '2px solid #00ff66',
									objectFit: 'cover',
									marginRight: '16px',
								}}
								src={makeAbsolute(botAvatar) || ''}
							/>
						) : (
							<div
								style={{
									width: '48px',
									height: '48px',
									borderRadius: '50%',
									backgroundColor: '#333',
									border: '2px solid #00ff66',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									marginRight: '16px',
								}}
							>
								<span
									style={{ color: '#fff', fontSize: '20px', fontWeight: 700 }}
								>
									{username?.replace('@', '')?.charAt(0) || 'U'}
								</span>
							</div>
						)}
						<span
							style={{
								color: '#fff',
								fontSize: '18px',
								fontWeight: 700,
								fontFamily: 'monospace',
								letterSpacing: '0.5px',
							}}
						>
							{botName || '@bot'}
							{/* Sub Label */}
							<div
								style={{
									fontSize: '16px',
									color: '#00ff66',
									fontWeight: 500,
									textTransform: 'lowercase',
								}}
							>
								{category || 'technology'}
							</div>
						</span>
					</div>
				</div>

				{/* Right Side - Bot Profile Block */}
				<div
					style={{
						flex: 1,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						padding: '64px',
						position: 'relative',
						zIndex: 1,
					}}
				>
					{/* Circular Container */}
					<div
						style={{
							width: '200px',
							height: '200px',
							borderRadius: '50%',
							border: '4px solid #00ff66',
							backgroundColor: '#222',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							marginBottom: '24px',
							position: 'relative',
						}}
					>
						{/* Bot Avatar */}
						{user_avatar ? (
							<img
								src={makeAbsolute(user_avatar) || ''}
								alt="user avatar"
								style={{
									width: '160px',
									height: '160px',
									borderRadius: '50%',
									objectFit: 'cover',
								}}
							/>
						) : (
							<div
								style={{
									width: '160px',
									height: '160px',
									borderRadius: '50%',
									backgroundColor: '#333',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<span style={{ color: '#fff', fontSize: '48px' }}>🤖</span>
							</div>
						)}
					</div>

					{/* Labels */}
					<div style={{ textAlign: 'center' }}>
						{/* Main Label */}
						<div
							style={{
								fontSize: '20px',
								fontWeight: 700,
								color: '#fff',
								marginBottom: '8px',
							}}
						>
							{username || '@user'}
						</div>
					</div>
				</div>
			</div>
		)
	}

	//? --- Bot Profile Layout ---
	if (ogType === 'bot_profile') {
		return (
			<div
				style={{
					width: '1200px',
					height: '630px',
					position: 'relative',
					overflow: 'hidden',
					display: 'flex',
					background: '#111',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
				}}
			>
				<OgBgImage isLightTheme={isLightTheme} />

				{/* Left Side - Content Block */}
				<div
					style={{
						flex: 1,
						padding: '64px',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						position: 'relative',
						zIndex: 1,
					}}
				>
					{/* Logo/Icon */}
					<div
						style={{
							width: '48px',
							height: '48px',
							borderRadius: '50%',
							backgroundColor: '#fff',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							marginBottom: '32px',
						}}
					>
						<img
							src={makeAbsolute('/logos/masterbots-logo.png') || ''}
							alt="App Logo"
							style={{
								width: '32px',
								height: '32px',
								objectFit: 'contain',
							}}
						/>
					</div>

					{/* Title */}
					<h1
						style={{
							fontSize: '32px',
							fontWeight: 700,
							color: '#fff',
							margin: '0 0 24px 0',
							lineHeight: 1.2,
							maxWidth: '400px',
						}}
					>
						{title || botName || 'Masterbots'}
					</h1>

					{/* Description */}
					{description && (
						<p
							style={{
								fontSize: '18px',
								color: '#ccc',
								margin: 0,
								lineHeight: 1.6,
								maxWidth: '400px',
							}}
						>
							{description}
						</p>
					)}
				</div>

				{/* Right Side - Profile Block */}
				<div
					style={{
						flex: 1,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						padding: '64px',
						position: 'relative',
						zIndex: 1,
					}}
				>
					{/* Circular Container */}
					<div
						style={{
							width: '200px',
							height: '200px',
							borderRadius: '50%',
							border: '4px solid #00ff66',
							backgroundColor: '#222',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							marginBottom: '24px',
							position: 'relative',
						}}
					>
						{/* Avatar */}
						{botAvatar ? (
							<img
								src={makeAbsolute(botAvatar) || ''}
								alt="Bot avatar"
								style={{
									width: '160px',
									height: '160px',
									borderRadius: '50%',
									objectFit: 'cover',
								}}
							/>
						) : (
							<div
								style={{
									width: '160px',
									height: '160px',
									borderRadius: '50%',
									backgroundColor: '#333',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<span style={{ color: '#fff', fontSize: '48px' }}>🤖</span>
							</div>
						)}
					</div>

					{/* Labels */}
					<div style={{ textAlign: 'center' }}>
						{/* Primary Label */}
						<div
							style={{
								fontSize: '20px',
								fontWeight: 700,
								color: '#fff',
								marginBottom: '8px',
							}}
						>
							{category || 'AI Assistant'}
						</div>
						{/* Secondary Label */}
						<div
							style={{
								fontSize: '16px',
								color: '#00ff66',
								fontWeight: 500,
							}}
						>
							{thread?.chatbot?.categories?.[1]?.category?.name || 'Technology'}
						</div>
					</div>
				</div>
			</div>
		)
	}

	//? --- Category Profile Layout ---
	if (ogType === 'category_profile') {
		return (
			<div
				style={{
					width: '1200px',
					height: '630px',
					position: 'relative',
					overflow: 'hidden',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					background: isLightTheme ? '#ffffff' : '#18181B',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
				}}
			>
				<OgBgImage isLightTheme={isLightTheme} />
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						width: '100%',
						height: '100%',
						position: 'relative',
						zIndex: 1,
					}}
				>
					{botAvatar && (
						<img
							src={makeAbsolute(botAvatar) || ''}
							alt="Bot avatar"
							style={{
								width: '180px',
								height: '180px',
								borderRadius: '50%',
								border: '8px solid #388DE2',
								background: '#fff',
								objectFit: 'cover',
								marginBottom: '32px',
							}}
						/>
					)}
					<h1
						style={{
							fontSize: '64px',
							fontWeight: 800,
							color: '#17171b',
							margin: 0,
							background: 'rgba(255,255,255,0.85)',
							borderRadius: '12px',
							padding: '16px 48px',
							textAlign: 'center',
							maxWidth: '900px',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							display: '-webkit-box',
							WebkitLineClamp: 2,
							WebkitBoxOrient: 'vertical',
						}}
					>
						{title || botName || 'Masterbots'}
					</h1>
					{description && (
						<p
							style={{
								fontSize: '32px',
								color: '#388DE2',
								margin: '32px 0 0 0',
								background: 'rgba(255,255,255,0.85)',
								borderRadius: '8px',
								padding: '12px 32px',
								maxWidth: '800px',
								textAlign: 'center',
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								display: '-webkit-box',
								WebkitLineClamp: 2,
								WebkitBoxOrient: 'vertical',
							}}
						>
							{description}
						</p>
					)}
				</div>
			</div>
		)
	}

	//? --- Fallback Layout ---
	return (
		<div
			style={{
				width: '1200px',
				height: '630px',
				background: '#fff',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<h1 style={{ color: '#17171b', fontSize: '48px' }}>Masterbots OG</h1>
		</div>
	)
}
