// 导入自定义组件DashboardBox，它在仪表盘布局中起到一个可复用区块的作用，通常用于承载和展示数据可视化内容
import BoxHeader from "@/components/BoxHeader"; // 导入自定义头部组件，为区块提供标题、副标题和辅助信息

import DashboardBox from "@/components/DashboardBox"; // 导入DashboardBox组件，用于构建仪表盘的模块化布局单元

// 引入封装了对API接口调用逻辑的自定义React Hooks，该接口主要用于获取关键绩效指标（KPIs）的数据
import { useGetKpisQuery } from "@/state/api";

// 从Material UI库引入useTheme Hook，以便在整个应用中获取并使用主题设置，包括但不限于颜色方案等样式属性
import { useTheme } from "@mui/material";

// 引入React的useMemo Hook，用于高效地缓存计算结果，确保在依赖项不变时避免重复计算高开销的值
import { useMemo } from "react";

// 引入Recharts库中的图表组件，这些组件将用于创建具有交互性的数据可视化图表
import {
  Area,
  CartesianGrid, // 直角坐标系网格组件，用于在图表上绘制网格背景
  AreaChart,
  Line,
  ResponsiveContainer, // 使图表能够根据容器尺寸自动调整大小的组件
  Tooltip, // 提示框组件，在鼠标悬浮时显示具体数据点的详细信息
  XAxis, // 横轴组件，对应于图表上的类别或时间序列数据
  YAxis, // 纵轴组件，对应于图表上的数值型数据
  Legend, // 图例组件，用于区分不同系列的颜色及标签
  LineChart,
  Bar,
  BarChart
} from "recharts";

// 定义名为Row1的React函数组件，负责在一个行布局内渲染多个不同类型的图表以及相关元信息
function Row1() {
  // 使用useTheme Hook获取当前应用的主题对象，并从中提取色彩方案
  const { palette } = useTheme();

  // 使用自定义的useGetKpisQuery Hook获取KPIs数据，并将其赋值给data变量
  const { data } = useGetKpisQuery();

  // 使用useMemo Hook预处理数据，生成适合图表使用的结构，并缓存计算结果以提高性能
  const revenueExpenses = useMemo(() => {
    // 如果data存在并且包含了每月的KPI数据，则转换数据格式
    return (data && data[0]?.monthlyData) ?
      data[0].monthlyData.map(({ month, revenue, expenses }) => ({
        name: month.substring(0, 3), // 获取月份缩写作为横轴标签
        revenue: revenue, // 保留收入数值
        expenses: expenses, // 保留支出数值
      })) : [];
  }, [data]); // 当data发生变化时，重新计算并更新缓存

  const revenueProfit = useMemo(() => {
    // 同样处理数据，但这次是针对收入与利润关系
    return (data && data[0]?.monthlyData) ?
      data[0].monthlyData.map(({ month, revenue, expenses }) => ({
        name: month.substring(0, 3),
        revenue: revenue,
        profit: (revenue - expenses).toFixed(2), // 计算并保留利润数值
      })) : [];
  }, [data]);

  const revenue = useMemo(() => {
    // 只关注每个月的收入数据
    return (data && data[0]?.monthlyData) ?
      data[0].monthlyData.map(({ month, revenue }) => ({
        name: month.substring(0, 3),
        revenue: revenue,
      })) : [];
  }, [data]);

  // 渲染部分
  return (
    <>
      {/* 在网格布局的'a'区域渲染一个DashboardBox组件 */}
      <DashboardBox gridArea="a">
        {/* 在DashboardBox内部首先渲染一个BoxHeader组件，用于呈现图表标题、副标题以及补充信息 */}
        <BoxHeader
          title="收入和支出"
          subtitle="顶头线表示收入，底线表示支出"
          sideText="+4%"
        />
        {/* 使用ResponsiveContainer包裹图表组件，保证图表宽度和高度自动适应容器大小 */}
        <ResponsiveContainer width="100%" height="100%">
          {/* 创建一个AreaChart面积图 */}
          <AreaChart
            width={500}
            height={400}
            data={revenueExpenses}
            // 设置图表的外边距
            margin={{ top: 15, right: 25, left: -10, bottom: 60 }}
          >
            {/* 定义渐变颜色背景 */}
            <defs>
              {/* 为收入区域定义线性渐变 */}
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                {/* 设置渐变起始和结束颜色 */}
                <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.5} />
                <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0} />
              </linearGradient>
              {/* 为支出区域定义线性渐变 */}
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.5} />
                <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0} />
              </linearGradient>
            </defs>
            {/* 配置X轴 */}
            <XAxis
              dataKey="name"
              tickLine={false} // 隐藏刻度线
              style={{ fontSize: "10px" }} // 设置字体大小
            />
            {/* 配置Y轴，指定刻度范围，隐藏刻度线和轴线 */}
            <YAxis
              tickLine={false}
              axisLine={{ strokeWidth: "0" }}
              style={{ fontSize: "10px" }}
              domain={[8000, 23000]} // 设置Y轴的数据范围
            />
            {/* 添加Tooltip提示框组件 */}
            <Tooltip />
            {/* 绘制收入的区域图 */}
            <Area
              type="monotone"
              dataKey="revenue"
              dot={true} // 显示每个数据点的小圆点
              stroke={palette.primary.main} // 设置线条颜色为主色
              fillOpacity={1} // 设置填充透明度为不透明
              fill="url(#colorRevenue)" // 使用定义的收入渐变颜色
            />
            {/* 绘制支出的区域图 */}
            <Area
              type="monotone"
              dataKey="expenses"
              dot={true}
              stroke={palette.primary.main}
              fillOpacity={1}
              fill="url(#colorExpenses)" // 使用定义的支出渐变颜色
            />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>

      {/* 其他两个空白的DashboardBox组件，占据网格布局中的'b'和'c'区域 */}
      <DashboardBox gridArea="b" >
        {/* 在DashboardBox内部首先渲染一个BoxHeader组件，用来展示标题、副标题和辅助信息 */}
        <BoxHeader
          title="收入和支出"
          subtitle="顶头线代表收入:底线代表支出"
          sideText="+4%"
        />
        {/* 使用ResponsiveContainer包裹图表组件，保证图表宽度和高度自动适应容器大小 */}
        <ResponsiveContainer width="100%" height="100%">
          {/* 创建一个AreaChart面积图 */}
          <LineChart
            width={500}
            height={400}
            data={revenueProfit}
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
            <Legend height={20} wrapperStyle={{
              margin: '0 0 10px 0'
            }} />
            {/* 绘制收入的区域图 */}
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="profit"
              stroke={palette.tertiary[500]}
            />
            {/* 绘制支出的区域图 */}
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="c" >
        {/* 在DashboardBox内部首先渲染一个BoxHeader组件，用来展示标题、副标题和辅助信息 */}
        <BoxHeader
          title="按月收入"
          subtitle="每个月收入的图表"
          sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">

          <BarChart
            width={500}
            height={300}
            data={revenue}
            margin={{
              top: 17,
              right: 15,
              left: -5,
              bottom: 58,
            }}
          >
            <defs>
              {/* 为收入区域定义线性渐变 */}
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                {/* 设置渐变起始和结束颜色 */}
                <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.8} />
                <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} style={{ fontSize: "10px" }} />
            <YAxis axisLine={false} tickLine={false} style={{ fontSize: "10px" }} />
            <Tooltip />
            <Bar dataKey="revenue" fill="url(#colorRevenue)" />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
}

// 将Row1组件默认导出，供其他地方引用和使用
export default Row1;