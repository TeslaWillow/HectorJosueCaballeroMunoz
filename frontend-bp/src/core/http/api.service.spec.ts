import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';

// Mock environment
jest.mock('../../environments/environment.development', () => ({ environment: { apiBaseUrl: 'http://test-api' } }));

// Mock inject before importing the service
const httpClientMock: jest.Mocked<HttpClient> = {
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
      if (token === HttpClient) return httpClientMock;
      return undefined;
    }
  };
});

import { of, throwError } from 'rxjs';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new ApiService();
  });

  it('should call HttpClient.get with correct URL and params', () => {
    httpClientMock.get.mockReturnValue(of({ data: 'test' }));
    service.get('products', new HttpParams({ fromObject: { q: 'a' } }));
    expect(httpClientMock.get).toHaveBeenCalledWith('http://test-api/products', { params: expect.any(HttpParams) });
  });

  it('should call HttpClient.post with correct URL and body', () => {
    httpClientMock.post.mockReturnValue(of({ data: 'created' }));
    service.post('products', { name: 'test' });
    expect(httpClientMock.post).toHaveBeenCalledWith('http://test-api/products', { name: 'test' }, { headers: undefined });
  });

  it('should call HttpClient.put with correct URL and body', () => {
    httpClientMock.put.mockReturnValue(of({ data: 'updated' }));
    service.put('products/1', { name: 'test' });
    expect(httpClientMock.put).toHaveBeenCalledWith('http://test-api/products/1', { name: 'test' }, { headers: undefined });
  });

  it('should call HttpClient.delete with correct URL', () => {
    httpClientMock.delete.mockReturnValue(of({ data: 'deleted' }));
    service.delete('products/1');
    expect(httpClientMock.delete).toHaveBeenCalledWith('http://test-api/products/1', { headers: undefined });
  });

  it('should normalize primitive response', done => {
    httpClientMock.get.mockReturnValue(of(42));
    service.get('products').subscribe(result => {
      expect(result).toBe(42);
      done();
    });
  });

  it('should normalize object with data property', done => {
    httpClientMock.get.mockReturnValue(of({ data: { foo: 'bar' } }));
    service.get('products').subscribe(result => {
      expect(result).toEqual({ foo: 'bar' });
      done();
    });
  });

  it('should normalize object without data property', done => {
    httpClientMock.get.mockReturnValue(of({ foo: 'bar' }));
    service.get('products').subscribe(result => {
      expect(result).toEqual({ foo: 'bar' });
      done();
    });
  });

  it('should handle error and throw ApiError', done => {
    // Suppress error log in test output
    jest.spyOn(console, 'error').mockImplementation(() => {});
    httpClientMock.get.mockReturnValue(throwError(() => ({ status: 404, error: { message: 'Not found' } })));
    service.get('products').subscribe({
      error: err => {
        expect(err.status).toBe(404);
        expect(err.message).toBe('Not found');
        done();
      }
    });
  });

});
