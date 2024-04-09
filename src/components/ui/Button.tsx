import { cva } from "class-variance-authority"; // 导入 cva 功能
import { FC } from "react"; // 导入 React 的函数型组件类型

interface ButtonProps {
  // 按钮的属性类型
}

// 定义按钮样式变量，使用 cva 函数创建
const buttonVariants = cva(
  'active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-color focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
);

const Button: FC<ButtonProps> = ({}) => {
  // 按钮组件
  return <div className={buttonVariants()}>Button</div>;
};

export default Button;