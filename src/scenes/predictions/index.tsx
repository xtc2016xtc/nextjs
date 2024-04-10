// 导入所需的组件和模块
import DashboardBox from '@/components/DashboardBox'; // 导入自定义的DashboardBox组件，用于构建图表容器
import FlexBetween from '@/components/FlexBetween'; // 导入FlexBetween组件，用于布局中实现水平间隔
import { useGetKpisQuery } from '@/state/api'; // 导入从API获取关键绩效指标（KPIs）的Hook
import { FormattedDatum } from '@/state/types';
import { Box, Button, Typography, useTheme } from '@mui/material'; // 导入MUI提供的核心UI组件和主题上下文钩子
import React, { useMemo, useState } from 'react'; // 导入React的核心功能，包括Hooks：useMemo和useState
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'; // 导入Recharts库，用于绘制图表相关组件
import regression, { DataPoint } from 'regression'; // 导入回归分析库，用于执行线性回归计算

// 定义预测组件
const Predictions: React.FC = () => {
  // 使用MUI的主题上下文
  const { palette } = useTheme();
  // 初始化显示预测值的开关状态
  const [isPredictions, setIsPredictions] = useState<boolean>(false);

  // 使用GraphQL Hook获取KPI数据
  const { data: kpiData } = useGetKpisQuery();

  // 使用useMemo优化计算格式化后的数据
  const formattedData = useMemo<Array<FormattedDatum>>(() => {
    // 如果KPI数据不存在，则返回空数组
    if (!kpiData) return [];

    // 提取每月数据
    const monthlyData = kpiData[0]?.monthlyData;

    // 将原始数据转化为适合回归分析的格式
    const formatted: Array<DataPoint> = monthlyData.map(({ revenue }, index: number) => [index, revenue]);

    // 执行线性回归计算
    const regressionLine = regression.linear(formatted);

    // 格式化最终要显示的数据点，包括实际值、回归线值以及预测值
    return monthlyData.map(({ month, revenue }, i: number) => ({
      name: month,
      'Actual Revenue': revenue,
      'Regression Line': regressionLine.points[i][1],
      'Predicted Revenue': regressionLine.predict(i + 12)[1],
    }));
  }, [kpiData]); // 依赖于KPI数据进行更新

  // 渲染函数主体
  return (
    <DashboardBox width="100%" height="100%" p="1rem" overflow="hidden">
      {/* 布局顶部标题和按钮区域 */}
      <FlexBetween m="1rem 2.5rem" gap="1rem">
        <Box>
          <Typography variant="h3">收入与预测</Typography>
          <Typography variant="h6">
            根据简单线性回归模型绘制的实际收入与预测收入图表
          </Typography>
        </Box>
        <Button
          onClick={() => setIsPredictions(prevState => !prevState)}
          sx={{
            color: palette.grey[900],
            backgroundColor: palette.grey[700],
            boxShadow: '0.1rem 0.1rem 0.1rem 0.1rem rgba(0,0,0,.4)',
          }}
        >
          显示下一年预测收入
        </Button>
      </FlexBetween>

      {/* 响应式容器，用于适应不同屏幕尺寸 */}
      <ResponsiveContainer width="100%" height="100%">
        {/* 绘制折线图 */}
        <LineChart
          data={formattedData}
          margin={{
            top: 20,
            right: 75,
            left: 20,
            bottom: 80,
          }}
        >
          {/* 坐标网格 */}
          <CartesianGrid strokeDasharray="3 3" stroke={palette.grey[800]} />
          
          {/* X轴设置 */}
          <XAxis
            dataKey="name"
            tickLine={false}
            style={{ fontSize: '10px' }}
          >
            {/* X轴标签 */}
            <Label value="月份" offset={-5} position="insideBottom" />
          </XAxis>

          {/* Y轴设置 */}
          <YAxis
            domain={[12000, 26000]}
            axisLine={{ strokeWidth: '0' }}
            style={{ fontSize: '10px' }}
            tickFormatter={(v) => `$${v}`}
          >
            {/* Y轴标签 */}
            <Label
              value="收入(美元)"
              angle={-90}
              offset={-5}
              position="insideLeft"
            />
          </YAxis>

          {/* 提示框 */}
          <Tooltip />

          {/* 图例 */}
          <Legend verticalAlign="top" />

          {/* 实际收入折线 */}
          <Line
            type="monotone"
            dataKey="Actual Revenue"
            stroke={palette.primary.main}
            strokeWidth={0}
            dot={{ strokeWidth: 5 }}
          />

          {/* 回归线 */}
          <Line
            type="monotone"
            dataKey="Regression Line"
            stroke="#8884d8"
            dot={false}
          />

          {/* 是否显示预测收入折线 */}
          {isPredictions && (
            <Line
              strokeDasharray="5 5"
              dataKey="Predicted Revenue"
              stroke={palette.secondary[500]}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </DashboardBox>
  );
};

// 导出Predictions组件
export default Predictions;