// 导入 Express 框架，用于构建 web 应用程序路由
import express from "express";

// 导入自定义的 KPI 模型，它通常表示数据库中的 KPI（关键绩效指标）集合，并位于 '../models/KPI.js' 文件中
import KPI from "../models/KPI.js";

// 使用 Express 的 Router() 方法创建一个新的路由器实例
const router = express.Router();

// 定义一个 GET 请求的路由处理器，当访问 "/kpis" 端点时触发该处理器
router.get("/kpis", async (req, res) => {
  try {
    // 使用 KPI 模型的 find() 方法异步查询数据库中所有的 KPI 记录
    const kpis = await KPI.find();

    // 如果查询成功，设置 HTTP 响应状态码为 200 并以 JSON 格式返回查询结果
    res.status(200).json(kpis);
  } catch (error) {
    // 如果在查询过程中发生错误，设置 HTTP 响应状态码为 404，并返回包含错误消息的对象
    res.status(404).json({ message: error.message });
  }
});

// 将这个路由器实例作为模块的默认导出，可以在其他地方导入并使用
export default router;