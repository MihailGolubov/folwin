import { useEffect, useState } from "react";

export default function Dashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [number, setNumber] = useState("");
  const [variant, setVariant] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (localStorage.getItem("admin") !== "true") {
      window.location.href = "/admin";
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title,
      description,
      number,
      variant,
    };

    const res = await fetch("/api/folwin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setMessage("Datele au fost adăugate cu succes!");
      setTitle("");
      setDescription("");
      setNumber("");
      setVariant("");
    } else {
      setMessage("Eroare la trimitere.");
    }
  };

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>Admin Panel</h1>

      <form onSubmit={handleSubmit}>
        <label>Titlu:</label><br />
        <input value={title} onChange={(e) => setTitle(e.target.value)} /><br /><br />

        <label>Descriere:</label><br />
        <input value={description} onChange={(e) => setDescription(e.target.value)} /><br /><br />

        <label>Numar:</label><br />
        <input value={number} onChange={(e) => setNumber(e.target.value)} /><br /><br />

        <label>Varianta:</label><br />
        <input value={variant} onChange={(e) => setVariant(e.target.value)} /><br /><br />

        <button type="submit">Transmite</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
