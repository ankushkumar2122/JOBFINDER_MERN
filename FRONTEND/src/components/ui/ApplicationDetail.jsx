// components/ui/ApplicationDetail.jsx

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ApplicationDetail() {
  const { id } = useParams();
  const [application, setApplication] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/applications/${id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      
       .then((data) => {
      console.log("Fetch data:", data);
      setApplication(data.application);
    })
      .catch((err) => console.error("Error:", err));
  }, [id]);

  if (!application) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Application Details</h2>
      <p><strong>Status:</strong> {application.status}</p>
      <p><strong>Job Title:</strong> {application.job?.title}</p>
      <p><strong>Company:</strong> {application.job?.company?.name}</p>
      {/* Add more fields as needed */}
    </div>
  );
}
