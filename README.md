# DocuPress

## 开发

### 安装依赖

```bash
pnpm install
```

### 构建

```bash
pnpm build
```

### 测试

```bash
cd test
node ../dist/esm/cli.js dev docs
```

## 使用

### 安装依赖

```bash
pnpm add -D docupress
```

### 快速开始

#### 构建

可直接生成 `html` 文件，默认在 `.docupress/dist` 目录下。

```bash
pnpm docs:build
```

#### 预览

在构建成功之后，可运行如下命令启动静态文件服务器，可在浏览器直接访问，预览服务应该会运行在 `http://localhost:5210` 上。

```bash
pnpm docs:preview
```

#### 启动并运行

该命令可启动具有即时热更新的本地开发服务器，开发服务应该会运行在 `http://localhost:5210` 上。

```bash
pnpm docs:dev
```
