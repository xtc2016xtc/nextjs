export interface ExpensesByCategory{
  salaries:number;
  supplies:number;
  services:number;
}

export interface Month{
  id:string;
  month:string;
  revenue:number;
  expenses:number;
  nonOperationalExpenses:number;
  operationalExpenses:number;

}
export interface FormattedDatum {
  name: string; // 这里假设`name`是代表时间或者其他分类的字符串
  'Actual Revenue': number; // 实际收入值
  'Regression Line': number; // 回归线上的数值
  'Predicted Revenue'?: number; // 可选的预测收入值，注意问号表示可选属性
}
export interface Day{
  id:string;
  date:string;
  revenue:number;
  expenses:number;

}
export interface GetKpisResponse{
  id:string;
  _id:string;
  __v:number;
  totalProfit:number;
  totalRevenue:number;
  totalExpenses:number;
  expensesByCategory:ExpensesByCategory;
  monthlyData:Array<Month>;
  dailyData:Array<Day>;
  createdAt:string;
  updatedAt:string;
}
export interface GetProductsResponse{
  id:string;
  _id:string;
  __v:number;
  price:number;
  expense:number;
  transactions: Array<string>;
  createdAt:string;
  updatedAt:string;
}

export interface GetTransactionsResponse{
  id:string;
  _id:string;
  __v:number;
  buyer:string;
  amount:number;
  productIds:Array<string>;
  createdAt:string;
  updatedAt:string;
}