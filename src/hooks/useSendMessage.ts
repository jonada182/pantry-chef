import { useEffect, useState } from "react";
import { api } from "../helpers";
import { testMessage } from "./testData";
import { MOCK_API } from "../helpers/constants";

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

  const sendMockMessage = (mockMessage: string = "mocked response") => {
    setIsLoading(true);
    setTimeout(() => {
      setResponseMessage(mockMessage);
      setIsLoading(false);
    }, 2000);
  };

  const sendMessage = async (message: string) => {

    if (message == "")
      return;

    if (MOCK_API == "true")
      return sendMockMessage(testMessage);

    setIsLoading(true);

    try {
      const API = api.init();
      const response = await API.post("chat", {
        message: message,
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
    sendMessage(props.message);
  }, [props.message]);

  return {
    isLoading: isLoading,
    responseMessage: responseMessage,
  };

};
