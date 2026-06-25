import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/folwin");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Eroare la fetch:", err);
      }
    }

    loadData();
  }, []);

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Hello</h1>

      <h2>Date din baza de date:</h2>

      {data.length === 0 && <p>Nu există date în FolwinBase.</p>}

      {data.map((item) => (
        <div
          key={item._id}
          style={{
            marginTop: "20px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            maxWidth: "400px",
          }}
        >
          <h3>{item.title}</h3>
          <p>{item.description}</p>

          <p><strong>Număr:</strong> {item.number}</p>
          <p><strong>Varianta:</strong> {item.variant}</p>
        </div>
      ))}
    </div>
  );
}
