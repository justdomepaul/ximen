export interface ListSearchProperty {
  number: string;
  shelf: string;
  sortOrder: 'desc' | 'asc' | '';
  sortActive: string;
  pageNumber: number;
  pageSize: number;
}
