import { React, useState, useEffect } from 'react';
import axios from 'axios';
import Search from './Search';
import NewList from './NewList';
import AllLists from './AllLists';
import './index-lists.scss';
import { useAppContext } from '../../lib/context';

export default function List() {
  const [newList, setNewList] = useState({
    id: undefined,
    date_created: undefined,
    co2_saved: 0,
    products: [],
  });
  const [allLists, setAllLists] = useState([]);
  const [results, setResults] = useState([]);
  const [idToReplace, setIdToReplace] = useState(null);
  const [queryDisplay, setQueryDisplay] = useState('');
  const { resultsReturnedContext } = useAppContext();
  // eslint-disable-next-line no-unused-vars
  const [resultsReturned, setResultsReturned] = resultsReturnedContext;

  console.log('newList', newList);

  const replaceProduct = (newProduct) => {
    const productsReplaced = newList.products.map((p) => {
      if (p.api_id === idToReplace) {
        return newProduct;
      }

      return { ...p };
    });

    const co2Diff = newList.products.find((p) => p.api_id === idToReplace).co2 - newProduct.co2;
    console.log('co2Diff', co2Diff, newList.co2_saved);

    setNewList((prev) => ({
      id: prev.id,
      date_created: prev.date_created,
      co2_saved: (prev.co2_saved || 0) + co2Diff,
      products: productsReplaced,
    }));
    setIdToReplace(newProduct.api_id);
  };

  const deleteList = (id) => {
    axios.delete(`/api/lists/${id}`)
      .then(() => {
        console.log(`successfully deleted list id ${id}`);
        const newAllLists = allLists.reduce((acc, l) => {
          if (l.id === id) {
            return acc;
          }
          acc.push(l);
          return acc;
        }, []);
        console.log('newAllLists', newAllLists);
        setAllLists(newAllLists);
      })
      .catch((e) => console.log('Error deleting list', e));
  };

  const saveList = () => {
    console.log('THIS IS NEW LIST :', newList);
    axios.put('/api/lists', { list: newList })
      .then((res) => {
        console.log('successfully saved list', res.data);
        if (res.data.products.length) {
          setAllLists((prev) => ([
            ...prev,
            {
              ...res.data,
              products: [...res.data.products],
            },
          ]));
        }
        setNewList({
          id: undefined,
          date_created: undefined,
          co2_saved: 0,
          products: [],
        });
        setResults([]);
        setResultsReturned((prev) => ({
          ...prev,
          initial: true,
        }));
      })
      .catch((e) => console.log('Error deleting list', e));
  };

  useEffect(() => {
    axios.get('/api/lists')
      .then((res) => {
        setAllLists(res.data.results);
      })
      .catch(() => {
        console.log('NOT GOOD');
      });
  }, []);

  return (
    <main className="lists-page-container">
      <div className="search-and-new-list">
        <div className="search-section">
          <Search
            newList={newList}
            setNewList={setNewList}
            results={results}
            setResults={setResults}
            replaceProduct={replaceProduct}
            idToReplace={idToReplace}
            setIdToReplace={setIdToReplace}
            queryDisplay={queryDisplay}
            setQueryDisplay={setQueryDisplay}
          />
        </div>
        <NewList
          idToReplace={idToReplace}
          newList={newList}
          setResults={setResults}
          setIdToReplace={setIdToReplace}
          saveList={saveList}
          setNewList={setNewList}
          setQueryDisplay={setQueryDisplay}
        />
      </div>
      <AllLists allLists={allLists} setNewList={setNewList} deleteList={deleteList} />
    </main>
  );
}
