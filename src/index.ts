import { cacheWarp } from "./cache/api-cache";
import * as siYuanApi from "./siyuan-api/index";

/** 这里面是对于思源一些 api 的包装 */
export const api = cacheWarp(siYuanApi);

/** 一些工具方法 */
export * as util from "./util/index";

/** 配置项 */
export * from "./config";
