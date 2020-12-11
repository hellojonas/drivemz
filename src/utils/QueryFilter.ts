import { Request } from 'express';
import { Document, DocumentQuery, Model } from 'mongoose';
import IQueryFilter from '../interfaces/IQueryFilter';

export default class QueryFilter<T extends Document>
  implements IQueryFilter<T> {
  private query: DocumentQuery<T[], T>;
  private sortBy: string;
  private filters: string;
  private page: number = 1;
  private limit: number = 15;

  constructor(model: Model<T>, req: Request) {
    this.query = model.find();

    this.sortBy = typeof req.query.sort === 'string' ? req.query.sort : '';
    this.filters = typeof req.query.filter === 'string' ? req.query.filter : '';

    if (typeof req.query.page === 'string' && !isNaN(+req.query.page)) {
      this.page = +req.query.page > 0 ? +req.query.page : 1;
    }
    if (typeof req.query.limit === 'string' && !isNaN(+req.query.limit)) {
      this.limit = +req.query.limit > 0 ? +req.query.limit : 15;
    }
  }

  paginate(): this {
    const page = (this.page - 1) * this.limit;
    this.query.skip(page).limit(this.limit);
    return this;
  }

  filter(): this {
    if (!/^(\w+,?)+$/.test(this.filters)) {
      return this;
    }
    this.query.select(this.filters.replace(/,/g, ' '));
    return this;
  }

  sort(): this {
    if (!/^(-?\w+,?)+$/.test(this.sortBy)) {
      return this;
    }
    const sortBy = this.sortBy.replace(/,/g, '');
    this.query.sort(sortBy);
    return this;
  }

  async exec(): Promise<T[]> {
    return await this.query;
  }
}
