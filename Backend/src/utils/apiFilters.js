class ApiFilters {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  /**
   * filter query objects for specific fields
   */
  filter() {
    // sanitize queryParams
    const queryObj = { ...this.queryString };
    const queryExcluded = ["page", "limit", "sort", "fields"];
    queryExcluded.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    // sorting query
    if (this.queryString.sort) {
      let sortBy = this.queryString.sort;
      sortBy = sortBy.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      // default sort using date
      this.query = this.query.sort("-price");
    }

    return this;
  }

  limitFields() {
    // field limiting or projecting
    if (this.queryString.fields) {
      let selctBy = this.queryString.fields;
      selctBy = selctBy.split(",").join(" ");
      this.query = this.query.select(selctBy);
    } else {
      // default field excluding the version
      this.query = this.query.select("-__v");
    }

    return this;
  }

  pagination() {
    // page pagniation
    const pageNum = this.queryString.page * 1 || 1;
    const perPageLimit = this.queryString.limit * 1 || 100;
    const skipValue = (pageNum - 1) * perPageLimit;

    this.query = this.query.skip(skipValue).limit(perPageLimit);

    return this;
  }
}

module.exports = ApiFilters;
