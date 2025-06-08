export default function CitizenPage() {
  return (
    <>
      <nav>
        <a href="/">🏠 Home</a>
        <a href="/about">ℹ️ About</a>
        <a href="/citizen">🧑 Citizen</a>
        <a href="/admin">👮 Admin</a>
        <a href="/superadmin">🛡️ Super Admin</a>
        <a href="/faq" className="active">❓ FAQ & Help</a>
      </nav>

      <div className="background">
        <div className="form-container">
          {/* Citizen Information Form */}
          <form className="form-box">
            <h2>Citizen Information</h2>
            <p className="mandatory">* Mandatory Fields</p>

            <label>* Name:</label>
            <input type="text" required />

            <label>* Contact No:</label>
            <input type="tel" required />

            <label>Alternative Phone No:</label>
            <input type="tel" />

            <label>* Email:</label>
            <input type="email" required />

            <label>* District:</label>
            <select required>
              <option value="">--Select--</option>
              <option>Tirunelveli</option>
              <option>Chennai</option>
              <option>Coimbatore</option>
            </select>

            <label>* Block:</label>
            <select required>
              <option value="">--Select--</option>
              <option>Urban</option>
              <option>Rural</option>
            </select>

            <label>* Village:</label>
            <select required>
              <option value="">--Select--</option>
              <option>Village A</option>
              <option>Village B</option>
            </select>

            <label>* Address:</label>
            <textarea rows="3" required></textarea>
          </form>

          {/* Grievance Form */}
          <form className="form-box">
            <h2>Register Grievance</h2>
            <p className="mandatory">* Mandatory Fields</p>

            <label>* Service Related To:</label>
            <select required>
              <option value="">--Select--</option>
              <option>Water</option>
              <option>Road</option>
              <option>Electricity</option>
            </select>

            <label>* Complain Level:</label>
            <select required>
              <option value="">--Select--</option>
              <option>Panchayat</option>
              <option>Block</option>
              <option>District</option>
            </select>

            <label>* Complain Type:</label>
            <select required>
              <option value="">--Select--</option>
              <option>Pothole</option>
              <option>Street Light</option>
              <option>Garbage</option>
            </select>

            <label>* Complaint Details:</label>
            <textarea rows="4" required></textarea>

            <button type="submit">SUBMIT</button>
          </form>
        </div>
      </div>

      <style jsx>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: 'Segoe UI', sans-serif;
          color: #000;
        }

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

        .background {
          background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
                      url('https://www.the-world.in/wp-content/uploads/2024/04/The-World-Website-Cleanest-City-Surat-Landscape.webp') no-repeat center center fixed;
          background-size: cover;
          padding: 40px 20px;
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }

        .form-container {
          display: flex;
          flex-wrap: wrap;
          gap: 30px;
          max-width: 1200px;
          width: 100%;
          justify-content: center;
        }

        .form-box {
          background-color: rgba(255, 255, 255, 0.95);
          border-radius: 10px;
          padding: 25px 30px;
          width: 500px;
          box-shadow: 0 0 15px rgba(0,0,0,0.3);
          animation: bloom 1.5s ease-in;
        }

        .form-box h2 {
          background-color: #919cf0;
          color: white;
          padding: 10px;
          border-radius: 6px;
          font-size: 22px;
          margin-bottom: 15px;
        }

        label {
          display: block;
          margin-top: 12px;
          font-weight: 600;
        }

        input, select, textarea {
          width: 100%;
          padding: 8px 10px;
          margin-top: 6px;
          border-radius: 5px;
          border: 1px solid #ccc;
          font-size: 16px;
        }

        textarea {
          resize: vertical;
        }

        .mandatory {
          font-size: 14px;
          color: #c00;
          margin-bottom: 10px;
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

        @keyframes bloom {
          0% { transform: scale(0.95); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </>
  );
}