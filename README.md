# 财务后台管理系统 - 使用React + TypeScript + Vite

## 初始化项目与环境要求
### 注意事项
- **Node.js版本**：推荐使用 Node.js v21.2.0 版本以确保最佳兼容性和性能。
- **npm版本**：建议使用npm v10.2.5或更高版本。

### 安装依赖包
```bash
# 使用yarn
yarn 

# 或者使用npm
npm install
```
# 开发模式启动项目
```bash
# 使用yarn启动开发服务器
yarn run dev

# 或者使用npm启动开发服务器
npm run dev
```

# 项目远程仓库
## 项目源码托管在Gitee上，可通过以下命令克隆：

```Bash
git clone git@gitee.com:xiong-goucheng/client.git
```
# 项目截图

<img src="/public/01.png">
<img src="/public/02.png">
<img src="/public/03.png">

# 项目基本结构与功能划分
 <ul>
      <li>
        <p><strong>public/</strong>：公共静态资源目录，包括不需要经过构建直接引用的文件。</p>
      </li>
      <li>
        <p><strong>server/</strong>：放置后端服务的相关文件，如：</p>
        <ul>
          <li><strong>index.js</strong>：后端服务的入口文件。</li>
          <li><strong>package-lock.json</strong>：锁定后端服务的依赖版本。</li>
          <li><strong>package.json</strong>：后端服务的项目配置文件，包含依赖、脚本等信息。</li>
        </ul>
      </li>
      <li>
        <p><strong>src/</strong></p>
        <ul>
          <li><strong>assets/</strong>：存放项目中的图片、字体等静态资源。</li>
          <li><strong>components/</strong>：通用组件目录，例如：
            <ul>
              <li><strong>DashboardBox.tsx</strong>：一个用于展示仪表盘信息的组件。</li>
            </ul>
          </li>
          <li><strong>scenes/</strong>
            <ul>
              <li><strong>dashboard/</strong>：财务仪表盘相关的视图和逻辑代码。</li>
              <li><strong>navbar/</strong>：顶部导航栏组件及其逻辑。</li>
              <li><strong>predictions/</strong>：财务预测相关的视图和逻辑代码。</li>
            </ul>
          </li>
          <li><strong>state/</strong>
            <ul>
              <li><strong>api.ts</strong>：封装了与后端交互的API请求函数。</li>
            </ul>
          </li>
          <li><strong>.env.local</strong>：本地环境变量配置文件。</li>
          <li><strong>.eslintrc.json</strong>：ESLint配置文件，用于规范代码风格。</li>
          <li><strong>.gitignore</strong>：Git忽略文件，指定不需要被版本控制的文件和目录。</li>
          <li><strong>index.html</strong>：项目的HTML模板文件。</li>
          <li><strong>LICENSE</strong>：项目许可协议文件。</li>
          <li><strong>package-lock.json</strong>：锁定前端项目的依赖版本。</li>
          <li><strong>package.json</strong>：项目的主要配置文件，包括依赖、脚本、项目信息等。</li>
          <li><strong>README.md</strong>：项目的说明文档。</li>
          <li><strong>tsconfig.json</strong>：TypeScript配置文件，用于编译设置。</li>
          <li><strong>tsconfig.node.json</strong>：特定于Node.js环境的TypeScript配置文件。</li>
          <li><strong>vite.config.ts</strong>：Vite构建工具的配置文件。</li>
          <li><strong>yarn.lock</strong>：Yarn锁定的依赖版本文件，保证项目在不同环境下依赖的一致性。</li>
        </ul>
      </li>
    </ul>


