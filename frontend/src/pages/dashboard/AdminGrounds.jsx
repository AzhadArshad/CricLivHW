import { useEffect, useState } from "react";
import API from "../../services/api";
import GroundCardAdmin from "../../components/GroundCardAdmin";
import { toast } from "react-hot-toast";

function AdminGrounds() {
  const [grounds, setGrounds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGrounds = async () => {
      try {
        const res = await API.get("admin/grounds");
        setGrounds(res.data);
      } catch (err) {
        toast.error("Failed to load grounds");
      } finally {
        setLoading(false);
      }
    };
    fetchGrounds();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "3rem" }}>
        <p>Loading grounds...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1
        style={{ textAlign: "center", marginBottom: "2rem", fontSize: "2rem" }}
      >
        MY Grounds
      </h1>

      {grounds.length === 0 ? (
        <p style={{ textAlign: "center", color: "#666" }}>
          No grounds available yet.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "1.5rem",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          }}
        >
          {grounds.map((ground) => (
            <GroundCardAdmin key={ground.ground_id} ground={ground} />
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminGrounds;
