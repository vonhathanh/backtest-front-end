export function strategyReducer(strategies, action) {
    switch (action.type) {
        case 'selected': {
            if (strategies[action.id] === undefined)
                strategies[action.id] = {};
            else delete strategies[action.id]

            return strategies
        }
        case "updated": {
            strategies[action.id][action.name] = action.value
            return strategies
        }
        default: {
            throw Error("Unknown action: " + action.type)
        }
    }
}