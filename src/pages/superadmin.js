import { useState } from "react";
import { db } from '../../firebase/firebaseConfig';
import { collection, addDoc, Timestamp, getDocs, query, where } from 'firebase/firestore';

export default function SuperAdmin() {
  const [activeForm, setActiveForm] = useState(null);
  const [bloom, setBloom] = useState(false);
  const [loginName, setLoginName] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [announcementText, setAnnouncementText] = useState('');
  const [announcementMessage, setAnnouncementMessage] = useState('');
  const [addAdminData, setAddAdminData] = useState({ name: '', id: '', district: '', date: '', email: '', phone: '' });
  const [updateAdminData, setUpdateAdminData] = useState({ district: '', oldId: '', newId: '' });
  const [removeAdminId, setRemoveAdminId] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [filteredIssues, setFilteredIssues] = useState([]);

  const showForm = (id) => {
    setActiveForm(id);
    setBloom(true);
    setLoginMessage('');
    setAnnouncementMessage('');
    setTimeout(() => setBloom(false), 500);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginName.trim()) {
      setLoginMessage(`✅ ${loginName} logged in successfully!`);
    }
  };

  const handleAnnouncementSubmit = (e) => {
    e.preventDefault();
    if (announcementText.trim()) {
      setAnnouncementMessage("📢 Announcement sent!");
      setAnnouncementText('');
    }
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "addedAdmins"), {
        ...addAdminData,
        timestamp: Timestamp.now()
      });
      alert("✅ Admin added successfully!");
      setAddAdminData({ name: '', id: '', district: '', date: '', email: '', phone: '' });
    } catch (error) {
      console.error("Error adding admin:", error);
    }
  };

  const handleUpdateAdmin = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "updatedAdmins"), {
        ...updateAdminData,
        timestamp: Timestamp.now()
      });
      alert("✅ Admin updated successfully!");
      setUpdateAdminData({ district: '', oldId: '', newId: '' });
    } catch (error) {
      console.error("Error updating admin:", error);
    }
  };

  const handleRemoveAdmin = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "removedAdmins"), {
        adminId: removeAdminId,
        timestamp: Timestamp.now()
      });
      alert("🗑️ Admin removed successfully!");
      setRemoveAdminId('');
    } catch (error) {
      console.error("Error removing admin:", error);
    }
  };

  const handleMonitorComplaints = async (e) => {
    e.preventDefault();
    if (!selectedDistrict) return;
    try {
      const q = query(collection(db, "issuesreported"), where("district", "==", selectedDistrict));
      const snapshot = await getDocs(q);
      setFilteredIssues(snapshot.docs.map(doc => doc.data()));
    } catch (error) {
      console.error("Error fetching issues:", error);
    }
  };

  return (
    <>
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Segoe UI', sans-serif;
        }

        nav {
          background-color: #004c4c;
          color: white;
          display: flex;
          justify-content: center;
          gap: 30px;
          padding: 15px;
        }

        nav a {
          color: white;
          text-decoration: none;
          font-weight: bold;
        }

        nav a.active {
          border-bottom: 2px solid white;
        }

        .container {
          display: flex;
          height: calc(100vh - 60px);
        }

        .left-panel {
          flex: 2;
          background-color: #e0fafa;
          background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ8NPYC4uCdhQWXfzk3hvMV9Xzstq6Wve7azJT1KCuwQl8qlbXmKdSzMN9ybkfDBkyMCk&usqp=CAU');
          background-size: cover;
          background-position: center;
          padding: 40px;
          overflow-y: auto;
        }

        .right-panel {
          flex: 1;
          background-color: #004c4c;
          color: white;
          padding: 30px;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .right-panel button {
          background-color: white;
          color: #004c4c;
          border: none;
          padding: 12px 20px;
          font-size: 16px;
          font-weight: bold;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .right-panel button:hover {
          background-color: #008080;
          color: white;
        }

        .form {
          background-color: white;
          border-radius: 10px;
          padding: 20px;
          max-width: 500px;
          margin: auto;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }

        .form.hidden {
          display: none;
        }

        .form.bloom {
          box-shadow: 0 0 20px rgba(0, 128, 128, 0.5);
          transform: scale(1.03);
        }

        .form input,
        .form select,
        .form textarea {
          width: 100%;
          padding: 10px;
          margin-top: 8px;
          margin-bottom: 15px;
          border: 1px solid #008080;
          border-radius: 5px;
        }

        .form textarea {
          height: 100px;
          resize: none;
        }

        .form button {
          background-color: #008080;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .form button:hover {
          background-color: white;
          color: #008080;
          border: 1px solid #008080;
        }
      `}</style>

      <nav>
        <a href="/">🏠 Home</a>
        <a href="/about">ℹ️ About</a>
        <a href="/citizen">🧑 Citizen</a>
        <a href="/admin">👮 Admin</a>
        <a href="/superadmin" className="active">🛡️ Super Admin</a>
        <a href="/faq">❓ FAQ & Help</a>
      </nav>

      <div className="container">
        <div className="left-panel">
     
          <form id="login" className={`form ${activeForm === "login" ? (bloom ? "bloom" : "") : "hidden"}`} onSubmit={handleLoginSubmit}>
            <h2>Login</h2>
            <label>Name</label>
            <input type="text" placeholder="Name" value={loginName} onChange={(e) => setLoginName(e.target.value)} required />
            <label>Enter id</label>
            <input type="text" placeholder="ID" required />
            <label>Enter password</label>
            <input type="password" placeholder="Password" required />
            <button type="submit">Login</button>
            {loginMessage && <p>{loginMessage}</p>}
          </form>

          <form id="announce" className={`form ${activeForm === "announce" ? (bloom ? "bloom" : "") : "hidden"}`} onSubmit={handleAnnouncementSubmit}>
            <h2>Announcements</h2>
            <textarea placeholder="Enter policy changes or emergency updates" value={announcementText} onChange={(e) => setAnnouncementText(e.target.value)}></textarea>
            <button type="submit">Send</button>
            {announcementMessage && <p>{announcementMessage}</p>}
          </form>

          <form id="add" className={`form ${activeForm === "add" ? (bloom ? "bloom" : "") : "hidden"}`} onSubmit={handleAddAdmin}>
            <h2>Add Admin</h2>
            <input type="text" placeholder="Admin Name" value={addAdminData.name} onChange={(e) => setAddAdminData({ ...addAdminData, name: e.target.value })} required />
            <input type="text" placeholder="Admin ID" value={addAdminData.id} onChange={(e) => setAddAdminData({ ...addAdminData, id: e.target.value })} required />
            <label>Select district</label>
            <select value={addAdminData.district} onChange={(e) => setAddAdminData({ ...addAdminData, district: e.target.value })} required>
              <option value="">Select</option>
              <option>Tirunelveli</option>
              <option>Chennai</option>
              <option>Coimbatore</option>
              <option>Erode</option>
              <option>Salem</option>
            </select>
            <input type="date" value={addAdminData.date} onChange={(e) => setAddAdminData({ ...addAdminData, date: e.target.value })} required />
            <input type="email" placeholder="Email" value={addAdminData.email} onChange={(e) => setAddAdminData({ ...addAdminData, email: e.target.value })} required />
            <input type="tel" placeholder="Phone Number" value={addAdminData.phone} onChange={(e) => setAddAdminData({ ...addAdminData, phone: e.target.value })} required />
            <button type="submit">Add</button>
          </form>

          <form id="update" className={`form ${activeForm === "update" ? (bloom ? "bloom" : "") : "hidden"}`} onSubmit={handleUpdateAdmin}>
            <h2>Update Admin</h2>
            <label>Select district</label>
            <select value={updateAdminData.district} onChange={(e) => setUpdateAdminData({ ...updateAdminData, district: e.target.value })} required>
              <option value="">Select</option>
              <option>Tirunelveli</option>
              <option>Chennai</option>
              <option>Coimbatore</option>
              <option>Erode</option>
              <option>Salem</option>
            </select>
            <input type="text" placeholder="Old Admin ID" value={updateAdminData.oldId} onChange={(e) => setUpdateAdminData({ ...updateAdminData, oldId: e.target.value })} required />
            <input type="text" placeholder="New Admin ID" value={updateAdminData.newId} onChange={(e) => setUpdateAdminData({ ...updateAdminData, newId: e.target.value })} required />
            <button type="submit">Update</button>
          </form>

          <form id="remove" className={`form ${activeForm === "remove" ? (bloom ? "bloom" : "") : "hidden"}`} onSubmit={handleRemoveAdmin}>
            <h2>Remove Admin</h2>
            <input type="text" placeholder="Admin ID" value={removeAdminId} onChange={(e) => setRemoveAdminId(e.target.value)} required />
            <button type="submit">Remove</button>
          </form>

          {activeForm === 'monitor' && (
            <div className={`form ${bloom ? 'bloom' : ''}`}>
              <h2>Monitor Complaints</h2>
              <form onSubmit={handleMonitorComplaints}>
                <label>Select District</label>
                <select value={selectedDistrict} onChange={e => setSelectedDistrict(e.target.value)} required>
                  <option value="">Select</option>
                  <option>Tirunelveli</option>
                  <option>Salem</option>
                  <option>Coimbatore</option>
                  <option>Chennai</option>
                  <option>Erode</option>
                  <option>Tirchy</option>
                  <option>Vellore</option>
                  <option>Thoothukudi</option>
                </select>
                <button type="submit">Fetch Issues</button>
              </form>
{filteredIssues.length > 0 && (
  <div style={{ marginTop: '20px' }}>
    <h3>Issues in {selectedDistrict}</h3>
    <ul>
      {filteredIssues.map((issue, i) => (
        <li key={i} style={{ marginBottom: '10px' }}>
          <strong>ISSUE:</strong>{issue.type || '⚠️ No Type'}<br></br><strong>ISSUE DETAILS:</strong> {issue.details || '⚠️ No Details'}<br></br><strong>LEVEL:</strong>{issue.level || '⚠️ No Details'}<br></br><strong>SERVICE:</strong>{issue.service || '⚠️ No Details'}<br></br><strong>LEVEL:</strong>{issue.level || '⚠️ No Details'}<br></br><strong>ADDRESS:</strong>{issue.address || '⚠️ No Details'}
        </li>
      ))}
    </ul>
  </div>)}
              
            </div>
          )}
        </div>

        <div className="right-panel">
          <button onClick={() => showForm('login')}>Login</button>
          <button onClick={() => showForm('add')}>Add Admin</button>
          <button onClick={() => showForm('update')}>Update Admin</button>
          <button onClick={() => showForm('remove')}>Remove Admin</button>
          <button onClick={() => showForm('announce')}>Announcements</button>
          <button onClick={() => showForm('monitor')}>Monitor Complaints</button>
        </div>
      </div>
    </>
  );
}
