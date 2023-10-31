import { useState, useEffect } from 'react';

const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET;
const HASURA_ENDPOINT = process.env.HASURA_ENDPOINT;

const headers = {
    'Content-Type': 'application/json',
    'x-hasura-admin-secret': HASURA_ADMIN_SECRET
};

function fetchAPI(endpoint, query, variables = {}) {
    return fetch(`/api/${endpoint}`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    })
    .then(res => res.json())
    .then(data => data.data);
}

function Browse() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [chatbots, setChatbots] = useState([]);
    const [selectedChatbot, setSelectedChatbot] = useState(null);
    const [messages, setMessages] = useState([]);
    const [selectedThread, setSelectedThread] = useState(null);

    useEffect(() => {
        const GET_CATEGORIES = `
          query {
            category {
              name
            }
          }
        `;
    
        fetchAPI("categories", GET_CATEGORIES).then(data => {
            if (data && data.category) {
                console.log("Categories Data:", data);
                setCategories(data.category.map(cat => cat.name));
            } else {
                console.error("Unexpected categories data format:", data);
            }
        })
        .catch(error => {
            console.error("Error fetching categories:", error.message);
            console.error("Error stack:", error.stack);
        });

    }, []);

    useEffect(() => {
        if (selectedCategory) {
            const GET_CHATBOTS_BY_CATEGORY = `
            query GetChatbotsByCategory($categoryName: String!) {
                chatbot(where: {categories: {category: {name: {_eq: $categoryName}}}}) {
                    name
                }
            }            
            `;
    
            fetchAPI("chatbots", GET_CHATBOTS_BY_CATEGORY, { categoryName: selectedCategory }).then(data => {
                if (data && data.chatbot) {
                    console.log("Chatbots Data for Category:", data);
                    setChatbots(data.chatbot);
                } else {
                    console.error("Unexpected chatbots data format for category:", data);
                }
            })
            .catch(error => {
                console.error(`Error fetching chatbots for category '${selectedCategory}':`, error);
            });
        }
    }, [selectedCategory]);

    useEffect(() => {
        if (selectedChatbot) {
            const GET_CHATBOT_ID = `
                query GetChatbotIdByName($chatbotName: String!) {
                    chatbot(where: {name: {_eq: $chatbotName}}) {
                        chatbot_id
                    }
                }
            `;
    
            const GET_MESSAGES_BY_CHATBOT = `
                query GetMessagesByChatbot($chatbotId: Int!) {
                message(where: {
                    _or: [
                        {_and: [
                            {sender_id: {_eq: $chatbotId}},
                            {type: {_eq: "chatbot"}}
                        ]},
                        {_and: [
                            {receiver_id: {_eq: $chatbotId}},
                            {type: {_eq: "user"}}
                        ]}
                    ]
                }) {
                    message_id
                    content
                    sender_id
                    receiver_id
                    type
                    created_at
                }
            }
            
            `;
    
            fetchAPI("messages", GET_CHATBOT_ID, { chatbotName: selectedChatbot })
            .then(data => {
                const chatbotId = data?.chatbot?.[0]?.chatbot_id;
                if (chatbotId) {
                    return fetchAPI("messages", GET_MESSAGES_BY_CHATBOT, { chatbotId });
                } else {
                    console.error("Chatbot ID not found for:", selectedChatbot);
                    return Promise.reject("Chatbot ID not found");
                }
            })
            .then(data => {
                if (data && data.message) {
                    console.log("Messages Data for Chatbot:", data);
                    setMessages(data.message);
                } else {
                    console.error("Unexpected messages data format for chatbot:", data);
                }
            })
            .catch(error => {
                console.error(`Error fetching data for chatbot '${selectedChatbot}':`, error);
            });
    }
}, [selectedChatbot]);

    return (
        <div>
            <nav className="flex mb-4 space-x-4 overflow-x-auto">
                {categories.map(category => (
                    <button
                        onClick={() => setSelectedCategory(category)}
                        className="px-3 py-2 hover:bg-gray-200 transition-colors"
                        key={category}
                    >
                        {category}
                    </button>
                ))}
            </nav>

            {selectedCategory && (
                <section className="mb-4">
                    {chatbots.map(chatbot => (
                        <div
                            onClick={() => setSelectedChatbot(chatbot.name)}
                            className="border p-4 hover:shadow-lg transition-shadow cursor-pointer"
                            key={chatbot.name}
                        >
                            {chatbot.name}
                        </div>
                    ))}
                </section>
            )}

            {selectedChatbot && (
                <section className="mb-4">
                    {messages.map((message, index) => (
                        <div
                            onClick={() => setSelectedThread(message.message_id)}
                            className="border p-4 hover:bg-gray-100 transition-colors cursor-pointer truncate"
                            key={index}
                        >
                            {message.content}
                        </div>
                    ))}
                </section>
            )}
        </div>
    );
}

export default Browse;

