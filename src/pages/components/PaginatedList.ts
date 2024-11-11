export class PaginatedBoletoResponse<T> {
    totalElements: number;
    totalPages: number;
    pageable: {
      pageNumber: number;
      pageSize: number;
      sort: {
        sorted: boolean;
        unsorted: boolean;
        empty: boolean;
      };
      offset: number;
      paged: boolean;
      unpaged: boolean;
    };
    first: boolean;
    last: boolean;
    size: number;
    content: T[];
    number: number;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    numberOfElements: number;
    empty: boolean;
  
    constructor(data: Partial<PaginatedBoletoResponse<T>> = {}) {
      this.totalElements = data.totalElements || 0;
      this.totalPages = data.totalPages || 0;
      this.pageable = data.pageable || {
        pageNumber: 0,
        pageSize: 10,
        sort: {
          sorted: false,
          unsorted: true,
          empty: true,
        },
        offset: 0,
        paged: true,
        unpaged: false,
      };
      this.first = data.first || false;
      this.last = data.last || false;
      this.size = data.size || 10;
      this.content = data.content || [];
      this.number = data.number || 0;
      this.sort = data.sort || {
        sorted: false,
        unsorted: true,
        empty: true,
      };
      this.numberOfElements = data.numberOfElements || 0;
      this.empty = data.empty || false;
    }
  }
  