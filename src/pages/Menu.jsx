import React, { useState } from "react";
import { FaCoffee, FaHamburger, FaUtensils } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../app.css"; // Add your custom styles
import menu1 from "../assets/menu-1.jpg";
import menu2 from "../assets/menu-2.jpg";
import menu3 from "../assets/menu-3.jpg";
import menu4 from "../assets/menu-4.jpg";
import menu5 from "../assets/menu-5.jpg";
import menu6 from "../assets/menu-6.jpg";
import menu7 from "../assets/menu-7.jpg";
import menu8 from "../assets/menu-8.jpg";


const MenuData = [
  {
    category: "Breakfast",
    icon: <FaCoffee className="text-custom-yellow fs-3 me-2" />,
    items: [
      { name: "Pancakes", price: 15, image: menu1 },
      { name: "Omelette", price: 12, image: menu2 },
      { name: "French Toast", price: 10, image: menu3 },
      { name: "Chicken Burger", price: 115, image:menu4},
      { name: "Grilled Steak", price: 150, image: menu5 },
      { name: "Pasta", price: 100, image: menu6 },
      { name: "Salmon", price: 200, image: menu7 },
      { name: "Roasted Chicken", price: 180, image: menu8 },
      { name: "Shrimp Pasta", price: 170, image: menu5 },
    ],
  },
  {
    category: "Lunch",
    icon: <FaHamburger className="text-custom-yellow fs-3 me-2" />,
    items: [
      { name: "Chicken Burger", price: 115, image:menu4},
      { name: "Grilled Steak", price: 150, image: menu5 },
      { name: "Pasta", price: 100, image: menu6 },
    ],
  },
  {
    category: "Dinner",
    icon: <FaUtensils className="text-custom-yellow fs-3 me-2" />,
    items: [
      { name: "Salmon", price: 200, image: menu7 },
      { name: "Roasted Chicken", price: 180, image: menu8 },
      { name: "Shrimp Pasta", price: 170, image: menu5 },
    ],
  },
];

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("Breakfast");

  return (
    <div className="container my-5">
      <h2 className="text-center fw-bold text-custom-yellow">Most Popular Items</h2>

      {/* Category Selection Tabs */}
      <div className="d-flex justify-content-center my-4">
        {MenuData.map((menu) => (
          <button
            key={menu.category}
            className={`btn mx-2 px-3 py-2 fw-semibold ${
              activeCategory === menu.category ? "text-custom-yellow border-bottom border-custom-yellow" : "text-dark"
            }`}
            onClick={() => setActiveCategory(menu.category)}
          >
            {menu.icon} {menu.category}
          </button>
        ))}
      </div>

      {/* Food Items List */}
      <div className="row">
        {MenuData.find((menu) => menu.category === activeCategory).items.map((item, index) => (
          <div key={index} className="col-md-6 mb-4 d-flex align-items-center border-bottom pb-3">
            <img src={item.image} alt={item.name} className="rounded me-3" style={{ width: "80px", height: "80px" }} />
            <div>
              <h5 className="mb-1">{item.name}</h5>
              <p className="text-muted fst-italic">Delicious & fresh</p>
            </div>
            <span className="ms-auto text-custom-yellow fw-bold fs-5">${item.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
