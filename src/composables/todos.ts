import type { CreateTodo, TodosSelect, TodosUpdate } from '~/dtos/todos'
import { and, asc, desc, eq, isNotNull, isNull } from 'drizzle-orm'
import { todos } from '~/db/schema/todos'

export async function createTodo(todo: CreateTodo) {
  try {
    await db.insert(todos).values(todo)
  }
  catch {
    throw throwInternalServerError('创建失败')
  }
}

export function getTodos({ groupId, status, sort, order }: TodosSelect) {
  try {
    const list = [isNull(todos.deletedAt)]

    if (groupId) {
      list.push(eq(todos.groupId, groupId))
    }

    if (status && status !== 'all') {
      // 根据状态过滤
      if (status === 'active') {
        list.push(isNull(todos.completedAt))
      }
      else {
        list.push(isNotNull(todos.completedAt))
      }
    }

    const query = db.select().from(todos).where(and(...list))

    if (sort) {
      const column = sort === 'createdAt' ? todos.createdAt : todos.dueTime
      query.orderBy(order === 'asc' ? asc(column) : desc(column))
    }

    return query
  }
  catch {
    throw throwInternalServerError('获取失败')
  }
}

export async function updateTodo(id: number, todo: TodosUpdate) {
  try {
    await db.update(todos).set({ ...todo, updatedAt: new Date() }).where(eq(todos.id, id))
  }
  catch {
    throw throwInternalServerError('更新失败')
  }
}

export async function deleteTodo(id: number) {
  try {
    await updateTodo(id, { deletedAt: new Date() })
  }
  catch {
    throw throwInternalServerError('删除失败')
  }
}

export async function updateTodoStatus(id: number, status: 'active' | 'completed') {
  try {
    await updateTodo(id, { completedAt: status === 'completed' ? new Date() : null })
  }
  catch {
    throw throwInternalServerError('更新失败')
  }
}
