import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const PolymarketEvents = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

const url = "/api-polymarket/events?active=true&closed=false&limit=5";

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Active Events</h1>
      {data.map((datum, index) => (
        <div key={datum.id || index} style={{ borderBottom: '2px solid #ccc', marginBottom: '20px' }}>
          <h2>Market Title: {datum.title}</h2>
          <p><strong>Description:</strong> {datum.description}</p>
          
          {/* Displaying other top-level keys like the Python loop does */}
          {Object.entries(datum).map(([key, value]) => {
            if (key === 'markets') {
              return (
                <div key={key}>
                  <h3>Available Markets:</h3>
                  <hr />
                  {value.map((market, mIdx) => (
                    <div key={mIdx} style={{ marginLeft: '20px', backgroundColor: 'red', padding: '10px' }}>
                      {Object.entries(market).map(([mKey, mValue]) => (
                        <p key={mKey} style={{ fontSize: '0.85rem' }}>
                          <strong>{mKey}:</strong> {JSON.stringify(mValue)}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              );
            }
            // Skip title/description as we already rendered them above
            if (key !== 'title' && key !== 'description') {
              return (
                <p key={key}>
                  <strong>{key}:</strong> {JSON.stringify(value)}
                </p>
              );
            }
            return null;
          })}
        </div>
      ))}
    </div>
  );
};

export default PolymarketEvents;