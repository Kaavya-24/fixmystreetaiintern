import { useState } from "react";

export default function SuperAdmin() {
  const [activeForm, setActiveForm] = useState(null);

  // To add bloom effect briefly on form change
  const [bloom, setBloom] = useState(false);

  const showForm = (id) => {
    setActiveForm(id);
    setBloom(true);
    setTimeout(() => setBloom(false), 500);
  };

  return (
    <>
    <nav>
       <a href="/">🏠 Home</a>
        <a href="/about">ℹ️ About</a>
        <a href="/citizen">🧑 Citizen</a>
        <a href="/admin">👮 Admin</a>
        <a href="/superadmin" className="active">🛡️ Super Admin</a>
        <a href="/faq">❓ FAQ & Help</a>
      </nav>
     
     

      <div className="container">
        <div className="left" id="formContainer">
          {/* Login Form */}
          <form
            id="login"
            className={`form ${activeForm === "login" ? (bloom ? "bloom" : "") : "hidden"}`}
            onSubmit={(e) => e.preventDefault()}
          >
            <h2>Login</h2>
            <label>Name</label>
            <input type="text" placeholder="Name" required />
            <label>Enter id</label>
            <input type="text" placeholder="ID" required />
            <label>Enter password</label>
            <input type="password" placeholder="Password" required />
            <button type="submit">Login</button>
          </form>

          {/* Add Admin */}
          <form
            id="add"
            className={`form ${activeForm === "add" ? (bloom ? "bloom" : "") : "hidden"}`}
            onSubmit={(e) => e.preventDefault()}
          >
            <h2>Add Admin</h2>
            <input type="text" placeholder="Admin Name" required />
            <input type="text" placeholder="Admin ID" required />
            <label>Select district</label>
            <select>
              <option>Tirunelveli</option>
              <option>Chennai</option>
              <option>Coimbatore</option>
              <option>Erode</option>
              <option>Salem</option>
            </select>
            <input type="date" required />
            <input type="email" placeholder="Email" required />
            <input type="tel" placeholder="Phone Number" required />
            <button type="submit">Add</button>
          </form>

          {/* Update Admin */}
          <form
            id="update"
            className={`form ${activeForm === "update" ? (bloom ? "bloom" : "") : "hidden"}`}
            onSubmit={(e) => e.preventDefault()}
          >
            <h2>Update Admin</h2>
            <label>Select district</label>
            <select>
              <option>Tirunelveli</option>
              <option>Chennai</option>
              <option>Coimbatore</option>
              <option>Erode</option>
              <option>Salem</option>
            </select>
            <input type="text" placeholder="Old Admin ID" required />
            <input type="text" placeholder="New Admin ID" required />
            <button type="submit">Update</button>
          </form>

          {/* Remove Admin */}
          <form
            id="remove"
            className={`form ${activeForm === "remove" ? (bloom ? "bloom" : "") : "hidden"}`}
            onSubmit={(e) => e.preventDefault()}
          >
            <h2>Remove Admin</h2>
            <input type="text" placeholder="Admin ID" required />
            <button type="submit">Remove</button>
          </form>

          {/* Monitor Complaints */}
          <form
            id="monitor"
            className={`form ${activeForm === "monitor" ? (bloom ? "bloom" : "") : "hidden"}`}
            onSubmit={(e) => e.preventDefault()}
          >
            <h2>Monitor Complaints</h2>
            <label>Select district</label>
            <select>
              <option>Tirunelveli</option>
              <option>Chennai</option>
              <option>Coimbatore</option>
              <option>Erode</option>
              <option>Salem</option>
            </select>
            <label>Select level</label>
            <select>
              <option>panchayat</option>
              <option>taluk</option>
              <option>Village</option>
            </select>
            <button type="submit">View</button>
          </form>

          {/* Announcements */}
          <form
            id="announce"
            className={`form ${activeForm === "announce" ? (bloom ? "bloom" : "") : "hidden"}`}
            onSubmit={(e) => e.preventDefault()}
          >
            <h2>Announcements</h2>
            <textarea placeholder="Enter policy changes or emergency updates"></textarea>
            <button type="submit">Send</button>
          </form>
        </div>

        <div className="right">
          <h1>Super Admin Panel</h1>
          <div className="buttons">
            <button onClick={() => showForm("login")}>Login</button>
            <button onClick={() => showForm("add")}>Add Admin</button>
            <button onClick={() => showForm("update")}>Update Admin</button>
            <button onClick={() => showForm("remove")}>Remove Admin</button>
            <button onClick={() => showForm("monitor")}>Monitor Complaints</button>
            <button onClick={() => showForm("announce")}>Announcements</button>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Reset & Basics */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Segoe UI', sans-serif;
        }

        body {
          background-color: #f0fdfc;
          animation: blurFadeIn 1s ease-in-out forwards;
          filter: blur(10px);
        }

        @keyframes blurFadeIn {
          from {
            opacity: 0;
            filter: blur(10px);
          }
          to {
            opacity: 1;
            filter: blur(0);
          }
        }

        nav {
          background-color: #008080;
          color: white;
          padding: 15px;
          display: flex;
          justify-content: center;
          gap: 30px;
        }

        nav a {
          color: white;
          text-decoration: none;
          font-weight: bold;
          padding: 6px 12px;
          border-radius: 6px;
          transition: background-color 0.3s ease;
        }

        nav a:hover,
        nav .active {
          background-color: white;
          color: #008080;
        }

        .container {
          display: flex;
          height: 100vh;
        }

        .left {
          flex: 1;
          background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ8NPYC4uCdhQWXfzk3hvMV9Xzstq6Wve7azJT1KCuwQl8qlbXmKdSzMN9ybkfDBkyMCk&usqp=CAU');
          background-size: cover;
          background-position: center;
          padding: 40px;
          overflow-y: auto;
        }

        .right {
          flex: 1;
          background-color: #e0fafa;
          padding: 40px;
          overflow-y: auto;
        }

        .right h1 {
          color: #004c4c;
          margin-bottom: 30px;
        }

        .buttons {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .buttons button {
          background-color: #008080;
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 16px;
        }

        .buttons button:hover {
          background-color: white;
          color: #008080;
          border: 1px solid #008080;
        }

        .form {
          background-color: rgba(255, 255, 255, 0.95);
          border-radius: 10px;
          padding: 20px;
          max-width: 400px;
          margin-bottom: 30px;
          box-shadow: 0 0 0 rgba(0, 0, 0, 0);
          opacity: 1;
          transform: scale(1);
          transition: all 0.5s ease;
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
    </>
  );
}
