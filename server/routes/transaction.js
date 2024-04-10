// 引入 Express 框架，这是一个流行的 Node.js Web 库，用于简化 Web 应用程序和 API 的开发流程
import express from "express";

// 引入自定义的 Transaction 模型，它代表了存储在数据库中的交易集合，模型文件位于 '../models/Transaction.js'
import Transaction from "../models/Transaction.js";

// 创建一个新的 Express 路由器实例，用于组织和处理特定的 URL 路由请求
const router = express.Router();

// 定义一个处理 GET 请求的方法，当客户端访问 "/transactions" 这个端点时会触发此方法
router.get("/transactions", async (req, res) => {
  try {
    // 使用 Transaction 模型的 find() 方法从数据库中异步查询最新的 50 条交易记录
    // 并按 'createOn' 字段降序排序
    const transactions = await Transaction.find()
      .limit(50)
      .sort({ createOn: -1 });

    // 若查询成功，设置 HTTP 响应的状态码为 200 表示成功，并以 JSON 格式返回查询结果
    res.status(200).json(transactions);
  } catch (error) {
    // 若在查询过程中遇到错误，设置 HTTP 响应的状态码为 404 表示未找到资源，并返回一个包含错误信息的对象
    res.status(404).json({ message: error.message });
  }
});

// 将此路由器实例作为当前模块的默认导出对象，以便在其他模块中导入并注册到应用中进行使用
export default router;