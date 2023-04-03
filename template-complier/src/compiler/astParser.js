// id="app" id='app' id=app
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
//标签名  <my-header></my-header>
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;
// <my:header></my:header>
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
// <div
const startTagOpen = new RegExp(`^<${qnameCapture}`);
// > />
const startTagClose = /^\s*(\/?)>/;
// </div>
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);


/**
 * text 文本信息
 * root 根节点
 * currentParent 父元素节点
 * stack 存储待处理的节点信息
 * 拿到html字符串
 * 判断字符串的<号是否在第0位
 * 0；是以<开始，可能是开始标签，也可能是结束标签
 *    开始标签： 正则匹配是开始标签，匹配成功。
 *             创建开始标签信息
 *             检查root是否为空，如果是空，将节点信息赋值给root
 *             循环提取标签属性信息
 *             返回元素节点信息
 *             将元素节点信息push到stack中保存
 *             continue进入下一次循环
 *    结束标签：将stack之后一个节点信息移出，
 *            设置移出的节点信息的parent为移出后stack的最后一项的节点
 *            移除的节点并添加到移出后stack的最后一项的节点children内
 *            continue进入下一次循环
 *!0：文本内容：提取文本内容。0~<好的位置
 *    得到文本内容，创建文本节点信息
 *    将节点信息添加到currentParent的children内
 */

export function parseHtmlToAst(html){
  let text,
      root,
      currentParent,
      stack = [];

  while (html){
    let textEnd = html.indexOf('<')
    if(textEnd === 0){
      const startTagMatch = parseStartTag()
      if(startTagMatch){
        start(startTagMatch.tagName, startTagMatch.attrs)
        continue
      }
      // 匹配结束标签
      const endTagMatch = html.match(endTag)
      if(endTagMatch){
        advance(endTagMatch[0].length)
        end(endTagMatch[1])
        continue
      }
    }

    if(textEnd > 0){
      text = html.substring(0, textEnd)
    }
    if(text){
      advance(text.length);
      chars(text)
    }
  }

  /**
   * 提取开始标签的信息及标签属性
   * <div id="app" v-if=”show“ style="width: 100%">
   * 返回信息格式： {
   *     tag: 'div',
   *     attrs: [
   *        { name: 'id', value: 'app' },
   *        { name: 'v-if', value: 'show' },
   *        { name: 'style', value: 'width: 100%' },
   *     ]
   * }
   */
  function parseStartTag(){
    // 匹配开始标签
    const start = html.match(startTagOpen)
    let end,
        attr;
    // 开始标签是否存在
    if(start){
      // 保存标签名称
      const match = {
        tagName: start[1],
        attrs: [],
      }
      // 删除已匹配的标签字符
      advance(start[0].length)
      // 开始获取标签的属性
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        match.attrs.push({
          name: attr[1],
          value: attr[3] || attr[4] || attr[5],
        })
        // 删除已匹配的标签属性
        advance(attr[0].length)
      }
      // 匹配到了结束>符合，返回信息
      if(end){
        advance(end[0].length)
        return match
      }
    }
  }

  function advance(n){
    html = html.substring(n)
  }

  // 创建开始标签节点信息，并将节点添加到stack中
  function start(tagName, attrs){
    const element = createASTElement(tagName, attrs)
    if(!root){
      root = element
    }
    currentParent = element
    stack.push(element)
  }

  // 结束标签
  function end(tagName){
    const element = stack.pop();
    // 更新当前元素的parent
    currentParent = stack[stack.length - 1];
    if(currentParent){
      // 设置取出元素的父亲
      element.parent = currentParent
      // 元素添加父级的children
      currentParent.children.push(element)
    }
  }

  // 文本信息
  function chars(text){
    text = text.trim()
    if(text){
      currentParent.children.push({
        type: 3,
        text,
      })
    }
  }

  // 创建节点信息
  function createASTElement(tagName, attrs){
    return {
      tag: tagName,
      type: 1,
      attrs,
      children: [],
      parent: null,
    }
  }

  return root
}