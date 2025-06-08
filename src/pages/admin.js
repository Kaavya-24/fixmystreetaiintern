import { useState } from "react";

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState("viewReports");

  return (
    <>
      {/* 🔗 Navigation Bar */}
      <nav>
        <a href="/">🏠 Home</a>
        <a href="/about">ℹ️ About</a>
        <a href="/citizen">🧑 Citizen</a>
        <a href="/admin" className="active">👮 Admin</a>
        <a href="/superadmin">🛡️ Super Admin</a>
        <a href="/faq">❓ FAQ & Help</a>
      </nav>

      {/* 🌇 Admin Panel Layout */}
      <div className="admin-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <h2>🛠 Admin Panel</h2>
          <button onClick={() => setActiveSection("viewReports")}>View Reports</button>
          <button onClick={() => setActiveSection("changeStatus")}>Change Status</button>
          <button onClick={() => setActiveSection("assignTasks")}>Assign Tasks</button>
          <button onClick={() => setActiveSection("sendNotifications")}>Send Notifications</button>
        </aside>

        {/* Main Content */}
        <div className="admin-content">
          {activeSection === "viewReports" && (
            <form className="form-box">
              <h2>📄 View Reports</h2>
              <label>Location:</label>
              <select><option>--Select--</option><option>Chennai</option><option>Delhi</option></select>

              <label>Type:</label>
              <select><option>--Select--</option><option>Pothole</option><option>Water Leak</option></select>

              <label>Status:</label>
              <select><option>--Select--</option><option>New</option><option>In Progress</option><option>Resolved</option></select>

              <label>Date Range:</label>
              <div className="date-range">
                <input type="date" /> to <input type="date" />
              </div>

              <button type="submit">Search</button>
            </form>
          )}

          {activeSection === "changeStatus" && (
            <form className="form-box">
              <h2>🔄 Change Status</h2>
              <label>Grievance ID:</label>
              <input type="text" />

              <label>Status:</label>
              <div>
                <input type="radio" name="status" value="new" /> New
                <input type="radio" name="status" value="inprogress" style={{ marginLeft: "20px" }} /> In Progress
                <input type="radio" name="status" value="resolved" style={{ marginLeft: "20px" }} /> Resolved
              </div>

              <button type="submit">Update Status</button>
            </form>
          )}

          {activeSection === "assignTasks" && (
            <form className="form-box">
              <h2>📌 Assign Tasks</h2>
              <label>Department:</label>
              <select><option>--Select--</option><option>Road</option><option>Electric</option></select>

              <label>City:</label>
              <select><option>--Select--</option><option>Bangalore</option><option>Mumbai</option></select>

              <label>Level:</label>
              <select><option>Taluk</option><option>Panchayat</option></select>

              <label>Problem Type:</label>
              <select><option>Pothole</option><option>Streetlight</option></select>

              <label>Description:</label>
              <textarea rows="3"></textarea>

              <label>Deadline:</label>
              <input type="date" />

              <button type="submit">Assign</button>
            </form>
          )}

          {activeSection === "sendNotifications" && (
            <form className="form-box">
              <h2>📢 Send Notifications</h2>
              <label>Grievance ID:</label>
              <input type="text" />

              <label>Message:</label>
              <textarea rows="4"></textarea>

              <button type="submit">Send</button>
            </form>
          )}
        </div>
      </div>

      {/* 🌈 Internal CSS */}
      <style jsx>{`
        nav {
          background-color: #000;
          padding: 15px 40px;
          display: flex;
          gap: 30px;
          justify-content: center;
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        nav a {
          color: white;
          text-decoration: none;
          font-weight: bold;
          font-size: 18px;
          transition: 0.3s ease;
        }

        nav a:hover,
        nav a.active {
          color: #FFD700;
          text-shadow: 0 0 8px #fff;
        }

        .admin-layout {
          display: flex;
          min-height: 100vh;
          background: linear-gradient(
              rgba(0, 0, 0, 0.6),
              rgba(0, 0, 0, 0.6)
            ),
            url('https://yuva.info/wp-content/uploads/2022/07/the-most-popular-social-issues-in-india.jpeg')
              no-repeat center center fixed;
          background-size: cover;
          padding: 40px 20px;
        }

        .sidebar {
          width: 25%;
          background-color: rgba(72, 61, 50, 0.95);
          padding: 30px;
          border-radius: 10px;
          margin-right: 20px;
          display: flex;
          flex-direction: column;
          gap: 15px;
          color: white;
        }

        .sidebar h2 {
          margin-bottom: 1rem;
        }

        .sidebar button {
          background-color: #C19A6B;
          color: white;
          padding: 10px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          transition: 0.3s;
        }

        .sidebar button:hover {
          background-color: white;
          color: #5c4033;
        }

        .admin-content {
          flex: 1;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(6px);
          padding: 30px;
          border-radius: 10px;
          color: white;
        }

        .form-box {
          background-color: rgba(255, 255, 255, 0.08);
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
        }

        .form-box h2 {
          margin-bottom: 20px;
          background-color: #7796b8;
          padding: 10px;
          border-radius: 6px;
          color: white;
        }

        label {
          display: block;
          margin-top: 12px;
          font-weight: bold;
        }

        select,
        input[type="date"],
        input[type="text"],
        textarea {
          width: 100%;
          padding: 8px 10px;
          margin-top: 6px;
          border-radius: 6px;
          border: none;
          font-size: 16px;
          color: #000;
        }

        textarea {
          resize: vertical;
        }

        .date-range {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        button[type="submit"] {
          margin-top: 20px;
          padding: 12px 20px;
          background-color: #04264a;
          color: white;
          border: none;
          font-size: 16px;
          font-weight: bold;
          border-radius: 5px;
          cursor: pointer;
          transition: 0.3s ease;
        }

        button[type="submit"]:hover {
          background-color: white;
          color: #000;
          border: 1px solid #7796b8;
        }
      `}</style>
    </>
  );
}