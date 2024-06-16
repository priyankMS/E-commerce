import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export type Data = {
  quantity?: number;
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};
export interface UserType {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export type AllData = {
  map(
    arg0: (item: Data) => import("react/jsx-runtime").JSX.Element
  ): import("react").ReactNode;

  products: Data[];
};

export const apiSlice = createApi({
  reducerPath: "mobileApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4040/api" }),
  endpoints: (builder) => ({
    getAllProduct: builder.query<AllData, void>({
      query: () => "products",
    }),
    getProductById: builder.query<Data, string>({
      query: (id) => `products/${id}`,
    }),
    getProductByCategories: builder.query<Data[], string>({
      query: (categories) => `products?category=${categories}`,
    }),

    getProductPagination: builder.query<Data[], number>({
      query: (page) => `products/pagination?page=${page}`,
    }),
 
  }),
});

export const {
  useGetAllProductQuery,
  useGetProductByIdQuery,
  useGetProductByCategoriesQuery,
  useGetProductPaginationQuery,
  
} = apiSlice;
