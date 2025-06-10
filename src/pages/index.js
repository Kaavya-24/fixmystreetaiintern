import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>FixMyStreetAI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* 🔗 Navigation */}
      <nav>
        <a href="/">🏠 Home</a>
        <a href="/about">ℹ️ About</a>
        <a href="/citizen">🧑 Citizen</a>
        <a href="/admin">👮 Admin</a>
        <a href="/superadmin">🛡️ Super Admin</a>
        <a href="/faq" className="active">❓ FAQ & Help</a>
      </nav>


      {/* 💡 Title */}
      <div className="title">FixMyStreetAI </div>
      <div className="title">Click the below buttons⬇️ </div>
      <div className="home-container">
      <button onClick={() => router.push('/citizen')}>CITIZEN🙎‍♂️</button>
      <button onClick={() => router.push('/admin')}>ADMIN👮</button>
</div>



      {/* 🖼️ Image Grid */}
      <div className="image-grid">
        <img src="https://media.istockphoto.com/id/929942316/photo/old-highway-with-holes-and-snow-landscape-road-potholes-in-cloudy-winter-weather-concept.jpg?s=612x612&w=0&k=20&c=ZtK8wJgXLQYEWGMJVGeyZBqVPKsdHMQlml1Vx8i17aw=" alt="Problem 1" />
        <img src="https://th-i.thgim.com/public/migration_catalog/article13274116.ece/alternates/FREE_1200/HY05_P3_LEAD_GARBAGE" alt="Problem 2" />
        <img src="https://bloximages.chicago2.vip.townnews.com/wacotrib.com/content/tncms/assets/v3/editorial/f/cc/fcccada4-96fe-536a-ae3e-c3c32b322b85/55527eff85fbe.image.jpg?resize=698%2C500" alt="Problem 3" />
        <img src="https://media.istockphoto.com/id/496026170/photo/broken-street-lamp.jpg?s=612x612&w=0&k=20&c=1bX4binyYkD8P_ZzHbfRTspKowTIGoTkSjxvbcjAkY4=" alt="Problem 4" />
      </div>

      {/* 🏛️ Footer */}
      <footer>
        <p>© 2025 Government of India. All rights reserved.</p>
        <p>Ministry of Urban Development | Designed & Developed by Smart Cities Mission</p>
        <p>
          <a href="#">Privacy Policy</a> | <a href="#">Accessibility</a> | <a href="#">Contact Us</a>
        </p>
      </footer>
    </>
  );
}

