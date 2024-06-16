import { message } from "antd";
import {
  Data,
  useGetAllProductQuery,
  useGetProductPaginationQuery,
} from "../redux/query/apiSlice";
import EditAdd from "./EditAdd";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { CaretDownFilled, CaretUpFilled } from "@ant-design/icons";
import { AddData } from "./AdddData"
import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";

import { Button } from "antd";

function AdminProductData() {
  const [pagination, setPagination] = useState<number>(1);
  const {
    data: productsData,
    isLoading,
    error,
  } = useGetProductPaginationQuery(pagination);

 
 

  const [mainData, setMainData] = useState<Data[] | undefined>([]);
  useEffect(() => {
    if (productsData) {
      setMainData(productsData);
    }
  }, [productsData]);



  useLayoutEffect(() => {
    setMainData(productsData);
  }, [productsData]);

  const [sort, setSort] = useState<string>("");
  const { data: allData } = useGetAllProductQuery();

  useLayoutEffect(() => {});

  const totalProducts = allData && Array.isArray(allData) ? allData.length : 0;
  const totalPages = Math.ceil(totalProducts / 5);
  console.log(totalPages);

  const productsArray: Data[] = Array.isArray(productsData) ? productsData : [];
  const header = [
    "id",
    "title",
    "description",
    "price",
    "discountPercentage",
    "rating",
    "stock",
    "brand",
    "category",
    "thumbnail",
    "images",
  ];

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const calculateDiscountedPrice = (
    price: number,
    discountPercentage: number
  ) => {
    return price - (price * discountPercentage) / 100;
  };

  const handleNext = () => {
    if (pagination < totalPages) {
      setPagination((prevData) => prevData + 1);
    }
  };

  const handlePrevious = () => {
    if (pagination > 1) {
      setPagination((prevData) => prevData - 1);
    }
  };

  const { confirm } = Modal;

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:4040/api/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        message.success("Delete successful!");
      } else {
        throw new Error("Failed to delete the product");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const showConfirm = (id: number) => {
    confirm({
      title: "Do you want to delete these items?",
      icon: <ExclamationCircleFilled />,
      content: "ok", // Wrap handleDelete in an arrow function
      onOk() {
        handleDelete(id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handelSort = () => {
    setSort((prevStore) => (prevStore === "ASC" ? "DESC" : "ASC"));
  };

  const sortedData = useMemo(() => {
    const sortData = () => {
      if (!sort) {
        return mainData;
      }
      if (sort === "ASC") {
        return mainData?.slice().sort((a: Data, b: Data) => a.price - b.price);
      } else {
        return mainData?.slice().sort((a: Data, b: Data) => b.price - a.price);
      }
    };
    return mainData && sortData();
  }, [mainData, sort]);

  useEffect(() => {
    setMainData(productsData);
  }, [pagination, productsData]);

  return (
    <div className="p-4">
      {error ? (
        <div className="text-red-500">Oh no, there was an error</div>
      ) : isLoading ? (
        <div className="text-gray-600 text-center">Loading...</div>
      ) : productsArray.length > 0 ? (
        <div>
          <div className="flex justify-between  mb-4">
            <div>
              {pagination > 1 && (
                <button
                  onClick={handlePrevious}
                  className="bg-gray-200 px-3 py-1 mr-3 rounded-md"
                >
                  Prev
                </button>
              )}
              <input
                type="number"
                min={1}
                max={totalPages}
                value={pagination}
                onChange={(e) => setPagination(Number(e.target.value))}
                className="border px-2 py-1 rounded-md"
              />
              {pagination < totalPages && (
                <button
                  onClick={handleNext}
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Next
                </button>
              )}
            </div>
            <div>
              <AddData />
            </div>
          </div>

          <div className="overflow-x-auto">
            <p>total-pages : {totalPages}</p>
            <table className="min-w-full table-fixed divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th
                    className={`px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}
                  >
                    id
                  </th>
                  <th
                    className={`px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}
                  >
                    title
                  </th>
                  <th
                    className={`px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}
                  >
                    description
                  </th>
                  <th
                    onClick={handelSort}
                    className={`px-3  py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}
                  >
                    <div className="flex">
                      price{" "}
                      {sort === "ASC" ? <CaretUpFilled /> : <CaretDownFilled />}
                    </div>
                  </th>
                  <th
                    className={`px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}
                  >
                    discount
                  </th>
                  <th
                    className={`px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}
                  >
                    rating
                  </th>
                  <th
                    className={`px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}
                  >
                    stock
                  </th>
                  <th
                    className={`px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}
                  >
                    brand
                  </th>
                  <th
                    className={`px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}
                  >
                    category
                  </th>
                  <th
                    className={`px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}
                  >
                    thumbnail
                  </th>
                  <th
                    className={`px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}
                  >
                    images
                  </th>
                  <th
                    colSpan={2}
                    className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedData?.map((item: Data) => (
                  <tr key={item.id} className="hover:bg-gray-100">
                    {header.map((key) => (
                      <td key={key} className="px-2 py-1 text-xs">
                        {key === "images" ? (
                          <span>{item.images.length}</span>
                        ) : key === "thumbnail" ? (
                          <img
                            src={item.thumbnail}
                            alt={`Thumbnail of ${item.title}`}
                            className="w-16 h-16 object-cover rounded"
                          />
                        ) : key === "description" ? (
                          <span>{truncateText(item.description, 20)}</span>
                        ) : key === "price" ? (
                          <>
                            <span>{item.price}</span>
                            <br />
                            <span className="text-xs text-green-500">
                              {calculateDiscountedPrice(
                                item.price,
                                item.discountPercentage
                              ).toFixed(2)}
                            </span>
                          </>
                        ) : (
                          item[key as keyof Data]
                        )}
                      </td>
                    ))}
                    <td className="px-2 py-1 text-xs text-blue-500 cursor-pointer">
                      <EditAdd item={item} />
                    </td>
                    <td
                      className="  text-xs text-red-500 cursor-pointer"
                      // onClick={() => handleDelete(item.id)}
                      onClick={() => showConfirm(item.id)}
                    >
                      <Button>delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default AdminProductData;
