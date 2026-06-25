import { useEffect, useState } from "react";

export default function Dashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [number, setNumber] = useState("");
  const [variant, setVariant] = useState("");
  const [message, setMessage] = useState("");

  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  // Protecție admin + încărcare date
  useEffect(() => {
    if (localStorage.getItem("admin") !== "true") {
      window.location.href = "/admin";
      return;
    }

    async function loadItems() {
      const res = await fetch("/api/folwin");
      const json = await res.json();
      setItems(json);
    }

    loadItems();
  }, []);

  // Adăugare date
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

      // Reload items
      const reload = await fetch("/api/folwin");
      setItems(await reload.json());
    } else {
      setMessage("Eroare la trimitere.");
    }
  };

  // Ștergere obiect
  async function handleDelete(id) {
    const res = await fetch("/api/folwin", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setItems(items.filter((i) => i._id !== id));
    }
  }

  // Salvare modificări
  async function handleUpdate(e) {
    e.preventDefault();

    const res = await fetch("/api/folwin", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingItem),
    });

    if (res.ok) {
      setItems(
        items.map((i) => (i._id === editingItem._id ? editingItem : i))
      );
      setEditingItem(null);
    }
  }

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>Admin Panel</h1>

      {/* FORMULAR ADAUGARE */}
      <h2>Adaugă date</h2>

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

      <hr style={{ margin: "40px 0" }} />

      {/* LISTA OBIECTE */}
      <h2>Obiecte existente</h2>

      {items.map((item) => (
        <div
          key={item._id}
          style={{
            border: "1px solid #ccc",
            padding: 15,
            marginBottom: 10,
            borderRadius: 8,
          }}
        >
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <p><strong>{item.number}</strong></p>
          <p>Varianta: {item.variant}</p>

          <button
            onClick={() => handleDelete(item._id)}
            style={{ marginRight: 10 }}
          >
            Șterge
          </button>

          <button onClick={() => setEditingItem(item)}>
            Modifică
          </button>
        </div>
      ))}

      {/* FORMULAR EDITARE */}
      {editingItem && (
        <div style={{ marginTop: 40 }}>
          <h2>Modifică obiect</h2>

          <form onSubmit={handleUpdate}>
            <label>Titlu:</label><br />
            <input
              value={editingItem.title}
              onChange={(e) =>
                setEditingItem({ ...editingItem, title: e.target.value })
              }
            /><br /><br />

            <label>Descriere:</label><br />
            <input
              value={editingItem.description}
              onChange={(e) =>
                setEditingItem({ ...editingItem, description: e.target.value })
              }
            /><br /><br />

            <label>Numar:</label><br />
            <input
              value={editingItem.number}
              onChange={(e) =>
                setEditingItem({ ...editingItem, number: e.target.value })
              }
            /><br /><br />

            <label>Varianta:</label><br />
            <input
              value={editingItem.variant}
              onChange={(e) =>
                setEditingItem({ ...editingItem, variant: e.target.value })
              }
            /><br /><br />

            <button type="submit">Salvează modificările</button>
          </form>
        </div>
      )}
    </div>
  );
}
