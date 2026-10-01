import { FoodEntity, EntityStatus, EntityAnalytics } from "../types";
import { InMemoryRepository } from "./in-memory.repository";
import { MeasureTime } from "../decorators";

export class FoodRepository extends InMemoryRepository<FoodEntity> {
  @MeasureTime()
  findByMaxPrice(maxPrice: number): FoodEntity[] {
    return this.findAll().filter((item) => item.price <= maxPrice);
  }

  @MeasureTime()
  getAnalytics(): EntityAnalytics {
    const analytics: EntityAnalytics = {
      [EntityStatus.Active]: 0,
      [EntityStatus.Archived]: 0,
      [EntityStatus.Draft]: 0
    };

    for (const item of this.items.values()) {
      analytics[item.status]++;
    }

    return analytics;
  }
}
