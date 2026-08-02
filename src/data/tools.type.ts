export interface ToolsReqData {
  cateId: number,
  title: string,
  route: string,
}

//tools
export interface ToolsInfo {
  title: string,
  logo: string,
  desc: string,
  url: string,
  cate: string,
  cateId: number,
}

//tools cate
export interface ToolCate {
  id: number,
  title: string,
  icon: string,
  list: ToolsInfo[]
}
