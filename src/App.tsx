import { useState } from "react";
import API from "./api";
import ChatResponse from "./components/ChatResponse";
import { Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";

function App() {
  const [message, setMessage] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (message == "") {
      return;
    }

    try {
      setIsLoading(true);
      const response = await API.post("chat", {
        message: message,
      }).finally(() => {
        setIsLoading(false);
      });
      setChatResponse(response.data.message);
    } catch (error: any) {
      throw new Error(error.message);
    }
    setMessage("");
  };

  return (
    <Card className="App">
      <Card.Body>
        <Card.Title>Chatbot UI</Card.Title>
        <Row>
          <Col>
            <Form.Control
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
          </Col>
          <Col>
            <Button onClick={() => sendMessage()} disabled={isLoading}>
              { isLoading ? (
                <Spinner />
              ) : "Send"}
            </Button>
          </Col>
        </Row>
        <ChatResponse message={ chatResponse } />
      </Card.Body>
    </Card>
  );
}

export default App;
