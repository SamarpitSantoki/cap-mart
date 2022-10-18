async function paginatedResults(
  model: any,
  _page: string,
  _limit: string,
  filter: {}
) {
  const page = parseInt(_page);
  const limit = parseInt(_limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results: any = {};

  if (endIndex < (await model.countDocuments().exec())) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }
  try {
    console.log(filter);
    results.count = await model.countDocuments(filter).exec();
    results.results = await model
      .find(filter)
      .limit(limit)
      .skip(startIndex)
      .exec();
    return results;
  } catch (e) {
    return e;
  }
}
export default paginatedResults;
