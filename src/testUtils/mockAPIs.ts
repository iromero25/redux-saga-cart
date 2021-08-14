import { mockFetchPromise } from "./mockFetchPromise";
import { cart, itemArray, itemShipping, taxRate, user } from "../api/mockData";

export const mockAPIs = () => ({
  fetchUser: jest.fn(() => mockFetchPromise(user)),
  fetchCart: jest.fn(() => mockFetchPromise(cart)),
  fetchTaxRate: jest.fn(() => mockFetchPromise(taxRate)),
  fetchItem: jest.fn(() => mockFetchPromise(itemArray)),
  fetchShipping: jest.fn(() => mockFetchPromise(itemShipping)),
  increaseUserItem: jest.fn(() => mockFetchPromise(cart.items)),
  decreaseUserItem: jest.fn(() => mockFetchPromise(cart.items)),
  validateUserCart: jest.fn(() => mockFetchPromise({ validated: true })),
  validateUserCreditCard: jest.fn(() => mockFetchPromise({ validated: true })),
  executeUserPurchase: jest.fn(() => mockFetchPromise({ success: true })),
});
