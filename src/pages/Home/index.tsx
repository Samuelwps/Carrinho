import React, { useState, useEffect } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

import { ProductList, CircularProgressContainer } from './styles';
import { api } from '../../services/api';
import { formatPrice } from '../../util/format';
import { useCart } from '../../hooks/useCart';
import CircularProgress from "@mui/material/CircularProgress"


interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface ProductFormatted extends Product {
  priceFormatted: string;
}

interface CartItemsAmount {
  [key: number]: number;
}

const Home = (): JSX.Element => {
  const [products, setProducts] = useState<ProductFormatted[]>([]);
  const { addProduct, cart } = useCart();

  const [call, setCall] = useState(true)


  const cartItemsAmount = cart.reduce((sumAmount, product) => {
    const newSumAmount = {...sumAmount}
    newSumAmount[product.id] = product.amount

    return newSumAmount
  }, {} as CartItemsAmount)

  useEffect(() => {
    async function loadProducts() {
      const response  = await api.get(`/produtos`)

      const responseData:Product[] = response.data

      const data = responseData.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price)
      }))
      setProducts(data)
      setCall(false)
    }

    loadProducts();
  }, []);

  function handleAddProduct(id: number) {
    addProduct(id)
  }

  function Call(){
    return(
      <CircularProgressContainer>
        <div>
        <CircularProgress style={{color: "white", width:"100%", height:"100%" }}/>
        </div>
      </CircularProgressContainer>
    )
  }

  return (
    <>
    {call ?
    <Call/>
    :
    <ProductList>
      {products.map( product => (
        <li key={product.id}>
        <img src={product.image} alt={product.title} />
        <strong>{product.title}</strong>
        <span>{product.priceFormatted}</span>
        <button
          type="button"
          data-testid="add-product-button"
          onClick={() => handleAddProduct(product.id)}
        >
          <div data-testid="cart-product-quantity">
            <MdAddShoppingCart size={16} color="#FFF" />
            {cartItemsAmount[product.id] || 0}
          </div>

          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>
      ))}
    </ProductList>
    }
    </>
  );
};

export default Home;
