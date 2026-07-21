import { useParams } from "react-router-dom";
import resources from "../../data/resources";

function ResourceDetails() {
  const { id } = useParams();

  const resource = resources.find(
    (item) => item.slug === id
  );

  if (!resource) {
    return (
      <div style={{ padding: "80px", textAlign: "center" }}>
        <h1>Resource Not Found</h1>
      </div>
    );
  }

  return (
    <section
      style={{
        maxWidth: "1000px",
        margin: "60px auto",
        padding: "20px",
      }}
    >
      <h1>{resource.title}</h1>

      <p
        style={{
          marginTop: "20px",
          color: "#6b7280",
          lineHeight: "1.8",
        }}
      >
        {resource.description}
      </p>

      <div
        style={{
          display: "flex",
          gap: "40px",
          marginTop: "35px",
        }}
      >
        <div>
          <strong>Category</strong>

          <p>{resource.category}</p>
        </div>

        <div>
          <strong>Updated</strong>

          <p>{resource.updated}</p>
        </div>
      </div>

      <button
        style={{
          marginTop: "40px",
          background: "#1565C0",
          color: "#fff",
          border: "none",
          padding: "14px 24px",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        Open Official Website
      </button>
    </section>
  );
}

export default ResourceDetails;