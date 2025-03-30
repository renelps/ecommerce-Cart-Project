import { useContext } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router';
import { CartContext } from '../../context';


export function Header() {

  const { cartAmount } = useContext(CartContext)


  return (
    <header 
      className="flex items-center justify-center"
      style={{background: "#A3020D"}}
    >
      <nav className="flex items-center justify-around w-full py-3">
        <Link 
          to="/"
          className="font-bold text-white text-2xl"
        >
          Dev Shop
        </Link>

        <Link className="relative" to="/cart">
          <FiShoppingCart size={24} color="#fff"/>
          {cartAmount > 0 && (
            <span className="absolute -right-4 -top-3 px-2.5 flex h-5 w-5 rounded-full bg-green-500 items-center justify-center text-white text-xs">
              {cartAmount}
            </span>
          )}
        </Link>
      </nav>
    </header>
  )
}