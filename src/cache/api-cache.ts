import { config } from "../config";
import { setBlockAttrs } from "../siyuan-api/attr";
import { currentNodeId } from "../util/current-node-id";
import { getCurrentEnv } from "../util/env";

/**
 * 接受一个函数，返回一个新函数，新函数的调用在非思源环境下会使用缓存的结果，不会实际运行传入的函数
 * 参数以及返回值需要可使用 JSON.stringify
 */
function cache<F extends ((...arg: unknown[]) => void) & { noCache: boolean }>(
  f: F,
  funcName = f.name
): F {
  return (async (...arg: unknown[]) => {
    if (
      config.apiCache &&
      !f.noCache &&
      getCurrentEnv() === getCurrentEnv.env.siYuan
    ) {
      const r = await f(...arg);
      const id = currentNodeId();
      if (id) {
        const key = getCacheKey(funcName, arg);
        const value = JSON.stringify(r);
        if (value.length <= config.maxCacheValueLength) {
          setBlockAttrs({
            id,
            attrs: {
              [key]: value,
            },
          });
        } else {
          console.error(
            "需要缓存的值超出了设定的 config.maxCacheValueLength",
            value
          );
        }
      }
      return r;
    } else {
      if (getCurrentEnv() !== getCurrentEnv.env.siYuan) {
        return cacheExtract(funcName, arg);
      } else {
        return f(...arg);
      }
    }
  }) as unknown as F;
}

export function cacheWarp<T extends Object>(p: T): T {
  const warp = {} as T;
  for (const key in p) {
    if (Object.prototype.hasOwnProperty.call(p, key)) {
      const element = p[key];
      if (typeof element === "function") {
        //@ts-ignore 这里类型比较复杂，不想写
        warp[key] = cache(element, key);
      } else {
        warp[key] = element;
      }
    }
  }
  return warp;
}

/** 从缓存提取以前对此参数调用的结果 */
function cacheExtract(funcName: string, arg: unknown) {
  const key = getCacheKey(funcName, arg);
  const env = getCurrentEnv();
  if (env === getCurrentEnv.env.siYuan) {
    // cache 函数内的代码应该保证不会走到这个分支
  } else if (env === getCurrentEnv.env.unknown) {
    // 未知环境不管它
  } else if (env === getCurrentEnv.env.oceanPress) {
    const code = self.frameElement!.parentElement!.getAttribute(key) || "";
    try {
      return JSON.parse(code || "");
    } catch (error) {
      // 补丁，弥补之前直接使用函数名作为参数的糊涂行为
      const key = getCacheKey(
        { getBlockAttr: "ss" }[funcName] || funcName,
        arg
      );
      const code = self.frameElement!.parentElement!.getAttribute(key) || "";
      return JSON.parse(code || "");
    }
  } else {
    const exhaustiveCheck: never = env;
  }
}

function getCacheKey(funcName: string, arg: unknown) {
  // 存在 缺陷，当函数名称变化时，缓存的 key 也会变化,所以还是需要主动传递一个 key -> funcName
  /** 这里本来是 custom-call 改成 z 是为了在思源内的属性面板中排最后 对于用户来说应该不会很关心这里的数据 */
  return `custom-z-${funcName.toLowerCase()}-${cyrb53(
    `${funcName}__${JSON.stringify(arg)}`
  )}`;
}

//@ts-ignore 代码来自于 https://stackoverflow.com/a/52171480
const cyrb53 = function (str, seed = 0) {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 =
    Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
    Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 =
    Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
    Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};
