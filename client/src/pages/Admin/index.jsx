import styles from "./AdminPage.module.css";
import { Col, Row } from "react-bootstrap";
import { Link, Outlet, useLocation, use } from "react-router-dom";
import Product from "../../components/Admin/Product";
const AdminPage = () => {
  const location = useLocation();
  console.log(location.pathname.includes("product"));
  return (
    <>
      <div>
        <div className="w-fit lg:w-full min-h-screen font-sans text-gray-900 bg-gray-50 flex">
          {/* SideBar */}
          <aside className="py-6 px-10 w-64 border-r border-gray-200">
            <Link href="/">
              <a className="text-3xl font-semibold px-2 py-2 ring-2 ring-medi-200 w-fit text-medi-200">
                Cap-Mart
              </a>
            </Link>
            <ul id="myDIV" className="flex flex-col gap-y-6 pt-20">
              {/* {collections.map((collection) => {
                return ( */}
              <Link
                to="orders"
                className={`btn flex gap-x-4 active items-center py-2  hover:text-indigo-600 group ${
                  location.pathname.includes("orders")
                    ? "text-indigo-600"
                    : "text-gray-500"
                }`}
              >
                <span
                  className={`absolute w-1.5 h-8 bg-indigo-600 rounded-r-full left-0 group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out ${
                    location.pathname.includes("orders")
                      ? ""
                      : "scale-y-0 -translate-x-full"
                  }`}
                />
                Manage Orders
              </Link>
              <Link
                to={"users"}
                className={`btn flex gap-x-4 active items-center py-2  hover:text-indigo-600 group ${
                  location.pathname.includes("users")
                    ? "text-indigo-600"
                    : "text-gray-500"
                }`}
              >
                <span
                  className={`absolute w-1.5 h-8 bg-indigo-600 rounded-r-full left-0 group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out ${
                    location.pathname.includes("users")
                      ? ""
                      : "scale-y-0 -translate-x-full"
                  }`}
                />
                Manage Users
              </Link>
              <Link
                to={"category"}
                className={`btn flex gap-x-4 active items-center py-2  hover:text-indigo-600 group ${
                  location.pathname.includes("category")
                    ? "text-indigo-600"
                    : "text-gray-500"
                }`}
              >
                <span
                  className={`absolute w-1.5 h-8 bg-indigo-600 rounded-r-full left-0 group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out ${
                    location.pathname.includes("/category")
                      ? ""
                      : "scale-y-0 -translate-x-full"
                  }`}
                />
                Main Category
              </Link>
              <Link
                to={"subcategory"}
                className={`btn flex gap-x-4 active items-center py-2  hover:text-indigo-600 group ${
                  location.pathname.includes("subcategory")
                    ? "text-indigo-600"
                    : "text-gray-500"
                }`}
              >
                <span
                  className={`absolute w-1.5 h-8 bg-indigo-600 rounded-r-full left-0 group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out ${
                    location.pathname.includes("subcategory")
                      ? ""
                      : "scale-y-0 -translate-x-full"
                  }`}
                />
                Sub Category
              </Link>
              <Link
                to={"product"}
                className={`btn flex gap-x-4 active items-center py-2  hover:text-indigo-600 group ${
                  location.pathname.includes("product")
                    ? "text-indigo-600"
                    : "text-gray-500"
                }`}
              >
                <span
                  className={`absolute w-1.5 h-8 bg-indigo-600 rounded-r-full left-0 group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out ${
                    location.pathname.includes("product")
                      ? ""
                      : "scale-y-0 -translate-x-full"
                  }`}
                />
                Manage Product
              </Link>

              {/* );
              })} */}
            </ul>
          </aside>
          <Outlet />
          {/* {renderSwitch(field)} */}
        </div>
      </div>
    </>
  );
};

export default AdminPage;
