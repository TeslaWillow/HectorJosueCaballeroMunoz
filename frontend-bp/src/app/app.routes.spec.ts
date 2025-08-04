import { routes } from './app.routes';

describe('App Routes', () => {
  it('should have a productos route with children', () => {
    const productosRoute = routes.find(r => r.path === 'productos');
    expect(productosRoute).toBeDefined();
    expect(Array.isArray(productosRoute!.children)).toBe(true);
  });

  it('should have a wildcard route that redirects to productos', () => {
    const wildcardRoute = routes.find(r => r.path === '**');
    expect(wildcardRoute).toBeDefined();
    expect(wildcardRoute!.redirectTo).toBe('productos');
    expect(wildcardRoute!.pathMatch).toBe('full');
  });
});
