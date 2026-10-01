export enum EntityStatus {
  Active = "ACTIVE",
  Archived = "ARCHIVED",
  Draft = "DRAFT"
}

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FoodEntity extends BaseEntity {
  title: string;
  price: number;
  weightGrams: number;
  calories: number;
  allergens: string[];
  status: EntityStatus;
}
