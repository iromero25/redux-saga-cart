// Since we are mocking a Promise, we need to make sure that what is
// being  returned by the  Promise is an  object of `Response` type.
// If I use  jest.soyOn()  then the `mockImplementation`  expects a
// function  that  returns a Response,  so this is how to  solve it:
export const mockFetchPromise = <T>(data: T, status?: number) =>
  Promise.resolve({
    status: status || 200,
    json: () => Promise.resolve(data),
  } as Response);
