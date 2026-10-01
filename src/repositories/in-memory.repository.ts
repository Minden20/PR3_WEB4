import { BaseEntity, IRepository, UpdateDto } from "../types";

export class InMemoryRepository<T extends BaseEntity> implements IRepository<T> {
  protected items: Map<string, T> = new Map();

  create(item: T): T {
    this.items.set(item.id, { ...item });
    return item;
  }

  findById(id: string): T | null {
    const entity = this.items.get(id);
    return entity ? { ...entity } : null;
  }

  findAll(): T[] {
    return Array.from(this.items.values()).map((entity) => ({ ...entity }));
  }

  update(id: string, patch: UpdateDto<T>): T | null {
    const existing = this.items.get(id);
    if (!existing) {
      return null;
    }

    const updatedEntity: T = {
      ...existing,
      ...patch,
      id: existing.id,
      createdAt: existing.createdAt,
      updatedAt: new Date()
    };

    this.items.set(id, updatedEntity);
    return { ...updatedEntity };
  }

  deleteById(id: string): boolean {
    return this.items.delete(id);
  }
}
