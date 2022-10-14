import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header";
import Banner from "../../components/HomePage/Banner";
import ProductContainer from "../../components/ProductContainer/ProductContainer";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [filter, setFilter] = useState({});
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [searchTimer, setSearchTimer] = useState(null);
  const fetchProducts = async () => {
    const res = await axios.get(
      process.env.REACT_APP_BASE_URL +
        "/product?filter=" +
        JSON.stringify(filter)
    );
    setProducts(res.data);

    const res1 = await axios.get(process.env.REACT_APP_BASE_URL + "/category");
    setCategory(res1.data);

    const res2 = await axios.get(
      process.env.REACT_APP_BASE_URL + "/subcategory"
    );
    setSubCategory(res2.data);
  };
  useEffect(() => {
    fetchProducts();
    setCart(JSON.parse(sessionStorage.getItem("cart")));
  }, []);

  async function addToCart(product) {
    let tempCart = JSON.parse(sessionStorage.getItem("cart"));
    if (!tempCart) {
      setCart([product]);
      sessionStorage.setItem(
        "cart",
        JSON.stringify([{ ...product, count: 1 }])
      );
      return;
    }

    const exists = tempCart.find((item) => item._id === product._id);
    if (exists) {
      tempCart = tempCart.map((item) => {
        if (item._id === product._id) {
          return { ...item, count: item.count + 1 };
        }
        return item;
      });
    } else {
      tempCart.push({ ...product, count: 1 });
    }

    setCart(tempCart);
    sessionStorage.setItem("cart", JSON.stringify(tempCart));
    return;
  }

  const handleSearchFilter = (e) => {
    setFilter({ ...filter, name: e.target.value });
  };

  useEffect(() => {
    if (searchTimer) {
      clearTimeout(searchTimer);
    }
    const timer = setTimeout(() => {
      fetchProducts();
    }, 1000);
    setSearchTimer(timer);
  }, [filter]);

  return (
    <Container>
      <Header
        text={filter?.name ?? ""}
        handleSearchFilter={handleSearchFilter}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Banner />
      </div>
      <div
        style={{
          marginTop: "50px",
        }}
      >
        <div className="p-3">
          <label htmlFor="categoryFilter">Category : </label>
          <select
            name="categoryFilter"
            className="my-1 mx-2"
            onChange={(e) => {
              setFilter({ ...filter, category: e.target.value });
            }}
            value={filter.category}
          >
            <option value="">All</option>
            {category.map((cat) => {
              return <option value={cat.name}>{cat.name}</option>;
            })}
          </select>
          <label htmlFor="subcategoryFilter">Sub Category : </label>
          <select
            className="m-1"
            onChange={(e) => {
              setFilter({ ...filter, subCategory: e.target.value });
            }}
            value={filter.subCategory}
          >
            <option value="">All</option>
            {subCategory
              .filter((sub) => {
                return sub.parent === filter.category;
              })
              .map((sub) => {
                return <option value={sub.name}>{sub.name}</option>;
              })}
          </select>
        </div>
        <ProductContainer data={products} addToCart={addToCart} />
      </div>
      <Footer />
    </Container>
  );
}
export default HomePage;
