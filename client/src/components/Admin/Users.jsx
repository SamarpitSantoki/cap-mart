import { PencilIcon, TrashIcon } from "@heroicons/react/outline";

import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import ReactPaginate from "react-paginate";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
const UserList = () => {
  const [userList, setUsersList] = useState([]);
  const [edit, setEdit] = useState(null);
  const [modal, setModal] = useState(null);
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + 10;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(userList);
    setPageCount(Math.ceil(userList.length / 10));
  }, [itemOffset, userList]);

  //handle Pagination Click
  const handlePageClick = (event) => {
    const newOffset = (event.selected * 10) % userList.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  const fecthUsers = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_BASE_URL + "/admin/users",
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(sessionStorage.getItem("user")).access_token
            }`,
          },
        }
      );
      setUsersList(res.data);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    fecthUsers();
  }, []);

  return (
    <main className="relative w-full pb-8">
      {/* <!--modal content--> */}
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
            Users
          </h1>
          <p className="text-sm font-medium text-gray-500">
            Let&apos;s grow your business! Manage your Users here
          </p>
        </div>
        <button
          className="bg-medi-200 text-white rounded-md px-8 py-2 text-base font-medium hover:bg-medi-100 focus:outline-none focus:ring-2 focus:ring-green-300"
          onClick={() => setModal(true)}
        >
          Add New
        </button>
        <div
          className="fixed hidden inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
          id="my-modal"
        ></div>
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
            <td className="py-4 px-4 text-center">Email</td>
            <td className="py-4 px-4 text-center">Phone Number</td>
            <td className="py-4 pr-10 pl-4 text-center">Address</td>
          </tr>
        </thead>
        <tbody className="w-fit">
          {currentItems?.length &&
            currentItems?.map((user) => {
              return (
                <tr
                  key={user._id}
                  //loop for diff users
                  className="hover:bg-gray-100 transition-colors group"
                >
                  <td className="flex gap-x-4 items-center py-4 pl-10">
                    <div>
                      <a
                        href="#"
                        className="text-lg font-semibold text-gray-700"
                      >
                        {user.name}
                      </a>
                      <div className="font-medium text-gray-400">
                        {" "}
                        {user.email}{" "}
                      </div>
                    </div>
                  </td>
                  <td className="font-medium text-center"> {user.email} </td>
                  <td className="font-medium text-center">
                    {" "}
                    {user.phone || "Not Provided"}{" "}
                  </td>
                  <td className="pr-2">
                    <span className="inline-block w-20 group-hover:hidden">
                      product.createdAt
                    </span>
                    <div className="hidden group-hover:flex group-hover:w-20 group-hover:items-center group-hover:text-gray-500 group-hover:gap-x-2">
                      <button
                        onClick={async () => {
                          if (modal === true) {
                            setModal(false);
                            console.log(edit);
                          }
                          setEdit(user);
                          console.log(edit);
                          setModal(true);
                        }}
                        className="p-2 hover:rounded-md hover:bg-gray-200"
                      >
                        <PencilIcon className="w-6 h-6 fill-current" />
                      </button>
                      <button
                        className="p-2 hover:rounded-md hover:bg-gray-200 z-1"
                        onClick={() => {
                          toast.success("User Deleted!", {
                            position: "bottom-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                          });
                        }}
                      >
                        <TrashIcon
                          name={user.email}
                          className="w-6 h-6 fill-current z-0"
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
          activeLinkClassName="text-medi-300 text-white"
          pageLinkClassName="p-2 border-2 rounded-sm  text-medi-100 border-medi-200 hover:bg-medi-200 hover:text-white"
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
};

export default UserList;
