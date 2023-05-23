import api from "./api"

const endPoint = "products"

export type Product = {
  id?: string;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
};


export const getProducts = ()=>{
   return api.get<Product[]>(endPoint)
}
export const addProduct =(data:Product)=>{
   return api.post<Product>(endPoint,data)
}
export const editProduct =(id:string,data:Product)=>{
    return api.put(`${endPoint}/${id}`,data)
 }
 export const delteProduct =(id:string)=>{
    return api.delete(`${endPoint}/${id}`)
 }