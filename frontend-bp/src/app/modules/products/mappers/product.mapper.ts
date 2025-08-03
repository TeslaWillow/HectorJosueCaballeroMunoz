import { Product } from "../interfaces/product.interface";

export class ProductMapper {

  /**
   * Maps a Product domain object to a Product interface.
   * @param product - The Product domain object.
   * @returns The mapped Product interface.
   */
  public static fromFormToDomain(formValue: any): Product {
    // Filter out any empty strings or undefined values
    return {
      id: formValue.id?.trim() || '',
      name: formValue.name?.trim() || '',
      description: formValue.description?.trim() || '',
      logo: formValue.logo || '',
      date_release: formValue.date_release, // Format YYYY-MM-DD
      date_revision: formValue.date_revision // Format YYYY-MM-DD
    };
  }

  /**
   * Maps a Product interface to a Product domain object.
   * @param product - The Product interface.
   * @returns The mapped Product domain object.
   */
  public static fromDomainToForm(product: Product): Product {
    // Ensure date fields are converted to Date objects
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      logo: product.logo,
      date_release: new Date(product.date_release), // Convert YYYY-MM-DD to Date object
      date_revision: new Date(product.date_revision) //  Convert YYYY-MM-DD to Date object
    };
  }

}
