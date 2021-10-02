/* eslint-disable react/prop-types */
import { React, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

export default function Chart({ allLists }) {
  const [co2Saved, setco2Saved] = useState([]);
  const [co2Total, setco2Total] = useState([]);

  let sum = 0;
  const total = allLists.map((list) => {
    sum += list.co2_saved;
    return sum;
  });

  useEffect(() => {
    setco2Saved(allLists.map((list) => list.co2_saved));
    setco2Total(total);
  }, [allLists]);

  return (
    <div>
      <Line data={{
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'First dataset',
            data: co2Saved,
            fill: true,
            backgroundColor: 'rgba(75,192,192,0.2)',
            borderColor: 'rgba(75,192,192,1)',
          },
          {
            label: 'Second dataset',
            data: co2Total,
            fill: false,
            borderColor: '#742774',
          },
        ],
      }}
      />
    </div>
  );
}
