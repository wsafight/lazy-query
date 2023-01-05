export type QueryPolicy = 'series' | 'parallel'


export const splitQuery = <T>(
  allQuery: T[],
  maxCount: number = 10,
): T[][] => {
  const queryList: T[][] = [];
  for (let idx = 0; idx < allQuery.length; idx += maxCount) {
      queryList.push(allQuery.slice(idx, maxCount));
  }
  return queryList;
};