export async function getServerSideProps() {
  const res = await fetch("http://folwin.com/api/fruits");
  const fruits = await res.json();

  return {
    props: { fruits },
  };
}

export default function Home({ fruits }) {
  return (
    <div style={{ padding: 20 }}>
      <h1>Lista de fructe 3</h1>
      {fruits.map((f) => (
        <div key={f._id}>
          <strong>{f.name}</strong> – {f.color}
        </div>
      ))}
    </div>
  );
}
