import OgBgImage from '@/components/shared/og-bg-image'
import type { Thread } from 'mb-genql'
interface OgImageProps {
	thread?: Partial<Thread>
	question: string
	answer: string
	username: string | undefined
	user_avatar: string
	isLightTheme: boolean
}
export default function OgImage({
	thread,
	question,
	answer,
	username,
	user_avatar,
	isLightTheme,
}: OgImageProps) {
	// console.log('OG IMG Props', {
	// 	question,
	// 	answer,
	// 	username,
	// 	user_avatar,
	// 	isLightTheme,
	// })
	return (
		<div
			style={{
				height: '100%',
				width: '100%',
				display: 'flex',
				alignItems: 'flex-start',
				justifyContent: 'flex-start',
				backgroundColor: isLightTheme ? '#ffff' : '#17171b',
				padding: 0,
				color: isLightTheme ? '#17171b' : '#ffff',
			}}
		>
			<OgBgImage isLightTheme={isLightTheme} />
			<div
				style={{
					display: 'flex',
					height: '100%',
					alignItems: 'center',
					justifyContent: 'space-between',
					width: '100%',
					padding: '42px 64px',
					gap: '32px',
				}}
			>
				<div
					style={{
						flex: '1',
						display: 'flex',
						flexDirection: 'column',
						gap: '16px',
						height: '100%',
					}}
				>
					{thread?.chatbot ? (
						<>
							<p
								style={{
									fontWeight: 'bold',
									display: 'flex',
									flexDirection: 'column',
									marginTop: '0px',
									marginBottom: 'auto',
									fontSize: 32,
									color: isLightTheme ? '#17171b' : '#ffff',
								}}
							>
								<span
									style={{
										color: '#ef4444',
										fontSize: '18px',
										marginTop: '0px',
										left: '0px',
									}}
								>
									{' '}
									{thread.chatbot.categories[0]?.category.name}
								</span>
								{thread.chatbot.name}
							</p>
						</>
					) : null}

					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							marginTop: 'auto',
							marginBottom: 'auto',
						}}
					>
						<h1
							style={{
								fontSize: '64px',
								lineHeight: 1.15,
								color: isLightTheme ? '#17171b' : '#ffff',
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								display: '-webkit-box',
								WebkitLineClamp: 2,
								WebkitBoxOrient: 'vertical',
								maxHeight: '3.6em',
							}}
						>
							{question}
						</h1>
						<p
							style={{
								fontSize: '24px',
								color: isLightTheme ? '#17171b' : '#ffff',
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								display: '-webkit-box',
								WebkitLineClamp: 3,
								WebkitBoxOrient: 'vertical',
								maxHeight: '96px',
							}}
						>
							{answer}
						</p>
					</div>

					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							marginTop: 'auto',
						}}
					>
						{user_avatar ? (
							<img
								alt=""
								style={{
									objectFit: 'cover',
									width: '42px',
									height: '42px',
									borderRadius: '50%',
									border: '2px solid #388DE2',
								}}
								src={user_avatar}
							/>
						) : (
							<div
								style={{
									width: '42px',
									height: '42px',
									borderRadius: '50%',
									backgroundColor: '#388DE2',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<p
									style={{
										color: isLightTheme ? '#17171b' : '#ffff',
										fontSize: '34px',
										fontWeight: 'bold',
										lineHeight: 1,
										textTransform: 'lowercase',
									}}
								>
									{username?.replace('@', '')?.charAt(0) || ''}
								</p>
							</div>
						)}
						<p
							style={{
								color: isLightTheme ? '#17171b' : '#ffff',
								fontSize: '26px',
								lineHeight: 1,
								marginLeft: '15px',
								textTransform: 'lowercase',
							}}
						>
							{username}
						</p>
					</div>
				</div>
				{thread?.chatbot?.avatar ? (
					<div style={{ display: 'flex' }}>
						<div
							style={{
								backgroundColor: '#1E293B',
								display: 'flex',
								minWidth: '300px',
								width: '300px',
								height: '300px',
								borderRadius: '50%',
							}}
						>
							<img
								alt=""
								style={{
									objectFit: 'cover',
									margin: 'auto',
									border: '8px solid #388DE2',
									width: '300px',
									height: '300px',
									borderRadius: '50%',
									zIndex: '1', // Ensure the image is above the SVG
								}}
								src={thread.chatbot.avatar}
							/>
						</div>
					</div>
				) : null}
			</div>
		</div>
	)
}
