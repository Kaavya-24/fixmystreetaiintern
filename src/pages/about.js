export default function AboutPage() {
  return (
    <>
      <nav>
        <div>
          <a href="/">🏠 Home</a>
          <a href="/about">ℹ️ About</a>
          <a href="/citizen">🧑 Citizen</a>
          <a href="/admin">👮 Admin</a>
          <a href="/superadmin">🛡️ Super Admin</a>
          <a href="/faq">❓ FAQ & Help</a>
        </div>
      </nav>

      <div className="container">
        <div className="left">
          <div className="content">
            <h1>FixMyStreetAI</h1>
            <p>
              FixMyStreetAI is an innovative civic issue reporting platform designed to streamline public grievance redressal.
              Citizens can easily report issues like potholes, broken streetlights, garbage accumulation, and water leaks by uploading images, adding location, and brief descriptions.
              The platform uses AI to analyze images, prioritize issues based on severity, and notify the concerned departments.
              <br /><br />
              This solution aims to improve urban infrastructure responsiveness, transparency, and citizen trust in governance, making cities smarter and more accountable.
            </p>
          </div>
        </div>

        <div className="right">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlChtICYvz8erlYaU4P7fG3w0Wq4O6rhUeabTuOJLP-oak8M9wD_3EQPoF_s9itWZbSik&usqp=CAU"
            alt="City issue illustration"
          />
        </div>
      </div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Segoe UI', sans-serif;
          color: #fff;
          overflow-x: hidden;
        }

        nav {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          background-color: #000;
          padding: 10px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 1000;
        }

        nav a {
          color: white;
          text-decoration: none;
          font-size: 18px;
          margin-left: 20px;
          font-weight: bold;
        }

        nav a:hover {
          color: #ffcc00;
        }

        .container {
          display: flex;
          height: 100vh;
          width: 100%;
        }

        .left {
          width: 50%;
          padding: 60px 40px;
          position: relative;
          background-image: linear-gradient(to bottom right, rgba(0,0,0,0.8), rgba(255,255,255,0.1)),
            url('https://www.cpmplumbing.com.au/wp-content/uploads/2018/02/shutterstock_345622640.jpg');
          background-size: cover;
          background-position: center;
          animation: fadeIn 2s ease-in-out;
        }

        .right {
          width: 50%;
          position: relative;
          overflow: hidden;
          clip-path: polygon(10% 0, 100% 0, 100% 100%, 10% 100%, 0 50%);
          box-shadow: inset 8px 0 8px -8px rgba(0, 0, 0, 0.2);
        }

        .right img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .content h1 {
          font-size: 48px;
          margin-bottom: 20px;
          color: #100e02;
        }

        .content p {
          font-size: 18px;
          line-height: 1.6;
          color: #e0e0e0;
          max-width: 90%;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @media (max-width: 768px) {
          .container {
            flex-direction: column;
            height: auto;
          }

          .left, .right {
            width: 100%;
            height: 50vh;
          }

          .right {
            clip-path: none;
            box-shadow: none;
          }

          .right img {
            object-fit: cover;
          }

          .content h1 {
            font-size: 36px;
          }

          .content p {
            font-size: 16px;
          }

          nav {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
        }
      `}</style>
    </>
  );
}
