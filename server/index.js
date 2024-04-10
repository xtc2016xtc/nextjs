// 引入Express框架，它是一个Node.js web应用开发框架，用于构建web服务器应用
import express from "express"

// 引入body-parser中间件，该中间件主要用于解析HTTP请求体中的数据，这里主要处理JSON格式的数据
import bodyParser from "body-parser"

// 引入mongoose库，这是一个基于MongoDB的Mongoose对象模型工具，用于连接MongoDB数据库并进行数据模型操作
import mongoose from "mongoose"

// 引入cors中间件，解决跨域资源共享问题，允许来自不同源的客户端（例如：前端应用）访问服务器资源
import cors from "cors"

// 引入dotenv库，用来加载环境变量配置文件（.env文件），方便在项目中管理和使用环境变量
import dotenv from "dotenv"

// 引入helmet中间件，强化应用的安全性，通过设置一系列HTTP头部策略来提高安全性
import helmet from "helmet"

// 引入morgan中间件，用于生成和输出HTTP请求日志，便于分析和调试
import morgan from "morgan"

// 引入自定义路由模块（这里是KPI相关的路由）
import kpiRoutes from './routes/kpi.js'

// 引入数据模型
import KPI from "./models/KPI.js"
import productRoutes from "./routes/product.js"
import Product from "./models/Product.js"
import transactionRoutes from './routes/transaction.js'
import Transaction from './models/Transaction.js'
//数据
import { kpis,products,transactions } from "./data/data.js"




// 加载环境变量配置
dotenv.config()

// 创建一个Express应用实例
const app = express()

// 应用helmet中间件以提升应用的安全性
app.use(helmet())

// 设置跨域策略，明确允许跨域请求
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))

// 使用morgan中间件记录HTTP请求日志，选择"common"格式输出
app.use(morgan("common"))

// 使用body-parser中间件解析JSON格式的请求体
app.use(bodyParser.json())

// 使用body-parser中间件解析URL编码格式的请求体，只解析简单表单数据
app.use(bodyParser.urlencoded({ extended: false }))

// 允许跨域请求，全局启用cors中间件
app.use(cors())

// 使用自定义路由模块（Row1相关路由）
app.use("/kpi", kpiRoutes)
// Row2
app.use("/product",productRoutes);
//Row3
app.use("/transaction",transactionRoutes);

// 获取环境变量中指定的端口号，如果不存在，则使用默认端口9000
const PORT = process.env.PORT || 9000;

// 使用mongoose尝试连接到MongoDB数据库，并设置一些兼容选项
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    // 当数据库连接成功时，启动Express服务器监听指定端口，并输出服务器启动信息
    app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))

    await mongoose.connection.db.dropDatabase();
    KPI.insertMany(kpis)
    Product.insertMany(products)
    Transaction.insertMany(transactions)
  })
  .catch((error) => {
    // 如果数据库连接失败，输出错误信息
    console.log(`${error} 链接失败`);
  });