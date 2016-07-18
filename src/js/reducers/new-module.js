import update from 'react-addons-update';
import * as actionTypes from '../actions/new-module';

const initialState = {
    module_id: undefined,
    name: undefined,
    medals: [39, 69],
    trophies: {
        trophy_name: [
            "participation",
            "overall_average",
            "high_score",
            "first_quiz"
        ],
        condition: [3, 60, 100, 1]
    },
    error: undefined,
    isValidatingModuleID: false,
    moduleIDExists: undefined
};

export default function newModule (state = initialState, action) {

    switch (action.type) {

    case actionTypes.VALIDATE_MODULE_ID_REQUEST:
        return update(state, {
            isValidatingModuleID: { $set: true }
        });

    case actionTypes.VALIDATE_MODULE_ID_SUCCESS:
    case actionTypes.VALIDATE_MODULE_ID_FAILURE:
        return handleResponse(state, action);

    case actionTypes.UPDATE_MEDAL_VALUES:
        return updateMedalValues(state, action);

    case actionTypes.UPDATE_TROPHY_VALUES:
        return updateTrophyValues(state, action);

    default:
        return state;
    }
}

function handleResponse (state, action) {

    return update(state, {
        isValidatingModuleID: { $set: false },
        moduleIDExists: { $set: action.moduleIDExists },
        error: { $set: action.error }
    });
}

function updateMedalValues (state, action) {

    let newValue, index, offset;

    switch (action.medal) {

    case 'bronze':
        offset = 1;
        index = 0;
        break;

    case 'gold':
        offset = -1;
        index = 1;
        break;
    }
    newValue = action.value === "" ? "-" : action.value + offset;

    return update(state, {
        medals: { $splice: [[index, 1, newValue]] }
    });
}

function updateTrophyValues (state, action) {

    let index = state.trophies.trophy_name.indexOf(action.trophy);

    if (index === -1) {
        return state;
    }
    return update(state, {
        trophies: {
            condition: { $splice: [[index, 1, action.value]] }
        }
    });
}
