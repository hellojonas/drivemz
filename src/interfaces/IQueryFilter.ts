import { Document } from 'mongoose';

interface IQueryFilter<T extends Document> {
  paginate: () => this;
  filter: () => this;
  exec: () => Promise<T[]>;
}

export default IQueryFilter;
