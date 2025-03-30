import { useEffect, useState } from "react"
import { BsCartPlus } from "react-icons/bs"
import { api } from "../../services/api";
import { CartContext } from '../../context/index';
import { useContext } from "react";
import { formatPrice } from '../../utils/formatprice'
import toast from "react-hot-toast";
import { Link } from "react-router";

export interface ProductsProps {
  id: number;
  title: string;
  description: string;
  price: number;
  cover: string;
}


export function Home() {
  const [products, setProducts] = useState<ProductsProps[]>([]);
  const { addItemCart } = useContext(CartContext);

  useEffect(() => {


    async function getProducts() {
      const response = await api.get("/products")
      setProducts(response.data)
    }
    getProducts()
  }, [])


  function handleAddCartItem (items: ProductsProps) {
    addItemCart(items);
    toast.success("Item adicionado com sucesso!!")
  }

  return (
    <div className="">
      <main className="w-full max-w-7xl px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mt-4 mb-2"> 
          {products.length > 0 && products.map((item) => (
           <Link to={`/detail/${item.id}`} key={item.id}>
            <section className="w-full">
                <img 
                  src={item.cover}
                  alt={item.title} 
                  className="w-full max-h-[280px] object-contain"
                />

                <p className="text-white text-center pt-4">{item.title}</p>

                <div className="flex items-center justify-center gap-2">
                  <strong className="text-white py-2">{formatPrice(item.price)}</strong>
                  <button className="flex items-center text-white gap-2 cursor-pointer" onClick={ () => handleAddCartItem(item) }>
                    <BsCartPlus size={20} color="#fff"/>
                  </button>
                </div>                
            </section>
           </Link>
          ))}
        </div>
      </main>
    </div>
  )
}