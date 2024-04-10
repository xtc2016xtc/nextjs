// 在这里导入 cn 函数，用于处理类名
import { cn } from "@/lib/utils";

// 导入类变量作用域的函数
import { cva, VariantProps } from "class-variance-authority";

// 导入 Lucide-React 中的 Loader2 图标
import { Loader2 } from "lucide-react";

// 导入 React 的函数式组件类型
import { ButtonHTMLAttributes, FC } from "react";

// 定义按钮样式变量，并使用 cva 函数创建
const buttonVariants = cva(
  'active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-color focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-slate-900 text-white hover:bg-slate-800',
        ghost: 'bg-transparent hover:text-slate-900 hover:bg-slate-200',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-2',
        lg: 'h-11 px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

// 定义按钮属性接口，扩展 ButtonHTMLAttributes 和 HTMLButtonElement
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>,
VariantProps<typeof buttonVariants> {
isLoading?: boolean
}

// 定义一个函数式组件 Button，继承 FC 类型，使用 buttonVariants 函数创建按钮样式，并接收 ButtonProps 接口的参数
const Button: FC<ButtonProps> = ({
  className,
  children,
  variant,
  isLoading,
  size,
  ...props
}) => {
  return (
    <button
    className={cn(buttonVariants({ variant, size, className }))}
    disabled={isLoading}
    {...props}>
      {/* {加载} */}
    {isLoading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : null}
    {children}
  </button>
  );
};

export default Button;
