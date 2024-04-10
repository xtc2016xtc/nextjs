// 导入Mongoose库，它是一个基于Node.js的MongoDB对象数据模型工具，用于简化与MongoDB数据库的操作
import mongoose from "mongoose";

// 导入mongoose-currency库中的loadType函数，用于扩展Mongoose的数据类型系统，添加对货币类型的支持
import { loadType } from "mongoose-currency";

// 获取Mongoose库中的Schema构造器
const Schema = mongoose.Schema;

// 使用loadType函数将货币类型加载到Mongoose中
loadType(mongoose);

// 定义交易数据模型Schema
const TransactionSchema = new Schema(
  {
    // 定义买家字段，类型为字符串，且为必填项
    buyer: {
      type: String,
      required: true,
    },
    // 定义交易金额字段，类型为mongoose.Types.Currency，这是一种特殊货币类型
    // 存储时单位为美分（cents），读取时通过get钩子函数除以100转换为美元（dollars）
    amount: {
      type: mongoose.Types.Currency,
      currency: "USD", // 设置货币类型为美元
      get: (v) => v / 100, // 读取时将存储的数值除以100，还原为原金额
    },
    // 定义一个productIds数组，用于存储与此次交易关联的产品ID
    // 每个元素都是一个ObjectId类型，引用"Product"模型
    productIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // 这里指明此字段关联到的模型名称为"Product"
      },
    ],
  },
  // 设置Schema选项
  // timestamps: true 表示自动为每条交易记录添加createdAt和updatedAt字段，记录创建和更新的时间戳
  // toJSON: { getters: true } 表示在转化为JSON格式时启用getters，即执行上面定义的get钩子函数
  { timestamps: true, toJSON: { getters: true } }
);

// 根据TransactionSchema创建一个Mongoose模型，命名为"Transaction"
const Transaction = mongoose.model("Transaction", TransactionSchema);

// 将创建的Transaction模型导出，供其他模块使用
export default Transaction;