interface PaginationConfig {
  page?: number;
  itemsPerPage?: number;
  offset?: number;
}

interface PaginationResponse {
  itemsPerPage: number;
  totalPages?: number;
  totalItems?: number;
}

const DEFAULT_ITEMS_PER_PAGE = 10;

export default class PaginationUtils {
  private _config: PaginationConfig;

  constructor(options: PaginationConfig = {}) {
    this._config = {
      page: ~~options.page || 1,
      itemsPerPage: options.itemsPerPage || DEFAULT_ITEMS_PER_PAGE,
      offset:
        ((options.page || 1) - 1) *
        (options.itemsPerPage || DEFAULT_ITEMS_PER_PAGE),
    };
  }

  config(options: PaginationConfig = {}): PaginationUtils {
    this._config = {
      ...this._config,
      ...options,
      page: options.page || this._config.page,
      itemsPerPage: options.itemsPerPage || this._config.itemsPerPage,
      offset:
        ((options.page || this._config.page) - 1) *
        (options.itemsPerPage || this._config.itemsPerPage),
    };
    return this;
  }

  getQueryParams(): { limit: number; offset: number; subQuery: boolean } {
    return {
      limit: this.getLimit(),
      offset: this.getOffset(),
      subQuery: false,
    };
  }

  mount(totalItems?: number): PaginationResponse | object {
    if (!totalItems) {
      return {};
    }

    const response: PaginationResponse = {
      itemsPerPage: this._config.itemsPerPage,
    };

    if (this._config.page === 1) {
      response.totalPages = Math.ceil(totalItems / this._config.itemsPerPage);
      response.totalItems = totalItems;
    }

    return response;
  }

  isFirstPage(): boolean {
    return this.getPage() === 1;
  }

  getOffset(): number {
    return this._config.offset;
  }

  getPage(): number {
    return this._config.page;
  }

  getLimit(): number {
    return this._config.itemsPerPage;
  }
}
