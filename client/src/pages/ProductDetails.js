/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import "../styles/ProductDetailsStyles.css";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [cart, setCart] = useCart();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/get-product/${params.slug}`);
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/related-product/${pid}/${cid}`);
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="row container-fluid product-details">
        <div className="col-md-4 d-flex justify-content-center">
          <img src={`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/product-photo/${product._id}`} className="" alt={product.name} width={"70%"} />
        </div>
        <div className="col-md-8 product-details-info">
          <h1 className="text-center">Product Details</h1>
          <hr />
          <div className="ms-5">
            <h3>Name : {product.name}</h3>
            <h6>Author : {product.author}</h6>
            <p>Description : {product.description}</p>
            <h5>Category : {product?.category?.name}</h5>
            <h4>
              Price :
              {product?.price?.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </h4>
            <button
              className="btn addtocart ms-1"
              onClick={() => {
                setCart([...cart, product]);
                localStorage.setItem("cart", JSON.stringify([...cart, product]));
                toast.success("Item Added to cart");
              }}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <hr />
      <div className="row container similar-products mx-5">
        <h6 className="display-6 mt-4">Similar Products</h6>
        {relatedProducts.length < 1 && <p className="text-center">No Similar Products found</p>}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2">
              <img src={`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
              <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-title card-price ">
                    {p.price.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </p>
                </div>
                <h6 className="card-text">{p.author}</h6>
                <p className="card-text">{p.description.substring(0, 60)}...</p>
                <div className="card-name-price">
                  <button class="btn moreDetails ms-1" onClick={() => navigate(`/product/${p.slug}`)}>
                    More Details
                  </button>
                  <button
                    className="btn addtocart ms-1"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem("cart", JSON.stringify([...cart, p]));
                      toast.success("Item Added to cart");
                    }}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
