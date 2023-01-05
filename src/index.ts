import { QueryPolicy, splitQuery } from "./utils";

interface LiteQueryOptions {
  splitCount: number
  policy: QueryPolicy
}

const DEFAULT_OPTIONS: LiteQueryOptions = {
  splitCount: 1,
  policy: 'series'
}


const liteQuery = async <T>(
  api: Function,
  paramsList: T[],
  options: LiteQueryOptions
) => {
  const finalOpts = { ...DEFAULT_OPTIONS, ...options }

  const { splitCount, policy } = finalOpts

  if (policy !== 'parallel' && policy !== 'series') {
    return;
  }

  let result = []

  if (policy === 'parallel') {
    const queryList = paramsList.map(params => api(params));
    try {
      result = await Promise.all(queryList)
    } catch (error) {

    }
  }
  if (policy === 'series') {
    for (let idx = 0; idx < paramsList.length; idx++) {
      try {
        const res = await api(paramsList[idx]);
      } catch (err) {
        break;
      }
    }
  }


}