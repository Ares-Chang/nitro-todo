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

## 初始化数据库 Docker 容器

```bash
pnpm docker:start
```

## 数据库迁移

数据库初始化完成后，稍等片刻，执行数据库迁移，如果报错请重试

```bash
pnpm db:migrate
```

> 仅在第一次运行或修改数据库结构时需要执行

## 运行

```bash
pnpm dev
```
