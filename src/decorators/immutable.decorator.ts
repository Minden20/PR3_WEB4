export function ImmutableClass<T extends new (...args: unknown[]) => object>(constructor: T) {
  Object.freeze(constructor);
  Object.freeze(constructor.prototype);
}
