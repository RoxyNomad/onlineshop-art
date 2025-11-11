"use client"; 

import { useEffect, useState } from "react"; 
import ChatList from "./ChatList"; 
import { ChatUser, ChatMessage } from "@/domain/chat/entities/chat.entity"; 
import { fetchActiveUsers } from "@/domain/chat/queries/fetchActiveUsers.query"; 

interface ChatListContainerProps { 
	allUsers: ChatUser[]; 
	messages: ChatMessage[]; 
	currentUserId: string; 
	onSelectUser: (user: ChatUser) => void; 
	selectedUser: ChatUser | null; 
} 

export default function ChatListContainer({ 
	allUsers, messages, currentUserId, onSelectUser, selectedUser 
}: ChatListContainerProps) { 
	const [activeUsers, setActiveUsers] = useState<ChatUser[]>([]); 
	
	useEffect(() => { 
		const loadActiveUsers = async () => { 
			const users = await fetchActiveUsers(currentUserId, messages, allUsers); 
			setActiveUsers(users); 
		}; 
		
		loadActiveUsers(); 
	}, [allUsers, messages, currentUserId]); 
	
	return ( 
		<ChatList users={activeUsers} selectedUser={selectedUser} onSelectUser={onSelectUser} /> 
	); 
}