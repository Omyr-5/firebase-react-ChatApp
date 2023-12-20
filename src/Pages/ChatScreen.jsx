import React, { useState, useEffect, useRef } from 'react';
import { auth } from '../../firebase-config/FirebaseConfig';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { signOut } from "firebase/auth";

const ChatScreen = () => {
    const [formValue, setFormValue] = useState('');
    const [messages, setMessages] = useState([]);
    const firestore = getFirestore();
    const chatWindowRef = useRef(null);


    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const messagesRef = collection(firestore, 'messages');
                const q = query(messagesRef, orderBy('createdAt'));
                const unsubscribe = onSnapshot(q, (snapshot) => {
                    const data = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setMessages(data);
                });

                return () => unsubscribe();
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, [firestore]);

    const sendMessage = async (e) => {
        e.preventDefault();
        const { uid } = auth.currentUser;

        try {
            const messagesRef = collection(firestore, 'messages');
            await addDoc(messagesRef, {
                text: formValue,
                createdAt: new Date(),
                uid: uid
            });
            setFormValue('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };
    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            localStorage.clear()
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
            console.log(error, "Error on sign out")
        });
    }


    useEffect(() => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", background: "#281d1d", width: "600px", margin: "auto", padding: "100px" }}>
            <button type="button" onClick={handleLogout}>sign out</button>
            <div style={{
                height: "400px", background: "black", padding: "10px", overflow: "auto", scrollBehavior: 'smooth'
            }}
                ref={chatWindowRef}
            >
                {messages.map((msg) => {
                    const messageClass = msg.uid === auth.currentUser.uid ? 'sent' : 'received';
                    return (
                        <div key={msg.id} className={messageClass}>
                            <div style={{ display: "flex", justifyContent: messageClass === "received" ? "flex-start" : "flex-end" }}>
                                <p>{msg.text}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <form onSubmit={sendMessage} style={{ width: "100%", display: "flex", gap: "20px", justifyContent: "center", alignItems: "center" }}>
                <input
                    style={{ width: "100%", padding: "10px", marginBottom: "20px", marginTop: "20px" }}
                    type="text"
                    placeholder='hellow...'
                    value={formValue}
                    onChange={(e) => setFormValue(e.target.value)}
                />
                <button type="submit"
                    style={{
                        width: "20%", padding: "15px"
                    }}
                > Send</button>
            </form>
        </div >
    );
};

export default ChatScreen;
