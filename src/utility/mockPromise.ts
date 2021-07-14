const mockFetchPromise = <T>(data: T) =>
  Promise.resolve({
    json: () => Promise.resolve(data),
  });

export default mockFetchPromise;
