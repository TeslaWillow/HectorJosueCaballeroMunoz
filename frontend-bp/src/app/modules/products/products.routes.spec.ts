
import { productsRoutes } from './products.routes';

describe('Products Routes', () => {
  it('should have a root route with children', () => {
    const rootRoute = productsRoutes.find(r => r.path === '');
    expect(rootRoute).toBeDefined();
    expect(Array.isArray(rootRoute!.children)).toBe(true);
    // Check that there are three children (list, editor, editor/:id)
    expect(rootRoute!.children!.length).toBe(3);
    expect(rootRoute!.children!.map(c => c.path)).toEqual(['', 'editor', 'editor/:id']);
  });

  it('should have a wildcard route that redirects to root', () => {
    const wildcardRoute = productsRoutes.find(r => r.path === '**');
    expect(wildcardRoute).toBeDefined();
    expect(wildcardRoute!.redirectTo).toBe('');
    expect(wildcardRoute!.pathMatch).toBe('full');
  });

  it('should have loadComponent as a function for each child route', () => {
    const rootRoute = productsRoutes.find(r => r.path === '');
    expect(rootRoute).toBeDefined();
    for (const child of rootRoute!.children!) {
      expect(typeof child.loadComponent).toBe('function');
      if (!child.loadComponent) {
        throw new Error(`Child route ${child.path} does not have loadComponent defined`);
      }
      // Check that calling loadComponent returns a Promise
      const result = child.loadComponent();
      expect(result).toBeInstanceOf(Promise);
    }
  });
});
