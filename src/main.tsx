// 导入React核心库，它是构建用户界面的基础库
import React from 'react'

// 导入ReactDOM，用于将React元素渲染到DOM节点上
import ReactDOM from 'react-dom/client'
// mongoadb+srv://<128611827>:<xtc2016xtc>@cluster0.nyvjgp4.mongoadb.net/?
// retryWrites=true&w=majority
// 导入项目的主组件App，通常位于项目根目录下的'@/App.tsx'文件
import App from '@/App.tsx'

// 导入全局样式文件，位于项目根目录下的'@/index.css'
import '@/index.css'

// 导入React-Redux的Provider组件，用于在整个应用范围内提供Redux Store
import { Provider } from 'react-redux'

// 导入Redux Toolkit的configureStore方法，用于简化Redux Store的配置过程
import { configureStore } from '@reduxjs/toolkit'

// 导入Redux Toolkit Query的setupListeners函数，用于监听API调用的副作用
import { setupListeners } from '@reduxjs/toolkit/query'

// 导入预先配置好的API模块，通常包含基于Redux Toolkit Query的请求逻辑
import { api } from '@/state/api'

// 使用configureStore方法创建Redux Store实例，传入reducer和middleware配置
export const store = configureStore({
  // 将API模块的reducer加入到整个应用的reducer组合中
  reducer: { [api.reducerPath]: api.reducer },

  // 将API模块的middleware加入到整个应用的middleware组合中
  middleware: (getDefault) => getDefault().concat(api.middleware),
})

// 设置Redux Toolkit Query的监听器，以便跟踪API调用的状态变化
setupListeners(store.dispatch);

// 使用ReactDOM的createRoot方法选择DOM中的'id=root'元素，并在其上挂载React应用
ReactDOM.createRoot(document.getElementById('root')!).render(
  // 包裹在Provider组件中，使得App组件及其子组件能够通过context访问到Redux Store
  <Provider store={store}>
    <App />
  </Provider>,
)