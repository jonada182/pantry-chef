import { useState } from "react";
import { api } from "../helpers";
import { testMessage } from "./testData";
import { MOCK_API } from "../helpers/constants";

type SendMessageResponse = {
  isLoading: boolean;
  requestMessage: string;
  responseMessage: string;
  error: Error | null;
  sendMessage: (message: string) => void;
};

export const useSendMessage = (): SendMessageResponse => {

  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [requestMessage, setRequestMessage] = useState("");
  const [error, setError] = useState<Error | null>(null);

  const resetVariables = () => {
    setIsLoading(false);
    setError(null);
    setResponseMessage("");
  };

  const sendMockMessage = (mockMessage: string = "mocked response") => {
    setIsLoading(true);
    setTimeout(() => {
      setResponseMessage(mockMessage);
      setIsLoading(false);
    }, 2000);
  };

  const sendMessage = async (message: string) => {

    resetVariables();
    setRequestMessage(message);

    if (message == "")
      return setError(Error("You can't send an empty message"));

    if (MOCK_API == "true")
      return sendMockMessage(testMessage);

    setIsLoading(true);

    try {
      const API = api.init();
      const response = await API.post("chat", {
        message: message,
      });

      setResponseMessage(response?.data?.message);

    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }

  };

  return {
    isLoading: isLoading,
    responseMessage: responseMessage,
    requestMessage: requestMessage,
    error: error,
    sendMessage: sendMessage,
  };

};
