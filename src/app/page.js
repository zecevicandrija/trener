import Navbar from './Pocetna/Navbar';
import Hero from './Pocetna/Hero';
import Stats from './Pocetna/Stats';
import Programi from './Pocetna/Programi';
import Transformacije from './Pocetna/Transformacije';
import Footer from './Pocetna/Footer';

export default function Home() {
  return (
    <main style={{ backgroundColor: '#050505', minHeight: '100vh', color: '#fff' }}>
      <Navbar />
      <Hero />
      <Stats />
      <Programi />
      <Transformacije />
      <Footer />
    </main>
  );
}