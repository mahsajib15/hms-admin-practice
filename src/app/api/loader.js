import { dispatch } from '@/app/index';

export async function fetchApiData(api, query, arg = null, isRefetch = false) {
  const promise = dispatch(
    api.endpoints[query].initiate(arg, { subscribe: true })
  );
  promise.unsubscribe();
  if (isRefetch) {
    return promise.refetch({ force: true });
  } else {
    return promise;
  }
}
