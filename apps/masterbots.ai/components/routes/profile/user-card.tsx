import { ChatChatbotDetailsSkeleton } from '@/components/shared/skeletons/chat-chatbot-details-skeleton'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { userPersonalityPrompt } from '@/lib/constants/prompts'
import { useUploadImagesCloudinary } from '@/lib/hooks/use-cloudinary-upload'
import { useModel } from '@/lib/hooks/use-model'
import { useProfile } from '@/lib/hooks/use-profile'
import { useSonner } from '@/lib/hooks/useSonner'
import {
	formatNumber,
	isFollowed,
	nanoid,
	removeSurroundingQuotes,
} from '@/lib/utils'
import { userFollowOrUnfollow } from '@/services/hasura/hasura.service'
import { type Message, useChat } from '@ai-sdk/react'
import {
	BadgeCheck,
	BookUser,
	BotIcon,
	ImagePlus,
	Loader,
	UserIcon,
	Users,
	Wand2,
} from 'lucide-react'
import type { SocialFollowing, User } from 'mb-genql'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import router from 'next/router'
import { type ChangeEvent, useEffect, useMemo, useState } from 'react'
import { EmptyState } from './empty-state'

interface UserCardProps {
	user: User | null
	loading?: boolean
}
export function UserCard({ user: userProps, loading }: UserCardProps) {
	const { isSameUser, updateUserInfo } = useProfile()
	const isOwner = isSameUser(userProps?.userId)
	const { selectedModel, clientType } = useModel()
	const [isLoading, setIsLoading] = useState(false)
	const [generateType, setGenerateType] = useState<string | undefined>('')
	const [bio, setBio] = useState<string | null | undefined>(userProps?.bio)
	const [favoriteTopic, setFavoriteTopic] = useState<string | null | undefined>(
		userProps?.favouriteTopic,
	)
	const [userProfilePicture, setUserProfilePicture] = useState<
		string | null | undefined
	>(userProps?.profilePicture)
	const [isUploadingImage, setIsUploadingImage] = useState(false)
	const { uploadFilesCloudinary, error: cloudinaryError } =
		useUploadImagesCloudinary()
	const { data: session } = useSession()
	const [userData, setUserData] = useState<User | null>(userProps)
	const [isFollowLoading, setIsFollowLoading] = useState(false)
	const { customSonner } = useSonner()
	const [displayedBio, setDisplayedBio] = useState<string>('')

	const userQuestions = useMemo(
		() =>
			(userProps?.threads || [])
				.map((thread) => {
					if (!thread.messages?.length) {
						return null
					}
					return {
						id: thread.threadId,
						content: thread.messages[0].content,
						createdAt: new Date(),
						role: 'user' as Message['role'],
					}
				})
				.filter(Boolean) as Message[],
		[userProps],
	)
	const [lastMessage, setLastMessage] = useState<string | null>(null)

	const { append } = useChat({
		initialMessages: userQuestions,
		id: nanoid(),
		body: {
			id: nanoid(),
			model: selectedModel,
			clientType,
		},
		onResponse(response) {
			if (response.status === 401) {
				customSonner({ type: 'error', text: response.statusText })
			} else if (!response.ok) {
				customSonner({ type: 'error', text: 'Failed to process request' })
			}
			setIsLoading(false)
		},
		onError(error) {
			customSonner({ type: 'error', text: 'An error occurred' })
			setIsLoading(false)
		},
		async onFinish(message) {
			setDisplayedBio('')
			setLastMessage(message.content)
		},
	})

	const handleProfilePictureUpload = async (
		event: ChangeEvent<HTMLInputElement>,
	) => {
		if (!event.target.files || event.target.files.length === 0) return
		const file = event.target.files[0]

		// You can add validation for file type and size here
		setIsUploadingImage(true)

		try {
			const { data, success } = await uploadFilesCloudinary(file)
			if (!success) {
				console.error('Failed to upload image xx:', cloudinaryError)
				customSonner({ type: 'error', text: 'Failed to upload image' })
				return
			}

			const imageUrl = data?.secure_url as string

			// Update the user's profile picture
			await updateUserInfo(null, null, imageUrl)

			// Update the user state
			setUserProfilePicture(imageUrl)
			customSonner({
				type: 'success',
				text: 'Profile picture updated successfully',
			})
		} catch (error) {
			customSonner({ type: 'error', text: 'Failed to upload image' })
		} finally {
			setIsUploadingImage(false)
		}
	}

	const handleUpdateUserInfo = async () => {
		if (lastMessage) {
			setIsLoading(true)

			try {
				if (generateType === 'topic') {
					setFavoriteTopic(removeSurroundingQuotes(lastMessage))
					await updateUserInfo(null, removeSurroundingQuotes(lastMessage), null)
				} else {
					setBio(removeSurroundingQuotes(lastMessage))
					await updateUserInfo(removeSurroundingQuotes(lastMessage), null, null)
				}
			} catch (error) {
				customSonner({
					type: 'error',
					text: 'Failed to update user information',
				})
			} finally {
				setIsLoading(false)
			}
		}
	}

	const updateUserProfilePicture = (picture: string) => {
		setUserProfilePicture(picture)
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		handleUpdateUserInfo()

		if (userData?.profilePicture && !userProfilePicture) {
			console.log('user.profilePicture', userData.profilePicture)
			updateUserProfilePicture(userData.profilePicture)
		}
	}, [lastMessage, generateType, userProps?.profilePicture])

	const generateBio = (type: string) => {
		try {
			setGenerateType(type)
			setDisplayedBio('')
			if (!userQuestions?.length) {
				customSonner({
					type: 'error',
					text: 'No thread history available to generate content',
				})
				return
			}
			const promptContent = userPersonalityPrompt(type, userQuestions)
			return append({
				id: nanoid(),
				content: promptContent,
				role: 'system',
				createdAt: new Date(),
			})
		} catch (error) {
			customSonner({ type: 'error', text: 'Failed to generate content' })
			console.error('Bio generation failed:', error)
		}
	}

	const resetState = () => {
		setLastMessage(null)
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		return () => {
			resetState()
		}
	}, [])

	const handleFollowUser = async () => {
		if (isFollowLoading) return
		try {
			// if no session is found, redirect to login\
			if (!session) {
				customSonner({ type: 'error', text: 'Please sign in to follow user' })
				router.push('/auth/signin')
				return
			}
			setIsFollowLoading(true)
			const followerId = session.user?.id
			const followeeId = userData?.userId
			if (!followerId || !followeeId) {
				customSonner({ type: 'error', text: 'Invalid user data' })
				return
			}
			if (followerId === followeeId) {
				customSonner({ type: 'error', text: 'You cannot follow yourself' })
				return
			}
			const { success, error, follow } = await userFollowOrUnfollow({
				followerId,
				followeeId,
				jwt: session.user.hasuraJwt as string,
			})
			if (!success) {
				console.error('Failed to follow/Unfollow user:', error)
				customSonner({
					type: 'error',
					text: 'Failed to process your request, try again!',
				})
				return
			}

			if (follow) {
				setUserData((prevUser) => {
					if (!prevUser) return prevUser

					const newFollower: SocialFollowing = {
						followerId,
						followeeId,
						createdAt: new Date().toISOString(),
						user: prevUser,
						userByFollowerId: prevUser,
						chatbot: null,
						followeeIdChatbot: null,
						__typename: 'SocialFollowing',
					}

					return {
						...prevUser,
						followers: [...(prevUser.followers || []), newFollower],
					} as User // Assert the entire object as User type
				})
				customSonner({
					type: 'success',
					text: `You are now following ${userData?.username}`,
				})
			} else {
				setUserData((prevUser) => {
					if (!prevUser) return prevUser

					return {
						...prevUser,
						followers: prevUser.followers.filter(
							(follower) =>
								follower.followerId !== followerId ||
								follower.followeeId !== followeeId,
						),
					}
				})
				customSonner({
					type: 'success',
					text: `You have unfollowed ${userData?.username}`,
				})
			}
		} catch (error) {
			customSonner({ type: 'error', text: 'Failed to follow user' })
			console.error('Failed to follow user:', error)
		} finally {
			setIsFollowLoading(false)
		}
	}

	const followed = isFollowed({
		followers: userData?.followers,
		userId: session?.user?.id || '',
	})

	useEffect(() => {
		if (bio) {
			let i = 0 // Start from index 1 since we set the first char manually
			setDisplayedBio('')

			const formattedBio = bio.charAt(0).toUpperCase() + bio.slice(1) // Capitalize first letter

			// Immediately set the first letter
			setDisplayedBio(formattedBio.charAt(0))

			const interval = setInterval(() => {
				if (i < formattedBio.length) {
					setDisplayedBio((prev) => prev + formattedBio.charAt(i))
					i++
				} else {
					clearInterval(interval)
					setIsLoading(false)
				}
			}, 20) // Adjust speed as needed

			return () => {
				clearInterval(interval)
			}
		}
	}, [bio])

	return (
		<div className="bg-background relative rounded-lg w-full max-w-[600px] md:h-[320px] flex flex-col gap-1 mx-auto font-geist space-y-1">
			{loading && (
				<div className="relative w-full h-[300px]  z-10">
					<ChatChatbotDetailsSkeleton />
				</div>
			)}
			{!userData && !loading && <EmptyState />}
			{userData && !loading && (
				<>
					{/* Profile Name */}
					<div className="px-5 pb-2 pt-7 flex flex-col gap-2.5">
						<h2 className="flex gap-2 items-center text-xl font-semibold md:text-2xl">
							@{userData?.username?.toLowerCase()}
							{userData?.proUserSubscriptionId && (
								<BadgeCheck className="size-5 text-[#83E56A]" />
							)}
						</h2>
						{userData?.threads && userData?.threads?.length > 0 && (
							<div className="flex items-center space-x-1 md:hidden">
								<BotIcon className="w-4 h-4" />
								<span className="">Threads:</span>
								<span className="text-gray-500">{userData.threads.length}</span>
							</div>
						)}

						<div className="flex items-center space-x-1">
							<BookUser className="w-4 h-4" />
							<p className="text-sm">bio:</p>

							<div className="h-7">
								{isOwner && (
									<Button
										disabled={isLoading && generateType === 'bio'}
										variant="ghost"
										onClick={async () => {
											try {
												setIsLoading(true)
												await generateBio('bio')
												// await generateBio('topic')
											} catch (error) {
												console.error('Failed to generate content --> ', error)
											} finally {
												setIsLoading(false)
											}
										}}
										className="text-sm text-gray-500 border h-auto py-[2px] px-[8px] border-black dark:border-gray-400 hover:text-black dark:hover:text-gray-400"
									>
										{bio ? 're-generate' : 'generate'}
										{isLoading && generateType === 'bio' ? (
											<Loader className="ml-1 w-4 h-4" />
										) : (
											<Wand2 className="ml-1 w-4 h-4" />
										)}
									</Button>
								)}
							</div>
						</div>
					</div>

					<Separator className="bg-gray-300  dark:bg-mirage size-[3px] w-full" />

					{/* Bio Section */}
					<div className="px-5 space-y-2 min-h-16 md:mr-0">
						{isOwner && !bio && (
							<p className="text-[13px] font-normal text-gray-500 md:w-[400px]">
								click{' '}
								<Button
									variant="ghost"
									className="p-1 text-xs text-gray-500 hover:text-black dark:hover:text-gray-400"
								>
									{' '}
									generate <Wand2 className="ml-1 w-4 h-4" />
								</Button>
								to create a Masterbots biography based on your thread history.
							</p>
						)}
						{bio && (
							<p className="text-sm text-gray-500 md:w-[400px] w-full">
								{isLoading && generateType === 'bio' ? (
									<Loader />
								) : (
									displayedBio
								)}
							</p>
						)}
					</div>

					{/* Stats Section */}
					<div className="flex flex-col p-6 md:flex-row md:justify-between">
						<div className="pt-5 space-y-1">
							{userData?.threads && userData.threads.length > 0 && (
								<div className="hidden items-center space-x-1 md:flex">
									<BotIcon className="w-4 h-4" />
									<span className="">Threads:</span>
									<span className="text-gray-500">
										{userData.threads?.length}
									</span>
								</div>
							)}

							{/* Favorite Topic */}
							{/* <div className="flex items-center space-x-1">
                <MessageSquareHeart className="w-4 h-4" />
                <p className="">Favorite topic:</p>
                {isOwner && (
                  <Button
                    disabled={isLoading && generateType === 'topic'}
                    variant="ghost"
                    onClick={() => generateBio('topic')}
                    className="text-sm text-gray-500 border py-[2px] px-[8px] border-black dark:border-gray-400 hover:text-black dark:hover:text-gray-400"
                  >
                    {favoriteTopic ? 're-generate' : 'generate'}
                    {isLoading && generateType === 'topic' ? (
                      <Loader className="ml-1 w-4 h-4" />
                    ) : (
                      <Wand2 className="ml-1 w-4 h-4" />
                    )}
                  </Button>
                )}
              </div>
              {isOwner && !favoriteTopic && (
                <p className="text-xs text-gray-500 md:w-[400px] w-full">
                  click generate and know your most common topic.
                </p>
              )}
              <p className="text-sm text-gray-500 md:max-w-[300px]">
                {isLoading && generateType === 'topic' ? <Loader /> : favoriteTopic}
              </p> */}
						</div>

						<div className="flex flex-col items-center mt-7 space-y-3 md:mt-0">
							{!isOwner && (
								<Button
									disabled={isFollowLoading}
									onClick={handleFollowUser}
									variant={'ghost'}
									aria-label={`${followed ? 'Unfollow' : 'Follow'} ${
										userData?.username
									}`}
									aria-busy={isFollowLoading}
									className="px-10 py-1 text-sm text-white  rounded-md bg-[#83E56A] hover:bg-[#83E56A] dark:text-black transition-colors"
								>
									{isFollowLoading ? (
										<Loader className="mx-auto w-4 h-4" />
									) : (
										<>{followed ? 'Following' : 'Follow'}</>
									)}
								</Button>
							)}
							<div className="flex space-x-6 md:pt-2">
								<div className="flex flex-col items-center">
									<span className="text-sm">Following</span>
									<div className="flex items-center space-x-1">
										<UserIcon className="w-4 h-4" />
										<span className="text-sm text-gray-500">
											{formatNumber(userData?.following?.length || 0)}
										</span>
									</div>
								</div>
								<div className="flex flex-col items-center">
									<span className="text-sm">Followers</span>
									<div className="flex items-center space-x-1">
										<Users className="w-4 h-4" />
										<span className="text-sm text-gray-500">
											{formatNumber(userData?.followers?.length || 0)}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Profile Image and Follow Button Section */}
					<div className="flex absolute top-3 right-3 flex-col items-center space-y-3 origin-top-right md:top-6 md:right-6">
						<div className="relative md:size-32 size-24">
							<div className="absolute inset-0 border-4 border-[#83E56A] rounded-full dark:bg-[#131316] bg-white overflow-hidden">
								<Image
									className="object-cover rounded-full ring-1 transition-opacity duration-300 select-none size-full ring-zinc-100/10 hover:opacity-80"
									src={
										userProfilePicture
											? userProfilePicture
											: 'https://api.dicebear.com/9.x/identicon/svg?seed=default_masterbots_ai_user_avatar'
									}
									alt={`Profile picture of ${userData.username}`}
									height={136}
									width={136}
									priority
									loading="eager"
									// ! This is causing infinite loop request. Need to fix this
									// onError={e => {
									//   e.currentTarget.src =
									//     'https://api.dicebear.com/9.x/identicon/svg?seed=default_masterbots_ai_user_avatar'
									// }}
								/>
							</div>
							{isOwner && (
								<>
									<Button
										variant="ghost"
										className="absolute bottom-0 w-[25px] h-[25px]   right-2  p-1  rounded-full bg-[#83E56A]"
										onClick={() =>
											document.getElementById('profile-pic-upload')?.click()
										}
									>
										{isUploadingImage ? (
											<Loader className="w-4 h-4 text-white" />
										) : (
											<ImagePlus className="w-3 h-3 font-bold text-white rounded-full dark:text-black" />
										)}
									</Button>
									<input
										id="profile-pic-upload"
										type="file"
										accept="image/*"
										style={{ display: 'none' }}
										onChange={handleProfilePictureUpload}
									/>
								</>
							)}
						</div>
					</div>
				</>
			)}
		</div>
	)
}
