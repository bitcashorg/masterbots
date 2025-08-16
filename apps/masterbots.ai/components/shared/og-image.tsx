import type { Thread } from 'mb-genql'

interface OgImageProps {
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

// Helper to get the correct OG background image
const getOgBgImage = (ogType: OgImageProps['ogType']) => {
	if (ogType === 'bot_thread') return '/og-mb-images/bot_thread.png'
	if (ogType === 'user_thread') return '/og-mb-images/user_thread.png'
	if (ogType === 'bot_profile' || ogType === 'category_profile')
		return '/og-mb-images/bot_og.png'
	return '/og-mb-images/bot_og.png'
}

export default function OgImage(props: OgImageProps) {
	const {
		thread,
		question,
		answer,
		username,
		user_avatar,
		isLightTheme = false,
		ogType = 'bot_thread',
		botName,
		botAvatar,
		category,
		domain,
		description,
		title,
	} = props

	// Layout selection logic
	const bgImage = getOgBgImage(ogType)

	// --- Bot/Public Thread Layout ---
	if (ogType === 'bot_thread') {
		return (
			<div
				style={{
					width: '1200px',
					height: '630px',
					position: 'relative',
					overflow: 'hidden',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'flex-end',
					background: `url(${bgImage}) center/cover no-repeat`,
				}}
			>
				<div
					style={{
						padding: '64px',
						display: 'flex',
						flexDirection: 'column',
						height: '100%',
						justifyContent: 'flex-end',
					}}
				>
					<div style={{ marginBottom: '32px' }}>
						<span
							style={{
								color: '#388DE2',
								fontWeight: 700,
								fontSize: '32px',
								textTransform: 'uppercase',
								letterSpacing: '0.04em',
								background: 'rgba(255,255,255,0.85)',
								borderRadius: '8px',
								padding: '4px 16px',
								marginRight: '16px',
							}}
						>
							{category ||
								thread?.chatbot?.categories?.[0]?.category?.name ||
								'AI'}
						</span>
						<span
							style={{
								color: '#17171b',
								fontWeight: 700,
								fontSize: '32px',
								background: 'rgba(255,255,255,0.85)',
								borderRadius: '8px',
								padding: '4px 16px',
							}}
						>
							{botName || thread?.chatbot?.name || 'Masterbots'}
						</span>
					</div>
					<h1
						style={{
							fontSize: '56px',
							fontWeight: 800,
							color: '#17171b',
							margin: 0,
							lineHeight: 1.1,
							background: 'rgba(255,255,255,0.85)',
							borderRadius: '12px',
							padding: '16px 32px',
							maxWidth: '1000px',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							display: '-webkit-box',
							WebkitLineClamp: 2,
							WebkitBoxOrient: 'vertical',
						}}
					>
						{question}
					</h1>
					<p
						style={{
							fontSize: '28px',
							color: '#388DE2',
							margin: '32px 0 0 0',
							background: 'rgba(255,255,255,0.85)',
							borderRadius: '8px',
							padding: '12px 24px',
							maxWidth: '900px',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							display: '-webkit-box',
							WebkitLineClamp: 3,
							WebkitBoxOrient: 'vertical',
						}}
					>
						{answer}
					</p>
					<div
						style={{ display: 'flex', alignItems: 'center', marginTop: '40px' }}
					>
						{user_avatar ? (
							<img
								alt="User avatar"
								style={{
									width: '56px',
									height: '56px',
									borderRadius: '50%',
									border: '3px solid #388DE2',
									objectFit: 'cover',
									marginRight: '18px',
								}}
								src={user_avatar}
							/>
						) : (
							<div
								style={{
									width: '56px',
									height: '56px',
									borderRadius: '50%',
									backgroundColor: '#388DE2',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									marginRight: '18px',
								}}
							>
								<span
									style={{ color: '#fff', fontSize: '32px', fontWeight: 700 }}
								>
									{username?.replace('@', '')?.charAt(0) || ''}
								</span>
							</div>
						)}
						<span
							style={{ color: '#17171b', fontSize: '28px', fontWeight: 700 }}
						>
							{username}
						</span>
					</div>
				</div>
				{botAvatar && (
					<img
						src={botAvatar}
						alt="Bot avatar"
						style={{
							position: 'absolute',
							right: '64px',
							top: '64px',
							width: '120px',
							height: '120px',
							borderRadius: '50%',
							border: '6px solid #388DE2',
							background: '#fff',
							objectFit: 'cover',
							zIndex: 2,
						}}
					/>
				)}
			</div>
		)
	}

	// --- User Thread Layout ---
	if (ogType === 'user_thread') {
		return (
			<div
				style={{
					width: '1200px',
					height: '630px',
					position: 'relative',
					overflow: 'hidden',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'flex-end',
					background: `url(${bgImage}) center/cover no-repeat`,
				}}
			>
				<div
					style={{
						padding: '64px',
						display: 'flex',
						flexDirection: 'column',
						height: '100%',
						justifyContent: 'flex-end',
					}}
				>
					<div style={{ marginBottom: '32px' }}>
						<span
							style={{
								color: '#388DE2',
								fontWeight: 700,
								fontSize: '32px',
								textTransform: 'uppercase',
								letterSpacing: '0.04em',
								background: 'rgba(255,255,255,0.85)',
								borderRadius: '8px',
								padding: '4px 16px',
								marginRight: '16px',
							}}
						>
							{category ||
								thread?.chatbot?.categories?.[0]?.category?.name ||
								'AI'}
						</span>
						<span
							style={{
								color: '#17171b',
								fontWeight: 700,
								fontSize: '32px',
								background: 'rgba(255,255,255,0.85)',
								borderRadius: '8px',
								padding: '4px 16px',
							}}
						>
							{botName || thread?.chatbot?.name || 'Masterbots'}
						</span>
					</div>
					<h1
						style={{
							fontSize: '56px',
							fontWeight: 800,
							color: '#17171b',
							margin: 0,
							lineHeight: 1.1,
							background: 'rgba(255,255,255,0.85)',
							borderRadius: '12px',
							padding: '16px 32px',
							maxWidth: '1000px',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							display: '-webkit-box',
							WebkitLineClamp: 2,
							WebkitBoxOrient: 'vertical',
						}}
					>
						{question}
					</h1>
					<p
						style={{
							fontSize: '28px',
							color: '#388DE2',
							margin: '32px 0 0 0',
							background: 'rgba(255,255,255,0.85)',
							borderRadius: '8px',
							padding: '12px 24px',
							maxWidth: '900px',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							display: '-webkit-box',
							WebkitLineClamp: 3,
							WebkitBoxOrient: 'vertical',
						}}
					>
						{answer}
					</p>
					<div
						style={{ display: 'flex', alignItems: 'center', marginTop: '40px' }}
					>
						{user_avatar ? (
							<img
								alt="User avatar"
								style={{
									width: '56px',
									height: '56px',
									borderRadius: '50%',
									border: '3px solid #388DE2',
									objectFit: 'cover',
									marginRight: '18px',
								}}
								src={user_avatar}
							/>
						) : (
							<div
								style={{
									width: '56px',
									height: '56px',
									borderRadius: '50%',
									backgroundColor: '#388DE2',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									marginRight: '18px',
								}}
							>
								<span
									style={{ color: '#fff', fontSize: '32px', fontWeight: 700 }}
								>
									{username?.replace('@', '')?.charAt(0) || ''}
								</span>
							</div>
						)}
						<span
							style={{ color: '#17171b', fontSize: '28px', fontWeight: 700 }}
						>
							{username}
						</span>
					</div>
				</div>
				{botAvatar && (
					<img
						src={botAvatar}
						alt="Bot avatar"
						style={{
							position: 'absolute',
							right: '64px',
							top: '64px',
							width: '120px',
							height: '120px',
							borderRadius: '50%',
							border: '6px solid #388DE2',
							background: '#fff',
							objectFit: 'cover',
							zIndex: 2,
						}}
					/>
				)}
			</div>
		)
	}

	// --- Bot Profile / Category Profile Layout ---
	if (ogType === 'bot_profile' || ogType === 'category_profile') {
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
					background: `url(${bgImage}) center/cover no-repeat`,
				}}
			>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						width: '100%',
						height: '100%',
					}}
				>
					{botAvatar && (
						<img
							src={botAvatar}
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
					{description && ogType !== 'bot_profile' && (
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

	// --- Fallback Layout ---
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
