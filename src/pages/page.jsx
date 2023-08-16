import React, { useEffect } from 'react';
import './das.css';
import Chart from 'chart.js/auto';

function Das() { // Renommez votre composant avec une majuscule (Das)
  const chartData = {
    // Dummy data...
  };

  useEffect(() => {
    const ctx = document.getElementById('monthlyRevenueChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Tableau de Bord avec Graphique</h1>
      </header>

      <nav>
        {/* Ajoutez des liens de navigation ici */}
      </nav>

      <main>
        <section className="dashboard-card">
          <h2>Statistiques</h2>
          <p>Nombre d'utilisateurs : 100</p>
          <div className="chart-container">
            <canvas id="monthlyRevenueChart" width="400" height="200"></canvas>
          </div>
        </section>
        
        {/* ... */}
      </main>

      <footer>
        <p>&copy; {new Date().getFullYear()} Mon Entreprise</p>
      </footer>
    </div>
  );
}

export default Das; // Exportez votre composant avec la première lettre en majuscule
