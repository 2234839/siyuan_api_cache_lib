export function getCurrentEnv(): getCurrentEnv.env {
  if (querySelector(`main[data-n-id]`)) {
    return getCurrentEnv.env.oceanPress;
  } else if (
    querySelector(`.protyle-content`) &&
    querySelector(`[data-node-id]`)
  ) {
    return getCurrentEnv.env.siYuan;
  }

  return getCurrentEnv.env.unknown;
}
export namespace getCurrentEnv {
  export enum env {
    siYuan = "siYuan",
    oceanPress = "oceanPress",
    unknown = "unknown",
  }
}

function querySelector(selectors: string) {
  return self.parent?.document.querySelector(selectors);
}
