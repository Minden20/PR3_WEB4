import { BaseEntity, EntityStatus } from "./entity.types";

export type CreateDto<T extends BaseEntity> = Omit<T, "id" | "createdAt" | "updatedAt">;

export type UpdateDto<T extends BaseEntity> = Partial<CreateDto<T>>;

export type EntitySummary<T extends BaseEntity & { title: string; price: number }> = Pick<
  T,
  "id" | "title" | "price"
>;

export type EntityAnalytics = Record<EntityStatus, number>;
