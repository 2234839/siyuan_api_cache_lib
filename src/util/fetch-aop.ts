import { config } from "../config";

/** 负责所有请求的一些重复性工作，以及充当请求切面
 * 默认配置为 post 请求，以及接受 json 类型的值
 */
export function fetch_proxy(...[input, init]: Parameters<typeof fetch>) {
  if (typeof input === "string") {
    input = config.server + input;
  }
  if (init === undefined) {
    init = {};
  } else {
    const defaultParma = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    for (const key in defaultParma) {
      if (key in init === false) {
        //@ts-ignore 懒得写类型了
        init[key] = defaultParma[key];
      }
    }
  }

  return fetch(input, init)
    .then(async (response) => {
      const r = await response.json();
      if (r.code !== 0) {
        return Promise.reject(r);
      } else {
        return r;
      }
    })
    .catch((error) => console.log("error", error));
}
