// 导入 Mongoose 库，用于操作 MongoDB 数据库
import mongoose from "mongoose";

// 导入 mongoose-currency 库中的 loadType 函数，用来加载货币类型到 Mongoose 中
import { loadType } from "mongoose-currency";

// 获取 Mongoose 的 Schema 构造函数
const Schema = mongoose.Schema;

// 调用 loadType 函数，将货币类型添加到 Mongoose 支持的数据类型中
loadType(mongoose);

// 定义“日”数据的 Mongoose Schema
const daySchema = new Schema(
  {
    // 存储日期字符串
    date: String,
    // 存储收入金额，类型为 mongoose.Types.Currency，单位为 USD，存储时会乘以100（例如：$1.50存为150）
    revenue: {
      type: mongoose.Types.Currency,
      currency: "USD",
      // 在获取此字段时，自动除以100转换回正常金额
      get: (v) => v / 100,
    },
    // 存储支出金额，结构与收入相同
    expenses: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
  },
  // 设置序列化选项，确保在转化为JSON时执行 getter 函数
  { toJSON: { getters: true } }
);

// 定义“月”数据的 Mongoose Schema，包含更多财务指标
const monthSchema = new Schema(
  {
    month: String,
    revenue: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
    expenses: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
    operationalExpenses: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
    nonOperationalExpenses: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
  },
  { toJSON: { getters: true } }
);

// 定义 KPI 的 Mongoose Schema，包含总利润、总收入、总支出等关键绩效指标以及按月和日分类的数据
const KPISchema = new Schema(
  {
    totalProfit: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
    totalRevenue: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
    totalExpenses: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
    // 存储各类别支出，类型为 Map，键为类别名，值为货币类型金额
    expensesByCategory: {
      type: Map,
      of: {
        type: mongoose.Types.Currency,
        currency: "USD",
        get: (v) => v / 100,
      },
    },
    // 存储每月详细数据，是一个包含 monthSchema 的数组
    monthlyData: [monthSchema],
    // 存储每日详细数据，是一个包含 daySchema 的数组
    dailyData: [daySchema],
  },
  // 添加时间戳字段（createdAt 和 updatedAt）并确保在转化为JSON时执行 getter 函数
  { timestamps: true, toJSON: { getters: true } }
);

// 创建名为 "KPI" 的 Mongoose 模型，关联KPISchema
const KPI = mongoose.model("KPI", KPISchema);

// 将 KPI 模型作为模块的默认导出，可在其他模块中直接引用
export default KPI;