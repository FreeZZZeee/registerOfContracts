import { selectParam } from "./guide.interface"
import { Provider } from "./provider.interface"

export interface valuesParamPropsArr {
    placements: selectParam[]
    types: selectParam[]
    federals: selectParam[]
    views: selectParam[]
    articles: selectParam[]
    divisions: selectParam[]
    providers: Provider[]
}