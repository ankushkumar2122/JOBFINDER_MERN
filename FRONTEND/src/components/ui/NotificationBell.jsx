import React, { useEffect, useState } from "react";

export default function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  // ✅ Use .env value for backend API base
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

  const fetchNotifications = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/notifications`, {
        credentials: "include",
      });

      // Try to parse JSON safely
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Server did not return valid JSON");
      }

      if (data.success) {
        setNotifications(data.notifications);
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error.message);
    }
  };

  useEffect(() => {
    fetchNotifications();

    // ✅ Poll every 5 seconds
    const interval = setInterval(fetchNotifications, 5000);
    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter(
    (n) => n.status === "pending"
  ).length;

  const handleNotificationClick = async (notification) => {
    try {
      await fetch(`${API_BASE}/api/notifications/${notification._id}/read`, {
        method: "POST",
        credentials: "include",
      });

      setNotifications((prev) =>
        prev.map((n) =>
          n._id === notification._id ? { ...n, status: "read" } : n
        )
      );

      window.location.href = `/applications/${notification.applicationId}`;
    } catch (error) {
      console.error("Failed to mark notification as read", error);
    }
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ fontSize: "24px", cursor: "pointer" }}
      >
        🔔
        {unreadCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: "-5px",
              right: "-5px",
              backgroundColor: "red",
              color: "white",
              borderRadius: "50%",
              padding: "2px 6px",
              fontSize: "12px",
            }}
          >
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            marginTop: "5px",
            width: "300px",
            maxHeight: "400px",
            overflowY: "auto",
            backgroundColor: "white",
            border: "1px solid #ccc",
            zIndex: 1000,
          }}
        >
          {notifications.length === 0 && (
            <p style={{ padding: "10px" }}>No notifications</p>
          )}
          {notifications.map((notification) => (
            <div
              key={notification._id}
              onClick={() => handleNotificationClick(notification)}
              style={{
                padding: "10px",
                cursor: "pointer",
                backgroundColor:
                  notification.status === "pending" ? "#eef" : "white",
                fontWeight:
                  notification.status === "pending" ? "bold" : "normal",
                borderBottom: "1px solid #ddd",
              }}
            >
              <div>{notification.message}</div>
              <small style={{ color: "#888" }}>
                {new Date(notification.createdAt).toLocaleString()}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
