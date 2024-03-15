import './App.css';
import { useEffect, useState } from 'react';
import Axios from 'axios'


function App() {
  const [data, setmyData] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [cardData, setCardData] = useState([])
  const [total, setTotal] = useState(0)

  const handleclk = (index) => {
    const clickedData = data[index];
    setCardData([...cardData, { ...clickedData, quantity: 1, }]);
  };
  console.log(cardData, "test");



  const Toggleclk = () => {
    setShowSidebar(!showSidebar);
  };



  const handleIncrement = (index) => {
    const IncData = [...cardData];
    IncData[index].quantity++;
    setCardData(IncData);
  };





  const handleDecrement = (index) => {
    const DecData = [...cardData]
    if (DecData[index].quantity > 1) {
      DecData[index].quantity--
      setCardData(DecData)
    }
    else if (DecData[index].quantity === 1) {
      DecData.splice(index, 1)
      setCardData(DecData)
    }
  }



  useEffect(() => {
    Axios.get("https://fakestoreapi.com/products")
      .then((data) => setmyData(data.data));
  }, []);

  useEffect(() => {
    let price = 0;
    cardData.forEach((ele) => {
      price += ele.price * ele.quantity;
    });
    setTotal(price);
  }, [cardData]);




  return (
    <>
      <div className='main relative'>
        <nav className='flex justify-evenly p-4 items-center bg-blue-400'>
          <h1 className='text-4xl italic'>Data</h1>
          <ul className='flex gap-20'>
            <li>Home</li>
            <li>About</li>
            <li>Services</li>
            <li>Blog</li>
            <li>Contact</li>
          </ul>
          <h1 className='text-3xl'>{total.toFixed()}$:PKR</h1>
          <button onClick={Toggleclk} className='px-6 py-2 text-white bg-blue-600 rounded-md'>Add</button>
        </nav>
        <div
          className={`absolute ${showSidebar ? 'left-[80%]' : 'left-[100%]'} duration-1000 p-4 h-[100vh] overflow-y-auto gap-10 w-[400px] text-center font-bold bg-blue-300`}
        >
          <button onClick={Toggleclk} className="absolute right-10 top-10 text-3xl">
            x
          </button>
          <h1 className='text-center font-bold text-3xl py-6 italic underline'>Selected Data</h1>
          <div className='grid gap-4'>
            {
              cardData.map((ele, index) => (
                <div key={index} className='bg-white p-2  '>
                  <h1>{ele.quantity}</h1>
                  <button onClick={() => { handleDecrement(index) }} className='px-6 py-1 bg-blue-500 rounded-md'>-</button>
                  <h1>{ele.id}</h1>
                  <div className='flex justify-center'>
                    <img className='h-52' src={ele.image} alt={ele.title} />
                  </div>
                  <h1>{ele.title}</h1>
                  <h1>{ele.price * ele.quantity}</h1>
                  <button onClick={() => { handleIncrement(index) }} className='px-6 py-1 bg-blue-500 rounded-md'>+</button>
                </div>
              ))
            }
          </div>
        </div>
        <h1 className='text-center font-bold text-3xl py-6 italic underline underline-offset-8'>Api Data</h1>
        <div className='grid lg:grid-cols-3 md:grid-cols-2 italic p-4 sm:grid-cols-1  gap-6 mx-auto w-[80%]'>
          {
            data.map((ele, index) => (
              <div key={ele.id} className=' text-center text-xl p-6 bg-black space-y-4  text-white'>
                <h1>{ele.id}</h1>
                <div className='flex justify-center'>
                  <img className='h-60' src={ele.image} alt={ele.title} />
                </div>
                <h1>{ele.title}</h1>
                <h1>{ele.price}</h1>
                <button onClick={() => { handleclk(index) }} className='px-6 italic bg-white text-black font-bold rounded-sm'>Add</button>
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
}

export default App;
