import OgBgImage from '@/components/og-bg-image'
interface OgImageProps {
    thread: any
    question: string
    answer: string
    username: string | undefined
    user_avatar: string
    isLightTheme: boolean
}
export default function OgImage({ thread, question, answer, username, user_avatar, isLightTheme}: OgImageProps) {

  console.log([user_avatar])

    return (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            backgroundColor: isLightTheme ? '#ffff' : '#17171b',
            padding: '40px',
            color: isLightTheme ? '#17171b' : '#ffff'
          }}
        >
          <OgBgImage  isLightTheme={isLightTheme} />
          <div
            style={{
              display: 'flex',
              height: '100%',
              alignItems: 'center',
              width: '100%'
            }}
          >
            <div
              style={{
                flex: '1',
                display: 'flex',
                flexDirection: 'column',
                marginRight: '20px'
              }}
            >
              <p
                style={{
                  fontWeight: 'bold',
                  marginBottom: '0px',
                  fontSize: 32,
                  color: isLightTheme ? '#17171b' : '#ffff'
                }}
              >
                {thread.chatbot.name}
              </p>
              <p
                style={{ color: '#ef4444', fontSize: '18px', marginTop: '0px' }}
              >
                {' '}
                {thread.chatbot.categories[0]?.category.name}
              </p>
              <h1
                style={{
                  fontSize: '64px',
                  lineHeight: '75px',
                  color: isLightTheme ? '#17171b' : '#ffff',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  maxHeight: '3.6em'
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
                  maxHeight: '96px'
                }}
              >
                {answer}
              </p>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: '20px'
                }}
              >
                {user_avatar ? (
                  <img
                    alt=""
                    style={{
                      objectFit: 'cover',
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      border: '2px solid #388DE2'
                    }}
                    src={user_avatar}
                  />
                ) : (
                  <div
                    style={{
                      width: '70px',
                      height: '70px',
                      borderRadius: '50%',
                      backgroundColor: '#388DE2',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <p
                      style={{
                        color: isLightTheme ? '#17171b' : '#ffff',
                        fontSize: '34px',
                        textTransform: 'lowercase'
                      }}
                    >
                      {username?.charAt(0)}
                    </p>
                  </div>
                )
                }
                <p
                  style={{
                    color: isLightTheme ? '#17171b' : '#ffff',
                    fontSize: '34px',
                    marginLeft: '15px',
                    marginTop: '40px',
                    textTransform: 'lowercase'
                  }}
                >
                  {username}
                </p>
              </div>
            </div>
            {thread.chatbot.avatar ? (
              <div style={{ display: 'flex' }}>
                <div
                  style={{
                    backgroundColor: '#1E293B',
                    display: 'flex',
                    width: '300px',
                    height: '300px',
                    borderRadius: '50%'
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
                      zIndex: '1px' // Ensure the image is above the SVG
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
