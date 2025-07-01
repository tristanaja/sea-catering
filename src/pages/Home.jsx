import React from 'react';

function Home() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>
      <header style={{ backgroundColor: '#f8f8f8', padding: '2rem 0', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', color: '#2c3e50' }}>SEA Catering</h1>
        <p style={{ fontSize: '1.5rem', color: '#34495e' }}>Healthy Meals, Anytime, Anywhere</p>
      </header>

      <main style={{ padding: '2rem' }}>
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2rem', borderBottom: '2px solid #3498db', paddingBottom: '0.5rem', color: '#3498db' }}>
            Welcome to SEA Catering!
          </h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
            Your number one source for healthy and delicious meals, delivered right to your doorstep. We are dedicated to providing you with the very best of healthy food, with an emphasis on quality, fresh ingredients, and customizable meal plans to suit your lifestyle. We serve all major cities across Indonesia, ensuring that you can enjoy our meals wherever you are.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2rem', borderBottom: '2px solid #3498db', paddingBottom: '0.5rem', color: '#3498db' }}>
            Our Services
          </h2>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li style={{ fontSize: '1.1rem', marginBottom: '1rem', background: '#ecf0f1', padding: '1rem', borderRadius: '5px' }}>
              <strong>Meal Customization:</strong> Tailor your meals to your specific dietary needs and preferences. Whether you're vegetarian, vegan, gluten-free, or have other requirements, we have you covered.
            </li>
            <li style={{ fontSize: '1.1rem', marginBottom: '1rem', background: '#ecf0f1', padding: '1rem', borderRadius: '5px' }}>
              <strong>Indonesia-Wide Delivery:</strong> We deliver to all major cities across Indonesia, so you can enjoy healthy eating without the hassle.
            </li>
            <li style={{ fontSize: '1.1rem', marginBottom: '1rem', background: '#ecf0f1', padding: '1rem', borderRadius: '5px' }}>
              <strong>Detailed Nutritional Information:</strong> Every meal comes with detailed nutritional information, so you can track your macros and make informed choices about your health.
            </li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: '2rem', borderBottom: '2px solid #3498db', paddingBottom: '0.5rem', color: '#3498db' }}>
            Contact Us
          </h2>
          <p style={{ fontSize: '1.1rem' }}>
            Have questions? We'd love to hear from you!
          </p>
          <p style={{ fontSize: '1.1rem' }}>
            <strong>Manager:</strong> Brian
          </p>
          <p style={{ fontSize: '1.1rem' }}>
            <strong>Phone Number:</strong> 08123456789
          </p>
        </section>
      </main>

      <footer style={{ textAlign: 'center', padding: '1rem 0', marginTop: '2rem', backgroundColor: '#f8f8f8', color: '#7f8c8d' }}>
        <p>&copy; 2025 SEA Catering. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Home;

