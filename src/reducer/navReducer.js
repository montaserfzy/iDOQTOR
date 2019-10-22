import Routes from '../routes/index'

const NavReducer = (state, action) => {
    const newState = Routes.router.getStateForAction(action, state)
    return newState || state
};

export default NavReducer
