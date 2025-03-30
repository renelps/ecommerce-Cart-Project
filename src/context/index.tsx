import { createContext, ReactNode, useState } from 'react';
import { ProductsProps } from '../pages/home';

interface CartContextData {
  cart: CartProps[];
  cartAmount: number;
  addItemCart: (products: ProductsProps) => void;
  removeItemCart: (product: CartProps) => void;
  total: string;
}

interface CartProps {
  id: number;
  title: string;
  description: string;
  price: number;
  cover: string;
  amount: number;
  total: number;
}

interface CartProviderProps {
  children: ReactNode
}
export const CartContext = createContext({} as CartContextData)


function CartProvider( {children}: CartProviderProps ) {

  const [cart, setCart] = useState<CartProps[]>([])
  const [total, setTotal] = useState("")


  function addItemCart(newItem: ProductsProps) {
    const indexItem = cart.findIndex(item => item.id === newItem.id)

    if(indexItem !== -1) {
      let cartList = [...cart]; // Criando nova cópia do array

      cartList[indexItem] = {
        ...cartList[indexItem],
        amount: cartList[indexItem].amount + 1,
        total: (cartList[indexItem].amount + 1) * cartList[indexItem].price,
      };

      setCart(cartList);
      totalResultCart(cartList)
      return;
    }

    let data = {
      ...newItem,
      amount: 1,
      total: newItem.price
    }

    setCart(products => [...products, data])
    totalResultCart([...cart, data])
  }
  
  function removeItemCart(product: CartProps) {
    const indexItem = cart.findIndex(item => item.id === product.id);
  
    if (indexItem !== -1) {
      let cartList = [...cart];
  
      if (cartList[indexItem].amount > 1) {
        cartList[indexItem] = {
          ...cartList[indexItem],
          amount: cartList[indexItem].amount - 1,
          total: (cartList[indexItem].amount - 1) * cartList[indexItem].price,
        };
      } else {
        cartList = cartList.filter(item => item.id !== product.id);
      }
  
      setCart(cartList);
      totalResultCart(cartList);
    }
  }

  function totalResultCart(item: CartProps[]) {
    let totalPriceCart = item;
    const resultTotal = totalPriceCart.reduce((acc, obj) => { return acc + obj.total}, 0)
    const resultTotalFormated = resultTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL"})
    setTotal(resultTotalFormated)
  }

  return (
    <CartContext.Provider value={{ 
      cart,
      cartAmount: cart.length,
      addItemCart,
      removeItemCart,
      total
     }}>
      {children}
    </CartContext.Provider>
  )
}


export default CartProvider;