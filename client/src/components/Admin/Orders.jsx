import { PencilIcon, TrashIcon } from "@heroicons/react/outline";

import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import ReactPaginate from "react-paginate";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
const OrderList = () => {
  const [userList, setUsersList] = useState([]);
  const [edit, setEdit] = useState(null);
  const [modal, setModal] = useState(null);
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [filter, setFilter] = useState({});
  const [page, setPage] = useState(1);
  const status = [
    { name: "Pending", value: "pending" },
    { name: "Processing", value: "processing" },
    { name: "Delivered", value: "delivered" },
    { name: "Cancelled", value: "cancelled" },
  ];

  useEffect(() => {
    fecthUsers();
  }, [filter, page]);
  //handle Pagination Click
  const handlePageClick = (event) => {
    console.log(event);
    const _page = event.selected + 1;
    setPage(_page);
  };

  const fecthUsers = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_BASE_URL +
          "/order?page=" +
          page +
          "&limit=10&filter=" +
          JSON.stringify(filter),
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(sessionStorage.getItem("user")).access_token
            }`,
          },
        }
      );
      setPageCount(Math.ceil(res.data.count / 10));

      setUsersList(res.data.results);
    } catch (err) {
      console.error(err.message);
    }
  };

  const updateOrderStatus = async (e, _id) => {
    try {
      const res = await axios.patch(
        process.env.REACT_APP_BASE_URL + "/order/" + _id,
        {
          status: e.target.value,
        },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(sessionStorage.getItem("user")).access_token
            }`,
          },
        }
      );
      toast.success("Order Status Updated");
      fecthUsers();
    } catch (e) {
      console.log(e);
      if (e.response.data) {
        toast.error(e.response.data.errors[0].msg);
      } else {
        toast.error(e.message);
      }
    }
  };

  return (
    <main className="relative w-full pb-8">
      {/* <!--modal content--> */}

      {modal && (
        <div
          id="edit_prod"
          className="absolute w-1/3 left-1/3 top-52 bg-white rounded-lg shadow dark:bg-gray-700"
        >
          <div className="flex justify-end p-2">
            <button
              onClick={() => {
                setEdit(null);
                setModal(false);
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
            action="#"
          >
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Edit User
            </h3>
            <div>
              <label
                htmlFor="fname"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                First Name
              </label>
              <input
                type="text"
                name="fname"
                id="fname"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                defaultValue={edit?.fname}
              />
            </div>
            <div>
              <label
                htmlFor="lname"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Last Name
              </label>
              <input
                type="text"
                name="lname"
                id="lname"
                defaultValue={edit?.lname}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
            <div>
              <label
                htmlFor="Email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                defaultValue={edit?.email}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              />
            </div>

            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                toast.success("User Edited Succefully.", {
                  position: "bottom-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
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
            Orders
          </h1>
          <p className="text-sm font-medium text-gray-500">
            Let&apos;s grow your business! Manage your Orders here
          </p>
        </div>
        <button
          className="bg-blue-600 text-white rounded-md px-8 py-2 text-base font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-green-300"
          onClick={() => setModal(true)}
        >
          Add New
        </button>
      </div>
      <div className="p-3">
        <label htmlFor="categoryFilter">Status : </label>
        <select
          name="categoryFilter"
          className="my-1 mx-2"
          onChange={(e) => {
            setFilter({ status: e.target.value });
          }}
          value={filter.category}
        >
          <option value="">All</option>
          {status.map((status) => {
            return <option value={status.value}>{status.name}</option>;
          })}
        </select>
      </div>

      <table className="w-full border-b border-t border-gray-200">
        <thead>
          <tr className="text-sm font-medium text-gray-700 border-b border-gray-200">
            <td className="pl-10">
              <span> {"  "}</span>
              <div className="flex items-center gap-x-4">
                <span>User Name</span>
              </div>
            </td>
            <td className="py-4  text-center">Email</td>
            <td className="py-4  text-center w-20">Shipping Address</td>
            <td className="py-4  text-center">Product</td>
            <td className="py-4  pl-4 text-center">Amount</td>
            <td className="py-4  pl-4 text-center">Order Date</td>
            <td className="py-4  pl-4 text-center">Status</td>
          </tr>
        </thead>
        <tbody className="w-fit">
          {userList?.length > 0 &&
            userList?.map((user) => {
              return (
                <tr
                  key={user._id}
                  //loop for diff users
                  className="hover:bg-gray-100 transition-colors group"
                >
                  <td className="flex gap-x-2 items-center py-4 pl-10">
                    <div>
                      <a
                        href="#"
                        className="text-lg font-semibold text-gray-700"
                      >
                        {user.name}
                      </a>
                    </div>
                  </td>
                  <td className="font-medium text-center">
                    <div className="font-medium text-gray-400">
                      {" "}
                      {user.email}{" "}
                    </div>{" "}
                  </td>
                  <td
                    className="font-medium text-center truncate"
                    title={
                      user.address.address +
                      ", " +
                      user.address.city +
                      ", " +
                      user.address.pincode
                    }
                  >
                    {" "}
                    {user.address.address}, {user.address.city},
                    {user.address.pincode}{" "}
                  </td>
                  <td className="font-medium text-center">
                    {" "}
                    <Link
                      to={"/order/" + user._id}
                      className="outline outline-1 p-1 outline-blue-500 bg-blue-500 text-white hover:bg-blue-700 rounded-md"
                    >
                      See Order{" "}
                    </Link>
                  </td>
                  <td className="font-medium text-center"> {user.total}</td>
                  <td className="font-medium text-center">
                    {" "}
                    {DateTime.fromISO(user.createdAt).toFormat("dd LLL yyyy")}
                  </td>
                  <td className="pr-2">
                    <span className="inline-block w-20">
                      <select
                        value={user.status}
                        onChange={(e) => updateOrderStatus(e, user._id)}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </span>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {userList?.length > 0 && (
        <div className="flex gap-x-2 justify-center pt-8 ">
          <ReactPaginate
            breakLabel="..."
            containerClassName="flex justify-between list-none pointer items-center h-10 space-x-3"
            activeLinkClassName="bg-blue-600 text-white"
            pageLinkClassName="p-2 border-2 rounded-sm text-primary border-blue-600 hover:bg-blue-600 hover:text-white"
            pageRangeDisplayed={5}
            renderOnZeroPageCount={null}
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            previousLinkClassName={"font-bold"}
            nextLinkClassName={"font-bold"}
            disabledClassName={"text-gray-500 cursor-not-allowed"}
            activeClassName={"text-white "}
          />
        </div>
      )}
    </main>
  );
};

export default OrderList;
