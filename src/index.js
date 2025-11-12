import React,{useState}from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

function Header() {
  const { isOpen } = getCurrentStatus();
  
  return (
    <header className='header'>
      <h1 style={{ color: 'orange', fontSize: '48px', textTransform: 'uppercase' }}>Wish Le Pizzaria</h1>
      {isOpen && (
        <p className="tagline">Authentic Italian Cuisine</p>
      )}
    </header>
  );
}



const pizzaData = [
  {
    name: "Focaccia",
    description: "Bread with Italian olive oil and rosemary",
    price: 6.00,
    imageSrc: "focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Margherita",
    description: "Tomato and mozzarella",
    price: 10.00,
    imageSrc: "margherita.jpg",
    soldOut: false,
  },
  {
    name: "Spinaci",
    description: "Tomato, mozzarella, spinach, and ricotta cheese",
    price: 12.00,
    imageSrc: "spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Funghi",
    description: "Tomato, mozzarella, mushrooms, and onion",
    price: 12.00,
    imageSrc: "funghi.jpg",
    soldOut: false,
  },
  {
    name: "Salamino",
    description: "Tomato, mozzarella, and spicy pepperoni",
    price: 15.00,
    imageSrc: "salamino.jpg",
    soldOut: true,
  },
  {
    name: "Prosciutto",
    description: "Tomato, mozzarella, ham, aragula, and burrata cheese",
    price: 18.00,
    imageSrc: "prosciutto.jpg",
    soldOut: false,
  },
];

function PizzaItem({ pizzaObj }) {
  if (pizzaObj.soldOut) {
    return (
      <li className="pizza sold-out">
        <img src={pizzaObj.imageSrc} alt={pizzaObj.name} />
        <div>
          <h3>{pizzaObj.name} (SOLD OUT)</h3>
          <p>{pizzaObj.description}</p>
          <span>Sold out</span>
        </div>
      </li>
    );
  }

  return (
    <li className="pizza">
      <img src={pizzaObj.imageSrc} alt={pizzaObj.name} />
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.description}</p>
        <span>${pizzaObj.price.toFixed(2)}</span>
      </div>
    </li>
  );
}

function Pizzas({filteredPizzas}) {
  const pizzas = filteredPizzas;
  const numPizzas = pizzas.length;

  return (
    <ul className="pizzas">
      {numPizzas > 0 ? (
        pizzas.map((pizza) => (
          <PizzaItem 
            pizzaObj={pizza} 
            key={pizza.name} 
          />
        ))
      ) : (
        <p style={{ fontSize: '3rem', color: 'red' }}>NO PIZZA FOUND!</p>
      )}
    </ul>
  );
}

function Menu() {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredPizzas = pizzaData.filter(pizza =>
    pizza.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchClick = () => {
      console.log("Search button clicked!");
      // You could trigger an action here, though the search is already reactive
  };

  return (
    <main className='menu'>
      <h2>Our Menu</h2>
      <div className='search-bar'>
        <input 
          type="text" 
          placeholder="Search for a pizza..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button 
          className='search-btn' 
          onClick={handleSearchClick}
          aria-label="Search" // Good for accessibility
        >🔍</button>

      </div>
      <Pizzas filteredPizzas={filteredPizzas} />
    </main>
  );
}

function Order({ closeHour }) {
  return (
    <div className='order'>
      <p>We're currently open until {closeHour}:00.</p>
      <button className='btn'>Order</button>
    </div>
  );
}

const getCurrentStatus = () => {
  const hour = new Date().getHours();
  const openHour = 10;
  const closeHour = 22; 
  return {
    isOpen: hour >= openHour && hour < closeHour,
    openHour,
    closeHour
  };
};

function Footer() {
  const { isOpen, openHour, closeHour } = getCurrentStatus();

  return (
    <footer className='footer'>
      {isOpen ? (
        <Order closeHour={closeHour} />
      ) : (
        <p>Sorry, we're closed. We open again at {openHour}:00.</p>
      )}
    </footer>
  );
}

function App() {
  return (
    <div className='container'>
      <Header /> 
      <Menu /> 
      <Footer />
    </div>
  );
}


const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);