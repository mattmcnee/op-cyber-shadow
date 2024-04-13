import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const EngagementChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');

    // Generate dates for the last seven days, labeling today and yesterday appropriately
    const generateDates = () => {
      const dates = [];
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        if (d.toDateString() === today.toDateString()) {
          dates.push("Today");
        } else {
          dates.push(d.toLocaleDateString());
        }
      }
      return dates;
    };

    // Define the chart data
    const chartData = {
      labels: generateDates(), // Dynamic dates for the past seven days, with "Today" and "Yesterday"
      datasets: [{
        label: 'Pages Visited',
        data: [10, 20, 15, 25, 22, 30, 28], // Example data points for each of the past seven days
        backgroundColor: 'rgba(155, 194, 207, 1)', // Light blue color for all bars
      }]
    };

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
        layout: {
          padding: {
            right: 20
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'x',
        plugins: {
          legend: {
            display: false
          },
          datalabels: {
            align: 'end',
            anchor: 'end',
            display: false,
            formatter: (value, context) => value
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            display: true, // Ensure y-axis is visible
            beginAtZero: true,
            grid: {
              display: false
            },
          }
        }
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div style={{width:'100%', height: '100%', overflow: 'hidden' }}>
      <canvas ref={chartRef} style={{ width: '100%', height: '100%', maxWidth:'100%'}}></canvas>
    </div>
  );
};

export default EngagementChart;
