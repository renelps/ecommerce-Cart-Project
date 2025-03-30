import { useContext } from "react";
import { CartContext } from "../../context";
import { formatPrice } from '../../utils/formatprice';
export function Cart() {


  const { cart, total, addItemCart, removeItemCart } = useContext(CartContext);

  return (
    <div className="w-full max-w-7xl mx-auto gap-4">
      <h2 className="text-white text-2xl font-medium text-center my-3">
        Meu carrinho
      </h2>
      {cart.length === 0 && (
        <p className="text-center text-white py-10">Voce ainda nao tem item no carrinho</p>
      )}
      {cart.length > 0 && cart.map((item) => (
        <section key={item.id} className="flex items-center justify-between border-b-2 border-gray-300 mx-3">
          <img src={item.cover}
          alt={item.title} 
          className="w-40 p-2"
          />

          <strong className="text-white">
            Preço: {formatPrice(item.price)}
          </strong>


          <div className="text-white flex gap-2">
            <button className="bg-red-600 px-2 cursor-pointer" onClick={ () => removeItemCart(item)}>
              -
            </button>
            {item.amount}
            <button className="bg-green-500 px-2 cursor-pointer" onClick={ () => addItemCart(item)} >
              +
            </button>
          </div>

          <strong className="float-right text-white">
              Subtotal: {formatPrice(item.total)}
          </strong>
        </section>
      ))
      }

      {cart.length > 0 && <p className="font-bold text-white py-2 ml-3">Total: {total}</p>}
    </div>
  )
}