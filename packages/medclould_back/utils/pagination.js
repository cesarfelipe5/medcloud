const db = require("../src/database/connection");

const pagination = async (req, tableName) => {
  const reqData = req.query;
  const paginationData = {};
  const per_page = reqData.per_page || 10;
  let page = reqData.current_page || 1;
  const search_term = reqData.search || "";

  if (page < 1) {
    page = 1;
  }

  const offset = (page - 1) * per_page;

  return Promise.all([
    db.count("* as count").from(tableName).first(),

    db
      .select("*")
      .from(tableName)
      .whereILike("name", `${"%" + search_term + "%"}`)
      .offset(offset)
      .limit(per_page),
  ]).then(([total, rows]) => {
    const count = total.count;

    paginationData.total = count;
    paginationData.per_page = per_page;
    paginationData.offset = offset;
    paginationData.to = offset + rows.length;
    paginationData.last_page = Math.ceil(count / per_page);
    paginationData.current_page = page;
    paginationData.from = offset;
    paginationData.data = rows;

    return paginationData;
  });
};

module.exports = { pagination };
