import axios from "axios";
import Card from "../components/Card";
import spinner from "../components/assets/Spinner@1x-1.0s-200px-200px.svg";
import { useState, useEffect } from "react";
import Toastify from "toastify-js";

export default function HomePage({ url }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  async function fetchProducts(page = 1) {
    setLoading(true);
    try {
      const { data } = await axios(
        `${url}/apis/pub/branded-things/products?q=${search}&limit=8&page=${page}&sort=ASC`
      );
      setProducts(data.data.query);
      setTotalPages(data.data.totalPages); // Misal totalPages diberikan oleh API
    } catch (error) {
      Toastify({
        text: error.response?.data?.error || "Something went wrong",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "#EF4C54",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts(currentPage);
  }, [search, currentPage]);

  function searchOnChange(event) {
    setSearch(event.target.value);
    setCurrentPage(1); // Reset ke halaman 1 setiap kali pencarian berubah
  }

  function goToNextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  function goToPreviousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  return (
    <>
      <div id="PAGE-HOME" className="p-3">
        {/* search */}
        <form
          action=""
          method="get"
          className="flex justify-center items-center"
        >
          <input
            type="search"
            name="search"
            placeholder="Search"
            className="input input-bordered input-accent md:w-auto mx-1 mt-5 input-sm"
            onChange={searchOnChange}
          />
        </form>

        {loading ? (
          <div className="mt-32 flex justify-center items-center">
            <img src={spinner} />
          </div>
        ) : (
          <>
            <main className="grid grid-cols-2 gap-5 px-10 my-8 bg-white">
              {products.map((product) => {
                return (
                  <Card
                    key={product.id}
                    product={product}
                    url={url}
                    fetchProducts={fetchProducts}
                  />
                );
              })}
            </main>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-4">
              <button
                className="btn btn-primary mr-2"
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>
                Page {currentPage} {totalPages}
              </span>
              <button
                className="btn btn-primary ml-2"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
