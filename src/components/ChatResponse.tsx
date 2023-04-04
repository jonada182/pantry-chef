interface Props {
  message: string;
  response: string;
  loading: boolean;
}

const ChatResponse = ({ message, response, loading }: Props) => {
  return (
    <>
      {response != "" && !loading && (
        <div className=" flex flex-col gap-4">
          <div className="bg-divider text-primary-text p-4 rounded flex flex-col">
            <strong className="text-black font-bold opacity-70">Me</strong>
            <span className="italic">{message}</span>
          </div>
          <div className="bg-accent text-white p-4 rounded flex flex-col  ">
            <strong className="text-black font-bold opacity-70">Bot</strong>
            <span className="text-lg italic" dangerouslySetInnerHTML={{ __html: response }}></span>
          </div>
        </div>
      )}
      {loading && (
        <div className=" flex flex-col gap-4">
          <div className="bg-accent text-white p-4 rounded flex flex-col  ">
            <strong className="text-black font-bold opacity-70">Bot</strong>
            <span className="text-lg italic animate-pulse">Mmm...</span>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatResponse;
