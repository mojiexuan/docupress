/**
 * 通用配置
 */
interface YamlBase {
  // 标题
  name?: string;
  // 图标
  favicon?: string;
  // 描述
  description?: string;
  // 口号
  slogan?: string;
  // 关键字
  keywords?: string;
  // 作者
  author?: string;
  // 时间，页面更新时间
  time?: string;
}

/**
 * 应用级配置
 */
interface YamlApp extends YamlBase {
  // 主机
  host?: string;
  // 端口
  port?: number;
  // 公共静态文件目录
  public?: string;
  // 文档，md文件放置目录
  docs?: string;
  // 输出目录
  outDir?: string;
  // 右上角操作
  operates?: YamlAppOperations[];
  // 菜单配置
  menu?: YamlAppMenu;
  // 大纲配置
  outline?: YamlAppOutline;
  // 侧边菜单栏
  sidebar?: YamlArticleSidebar[];
}
interface Config {
  app: YamlApp;
}

/**
 * 右上角操作
 */
interface YamlAppOperations {
  // 名称
  name?: string;
  // 链接
  link?: string;
  // 是否新窗口打开
  blank?: boolean;
  // 子菜单
  list?: YamlAppOperationItem[];
}

/**
 * 右上角操作的子菜单
 */
interface YamlAppOperationItem {
  // 名称
  name?: string;
  // 值
  value?: string;
}

/**
 * 菜单配置
 */
interface YamlAppMenu {
  // 标签名
  label?: string;
}

/**
 * 大纲配置
 */
interface YamlAppOutline {
  // 标签名
  label?: string;
}

/**
 * 首页
 */
interface YamlIndex extends YamlBase {
  // 首页动作
  actions?: YamlIndexAction[];
  // 首页特性
  features?: YamlIndexFeature[];
  // 首页页脚
  footer?: YamlIndexFooter[];
}

/**
 * 首页动作
 */
interface YamlIndexAction {
  // 名称
  name?: string;
  // 链接
  link?: string;
  // 是否新窗口打开
  blank?: boolean;
}

/**
 * 首页特性
 */
interface YamlIndexFeature {
  // emoji
  icon?: string;
  // 名称
  name?: string;
  // 描述
  details?: string;
}

/**
 * 首页页脚
 */
interface YamlIndexFooter {
  // 名称
  name?: string;
  // 链接
  link?: string;
  // 图标
  image?: string;
}

/**
 * 文章页
 */
interface YamlArticle extends YamlBase {
  // 标题
  title?: string;
  // 侧边菜单栏
  sidebar?: YamlArticleSidebar[];
}

/**
 * 侧边菜单栏
 */
interface YamlArticleSidebar {
  // 名称
  name?: string;
  // 子菜单
  items?: YamlArticleSidebarItem[];
}

/**
 * 子菜单
 */
interface YamlArticleSidebarItem {
  // 名称
  name?: string;
  // 链接
  link?: string;
}

/**
 * 最终数据集
 */
interface YamlData extends YamlApp, YamlIndex, YamlArticle {}

interface ErrorHandlerOptions {
  // 是否在响应中暴露错误堆栈
  exposeStack?: boolean;
  // 是否记录错误日志
  logErrors?: boolean;
}

interface MarkdownItContainerTokenType {
  info: string;
  nesting: number;
}

declare module "markdown-it-ins" {
  const markdownItPlugin: MarkdownIt.PluginSimple;
  export = markdownItPlugin;
}

declare module "markdown-it-mark" {
  const markdownItPlugin: MarkdownIt.PluginSimple;
  export = markdownItPlugin;
}

declare module "markdown-it-sub" {
  const markdownItPlugin: MarkdownIt.PluginSimple;
  export = markdownItPlugin;
}

declare module "markdown-it-sup" {
  const markdownItPlugin: MarkdownIt.PluginSimple;
  export = markdownItPlugin;
}

declare module "markdown-it-footnote" {
  const markdownItPlugin: MarkdownIt.PluginSimple;
  export = markdownItPlugin;
}

declare module "markdown-it-deflist" {
  const markdownItPlugin: MarkdownIt.PluginSimple;
  export = markdownItPlugin;
}

declare module "markdown-it-abbr" {
  const markdownItPlugin: MarkdownIt.PluginSimple;
  export = markdownItPlugin;
}

declare module "markdown-it-emoji" {
  const markdownItPlugin = {
    full: MarkdownIt.PluginSimple,
  };
  export = markdownItPlugin;
}

declare module "markdown-it-container" {
  const markdownItPlugin: MarkdownIt.PluginSimple;
  export = markdownItPlugin;
}
