import { Alert } from "react-bootstrap";

interface Props {
  message: string;
}

const ChatResponse = ({ message }: Props) => {
  return (
    <div>
      { message != "" && (
        <Alert variant="success">{ message }</Alert>
      )}
    </div>
  );
};

export default ChatResponse;
