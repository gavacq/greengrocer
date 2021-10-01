import axios from 'axios';

// eslint-disable-next-line arrow-body-style
export default function (productName) {
  return axios.get(`/api/search/?productName=${productName}`)
    .then((res) => {
      // just setResults with id, title, and image
      console.log('MY RESPONSE : ', res.data);
      return res.data.map((product) => ({
        api_id: product.id,
        title: product.title,
        image: product.image,
        lat: product.lat,
        long: product.long,
        co2: product.co2,
        query: productName,
      }));
    });
}
