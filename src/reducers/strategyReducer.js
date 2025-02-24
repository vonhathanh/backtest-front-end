export function strategyReducer(strategies, action) {
    switch (action.type) {
        case 'selected': {
            if (strategies[action.strategyId] === undefined)
                strategies[action.strategyId] = action.values;
            else delete strategies[action.strategyId]

            return strategies
        }
        case "updated": {
            strategies[action.strategyId][action.name] = action.value
            return strategies
        }
        default: {
            throw Error("Unknown action: " + action.type)
        }
    }
}