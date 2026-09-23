"use client";

import { useEffect, useState } from "react";
import {
  useSearchParams,
  useRouter,
} from "next/navigation";

import api from "@/lib/api";

import {
  Product,
  ProductsResponse,
} from "@/types/product";

import ProductList from "@/components/ProductList";
import Loading from "@/components/Loading";
import Toast from "@/components/Toast";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import Pagination from "@/components/Pagination";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );

  const productsPerPage = 10;

  /*
    Keep currentPage synchronized
    with the page in the URL.
  */
  useEffect(() => {
    const page =
      Number(searchParams.get("page")) || 1;

    setCurrentPage(page);
  }, [searchParams]);

  /*
    Get products
  */
  useEffect(() => {
    async function getProducts() {
      setLoading(true);
      setError("");

      try {
        const skip =
          (currentPage - 1) * productsPerPage;

        let response;

        /*
          Search
        */
        if (search) {
          response = await api.get<ProductsResponse>(
            `/products/search?q=${search}&limit=${productsPerPage}&skip=${skip}`
          );
        }

        /*
          Category
        */
        else if (category !== "all") {
          response = await api.get<ProductsResponse>(
            `/products/category/${category}?limit=${productsPerPage}&skip=${skip}`
          );
        }

        /*
          All products
        */
        else {
          response = await api.get<ProductsResponse>(
            `/products?limit=${productsPerPage}&skip=${skip}`
          );
        }

        setProducts(response.data.products);
        setTotalProducts(response.data.total);
      } catch (error) {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    }

    getProducts();
  }, [search, category, currentPage]);

  /*
    Calculate total pages
  */
  const totalPages = Math.ceil(
    totalProducts / productsPerPage
  );

  /*
    Change page
  */
  function handlePageChange(page: number) {
    setCurrentPage(page);

    router.push(`/?page=${page}`);
  }

  return (
    <main className="min-h-screen bg-slate-100">

      {/* =========================
          Hero Section
          Only appears on Page 1
      ========================== */}
      {currentPage === 1 && (
        <section className="border-b border-slate-200 bg-slate-100">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-16 text-center sm:px-6 lg:flex-row lg:justify-between lg:px-8 lg:py-24 lg:text-left">

            {/* Hero Text */}
            <div className="max-w-2xl">

              <span className="inline-block rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600">
                Discover something new
              </span>

              <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Find products
                <span className="block text-indigo-600">
                  you'll love.
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                Explore our collection of products,
                discover new favorites, and find
                everything you need in one place.
              </p>

              <a
                href="#products"
                className="mt-8 inline-flex rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-700 hover:shadow-md"
              >
                Explore Products
              </a>

            </div>

            {/* Hero Visual */}
            <div className="flex h-64 w-full max-w-md items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-100 via-white to-slate-100 shadow-inner sm:h-80">

              <div className="text-center">

                <div className="text-7xl">
                  🛍️
                </div>

                <p className="mt-4 text-sm font-medium text-slate-500">
                  Your shopping starts here
                </p>

              </div>

            </div>

          </div>
        </section>
      )}

      {/* =========================
          Products Section
      ========================== */}
      <section
        id="products"
        className="w-full bg-slate-100 px-6 py-12 sm:px-8 lg:px-10 xl:px-12"
      >

        {/* Section Header */}
        <div className="mb-8">

          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Our collection
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Explore Products
          </h2>

          <p className="mt-2 text-slate-600">
            Find something that fits your style and needs.
          </p>

        </div>

        {/* =========================
            Filters
        ========================== */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:gap-3">

          {/* Category */}
          <div className="w-full lg:w-64">

            <CategoryFilter
              value={category}
              onChange={(value) => {
                setCategory(value);
                setCurrentPage(1);

                router.push("/?page=1");
              }}
            />

          </div>

          {/* Search */}
          <div className="w-full lg:w-72">

            <SearchBar
              value={search}
              onChange={(value) => {
                setSearch(value);
                setCurrentPage(1);

                router.push("/?page=1");
              }}
            />

          </div>

        </div>

        {/* =========================
            Products
        ========================== */}
        <div className="mt-8">

          {loading ? (
            <Loading />
          ) : (
            <>
              <ProductList products={products} />

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}

        </div>

        {/* Error */}
        {error && <Toast message={error} />}

      </section>

    </main>
  );
}