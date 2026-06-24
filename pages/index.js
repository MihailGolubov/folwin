export async function getServerSideProps(context) {
  const protocol = context.req.headers["x-forwarded-proto"] || "http";
  const host = context.req.headers.host;

  const res = await fetch(`${protocol}://${host}/api/fruits`);
  const fruits = await res.json();

  return {
    props: { fruits },
  };
}

export default function Home({ fruits }) {
  return (
    <div style={{ padding: 20 }}>
      <h1>Lista de fructe smt 226</h1>
      {fruits.map((f) => (
        <div key={f._id}>
          <strong>{f.name}</strong> – {f.color}
        </div>
      ))}
    </div>
  );
}
