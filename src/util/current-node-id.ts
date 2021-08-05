import { getCurrentEnv } from "./env";

/** 获取当前挂件块的 id */
export function currentNodeId() {
  const env = getCurrentEnv();
  if (env === getCurrentEnv.env.oceanPress) {
    return self.frameElement?.parentElement?.dataset.nId;
  } else if (env === getCurrentEnv.env.siYuan) {
    return self.frameElement?.parentElement?.parentElement?.dataset.nodeId;
  } else if (env === getCurrentEnv.env.unknown) {
  } else {
    const exhaustiveCheck: never = env;
  }

  return undefined;
}
