import { useState } from "react";
import { api } from "../helpers";
import { testMessage } from "./testData";
import { MOCK_API } from "../helpers/constants";

type SendMessageResponse = {
  loading: boolean;
  requestMessage: string;
  responseMessage: string;
  error: Error | null;
  sendMessage: (message: string) => void;
  resetMessage: () => void;
};

export const useSendMessage = (): SendMessageResponse => {

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [requestMessage, setRequestMessage] = useState("");
  const [error, setError] = useState<Error | null>(null);

  const resetState = () => {
    setLoading(false);
    setError(null);
    setResponseMessage("");
  };

  const sendMockMessage = (mockMessage: string = "mocked response") => {
    setLoading(true);
    setTimeout(() => {
      setResponseMessage(mockMessage);
      setLoading(false);
    }, 2000);
  };

  const sendMessage = async (message: string) => {

    resetState();
    setRequestMessage(message);

    if (message == "")
      return setError(Error("You can't send an empty message"));

    if (MOCK_API == "true")
      return sendMockMessage(testMessage);

    setLoading(true);

    try {
      const API = api.init();
      const response = await API.post("chat", { message: message });

      setResponseMessage(response?.data?.message);

    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }

  };

  return {
    loading: loading,
    responseMessage: responseMessage,
    requestMessage: requestMessage,
    error: error,
    sendMessage: sendMessage,
    resetMessage: resetState,
  };

};
