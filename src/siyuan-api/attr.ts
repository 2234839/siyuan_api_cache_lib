import { htmlDecode } from "../util/index";
import { fetch_proxy } from "../util/fetch-aop";
import { sqlQuery } from "./sql";
import type { attrRow } from "./type";

// 维持 htmlDecode 的导入，用于 @link
htmlDecode.toString();
/**
 * 此函数默认不被 cache
 */
export function setBlockAttrs(p: {
  /** 挂件块 ID */
  id: string;
  attrs: {
    [key: string]: string;
  };
}): Promise<{
  code: number;
  msg: string;
  data: unknown;
}> {
  const raw = JSON.stringify(p);
  return fetch_proxy("/api/attr/setBlockAttrs", { body: raw });
}
export namespace setBlockAttrs {
  export let noCache = true;
}
/**
 * 查询块属性
 *
 * tips: 可以使用 {@link htmlDecode util.htmlDecode} 对 {@link attrRow} 的 value 进行解码
 */
export async function getBlockAttrs(id: string): Promise<{
  code: number;
  msg: string;
  data: attrRow[];
}> {
  return await sqlQuery(`SELECT * FROM "attributes" WHERE block_id='${id}'`);
}
export namespace getBlockAttrs {
  export let noCache = false;
}
