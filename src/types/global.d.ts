interface ConfigAppOperations {
  name: string;
  link?: string;
  blank?: boolean;
  list?: {
    name: string;
    value: string;
  }[];
}

interface ConfigApp {
  name: string;
  favicon: string;
  description: string;
  tagline: string;
  keywords: string;
  author: string;
  host: string;
  port: number;
  public: string;
  docs: string;
  operates: ConfigAppOperations[];
  menu: {
    label: string;
  };
  outline: {
    label: string;
  };
  time: string;
}

interface ConfigOutline {
  label: string;
}

interface Config {
  app: ConfigApp;
}

interface ErrorHandlerOptions {
  exposeStack?: boolean; // 是否在响应中暴露错误堆栈
  logErrors?: boolean; // 是否记录错误日志
}

interface MarkdownItContainerTokenType {
  info: string;
  nesting: number;
}

interface PageData {
  title: string;
  sidebar?:{
    text:string;
    items?:{
      text:string,
      link?:string
    }[]
  }[]
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
