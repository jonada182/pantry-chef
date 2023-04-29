import { useSendMessage } from "../useSendMessage";
import axios from "axios";
import { waitFor, renderHook, act } from "@testing-library/react";

jest.mock("../../helpers/constants", () =>({ API_BASE_URL: "http://localhost/api" }));

jest.mock("axios");

describe("useSendMessage", () => {

  beforeEach(() => {
  });

  it("should send a message and return a response", async () => {
    const responseData = { success: true };
    const mockAxios = axios as jest.Mocked<typeof axios>;
    mockAxios.create.mockImplementation(() => axios );
    mockAxios.post.mockResolvedValueOnce(responseData);

    const { result, rerender } = renderHook(() => useSendMessage());

    act(() => {
      result.current.sendMessage("test message");
    });

    rerender();

    expect(result.current.loading).toBe(true);

    waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(result.current.responseMessage).toBe(responseData);
    });
  });

  it("should send a message and return an error", async () => {
    const mockAxios = axios as jest.Mocked<typeof axios>;
    mockAxios.create.mockImplementation(() => axios );
    mockAxios.post.mockImplementation(() => {
      throw Error("new error");
    });

    const { result } = renderHook(() => useSendMessage());

    act(() => {
      result.current.sendMessage("test message");
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).not.toBeNull();
    expect(result.current.responseMessage).toBe("");
  });

});
