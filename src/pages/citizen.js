import { useRouter } from 'next/router';

export default function CitizenPage() {
  const router = useRouter();

  return (
    <>
      <nav>
        <a href="/">🏠 Home</a>
        <a href="/about">ℹ️ About</a>
        <a href="/citizen" className="active">🧑 Citizen</a>
        <a href="/admin">👮 Admin</a>
        <a href="/superadmin">🛡️ Super Admin</a>
        <a href="/faq">❓ FAQ & Help</a>
      </nav>

      <div className="background">
        <div className="form-container">
          {/* Left side: Citizen Form */}
          <div className="button-box">
            <button className="report-btn" onClick={() => router.push('/reportissue')}>Report Issue</button>
            <button className="withdraw-btn" onClick={() => router.push('/withdrawissue')}>Withdraw Issue</button>
          </div>
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

          
          
        </div>
      </div>

      <style jsx>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
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
        }

        nav a:hover,
        nav a.active {
          color: #FFD700;
        }

        .background {
          background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
                      url('https://www.the-world.in/wp-content/uploads/2024/04/The-World-Website-Cleanest-City-Surat-Landscape.webp') no-repeat center center fixed;
          background-size: cover;
          padding: 40px 20px;
          display: flex;
          justify-content: center;
        }

        .form-container {
          display: flex;
          gap: 30px;
          flex-wrap: wrap;
          justify-content: center;
          max-width: 1200px;
          width: 100%;
        }

        .form-box {
          width: 500px;
          background-color: rgba(255, 255, 255, 0.95);
          border-radius: 10px;
          padding: 25px 30px;
          box-shadow: 0 0 15px rgba(0,0,0,0.3);
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

        .mandatory {
          font-size: 14px;
          color: #c00;
        }

        textarea {
          resize: vertical;
        }

        .button-box {
          width: 300px;
          background: rgba(255,255,255,0.95);
          border-radius: 10px;
          padding: 40px 30px;
          box-shadow: 0 0 15px rgba(0,0,0,0.3);
          display: flex;
          flex-direction: column;
          gap: 30px;
          justify-content: center;
          align-items: center;
        }
           

        .report-btn, .withdraw-btn {
          width: 100%;
          padding: 15px;
          font-size: 18px;
          font-weight: bold;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }

        .report-btn {
          background-color: red;
        }

        .withdraw-btn {
          background-color: green;
        }

        .report-btn:hover, .withdraw-btn:hover {
          opacity: 0.85;
        }
      `}</style>
    </>
  );
}
