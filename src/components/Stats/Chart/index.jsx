/* eslint-disable react/prop-types */
import { React, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

export default function Chart({ allLists }) {
  const [co2Saved, setco2Saved] = useState([]);
  const [co2Total, setco2Total] = useState([]);
  const [data, setData] = useState({});

  const saved = allLists.map((list) => (
    list.co2_saved
  ));

  let sum = 0;
  const total = allLists.map((list) => {
    sum += list.co2_saved;
    return sum;
  });

  //   const total = 0;
  useEffect(() => {
    setco2Saved(saved);
    setco2Total(total);
    setData({
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
    });
    console.log(co2Saved);
  }, []);
  // const totalCo2 = allLists.map((list) => {
  //   total += list.co2_saved;
  //   return total;
  // });
  //   data.datasets[1].data = totalCo2;
  return (
    <div>
      <Line data={data} />
    </div>
  );
}
