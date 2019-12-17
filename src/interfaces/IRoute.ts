interface IRoute {
    path: string,
    guards?: Function[]
    routes?: IRoute[],
    method?: string,
    action?: Function
}

export default IRoute;