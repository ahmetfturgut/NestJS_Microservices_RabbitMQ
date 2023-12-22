import { Injectable } from '@nestjs/common';
import { Service } from '../_common/service/service';
import { Category, CategoryDocument } from './category.model';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService extends Service<Category, CategoryDocument, CategoryRepository> {

  constructor(protected repository: CategoryRepository) { super(repository) }

  async getCategoriesByIds(ids: Category["id"][]): Promise<Category[]> {
    return this.repository.getCategoriesByIds(ids);
  }

}
