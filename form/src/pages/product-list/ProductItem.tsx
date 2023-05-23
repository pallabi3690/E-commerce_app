import { Product } from "../../services/productService"

type ProductItemProps = {
    product:Product
}

export default function ProductItem({product}: ProductItemProps ) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg align-items: center">
      <img className="w-full" src={product.image} alt={product.title}/>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{product.title}</div>
        <p className="text-gray-700 text-base" dangerouslySetInnerHTML={{__html:product.description}} ></p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span
          className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{product.category}</span>
        <span
          className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{product.price}</span>
    </div>
    </div>
  )
}
