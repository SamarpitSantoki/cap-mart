import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import ReactPaginate from "react-paginate";

import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Product() {
  const [products, setProducts] = useState([]);
  const [edit, setEdit] = useState(null);
  const [modal, setModal] = useState(null);
  const [method, setMethod] = useState("Add");
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [category, setCategories] = useState([]);
  const [subCategory, setSubCategories] = useState([]);
  const [filter, setFilter] = useState({});

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 10) % products.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  const fetchProducts = async () => {
    const res = await axios.get(
      process.env.REACT_APP_BASE_URL +
        "/product?filter=" +
        JSON.stringify(filter)
    );
    setProducts(res.data);

    const res1 = await axios.get(process.env.REACT_APP_BASE_URL + "/category");
    setCategories(res1.data);

    const res2 = await axios.get(
      process.env.REACT_APP_BASE_URL + "/subcategory"
    );
    setSubCategories(res2.data);
  };
  useEffect(() => {
    fetchProducts();
  }, [filter]);

  const handleAddProduct = async () => {
    try {
      const formData = new FormData();

      Object.keys(edit).map((key) => {
        formData.append(key, edit[key]);
      });
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
      if (method === "Add") {
        const res = await axios.post(
          process.env.REACT_APP_BASE_URL + "/admin/product",
          formData,
          {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(sessionStorage.getItem("user")).access_token
              }`,
            },
          }
        );
        toast.success("Product Added Successfully");
        fetchProducts();
        setModal(false);
        return;
      }
      if (method === "Edit") {
        const res = await axios.patch(
          process.env.REACT_APP_BASE_URL + "/admin/product/",
          formData,
          {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(sessionStorage.getItem("user")).access_token
              }`,
            },
          }
        );
        toast.success("Product Added Successfully");
        fetchProducts();
        setModal(false);
        return;
      }
    } catch (e) {
      console.log(e);
      if (e.response.data) {
        toast.error(e.response.data.errors[0].msg);
      } else {
        toast.error(e.message);
      }
      return;
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const res = await axios.delete(
        process.env.REACT_APP_BASE_URL + "/admin/product/" + id,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(sessionStorage.getItem("user")).access_token
            }`,
          },
        }
      );
      toast.success("Product Deleted Successfully");
      fetchProducts();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <main className="relative w-full pb-8">
      {/* <!--modal content--> */}

      {modal && (
        <div
          id="edit_prod"
          className="absolute w-1/3 left-1/3 top-36 bg-white rounded-lg shadow dark:bg-gray-700  "
        >
          <div className="flex justify-end p-2">
            <button
              onClick={() => {
                setModal(false);
                setEdit(null);
                setMethod("Add");
              }}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-toggle="authentication-modal"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <form
            className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8"
            onSubmit={(e) => e.preventDefault()}
          >
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              {method} Product
            </h3>
            <div>
              <label
                htmlFor="product"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Product Name
              </label>
              <input
                type="text"
                name="product"
                id="product"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                defaultValue={edit?.name}
                onChange={(e) => {
                  setEdit((prev) => ({ ...prev, name: e.target.value }));
                }}
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Product Description
              </label>
              <input
                type="textarea"
                name="description"
                id="description"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                value={edit?.description}
                onChange={(e) => {
                  setEdit((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }));
                }}
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Category
              </label>
              <select
                name="Category"
                id="Category"
                onChange={(e) => {
                  setEdit((prev) => ({ ...prev, category: e.target.value }));
                }}
                value={edit?.category}
              >
                <option value="">Select</option>
                {category.map((cat) => (
                  <option
                    key={cat._id}
                    value={cat.name}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  >
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="subCategory"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                subCategory
              </label>
              <select
                name="subCategory"
                id="subCategory"
                onChange={(e) => {
                  setEdit((prev) => ({
                    ...prev,
                    subCategory: e.target.value,
                  }));

                  edit.subCategory = e.target.value;
                }}
                value={edit?.subCategory}
              >
                <option value="">Select</option>
                {subCategory.map((cat) => (
                  <option
                    key={cat._id}
                    value={cat.name}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  >
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Price
              </label>
              <input
                type="text"
                name="price"
                id="price"
                defaultValue={edit?.price}
                onChange={(e) => {
                  setEdit((prev) => ({ ...prev, price: e.target.value }));
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
            <div>
              <label
                htmlFor="displayPrice"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Display Price
              </label>
              <input
                type="text"
                name="displayPrice"
                id="displayPrice"
                defaultValue={edit?.displayPrice}
                onChange={(e) => {
                  setEdit((prev) => ({
                    ...prev,
                    displayPrice: e.target.value,
                  }));
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
            <div>
              <label
                htmlFor="discountedPrice"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Discounted Price
              </label>
              <input
                type="text"
                name="discountedPrice"
                id="discountedPrice"
                defaultValue={edit?.discountedPrice}
                onChange={(e) => {
                  setEdit((prev) => ({
                    ...prev,
                    discountedPrice: e.target.value,
                  }));
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="image1"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Image 1
              </label>
              <input
                multiple
                type="file"
                name="myImage"
                onChange={(e) => {
                  // const check = dataURItoBlob(e.target.files[0]);
                  console.log(e.target.files[0]);
                  edit.image1 = e.target.files[0];
                }}
              />
            </div>
            <div>
              <label
                htmlFor="image2"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Image 2
              </label>
              <input
                type="file"
                name="myImage"
                onChange={(e) => {
                  // const check = dataURItoBlob(e.target.files[0]);
                  console.log(e.target.files[0]);
                  edit.image2 = e.target.files[0];
                }}
              />
            </div>
            <div>
              <label
                htmlFor="image3"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Image 3
              </label>
              <input
                type="file"
                name="myImage"
                onChange={(e) => {
                  // const check = dataURItoBlob(e.target.files[0]);
                  console.log(e.target.files[0]);
                  edit.image3 = e.target.files[0];
                }}
              />
            </div>
            <div>
              <label
                htmlFor="image4"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Image 4
              </label>
              <input
                type="file"
                name="myImage"
                onChange={(e) => {
                  // const check = dataURItoBlob(e.target.files[0]);
                  console.log(e.target.files[0]);
                  edit.image4 = e.target.files[0];
                }}
              />
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                handleAddProduct();
              }}
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Save Changes
            </button>
          </form>
        </div>
      )}

      <div className="flex items-center justify-between py-7 px-10">
        <div>
          <h1 className="text-2xl font-semibold leading-relaxed text-gray-800">
            Products
          </h1>
          <p className="text-sm font-medium text-gray-500">
            Let&apos;s grow your business! Create your product and upload here
          </p>
        </div>
        <button
          className="bg-blue-600 text-white rounded-md px-8 py-2 text-base font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-green-300"
          onClick={() => {
            setEdit({});
            setModal(true);
          }}
        >
          Add New
        </button>
        <div
          className="fixed hidden inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
          id="my-modal"
        ></div>
      </div>
      {/* display categories here */}
      <div className="p-3">
        <label htmlFor="categoryFilter">Category : </label>
        <select
          name="categoryFilter"
          className="my-1 mx-2"
          onChange={(e) => {
            setFilter({ category: e.target.value });
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

      <table className="w-full border-b border-gray-200">
        <thead>
          <tr className="text-sm font-medium text-gray-700 border-b border-gray-200">
            <td className="pl-10">
              <span> {"  "}</span>
              <div className="flex items-center gap-x-4">
                <span>Product Name</span>
              </div>
            </td>
            <td className="py-4 px-4 text-center">Category</td>
            <td className="py-4 px-4 text-center">Sub Category</td>
            <td className="py-4 px-4 text-center">Pricing</td>
            <td className="py-4 px-4 text-center">Display Price</td>
            <td className="py-4 px-4 text-center">Discounted Price</td>
            <td className="py-4 px-4 text-center"></td>
          </tr>
        </thead>
        <tbody className="w-fit">
          {products?.map((prod) => {
            return (
              <tr
                key={prod._id}
                //loop for diff products
                className="hover:bg-gray-100 transition-colors group"
              >
                <td className="flex gap-x-4 items-center py-4 pl-10">
                  <img
                    src={
                      process.env.REACT_APP_IMAGE_URL +
                      "/static/product_images/" +
                      prod._id +
                      "/" +
                      prod?.image[0]
                    }
                    alt="Product"
                    height="100px"
                    width="100px"
                    className="w-40 aspect-[3/2] rounded-lg object-cover object-top border border-gray-200"
                  />
                  <div>
                    <a href="#" className="text-lg font-semibold text-gray-700">
                      {prod.name}
                    </a>
                    <div className="font-medium text-gray-400">
                      {" "}
                      {prod.category}{" "}
                    </div>
                  </div>
                </td>
                <td className="font-medium text-center"> {prod.category} </td>
                <td className="font-medium text-center">
                  {" "}
                  {prod.subCategory}{" "}
                </td>
                <td className="font-medium text-center"> ₹{prod.price} </td>
                <td className="font-medium text-center">
                  {" "}
                  ₹{prod.displayPrice}{" "}
                </td>
                <td className="font-medium text-center">
                  {" "}
                  ₹{prod.discountedPrice}{" "}
                </td>
                <td className="font-medium text-center">
                  {" "}
                  {prod?.orders}
                  <div className="">
                    <button
                      onClick={async () => {
                        if (modal === true) {
                          setModal(false);
                        }
                        setEdit(prod);
                        setMethod("Edit");
                        setModal(true);
                      }}
                      className="p-2 hover:rounded-md hover:bg-gray-200"
                    >
                      <PencilIcon className="w-6 h-6 fill-current" />
                    </button>
                    <button
                      className="p-2 hover:rounded-md hover:bg-gray-200 z-1"
                      onClick={() => {
                        // hadnleDelete(prod._id);
                        handleDeleteProduct(prod._id);
                      }}
                    >
                      <TrashIcon
                        name={prod?.slug}
                        className="w-6 h-6 fill-current z-0"
                        onClick={() => handleDeleteProduct(prod._id)}
                      />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex gap-x-2 justify-center pt-8 ">
        <ReactPaginate
          breakLabel="..."
          containerClassName="flex justify-between list-none pointer items-center h-10 space-x-3"
          activeLinkClassName="text-blue-300 text-white"
          pageLinkClassName="p-2 border-2 rounded-sm  text-blue-100 border-blue-200 hover:bg-blue-200 hover:text-white"
          pageRangeDisplayed={5}
          renderOnZeroPageCount={null}
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          previousLinkClassName={"font-bold"}
          nextLinkClassName={"font-bold"}
          disabledClassName={"text-gray-500 cursor-not-allowed "}
          activeClassName={"text-white "}
        />
      </div>
    </main>
  );
}
export default Product;

function dataURItoBlob(dataURI) {
  var byteString = atob(dataURI.split(",")[1]);
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  var bb = new Blob([ab]);
  return bb;
}