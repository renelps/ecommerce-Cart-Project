  export function formatPrice(item: number) {

    return item.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })
  
  }