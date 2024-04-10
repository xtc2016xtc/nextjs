// 引入 @mui/material/styles 中的 createTheme 方法，用于创建自定义主题
import { createTheme } from "@mui/material/styles";

// 引入 React 的 useMemo 高阶函数，用于优化组件性能，仅在依赖项变化时计算值
import { useMemo } from "react";

// 引入 './theme' 文件中的主题设置（如颜色、字体大小等）
import { themeSettings } from "./theme";

// 从 @mui/material 中引入以下组件：Box 用于布局，CssBaseline 用于设置基本样式，ThemeProvider 用于提供 MUI 主题上下文
import { Box, CssBaseline, ThemeProvider } from "@mui/material";

// 从 react-router-dom 中引入路由相关组件：BrowserRouter 用于处理浏览器路由，Route 用于定义单个路由规则，Routes 用于包含多个 Route 规则
import { BrowserRouter, Route, Routes } from "react-router-dom";

// 引入自定义的 Navbar 组件
import Navbar from '@/scenes/navbar';

// 引入自定义的 Dashboard 组件
import Dashboard from '@/scenes/dashboard';

//引入自定义Predictions组件
import Predictions from '@/scenes/predictions'
// 创建一个名为 App 的 React 组件
function App() {
  // 使用 useMemo 高阶函数来创建并记住基于 themeSettings 的主题对象，只有当 themeSettings 发生变化时才重新创建主题
  const theme = useMemo(() => createTheme(themeSettings), []);

  // 返回渲染内容，包括应用主题、全局样式、导航栏以及路由配置
  return (
    <>
      <div className="app">
        {/* 包裹整个应用的 BrowserRouter 组件 */}
        <BrowserRouter>
          {/* 提供主题上下文给子组件 */}
          <ThemeProvider theme={theme}>
            {/* 设置基本样式 */}
            <CssBaseline />
            
            {/* 使用 Box 进行布局 */}
            <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
              {/* 显示顶部导航栏 */}
              <Navbar />

              {/* 使用 Routes 组件进行路由配置，其中包含两个 Route 子组件 */}
              <Routes>
                {/* 定义默认主页路由，显示 Dashboard 组件 */}
                <Route path="/" element={<Dashboard />} />

                {/* 定义predictions路由，显示 predictions 组件 */}
                <Route path="/predictions" element={<Predictions />} />
              </Routes>
            </Box>
          </ThemeProvider>
        </BrowserRouter>
      </div>
    </>
  );
}

// 导出 App 组件作为默认导出项
export default App;