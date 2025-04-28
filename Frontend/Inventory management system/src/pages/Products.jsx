import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import auth from "../connection/auth";
import {
  Button,
  Loader,
  NotFound,
  RoundedAddButton,
  SecondaryButton,
  Tabs,
} from "../components";

import "../CSS/scrollbar.css";
import axios from "axios";

const Products = () => {
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#DDDDDD",
    "&:hover": {
      backgroundColor: "#DDDDDD",
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      [theme.breakpoints.up("sm")]: {
        width: "24ch",
        "&:focus": {
          width: "30ch",
        },
      },
    },
  }));

  const [productList, setProductList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryList, setCategoryList] = useState(["all"]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const init = {
    name: "",
    actual_price: 0,
    selling_price: 0,
    description: "",
    image: "",
    productNo: "",
    category: "",
  };
  const [newProduct, setNewProduct] = useState(init);

  const fetchProducts = async () => {
    try {
      const response = await auth.getAllProducts();
      if (response.success === false) {
        throw response;
      }
      setProductList(response.products);
      setFilteredProducts(response.products);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddProduct = () => {
    setIsModalOpen(!isModalOpen);
    setFile(null);
  };

  const fetchCategories = async () => {
    try {
      const response = await auth.getCategories();
      if (response.success === false) {
        throw response;
      }
      setCategories(response.categories);
      let list = response.categories.map((category) => category.name);
      list.unshift("all");
      setCategoryList(list);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    // Reset scroll position on component mount
    window.scrollTo(0, 0);
  }, []);

  const handleImageUpload = (file) => {
    setFile(file);
  };

  const handleSubmit = async (e) => {
    let response;
    setLoading(true);
    e.preventDefault();
    try {
      if (newProduct.name === "") {
        //toast.error("Name is required", { duration: 3000 });
        setError("Name is required");
        return;
      } else if (newProduct.category === "") {
        //toast.error("Category is required", { duration: 3000 });
        setError("Category is required");
        throw new Error("Category is required");
      } else if (newProduct.actual_price === "") {
        //toast.error("Actual Price is required", { duration: 3000 });
        setError("Actual Price is required");
        return;
      } else if (newProduct.selling_price === "") {
        //toast.error("Selling Price is required", { duration: 3000 });
        setError("Selling Price is required");
        return;
      } else if (newProduct.productNo === "") {
        //toast.error("Product No is required", { duration: 3000 });
        setError("Product No is required");
        return;
      } else if (newProduct.description === "") {
        //toast.error("Description is required", { duration: 3000 });
        setError("Description is required");
        return;
      } else if (!file) {
        //toast.error("Image is required", { duration: 3000 });
        setError("Image is required");
        return;
      }
      response = await auth.uploadImage(file.name, file.type);

      if (!response.success) {
        throw response;
      }
    } catch (error) {
      setError("Error in upload image product", error);
    }
    try {
      const uploadUrl = response.uploadUrl;
      //let res = await auth.uploadImageToAws(uploadUrl, file);
      let res = await axios.put(uploadUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
      });
      if (res.status != 200) {
        throw res;
      }
    } catch (error) {
      setError("Error adding product image in AWS.", error);
    }
    try {
      const imageUrl = response.imageUrl.replace(/%20/g, "+");
      const updatedProduct = { ...newProduct, image: imageUrl };
      setNewProduct({ ...newProduct, image: imageUrl });
      console.log(imageUrl);
      console.log(updatedProduct);

      const res = await auth.addProduct(updatedProduct);
      if (!res.success) {
        throw res;
      }
      setNewProduct(init);
      setIsModalOpen(false);
      fetchProducts();
      setError("");
    } catch (error) {
      setError("Error adding product", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleSearch = () => {
    const searchQuery = document.getElementById("searchQuery").value;
    if (searchQuery.trim() === "") {
      setFilteredProducts(productList); // If search field is empty, show all products
    } else {
      const filtered = productList.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.productNo
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) /* ||
          (product.category &&
            product.category.name.toLowerCase().includes(searchQuery.toLowerCase())) */
      );
      setFilteredProducts(filtered);
    }
  };

  const handleClick = (productNo) => {
    navigate(`/product/${productNo}`);
  };
  const handleSelectedCategory = (cat) => {
    setSelectedCategory(cat);
    setFilteredProducts(
      productList.filter((product) =>
        cat === "all" ? true : product.category.name === cat
      )
    );
  };

  return (
    <>
      {/* Backdrop with loader */}
      {loading && <Loader />}
      <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-4 md:px-0">
        <div className="p-6">
          {/* Sticky Compact Search Bar */}
          <div className="sticky top-0 z-40 bg-gray-100 shadow-md rounded-lg p-3 flex items-center justify-between">
            <h2 className="text-lg md:text-xl font-bold text-gray-800">
              📦 Product List
            </h2>
            <div className="flex items-center space-x-2">
              <Search className="bg-white p-1 rounded-lg shadow-sm border border-gray-300 flex items-center h-10 px-3">
                <SearchIconWrapper>
                  <SearchIcon className="text-gray-500 h-5 w-5" />
                </SearchIconWrapper>
                <StyledInputBase
                  id="searchQuery"
                  placeholder="Search..."
                  className="text-sm"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
              <Button
                text="🔍"
                onClick={handleSearch}
                className="bg-blue-500 text-white px-3 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300 text-sm"
              />
            </div>
          </div>

          {/* Responsive Category Tabs */}
          <div className="pt-4">
            <Tabs
              list={categoryList}
              onClick={handleSelectedCategory}
              activeTab={selectedCategory}
              className="justify-start flex flex-wrap gap-2 overflow-x-auto"
            />
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {filteredProducts.map((product, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 p-4 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 cursor-pointer"
                  onClick={() => handleClick(product.productNo)}
                >
                  {/* Product Image */}
                  <div className="w-full h-40 flex justify-center items-center overflow-hidden rounded-lg">
                    <img
                      src={product.image || "https://via.placeholder.com/200"}
                      alt={product.name}
                      className="h-full w-auto object-contain"
                    />
                  </div>

                  <div class={product.total_quantity > 0 ? "bg-green-100 p-2" : "bg-red-100 p-2"} >
                    {/* Product Info */}
                    <div className="mt-3">
                      <h3 className="text-base font-bold text-gray-800 truncate">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-600 mt-1 truncate">
                        {product.description || "No description available"}
                      </p>
                    </div>

                    {/* Additional Details */}
                    <div className="mt-2 flex justify-between items-center text-xs text-gray-600">
                      <span>🏷️ {product.category?.name || "N/A"}</span>
                      <span>🔢 {product.productNo}</span>
                    </div>

                    {/* Footer: Pricing & Quantity */}
                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-lg font-bold text-blue-600">
                        💲{product.selling_price}
                      </span>
                      <span className="text-xs text-gray-500">
                        📦 Total Quantity: {product.total_quantity || 0}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <NotFound text="No products found." />
            </div>
          )}
        </div>
      </div>

      <RoundedAddButton onClick={handleAddProduct} title="Add new Product" />
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg lg:max-w-2xl max-[768px]:mx-4 overflow-y-auto max-h-[90vh] custom-scrollbar">
            <h2 className="text-xl font-bold mb-4">Add Product</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="quantity"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="category"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={newProduct.category}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, category: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categories.map((category, index) => (
                    <option key={index} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="quantity"
                >
                  Actual Price
                </label>
                <input
                  id="actualPrice"
                  type="number"
                  min={0}
                  value={newProduct.actual_price}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      actual_price: e.target.value >= 0 ? e.target.value : 0,
                    })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="quantity"
                >
                  Selling Price
                </label>
                <input
                  id="sellingPrice"
                  type="number"
                  min={0}
                  value={newProduct.selling_price}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      selling_price: e.target.value,
                    })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="productNo"
                >
                  Product NO
                </label>
                <input
                  id="productNo"
                  type="text"
                  value={newProduct.productNo}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, productNo: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="imageUpload"
                >
                  Upload Image
                </label>
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e.target.files[0])}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {newProduct.image && (
                  <p className="text-sm text-green-500 mt-2">
                    Image uploaded successfully!
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  type="text"
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              {error && (
                <div className="flex justify-center items-center mt-2">
                  <p className="text-red-500 text-md ">{error}</p>
                </div>
              )}

              <div className="flex items-center justify-between">
                <SecondaryButton onClick={handleAddProduct} text={"Cancel"} />
                <Button type="submit" text="Add Product" />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
