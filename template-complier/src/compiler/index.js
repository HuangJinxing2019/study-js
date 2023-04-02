import {parseHtmlToAst} from "./astParser";

export function compilerToRenderFunction(html){
  const ast = parseHtmlToAst(html);
  return ast;
}