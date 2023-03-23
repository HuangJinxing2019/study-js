export function getUrlQuery(){
  let search = window.location.search.substring(1);
  if(search){
    return Object.fromEntries(search.split('&').map(item => item.split('=')))
  }
  return null
}