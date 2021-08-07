/** api 配置
 */
export const config = {
  /** 会在 api 请求路径的前面加上这个字段的值
   * @defaultValue ""
   */
  server: "",
  /**
   * 对api上方法的调用是否开启缓存，如果需要支持 OceanPress 请开启此选项
   * @defaultValue true
   */
  apiCache: false,
  /** 缓存结果的最大长度，超出此长度则不会缓存且在控制台打印警告
   * @defaultValue 10 * 1024
   */
  maxCacheValueLength: 10 * 1024,
};
