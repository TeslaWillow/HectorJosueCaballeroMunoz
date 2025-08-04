import { ProductMapper } from './product.mapper';
import { Product } from '../interfaces/product.interface';

describe('ProductMapper', () => {
  describe('fromFormToDomain', () => {
    it('should map form values to Product domain object', () => {
      const formValue = {
        id: ' 123 ',
        name: ' Test Product ',
        description: ' Desc ',
        logo: 'logo.png',
        date_release: '2023-01-01',
        date_revision: '2023-12-31'
      };
      const result = ProductMapper.fromFormToDomain(formValue);
      expect(result).toEqual({
        id: 123,
        name: 'Test Product',
        description: 'Desc',
        logo: 'logo.png',
        date_release: '2023-01-01',
        date_revision: '2023-12-31'
      });
    });

    it('should set id to 0 for missing or empty id field, and empty string for other missing fields', () => {
      const formValue = {
        id: undefined,
        name: '',
        description: undefined,
        logo: undefined,
        date_release: '2023-01-01',
        date_revision: '2023-12-31'
      };
      const result = ProductMapper.fromFormToDomain(formValue);
      expect(result).toEqual({
        id: 0,
        name: '',
        description: '',
        logo: '',
        date_release: '2023-01-01',
        date_revision: '2023-12-31'
      });
    });
  });

  describe('fromDomainToForm', () => {
    it('should map Product domain object to form values with Date objects', () => {
      const product: Product = {
        id: 123,
        name: 'Test Product',
        description: 'Desc',
        logo: 'logo.png',
        date_release: new Date('2023-01-01'),
        date_revision: new Date('2023-12-31')
      };
      const result = ProductMapper.fromDomainToForm(product);
      expect(result.id).toBe(123);
      expect(result.name).toBe('Test Product');
      expect(result.description).toBe('Desc');
      expect(result.logo).toBe('logo.png');
      expect(result.date_release).toBeInstanceOf(Date);
      expect(result.date_revision).toBeInstanceOf(Date);
      expect(result.date_release.toISOString().slice(0, 10)).toBe('2023-01-01');
      expect(result.date_revision.toISOString().slice(0, 10)).toBe('2023-12-31');
    });
  });
});
