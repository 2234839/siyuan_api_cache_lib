import { cacheWarp } from "./cache/api-cache";
import * as siYuanApi from "./siyuan-api/index";

/**
 * 这里面是对于思源一些 api 的包装
 * 查询类的 api 默认会进行缓存，非查询类的 api 则不会，可以通过查看函数的 noCache 属性来分辨
 * （非查询类的 api 如果进行 cache 很容易导致过多的数据被缓存到挂件块的自定义属性，查询类的 api 也需要使用者自行斟酌，）
 */
export const api = cacheWarp(siYuanApi);

/** 一些工具方法 */
export * as util from "./util/index";

/** 配置项 */
export * from "./config";
