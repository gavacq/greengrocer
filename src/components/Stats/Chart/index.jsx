import { React, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { listType } from '../../../types';

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
    <div style={{ height: '75vh' }}>
      <Line
        data={{
          labels: ['List 1', 'List 2', 'List 3', 'List 4', 'List 5', 'List 6'],
          datasets: [
            {
              label: 'CO2 Saved per List',
              data: co2Saved,
              fill: true,
              backgroundColor: 'rgba(75,192,192,0.2)',
              borderColor: 'rgba(75,192,192,1)',
            },
            {
              label: 'CO2 Saved Total',
              data: co2Total,
              fill: false,
              borderColor: '#742774',
            },
          ],
        }}
        width="100vw"
        height="100%"
        options={{ maintainAspectRatio: false }}
      />
    </div>
  );
}

Chart.propTypes = {
  allLists: PropTypes.arrayOf(listType).isRequired,
};
