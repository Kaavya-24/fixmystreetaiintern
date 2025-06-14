import { useState } from "react";
import { useRouter } from "next/router";
import { db } from '../../firebase/firebaseConfig';
import { collection, addDoc, serverTimestamp, getDocs, query, where } from "firebase/firestore";

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState("login");
  const [adminName, setAdminName] = useState("");
  const [adminId, setAdminId] = useState("");
  const [adminDistrict, setAdminDistrict] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notificationId, setNotificationId] = useState("");
  const [notificationMsg, setNotificationMsg] = useState("");
  const [notificationStatus, setNotificationStatus] = useState("");
  const [reportType, setReportType] = useState("");
  const [filteredReports, setFilteredReports] = useState([]);
  const router = useRouter();

  const [dept, setDept] = useState("");
  const [city, setCity] = useState("");
  const [level, setLevel] = useState("");
  const [problem, setProblem] = useState("");
  const [desc, setDesc] = useState("");
  const [deadline, setDeadline] = useState("");
  const [assignStatus, setAssignStatus] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (adminName && adminId && adminDistrict) {
      setIsLoggedIn(true);
      setActiveSection("viewReports");
    }
  };

  const handleNotificationSubmit = (e) => {
    e.preventDefault();
    if (notificationId && notificationMsg) {
      setNotificationStatus(`📤 Message sent to Grievance ID ${notificationId}`);
      setNotificationId("");
      setNotificationMsg("");
    }
  };

  const handleAssignSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn || !adminName) {
      setAssignStatus("⚠️ Admin must be logged in to assign a task.");
      return;
    }

    if (dept && city && level && problem && desc && deadline) {
      try {
        await addDoc(collection(db, "assignedtasks"), {
          department: dept,
          city,
          level,
          problemType: problem,
          description: desc,
          deadline,
          assignedBy: adminName,
          timestamp: serverTimestamp(),
        });
        setAssignStatus("✅ Task assigned successfully.");
        setDept("");
        setCity("");
        setLevel("");
        setProblem("");
        setDesc("");
        setDeadline("");
      } catch (error) {
        console.error("Error adding task:", error);
        setAssignStatus("❌ Failed to assign task.");
      }
    } else {
      setAssignStatus("⚠️ Please fill all fields.");
    }
  };

  const handleReportSearch = async (e) => {
    e.preventDefault();
    try {
      const q = query(
        collection(db, "issuesreported"),
        where("district", "==", adminDistrict),
        where("type", "==", reportType)
      );
      const querySnapshot = await getDocs(q);
      const results = [];
      querySnapshot.forEach((doc) => {
        results.push(doc.data());
      });
      setFilteredReports(results);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  return (
    <>
     <nav>
        <a href="/">🏠 Home</a>
        <a href="/about">ℹ️ About</a>
        <a href="/citizen" >🧑 Citizen</a>
        <a href="/admin" className="active">👮 Admin</a>
        <a href="/superadmin">🛡️ Super Admin</a>
        <a href="/faq">❓ FAQ & Help</a>
      </nav>
      <div className="admin-layout">
        <aside className="sidebar">
          <h2>🛠 Admin Panel</h2>
          <button onClick={() => setActiveSection("login")}>Login</button>
          <button onClick={() => setActiveSection("viewReports")}>View Reports</button>
          <button onClick={() => setActiveSection("changeStatus")}>Change Status</button>
          <button onClick={() => setActiveSection("assignTasks")}>Assign Tasks</button>
          <button onClick={() => setActiveSection("sendNotifications")}>Send Notifications</button>
          <button onClick={() => setActiveSection("complaintCount")}>Complaint Count</button>
        </aside>

        <div className="admin-content">
          {activeSection === "login" && (
            <form className="form-box" onSubmit={handleLogin}>
              <h2>🔐 Admin Login</h2>
              <label>Name:</label>
              <input type="text" value={adminName} onChange={(e) => setAdminName(e.target.value)} required />
              <label>ID:</label>
              <input type="text" value={adminId} onChange={(e) => setAdminId(e.target.value)} required />
              <label>District:</label>
              <input type="text" value={adminDistrict} onChange={(e) => setAdminDistrict(e.target.value)} required />
              <button type="submit">Login</button>
            </form>
          )}

          {isLoggedIn && (
            <p style={{ fontSize: "18px", marginBottom: "20px" }}>👮‍♂️ ADMIN: {adminName} logged in</p>
          )}

          {activeSection === "viewReports" && (
            <>
              <form className="form-box" onSubmit={handleReportSearch}>
                <h2>📄 View Reports</h2>
                <label>Type:</label>
                <select value={reportType} onChange={(e) => setReportType(e.target.value)} required>
                  <option value="">--Select--</option>
                  <option value="Pothole">Pothole</option>
                  <option value="Street Light">Street Light</option>
                  <option value="Garbage">Garbage</option>
                </select>
                <button type="submit">Search</button>
              </form>

              {filteredReports.length > 0 && (
                <div style={{ marginTop: '30px' }}>
                  <h3 style={{ backgroundColor: '#c19a6b', padding: '10px', borderRadius: '8px' }}>🗂 Filtered Reports</h3>
                  <ul style={{ paddingLeft: '20px' }}>
                    {filteredReports.map((report, index) => (
                      <li key={index} style={{ marginBottom: '15px', lineHeight: '1.6' }}>
                        <strong>Name:</strong> {report.name}<br />
                        <strong>Contact:</strong> {report.contact}<br />
                        <strong>Address:</strong> {report.address}<br />
                        <strong>District:</strong> {report.district}<br />
                        <strong>Level:</strong> {report.level}<br />
                        <strong>Type:</strong> {report.type}<br />
                        <strong>Service:</strong> {report.service}<br />
                        <strong>Details:</strong> {report.details}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          {activeSection === "changeStatus" && (
            <div className="form-box">
              <h2>📊 Change Status</h2>
              <button className="report-btn" onClick={() => router.push('/changestatus')}>Change Status</button>
            </div>
          )}

          {activeSection === "assignTasks" && (
            <form className="form-box" onSubmit={handleAssignSubmit}>
              <h2>📌 Assign Tasks</h2>
              <label>Department:</label>
              <select value={dept} onChange={(e) => setDept(e.target.value)} required>
                <option value="">--Select--</option><option>Road</option><option>Electric</option><option>Water</option>
              </select>
              <label>City:</label>
              <select value={city} onChange={(e) => setCity(e.target.value)} required>
                <option value="">--Select--</option><option>Tirunelveli</option><option>Coimbatore</option><option>Erode</option><option>Salem</option><option>Chennai</option>
              </select>
              <label>Level:</label>
              <select value={level} onChange={(e) => setLevel(e.target.value)} required>
                <option value="">--Select--</option><option>Taluk</option><option>Panchayat</option><option>Block</option>
              </select>
              <label>Problem Type:</label>
              <select value={problem} onChange={(e) => setProblem(e.target.value)} required>
                <option value="">--Select--</option><option>Pothole</option><option>Streetlight</option><option>Garbage</option>
              </select>
              <label>Description:</label>
              <textarea rows="3" value={desc} onChange={(e) => setDesc(e.target.value)} required></textarea>
              <label>Deadline:</label>
              <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
              <button type="submit">Assign</button>
              {assignStatus && <p style={{ color: "lightgreen", marginTop: "10px" }}>{assignStatus}</p>}
            </form>
          )}

          {activeSection === "sendNotifications" && (
            <form className="form-box" onSubmit={handleNotificationSubmit}>
              <h2>📢 Send Notifications</h2>
              <label>Grievance ID:</label>
              <input type="text" value={notificationId} onChange={(e) => setNotificationId(e.target.value)} required />
              <label>Message:</label>
              <textarea rows="4" value={notificationMsg} onChange={(e) => setNotificationMsg(e.target.value)} required />
              <button type="submit">Send</button>
              {notificationStatus && <p style={{ color: 'lightgreen', marginTop: '20px' }}>{notificationStatus}</p>}
            </form>
          )}

          {activeSection === "complaintCount" && (
            <div className="form-box">
              <h2>📊 Complaint Count</h2>
              <button className="report-btn" onClick={() => router.push('/complaintcount')}>ComplaintCount</button>
            </div>
          )}
        </div>
      </div>
      
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

        .report-btn {
          background-color: red;
          color: white;
          padding: 12px;
          border: none;
          font-size: 16px;
          border-radius: 5px;
          cursor: pointer;
          margin-top: 20px;
        }
      `}</style>
    </>
  );
}

  