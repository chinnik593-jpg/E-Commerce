import React from 'react';
import { Smartphone, Shirt, Home, ShoppingBag, Gamepad2, Grid, Package } from 'lucide-react';

const CATEGORY_ICONS = {
  All: Grid,
  Mobiles: Smartphone,
  Fashion: Shirt,
  Home: Home,
  Grocery: ShoppingBag,
  Toys: Gamepad2,
  Other: Package
};

export default function CategoryNav({ categories = [], activeCategory, onSelectCategory }) {
  const allCategories = ["All", ...categories];

  return (
    <nav className="category-bar">
      <div className="category-container">
        {allCategories.map((cat) => {
          const IconComponent = CATEGORY_ICONS[cat] || Package;
          const isActive = activeCategory === cat;

          return (
            <div
              key={cat}
              className={`category-item ${isActive ? 'active' : ''}`}
              onClick={() => onSelectCategory(cat)}
            >
              <div className="category-icon-wrapper">
                <IconComponent size={22} />
              </div>
              <span>{cat}</span>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
