import { fetch_proxy } from "../util/fetch-aop";

/**
 * 对 post /api/query/sql 接口的包装
 */
export function sqlQuery<T>(/** sql 查询语句 */ stmt: string): Promise<{
  code: number;
  msg: string;
  data: T;
}> {
  const raw = JSON.stringify({
    stmt,
  });
  return fetch_proxy("/api/query/sql", { body: raw });
}
export namespace sqlQuery {
  export let noCache = false;
}
