import {
  FoodEntity,
  EntityStatus,
  CreateDto,
  UpdateDto,
  EntitySummary,
  ApiResponse
} from "./types";
import { FoodRepository } from "./repositories";

function buildResponse<T>(data: T, meta?: Record<string, unknown>): ApiResponse<T> {
  return {
    success: true,
    data,
    timestamp: new Date(),
    meta
  };
}

const foodRepo = new FoodRepository();

console.log("=== CreateDto ===");
const dishInput1: CreateDto<FoodEntity> = {
  title: "Піца Кватро Формаджо",
  price: 320,
  weightGrams: 450,
  calories: 1100,
  allergens: ["лактоза", "глютен"],
  status: EntityStatus.Active
};

const dishInput2: CreateDto<FoodEntity> = {
  title: "Салат Цезар з куркою",
  price: 210,
  weightGrams: 280,
  calories: 450,
  allergens: ["яйця", "лактоза", "гірчиця"],
  status: EntityStatus.Draft
};

const now = new Date();
const pizza = foodRepo.create({
  ...dishInput1,
  id: "fd-1",
  createdAt: now,
  updatedAt: now
});

const salad = foodRepo.create({
  ...dishInput2,
  id: "fd-2",
  createdAt: now,
  updatedAt: now
});

console.log("Створено сутності:", [pizza.title, salad.title]);

console.log("\n=== UpdateDto ===");
const patch: UpdateDto<FoodEntity> = {
  price: 345,
  status: EntityStatus.Archived
};

const updatedPizza = foodRepo.update("fd-1", patch);
console.log("Оновлена страва (нова ціна, updatedAt змінено):", updatedPizza);

console.log("\n=== EntitySummary ===");
const allDishes = foodRepo.findAll();
const summaries: EntitySummary<FoodEntity>[] = allDishes.map((d) => ({
  id: d.id,
  title: d.title,
  price: d.price
}));
console.log("Каталог EntitySummary:", summaries);

console.log("\n=== EntityAnalytics ===");
const analytics = foodRepo.getAnalytics();
const response = buildResponse(analytics, { total: allDishes.length });
console.log("ApiResponse з аналітикою:", response);
