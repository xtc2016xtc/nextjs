// 导入 `createApi` 和 `fetchBaseQuery` 函数，它们来自 @reduxjs/toolkit/query/react 库，用于构建和管理异步数据请求
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// 导入自定义类型 GetKpisResponse，它描述了从后端获取的 KPIs 数据结构
import { GetKpisResponse,GetProductsResponse,GetTransactionsResponse } from "./types";

// 创建一个 API 集成对象，配置基础查询参数、Redux 中的 reducer 路径、需要追踪的标签类型（tagTypes）和各个数据请求端点
export const api = createApi({
  // 设置基本查询配置，指定基础 URL，此处使用 VITE_BASE_URL 环境变量
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  
  // 设置 Redux store 中的 reducer 名称路径
  reducerPath: "main",

  // 定义要追踪的数据标签类型，这里我们定义了一个名为 "Kpis" 的标签
  tagTypes: ["Kpis","Products","Transactions"],

  // 定义 API 端点，这里是获取 KPIs 的端点
  endpoints: (build) => ({
    // 创建一个获取 KPIs 的查询方法
    getKpis: build.query<Array<GetKpisResponse>, void>({
      // 设置查询地址，这里的路径为 "kpi/kpis/"
      query: () => "kpi/kpis/",

      // 指定该查询结果可以提供哪些标签，这里提供了 "Kpis" 标签
      providesTags: ["Kpis"],
    }),
    getProducts: build.query<Array<GetProductsResponse>, void>({
      query: () => "product/products/",
      providesTags: ["Products"],
    }),
    getTransactions: build.query<Array<GetTransactionsResponse>, void>({
      query: () => "transaction/transactions/",
      providesTags: ["Transactions"],
    }),
  }),
});

// 导出由 createApi 创建的 API 对象中的 useGetKpisQuery hook，方便在 React 组件中获取 KPIs 数据
export const { useGetKpisQuery,useGetProductsQuery,useGetTransactionsQuery } = api;