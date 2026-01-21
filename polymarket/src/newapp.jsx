import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.min.css";
import "./newapp.css";
const PolymarketEvents = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const url = "/api-polymarket/events?active=true&closed=false&limit=none";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (e) {
        console.error("An error occurred:", e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const descriptionEl = document.getElementById("description");
    if (descriptionEl && selectedEvent) {
      const text = selectedEvent.description;
      const yesText = text.replace(/"yes"/gi, (match) => `<yes-mark>${match}</yes-mark>`);
      const noText = yesText.replace(/"no"/gi, (match) => `<no-mark>${match}</no-mark>`);
      descriptionEl.innerHTML = noText;
    }
  }, [selectedEvent]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Container>
        <Row className="justify-content-center mt-4 mb-4">
          <h1 className="mb-2">Polymarket Events</h1>
        </Row>

        <Row>
          <Form.Select
            aria-label="Default select example"
            className="top-select px-5 py-2"
            onChange={(e) => {
              const selected = data.find(
                (datum) => datum.id === e.target.value
              );
              setSelectedEvent(selected);
            }}
          > <option>Select an Event</option>
            {data.map((datum, index) => (
              <option key={datum.id || index} value={datum.id}>
                {datum.title}
              </option>
            ))}
          </Form.Select>
        </Row>
        <Row className="justify-content-center">
          {selectedEvent ? 
          (
            <Card className="mt-4">
              <h2 className="m-4g">{selectedEvent.title}</h2>
              <Card.Body>
                <div>
                  <p id="description">{selectedEvent.description}</p>
                  <p>Volume: {selectedEvent.volume}</p>
                </div>
              </Card.Body>
            </Card>
          ) : 
          (<>
            <h3 className="mt-4" >No event selected.</h3>
            <i>What's on your mind?</i>
            </>

          )}
        </Row>
      </Container>
    </div>
  );
};

export default PolymarketEvents;
