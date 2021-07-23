export const mockFetchPromise = <T>(data: T, status?: number) =>
  Promise.resolve({
    status: status || 200,
    json: () => Promise.resolve(data),
  });
