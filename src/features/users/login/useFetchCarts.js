import { useState, useEffect } from "react";

export default function useFetchCarts(userId)
{
    const [carts, setCarts] = useState([]);

    useEffect(() =>{
        fetch(`https://fakestoreapi.com/carts/user/${userId}`)
           .then((res) => res.json())
           .then((carts) => {
              setCarts(carts);
            //   console.log(carts);
           })}
     , [userId] );

     return [carts];
}