import proxyHandle from "./proxyHandle";
export const useReactive = (data) => {
  return reactive(data)
}
function reactive(data){
  const proxy = new Proxy(data, proxyHandle)
  return proxy
}
