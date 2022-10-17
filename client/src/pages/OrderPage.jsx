import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";

const OrderPage = () => {
  //make a url in backend to get order details
  const { id } = useParams();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [order, setOrder] = useState({});

  const fetchOrderInfo = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_BASE_URL + "/order/" + id,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(sessionStorage.getItem("user")).access_token
            }`,
          },
        }
      );
      setOrder(res.data);
    } catch (e) {
      toast.error("Failed to Load Details Please Reload Page");
    }
  };

  useEffect(() => {
    fetchOrderInfo();
  }, []);
  return (
    <>
      <Header />
      <div className="py-10 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
        <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
          <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
            <div className="flex flex-col justify-start items-start dark:bg-blue-600 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
              <p className="inline-flex justify-between w-full space-x-3 text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-blue-600">
                <span>{order?.name}'s Order</span>

                <span className="text-black ">
                  Status:{" "}
                  <span
                    className={
                      order?.status === "pending"
                        ? "text-red-500"
                        : "text-green-500"
                    }
                  >
                    {order?.status}
                  </span>
                </span>
              </p>
              {order?.cartItems?.map((item) => {
                return (
                  <div
                    key={item.name}
                    className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full"
                  >
                    <div className="pb-4 md:pb-8 w-full md:w-40">
                      <img
                        className="md:w-60 md:h-32 md:block"
                        src={
                          proccess.env.REACT_APP_IMAGE_URL +
                          "/static/product_images/" +
                          item._id +
                          "/" +
                          item?.image[0]
                        }
                        alt="med"
                      />
                    </div>
                    <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                      <div className="w-full flex flex-col justify-start items-start space-y-8">
                        <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                          {item.name}
                        </h3>
                        <div className="flex justify-start items-start flex-col space-y-2">
                          <p className="text-sm dark:text-white leading-none text-gray-800">
                            <span className="dark:text-white text-gray-300">
                              Category:
                            </span>
                            {item.category}
                          </p>
                          <p className="text-sm dark:text-white leading-none text-gray-800">
                            <span className="dark:text-white text-gray-300">
                              Sub Category:{" "}
                            </span>{" "}
                            {item.subCategory}
                          </p>
                        </div>
                      </div>
                      <div className="flex m justify-between space-x-8 items-start w-full">
                        <p className="text-base dark:text-white xl:text-lg leading-6">
                          Price: ₹{item.discountedPrice}
                          <span className="text-red-300 line-through">
                            {" "}
                            ₹{item.price}
                          </span>
                        </p>
                        <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
                          Quantity: {item.count}
                        </p>
                        <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
                          Total: ₹ {item.count * item.discountedPrice}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center  md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
              <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-blue-600 space-y-6">
                <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                  Summary
                </h3>
                <div className="flex justify-center items-center w-full space-y-2 flex-col border-gray-200 border-b pb-4">
                  <div className="flex justify-between w-full">
                    <p className="text-base dark:text-white leading-4 text-gray-800">
                      Subtotal
                    </p>
                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                      ₹{order?.total}
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-full"></div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base dark:text-white leading-4 text-gray-800">
                      Shipping
                    </p>
                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                      ₹{" "}
                      {order?.cartItems?.reduce(
                        (acc, item) => acc + item.shippingPrice,
                        0
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">
                    Total
                  </p>
                  <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
                    ₹
                    {order.total +
                      order?.cartItems?.reduce(
                        (acc, item) => acc + item.shippingPrice,
                        0
                      )}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-blue-600 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
            <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
              Customer
            </h3>
            <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
              <div className="flex flex-col justify-start items-start flex-shrink-0">
                <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                  <div className="flex justify-start items-start flex-col space-y-2">
                    <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">
                      Name: {order.name}
                    </p>
                    <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">
                      Phone: {order.phone}
                    </p>
                  </div>
                </div>

                <div className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 7L12 13L21 7"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="cursor-pointer text-sm leading-5 ">
                    {order?.email}
                  </p>
                </div>
              </div>
              <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                  <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                    <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                      Shipping Address
                    </p>
                    <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                      {order?.address?.address}, {order?.address?.city} -{" "}
                      {order?.address?.pincode}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderPage;
