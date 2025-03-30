import { useContext, useEffect, useState } from "react"
import { api } from "../../services/api";
import { useParams } from "react-router";
import { ProductsProps } from "../home";
import { BsCartPlus } from "react-icons/bs"
import { CartContext } from '../../context/index';
import { formatPrice } from "../../utils/formatprice";
import toast from "react-hot-toast";
export function Detail() {


  const [products, setProducts] = useState<ProductsProps | null>(null);
  const { id } = useParams();
  const { addItemCart } = useContext(CartContext);

  useEffect(() => {
    async function getDetailProduct() {
      try {
        const response = await api.get(`/products/${id}`)
        setProducts(response.data)
        console.log(response.data)
      }catch {  
        console.log("Algo deu errado")
      }
    }

    getDetailProduct()

  }, [id])


  function handleAddItem(product: ProductsProps) {
    addItemCart(product)
    toast.success("Item adicionado com sucesso!!")
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col lg:flex-row justify-between mb-20 max-h-[500px]">
      <section>
        <img 
          className="max-h-[500px] rounded-sm"
          src={products?.cover} 
          alt={products?.title} 
        />
      </section>
      <section className="px-10 pt-3 max-w-[500px] max-h-[500px] flex flex-col">
        <h2 className="text-white font-bold text-center">{products?.title}</h2>
        <p className="text-white pt-10 text-justify">  
          {products?.description 
            ? products.description.length > 100 
            ? products.description.slice(0, 100) + "..." 
            : products.description
          : "Descrição indisponível"}
        </p>

          <div className="mt-auto">
            <p className="text-white py-10 text-center font-bold">
              {products && formatPrice(products?.price)}
            </p>
            <button 
              className="flex items-center justify-center text-white w-full bg-blue-700 py-2 rounded-sm cursor-pointer gap-1"
              onClick={ () => products && handleAddItem(products)}
            >
              <BsCartPlus />
              Adicionar
            </button>
          </div>
      </section>
      </div>
    </div>
  )
}