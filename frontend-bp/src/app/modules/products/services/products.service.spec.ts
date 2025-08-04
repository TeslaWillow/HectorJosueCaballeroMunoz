


import { ApiService } from '../../../../core/http/api.service';
import { API_ENDPOINTS } from '../../../../core/constants/api.constants';

// Mock inject before importing the service
const apiServiceMock: jest.Mocked<ApiService> = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn()
} as any;

jest.mock('@angular/core', () => {
  const actual = jest.requireActual('@angular/core');
  return {
    ...actual,
    inject: (token: any) => {
      if (token === ApiService) return apiServiceMock;
      return undefined;
    }
  };
});

import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks();
    service = new ProductsService();
  });

  it('should call ApiService.get with correct URL for getProducts', () => {
    service.getProducts();
    expect(apiServiceMock.get).toHaveBeenCalledWith(API_ENDPOINTS.PRODUCTS);
  });

  it('should call ApiService.get with correct URL for getProductById', () => {
    service.getProductById(123);
    expect(apiServiceMock.get).toHaveBeenCalledWith(`${API_ENDPOINTS.PRODUCTS}/123`);
  });

  it('should throw error if getProductById is called without id', () => {
    expect(() => service.getProductById(undefined as any)).toThrow('Product ID is required');
  });

    it('should call ApiService.get with correct URL for checkIfProductsExists', () => {
    service.checkIfProductsExists(42);
    expect(apiServiceMock.get).toHaveBeenCalledWith(`${API_ENDPOINTS.PRODUCTS}/verification/42`);
  });

  it('should throw error if checkIfProductsExists is called without id', () => {
    expect(() => service.checkIfProductsExists(undefined as any)).toThrow('Product ID is required for checking existence');
  });

  it('should call ApiService.put with correct URL and payload for updateProduct', () => {
    const product = { id: 7, name: 'Test Product' } as any;
    service.updateProduct(product);
    expect(apiServiceMock.put).toHaveBeenCalledWith(`${API_ENDPOINTS.PRODUCTS}/7`, product);
  });

  it('should throw error if updateProduct is called without id', () => {
    expect(() => service.updateProduct({} as any)).toThrow('Product ID is required for update');
  });

  it('should call ApiService.delete with correct URL for deleteProduct', () => {
    service.deleteProduct(99);
    expect(apiServiceMock.delete).toHaveBeenCalledWith(`${API_ENDPOINTS.PRODUCTS}/99`);
  });

  it('should throw error if deleteProduct is called without id', () => {
    expect(() => service.deleteProduct(undefined as any)).toThrow('Product ID is required for deletion');
  });
});
