import { useState } from 'react';
import { useRouter } from 'next/router';
import { db } from '../../firebase/firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function CitizenPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    altContact: '',
    email: '',
    district: '',
    block: '',
    village: '',
    address: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "citizens"), {
        ...formData,
        timestamp: Timestamp.now()
      });
      alert("Citizen information saved successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to save data.");
    }
  };

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
          {/* Left: Buttons */}
          <div className="button-box">
            <button className="report-btn" onClick={() => router.push('/reportissue')}>Report Issue</button>
            <button className="withdraw-btn" onClick={() => router.push('/withdrawissue')}>Withdraw Issue</button>
            <button className="report-btn" onClick={() => router.push('/issueclassify')}>Auto Classify</button>
          </div>

          {/* Right: Form */}
          <form className="form-box" onSubmit={handleSubmit}>
            <h2>Citizen Information</h2>
            <p className="mandatory">* Mandatory Fields</p>

            <label>* Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />

            <label>* Contact No:</label>
            <input type="tel" name="contact" value={formData.contact} onChange={handleChange} required />

            <label>Alternative Phone No:</label>
            <input type="tel" name="altContact" value={formData.altContact} onChange={handleChange} />

            <label>* Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />

            <label>* District:</label>
            <select name="district" value={formData.district} onChange={handleChange} required>
              <option value="">--Select--</option>
              <option>Tirunelveli</option>
              <option>Chennai</option>
              <option>Coimbatore</option>
            </select>

            <label>* Block:</label>
            <select name="block" value={formData.block} onChange={handleChange} required>
              <option value="">--Select--</option>
              <option>Urban</option>
              <option>Rural</option>
            </select>

            <label>* Village:</label>
            <select name="village" value={formData.village} onChange={handleChange} required>
              <option value="">--Select--</option>
              <option>Village A</option>
              <option>Village B</option>
            </select>

            <label>* Address:</label>
            <textarea name="address" value={formData.address} onChange={handleChange} rows="3" required></textarea>

            <button type="submit" className="report-btn">Save Info</button>
          </form>
        </div>
      </div>

      {/* ✅ INTERNAL STYLES */}
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
