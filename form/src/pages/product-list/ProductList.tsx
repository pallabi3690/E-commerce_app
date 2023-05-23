import { useQuery } from "react-query"
import { getProducts } from "../../services/productService"
import { QueryKeys } from "../../services/queryKeys"
import ProductItem from "./ProductItem"

export default function ProductList() {
 const {data} = useQuery(QueryKeys.products(),getProducts, {enabled:true, staleTime:60*1000})
 const products = data?.data || []
 
  return (
    <div className="flex flex-row flex-wrap gap-4">
      {
        products.map(p=><ProductItem key={p.id} product={p} ></ProductItem>)
      }
    </div>
  )
}
