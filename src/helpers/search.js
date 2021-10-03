import axios from 'axios';

const searchProducts = (productName) => axios.get(`/api/search/?productName=${productName}`)
  .then((res) => {
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

// searchResults is array of productType
// newList is listType
const filterDuplicateProducts = (searchResults, newList) => searchResults.filter((r) => {
  if (newList.products.find((p) => p.api_id === r.api_id)) {
    console.log(`filtering product ${r.title}`);

    return false;
  }

  return true;
});

export {
  searchProducts,
  filterDuplicateProducts,
};
