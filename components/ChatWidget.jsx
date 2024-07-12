"use client";
import { lazy, Suspense, useEffect, useState } from "react";
import axios from 'axios';

const ChatBot = lazy(() => import("react-chatbotify"));

const MyChatBot = () => {
  const options = {
		// play around with the colors below to try out different themes!
		theme: {
			embedded: true,
			primaryColor: "#F4B41A",
			secondaryColor: "#143D59"
		},
		chatHistory: {
			storageKey: "example_theming"
		},

		// depending on your color scheme, you may want to make adjustments
		// to other parts of your chatbot (uncomment below to see what happens)
		// userBubbleStyle: {
		//     color: "#000000"
		// },
		// botOptionStyle: {
		//     color: "#FFA500",
		//     borderColor: "#FFA500"
		// },
		// botOptionHoveredStyle: {
		//     backgroundColor: "#FFA500",
		// },
		// sendButtonStyle: {
		//     backgroundColor: "#FFA500",
		// },
		// sendButtonHoveredStyle: {
		//     backgroundColor: "#FFD700",
		// }
        
        theme: { embedded: false }, 
        chatHistory: { storageKey: "example_hotel_management" } , 
        audio: {disabled: false, defaultToggledOn: true, tapToPlay: true},
        chatInput: {showCharacterCount: true, characterLimit: 10},
        voice: {disabled: false}
        
	}
  const [form, setForm] = useState({});

  const sendMessageToRasa = async (message) => {
    try {
      const response = await axios.post('/api/rasa', { sender: 'user', message });
      return response.data;
    } catch (error) {
      console.error('Error communicating with Rasa:', error);
      return [{ text: 'Error communicating with Rasa server' }];
    }
  };

  const flow = {
    start: {
      message: "Welcome to our Hotel! How can I assist you today?",
      options: ["Room Reservation", "Restaurant Booking", "General Inquiry"],
      path: (option) => {
        switch (option) {
          case "Room Reservation":
            return "room_reservation";
          case "Restaurant Booking":
            return "restaurant_booking";
          case "General Inquiry":
            return "general_inquiry";
          default:
            return "start";
        }
      },
    },
    // Add the rest of the flow here...
  };

  return (
    <ChatBot
      options={options}
      flow={flow}
    />
  );
};

const ChatWidget = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      {isLoaded && (
        <Suspense fallback={<div>Loading...</div>}>
          <MyChatBot />
        </Suspense>
      )}
    </>
  );
};

export default ChatWidget;
