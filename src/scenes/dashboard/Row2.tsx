// 引入自定义UI组件
import BoxHeader from "@/components/BoxHeader"; // 导入用于显示头部信息的BoxHeader组件
import DashboardBox from "@/components/DashboardBox"; // 导入封装好的DashboardBox组件，用于布局和样式
import FlexBetween from "@/components/FlexBetween"; // 导入FlexBetween组件，实现弹性布局且子元素之间居中对齐

// 引入状态管理与API获取相关模块
import { useGetKpisQuery } from "@/state/api"; // 使用状态管理库提供的useGetKpisQuery Hook来获取KPIs数据
import { useGetProductsQuery } from "@/state/api"; // 使用useGetProductsQuery Hook来获取产品数据

// 引入Material-UI组件库
import { Box, Typography, useTheme } from "@mui/material"; // 导入Material-UI的基本布局、文本样式以及主题相关的Hook

// 引入React Hooks库中的useMemo
import { useMemo } from "react";

// 引入Recharts图表库的相关组件
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  Cell,
  Pie,
  PieChart,
  Scatter,
  ScatterChart,
  ZAxis,
} from "recharts"; // 导入多个图表组件和布局组件，用于构建各种图表

// 定义饼图的数据
const pieData = [
  { name: "Group A", value: 600 },
  { name: "Group B", value: 400 },
];

// 定义Row2组件，负责展示KPIs、产品数据及对应的图表
function Row2() {
  // 使用Hooks获取KPIs和产品数据
  const { data: operationalData } = useGetKpisQuery(); // 获取操作性指标数据
  const { data: productData } = useGetProductsQuery(); // 获取产品数据

  // 使用Material-UI的useTheme Hook获取当前主题信息
  const { palette } = useTheme();

  // 定义饼图的颜色数组
  const pieColor = [palette.primary[800], palette.primary[300]];

  // 使用useMemo优化数据预处理过程
  // 计算操作性费用数据并缓存，只在operationalData变化时重新计算
  const operationalExpenses = useMemo(() => {
    if (operationalData && operationalData[0]?.monthlyData) {
      // 转换每月KPI数据格式，提取月份和对应的操作性、非操作性开支
      return operationalData[0].monthlyData.map(({ month, operationalExpenses, nonOperationalExpenses }) => ({
        name: month.substring(0, 3),
        "Operational Expenese": operationalExpenses,
        "Non Operational Expenese": nonOperationalExpenses,
      }));
    } else {
      return []; // 数据不存在时返回空数组
    }
  }, [operationalData]);

  // 同样使用useMemo优化产品费用数据处理
  const productExpenseData = useMemo(() => {
    if (productData) {
      // 转换产品数据格式，提取_id、价格和成本
      return productData.map(({ _id, price, expense }) => ({
        id: _id,
        price,
        expense,
      }));
    }
    // 返回默认值（这里没有给出明确的默认值）
  }, [productData]);

  // 渲染组件
  return (
    <>
      <DashboardBox gridArea="d" >
        {/* 在DashboardBox内部首先渲染一个BoxHeader组件，用来展示标题、副标题和辅助信息 */}
        <BoxHeader
          title="非营业收入和营业收入"
          sideText="+4%"
        />
        {/* 使用ResponsiveContainer包裹图表组件，保证图表宽度和高度自动适应容器大小 */}
        <ResponsiveContainer width="100%" height="100%">
          {/* 创建一个AreaChart面积图 */}
          <LineChart
            width={500}
            height={400}
            data={operationalExpenses}
            // 设置图表的外边距
            margin={{ top: 20, right: 0, left: -10, bottom: 55 }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            {/* 配置X轴 */}
            <XAxis
              dataKey="name"
              tickLine={false} // 隐藏刻度线
              style={{ fontSize: "10px" }} // 设置字体大小
            />
            {/* 配置Y轴，指定刻度范围，隐藏刻度线和轴线 */}
            <YAxis
              yAxisId="left"
              orientation="left"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            {/* 添加Tooltip提示框组件 */}
            <Tooltip />
            {/* 绘制收入的区域图 */}
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="Non Operational Expenese"
              stroke={palette.tertiary[500]}
            />
            {/* 绘制支出的区域图 */}
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="Operational Expenese"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="e">
        <BoxHeader title="目标和活动" sideText="+4%" />
        <FlexBetween mt="0.25rem" gap="1.5rem" pr="1rem">
          <PieChart
            width={110}
            height={100}
            margin={{ top: 0, right: -10, left: 10, bottom: 0 }}
          >
            <Pie
              stroke="none"
              data={pieData}
              innerRadius={18}
              outerRadius={38}
              paddingAngle={2}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={pieColor[index]} />
              ))}
            </Pie>
          </PieChart>
          <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
            <Typography variant="h5">Target Sales</Typography>
            <Typography m="0.3rem 0" variant="h3" color={palette.primary[300]}>
              83
            </Typography>
            <Typography variant="h6">
              Finance goals of the campaign that is desired
            </Typography>
          </Box>
          <Box flexBasis="40%">
            <Typography variant="h5">Losses in Revenue</Typography>
            <Typography variant="h6">Losses are down 25%</Typography>
            <Typography variant="h5" mt="0.4rem">
              Profit Margins
            </Typography>
            <Typography variant="h6">
              margins are up by 30% from last month.
            </Typography>
          </Box>
        </FlexBetween>
      </DashboardBox>
      <DashboardBox gridArea="f">
      <BoxHeader title="Product Prices vs Expenses" sideText="+4%"/>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{
            top: 20,
            right: 25,
            bottom: 40,
            left: 0,
          }}
        >
          <CartesianGrid stroke={palette.grey[800]}/>
          <XAxis 
            type="number" 
            dataKey="price" 
            name="price" 
            axisLine={false}
            tickLine={false}
            style={{ fontSize:"10px" }}
            tickFormatter={(v) => `${v}`}
          />
          <YAxis 
            type="number" 
            dataKey="expense" 
            name="expense" 
            axisLine={false}
            tickLine={false}
            style={{ fontSize:"10px" }}
            tickFormatter={(v) => `${v}`}
          />
          <ZAxis type="number" range={[20]}/>
          <Tooltip formatter={(v) => `${v}`} />
          <Scatter name="Product Expense Ratio" data={productExpenseData} fill={ palette.tertiary[500] } />
        </ScatterChart>
      </ResponsiveContainer>
      </DashboardBox>
    </>
  );
}

// 导出Row2组件供外部使用
export default Row2;