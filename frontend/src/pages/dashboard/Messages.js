import React, { useState } from 'react';
import {
    HiSearch,
    HiPaperAirplane,
    HiDotsVertical,
    HiPaperClip,
    HiEmojiHappy,
    HiCheck,
    HiCheckCircle
} from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';

const Messages = () => {
    const { user } = useAuth();
    const [selectedChat, setSelectedChat] = useState(0);
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // Mock conversations data
    const conversations = [
        {
            id: 1,
            name: 'David Miller',
            avatar: 'DM',
            role: user?.role === 'instructor' ? 'Student' : 'Instructor',
            lastMessage: 'Thanks for the clarification on the assignment!',
            time: '2 min ago',
            unread: 2,
            online: true
        },
        {
            id: 2,
            name: 'Jessica Williams',
            avatar: 'JW',
            role: user?.role === 'instructor' ? 'Student' : 'Instructor',
            lastMessage: 'When is the next live session?',
            time: '1 hour ago',
            unread: 0,
            online: true
        },
        {
            id: 3,
            name: 'Robert Brown',
            avatar: 'RB',
            role: user?.role === 'instructor' ? 'Student' : 'Instructor',
            lastMessage: 'I completed the project. Please review.',
            time: 'Yesterday',
            unread: 0,
            online: false
        },
        {
            id: 4,
            name: 'Amanda Garcia',
            avatar: 'AG',
            role: user?.role === 'instructor' ? 'Student' : 'Instructor',
            lastMessage: 'Great course! Really enjoying it.',
            time: '2 days ago',
            unread: 0,
            online: false
        }
    ];

    // Mock messages for selected chat
    const chatMessages = [
        {
            id: 1,
            sender: 'them',
            text: 'Hi! I had a question about the React hooks lesson.',
            time: '10:30 AM',
            status: 'read'
        },
        {
            id: 2,
            sender: 'me',
            text: 'Of course! What would you like to know?',
            time: '10:32 AM',
            status: 'read'
        },
        {
            id: 3,
            sender: 'them',
            text: 'I\'m confused about when to use useEffect vs useMemo. They seem similar.',
            time: '10:35 AM',
            status: 'read'
        },
        {
            id: 4,
            sender: 'me',
            text: 'Good question! useEffect is for side effects like data fetching or subscriptions. useMemo is for memoizing expensive computations to avoid recalculating on every render.',
            time: '10:38 AM',
            status: 'read'
        },
        {
            id: 5,
            sender: 'them',
            text: 'Thanks for the clarification on the assignment!',
            time: '10:40 AM',
            status: 'delivered'
        }
    ];

    const filteredConversations = conversations.filter(conv =>
        conv.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSend = () => {
        if (message.trim()) {
            // In a real app, this would send the message via API
            console.log('Sending message:', message);
            setMessage('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="h-[calc(100vh-8rem)] flex rounded-2xl overflow-hidden border border-gray-200 bg-white">
            {/* Conversations List */}
            <div className="w-80 border-r border-gray-200 flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900 mb-3">Messages</h2>
                    <div className="relative">
                        <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search conversations..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Conversation List */}
                <div className="flex-1 overflow-y-auto">
                    {filteredConversations.map((conv, index) => (
                        <div
                            key={conv.id}
                            onClick={() => setSelectedChat(index)}
                            className={`p-4 flex items-center gap-3 cursor-pointer transition-colors ${selectedChat === index ? 'bg-blue-50' : 'hover:bg-gray-50'
                                }`}
                        >
                            <div className="relative">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                                    {conv.avatar}
                                </div>
                                {conv.online && (
                                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <p className="font-medium text-gray-900 truncate">{conv.name}</p>
                                    <span className="text-xs text-gray-400">{conv.time}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-gray-500 truncate">{conv.lastMessage}</p>
                                    {conv.unread > 0 && (
                                        <span className="min-w-[20px] h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                                            {conv.unread}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                                {conversations[selectedChat]?.avatar}
                            </div>
                            {conversations[selectedChat]?.online && (
                                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                            )}
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">{conversations[selectedChat]?.name}</p>
                            <p className="text-xs text-gray-500">
                                {conversations[selectedChat]?.online ? 'Online' : 'Offline'}
                            </p>
                        </div>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <HiDotsVertical className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {chatMessages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[70%] ${msg.sender === 'me' ? 'order-1' : ''}`}>
                                <div
                                    className={`px-4 py-3 rounded-2xl ${msg.sender === 'me'
                                            ? 'bg-blue-600 text-white rounded-br-md'
                                            : 'bg-gray-100 text-gray-900 rounded-bl-md'
                                        }`}
                                >
                                    <p className="text-sm">{msg.text}</p>
                                </div>
                                <div className={`flex items-center gap-1 mt-1 ${msg.sender === 'me' ? 'justify-end' : ''}`}>
                                    <span className="text-xs text-gray-400">{msg.time}</span>
                                    {msg.sender === 'me' && (
                                        msg.status === 'read'
                                            ? <HiCheckCircle className="w-3.5 h-3.5 text-blue-500" />
                                            : <HiCheck className="w-3.5 h-3.5 text-gray-400" />
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <HiPaperClip className="w-5 h-5 text-gray-500" />
                        </button>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type a message..."
                            className="flex-1 px-4 py-3 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <HiEmojiHappy className="w-5 h-5 text-gray-500" />
                        </button>
                        <button
                            onClick={handleSend}
                            disabled={!message.trim()}
                            className="p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-xl transition-colors"
                        >
                            <HiPaperAirplane className="w-5 h-5 transform rotate-90" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Messages;
