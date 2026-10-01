export function MeasureTime() {
  return function (
    _target: object,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: unknown[]) {
      const start = performance.now();
      const result = originalMethod.apply(this, args);
      const duration = (performance.now() - start).toFixed(3);
      console.log(`[PERF] Метод '${propertyKey}' виконано за ${duration} ms`);
      return result;
    };

    return descriptor;
  };
}
