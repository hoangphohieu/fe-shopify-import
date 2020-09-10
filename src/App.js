import React, { useState, useEffect } from 'react';
import Home from './Home/Home';
import './App.css';
import LocalItem from './Home/LocalItem';
import axios from 'axios';

function App() {
  const [Product, setProduct] = useState([]);
  console.log(Product);
  useEffect(() => { // fetch glass
    let ignore = false;
    async function fetchData() {
      const result = await axios("http://157.230.244.57:7000/?id=shopifyItem");
      if (!ignore) {
        console.log(result);

        let items = result.data[0].item_post.items;

  
        setProduct(items);
      };
    }
    fetchData();
    return () => { ignore = true; }
  }, []);


  return (
    <div className="App">
      <Home Product={Product} />
      {/* <LocalItem  Product={Product} /> */}
      <a link="https://www.facebook.com/july.hph" className="july">July Hoang</a>
    </div>
  );
}

export default App;
