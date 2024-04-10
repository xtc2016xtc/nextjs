// 导入React库中的useState Hook，用于管理组件内的状态
import { useState } from "react";

// 导入react-router-dom库中的Link组件，用于实现页面间的路由跳转
import { Link } from "react-router-dom";

// 导入MUI库中的Pix图标组件
import PixIcon from '@mui/icons-material/Pix';

// 导入MUI库中的Box、Typography组件以及主题相关的hooks（在这里我们使用了useTheme）
import { Box, Typography, useTheme } from "@mui/material";

// 导入自定义的FlexBetween组件，用于在项目中实现灵活的布局（两侧对齐）
import FlexBetween from "@/components/FlexBetween";

// 定义Navbar组件的Props类型
type Props = {};

// 创建Navbar组件
const Navbar = (_props: Props) => {
  // 使用useTheme Hook获取当前使用的主题样式
  const { palette } = useTheme();

  // 使用useState Hook创建一个名为selected的状态变量，初始值为'dashbord'
  const [selected, setSelected] = useState("dashbord");

  // 返回Navbar的jsx结构
  return (
    <FlexBetween
      mb="0.25rem" // 设置下外边距
      p="0.5rem 0rem" // 设置内边距
      color={palette.grey[300]} // 设置字体颜色
    >
      {/* 左侧导航区域 */}
      <FlexBetween gap="0.75rem">
        {/* 显示Pix图标 */}
        <PixIcon sx={{ fontSize: "28px" }} />
        
        {/* 显示“财务系统”标题 */}
        <Typography variant="h4" fontSize="16px">
          财务系统
        </Typography>
      </FlexBetween>

      {/* 右侧导航链接区域 */}
      <FlexBetween gap="2rem">
        {/* 链接至'/'路由（通常是首页），点击时设置selected状态为'dashboard' */}
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link 
            to="/" 
            onClick={() => setSelected("dashboard")} 
            style={{
              color: selected === "dashboard" ? "inherit" : palette.grey[700], // 当selected为'dashboard'时，字体颜色与父元素相同，否则为灰色
              textDecoration: "inherit" // 继承文本装饰样式（如取消下划线）
            }}
          >
           
            图表
          </Link>
        </Box>

        {/* 链接至'/predictions'路由，点击时设置selected状态为'predictions' */}
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link 
            to="/predictions" 
            onClick={() => setSelected("predictions")} 
            style={{
              color: selected === "predictions" ? "inherit" : palette.grey[700], // 同上，当selected为'predictions'时改变字体颜色
              textDecoration: "inherit"
            }}
          >
            预测 
          </Link>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};

// 将Navbar组件设为默认导出
export default Navbar;