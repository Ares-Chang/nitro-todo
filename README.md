# Todo App API

这是一个基于 Nitro 的 Todo App API。

## 技术栈

- [Nitro](https://nitro.build/)
- [Drizzle](https://drizzle.dev/)
- [Zod](https://zod.dev/)
- [MySQL](https://www.mysql.com/)
- [Redis](https://redis.io/)
- [Docker](https://www.docker.com/)

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

## 文档

文档基于 `nitro openAPI` 功能生成，详细参考文档 [Nitro OpenAPI](https://nitro.build/config#openapi)

项目启动后访问即可查看文档

- [scalar](http://localhost:3000/_scalar)
- [swagger](http://localhost:3000/_swagger)
- [openapi](http://localhost:3000/_openapi.json)
