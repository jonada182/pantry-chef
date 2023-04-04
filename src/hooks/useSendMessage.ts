import { useEffect, useState } from "react";
import { API } from "../helpers";

type SendMessageProps = {
  message: string;
};

type SendMessageResponse = {
  isLoading: boolean;
  responseMessage: string;
};

const sendMessage = async (message: string): Promise<string> => {

  try {

    const response = await API.post("chat", {
      message: message,
    });

    return response?.data?.message;

  } catch (error: any) {
    if (error.response) {
      // Request made but the server responded with an error
      console.log("API Response Error:", error.message, error.response.status);
    } else if (error.request) {
      // Request made but no response is received from the server.
      console.log("API Error:", error.message);
    } else {
      // Error occured while setting up the request
      console.log("Error", error.message);
    }
  }

  return "";
};

export const useSendMessage = ({ message }:SendMessageProps): SendMessageResponse => {

  const [isLoading, setIsLoading] = useState(true);
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    (async () => {
      try {
        if (message != "") {
          setIsLoading(true);
          setResponseMessage(await sendMessage(message));
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, [message]);

  return {
    isLoading: isLoading,
    responseMessage: responseMessage,
  };
};
