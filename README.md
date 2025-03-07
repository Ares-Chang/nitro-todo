# Todo App API

这是一个基于 Nitro 的 Todo App API。

## 依赖安装

```bash
pnpm install
```

## 环境变量

复制 `.env.example` 文件并重命名为 `.env`

```bash
cp .env.example .env
```

## 数据库环境初始化

```bash
pnpm db:init
```

> 仅在第一次运行时需要执行，后续运行直接 `pnpm docker:start` 即可

## 运行

```bash
pnpm dev
```
