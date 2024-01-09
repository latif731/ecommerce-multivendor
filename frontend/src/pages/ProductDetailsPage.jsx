import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
// import Footer from "../components/Layout/Footer";
// import Header from "../components/Layout/Header";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ProductDetails from "../components/Products/ProductDetails";
// import SuggestedProduct from "../components/Products/SuggestedProduct";
import SuggestedProducts from "../components/Products/SuggestedProducts";
import { useSelector } from "react-redux";

const ProductDetailsPage = () => {
  const { allProducts } = useSelector((state) => state.products);
  console.log(allProducts)
  const { allEvents } = useSelector((state) => state.events);
  console.log(allEvents)
  const { id } = useParams();
  const [data, setData] = useState(null);
  console.log("data", data);

useEffect(() => {
    const event = allEvents && allEvents.find((i) => i.productId === id);
    setData(event);
    const product = allProducts && allProducts.find((i) => i._id === id);
    setData(product);
}, [allProducts, allEvents]);

  return (
    <div>
      <Header />
      <ProductDetails data={data} />
      {data && <SuggestedProducts data={data} />}        
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
