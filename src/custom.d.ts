declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.module.sass" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.svg" {
  import * as React from "react"; // Использование синтаксиса import вместо require
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >;
  const src: string;
  export default src;
}

declare module "*.png" {
  const content: string; // Типизировано как строка (путь к файлу)
  export default content;
}

declare module "*.jpg" {
  const content: string; // Типизировано как строка (путь к файлу)
  export default content;
}

declare module "*.json" {
  const content: Record<string, unknown>; // Структура данных неизвестна
  export default content;
}
