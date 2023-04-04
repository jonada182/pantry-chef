import { useEffect, useState } from "react";
import { API } from "../helpers";

interface SendMessageProps {
  message: string;
}

interface SendMessageResponse {
  isLoading: boolean;
  responseMessage: string;
}

export const useSendMessage = (props :SendMessageProps): SendMessageResponse => {

  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const sendMessage = async () => {

    if (props.message == "")
      return;

    // Uncomment to mock response instead of calling the API
    // setResponseMessage("Mocking API response");
    // return;

    setIsLoading(true);

    try {

      const response = await API.post("chat", {
        message: props.message,
      });

      setResponseMessage(response?.data?.message);

    } catch (error: any) {
      if (error.response) {
        console.log("API Response Error:", error.message, error.response.status);
      } else if (error.request) {
        console.log("API Error:", error.message);
      } else {
        console.log("Error", error.message);
      }
    }

    setIsLoading(false);
  };

  useEffect(() => {
    sendMessage();
  }, [props.message]);

  return {
    isLoading: isLoading,
    responseMessage: responseMessage,
  };
};
