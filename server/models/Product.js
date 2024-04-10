// 导入Mongoose库，这是一个基于Node.js的MongoDB对象模型工具，用于简化与MongoDB数据库的交互
import mongoose from "mongoose";

// 导入mongoose-currency库中的loadType方法，用于扩展Mongoose类型系统，添加对货币类型的支持
import { loadType } from "mongoose-currency";

// 获取Mongoose库中的Schema构造器
const Schema = mongoose.Schema;

// 调用mongoose-currency提供的loadType方法，向Mongoose注册Currency类型
loadType(mongoose);

// 定义产品数据模型Schema
const ProductSchema = new Schema(
  {
    // 定义价格字段，类型为mongoose.Types.Currency，这是一种特殊的货币类型
    // 存储时单位为美分（cents），读取时通过get钩子函数除以100转换为美元（dollars）
    price: {
      type: mongoose.Types.Currency,
      currency: "USD", // 设置货币类型为美元
      get: (v) => v / 100, // 读取时将存储的数值除以100，还原为原金额
    },
    // 定义成本或支出字段，同样采用货币类型，存储和读取规则同price字段
    expense: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
    // 定义一个transactions数组，其中包含指向“Transaction”模型的ObjectId引用
    transactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction", // 这里指明此字段关联到的模型名
      },
    ],
  },
  // 设置Schema选项
  // timestamps: true 表示自动为文档添加createdAt和updatedAt字段，记录创建和修改时间
  // toJSON: { getters: true } 表示在转化为JSON时启用getters，即执行上面定义的get钩子函数
  { timestamps: true, toJSON: { getters: true } }
);

// 根据ProductSchema创建一个Mongoose模型，命名为"Product"
const Product = mongoose.model("Product", ProductSchema);

// 将创建的产品模型导出，供其他模块使用
export default Product;