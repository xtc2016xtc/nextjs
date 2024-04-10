// 引入自定义UI组件
import BoxHeader from "@/components/BoxHeader"; // 导入头部组件，用于展示标题和副标题
import DashboardBox from "@/components/DashboardBox"; // 导入仪表盘容器组件，用于布局
import FlexBetween from "@/components/FlexBetween"; // 导入Flex布局组件，实现子元素之间的间距居中排列
// 引入API Hook以获取数据
import {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
} from "@/state/api"; // 这些是基于Apollo GraphQL或其他状态管理工具的React Hook，用于从API获取KPIs、产品列表和交易记录数据
// 引入Material UI组件
import { useTheme } from "@mui/material"; // 获取Material UI主题上下文，以便根据主题动态调整样式
import { Box, Typography } from "@mui/material"; // 导入基本布局和文本排版组件
// 引入DataGrid组件
import { DataGrid, GridCellParams } from "@mui/x-data-grid"; // 导入MUI提供的DataGrid组件，用于表格展示
import { useMemo } from "react";
// 引入Recharts图表库组件
import { Pie, PieChart, Cell } from "recharts"; // 导入用于创建饼图的组件

// Row3组件定义
const Row3 = () => {
  // 使用useTheme Hook获取当前主题
  const { palette } = useTheme();
  // 定义饼图颜色数组
  const pieColors = [palette.primary[800], palette.primary[500]]; // 从主题中提取主要颜色作为饼图颜色
  // 使用Hooks获取API数据
  const { data: kpiData } = useGetKpisQuery(); // 获取KPI数据
  const { data: productData } = useGetProductsQuery(); // 获取产品数据
  const { data: transactionData } = useGetTransactionsQuery(); // 获取交易数据
    // 计算并缓存饼图数据
  const pieChartData = useMemo(() => {
    if (kpiData) {
      const totalExpenses = kpiData[0].totalExpenses;
      return Object.entries(kpiData[0].expensesByCategory).map(
        ([key, value]) => {
          return [
            {
              name: key,
              value: value,
            },
            {
              name: `${key} of Total`,
              value: totalExpenses - value,
            },
          ];
        }
      );
    }
  }, [kpiData]); // 依赖kpiData进行更新
    // 定义产品列配置
  const productColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "expense",
      headerName: "Expense",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
  ];// 包含产品ID、费用和价格的表格列配置
    // 定义交易列配置
  const transactionColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "buyer",
      headerName: "Buyer",
      flex: 0.67,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.35,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "productIds",
      headerName: "Count",
      flex: 0.1,
      renderCell: (params: GridCellParams) =>
        (params.value as Array<string>).length,
    },
  ];// 包含交易ID、买家、金额和商品数量的表格列配置

  return (
    <>
      <DashboardBox gridArea="g">
         {/* 显示产品列表标题和统计信息 */}
        <BoxHeader
          title="List of Products"
          sideText={`${productData?.length} products`}
        />
        <Box
          mt="0.5rem"
          p="0 0.5rem"
          height="75%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={productData || []}
            columns={productColumns}
          />
        </Box>
      </DashboardBox>
       {/* 最近订单区域 */}
      <DashboardBox gridArea="h">
        <BoxHeader
          title="Recent Orders"
          sideText={`${transactionData?.length} latest transactions`}
        />
        <Box
          mt="1rem"
          p="0 0.5rem"
          height="80%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={transactionData || []}
            columns={transactionColumns}
          />
        </Box>
      </DashboardBox>
        {/* 费用类别分布饼图区域 */}
      <DashboardBox gridArea="i">
        <BoxHeader title="按类别划分的费用明细" sideText="+4%" />
        <FlexBetween mt="0.5rem" gap="0.5rem" p="0 1rem" textAlign="center">
          {pieChartData?.map((data, i) => (
            <Box key={`${data[0].name}-${i}`}>
              <PieChart width={110} height={80}>
                <Pie
                  stroke="none"
                  data={data}
                  innerRadius={18}
                  outerRadius={35}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
              </PieChart>
              <Typography variant="h5">{data[0].name}</Typography>
            </Box>
          ))}
        </FlexBetween>
      </DashboardBox>
        {/* 总览与说明数据区域 */}
      <DashboardBox gridArea="j">
        <BoxHeader
          title="总体摘要和解释数据"
          sideText="+15%"
        />
        <Box
          height="15px"
          margin="1.25rem 1rem 0.4rem 1rem"
          bgcolor={palette.primary[800]}
          borderRadius="1rem"
        >
          <Box
            height="15px"
            bgcolor={palette.primary[600]}
            borderRadius="1rem"
            width="40%"
          ></Box>
        </Box>
        <Typography margin="0 1rem" variant="h6">
          测试测试测试测试测试测试测试测试测试测试测试测试
          测试测试测试测试测试测试测试测试测试测试测试测试
          测试测试测试测试测试测试测试测试测试测试测试测试
          测试测试测试测试测试测试测试测试测试测试测试测试
        </Typography>
      </DashboardBox>
    </>
  );
};

export default Row3;