/*
 * @Description: 
 * @Author: wanghexing
 * @Date: 2022-02-23 11:31:40
 * @LastEditors: wanghexing
 * @LastEditTime: 2022-02-23 17:10:13
 */
export const CollapsedReduxer = (prevState = { isCollapsed: false }, action) => {
    console.log(action)
    let { type } = action
    switch (type) {
        case 'change_collapsed':
            let newState = { ...prevState }
            newState.isCollapsed = !newState.isCollapsed
            return newState
        default:
            return prevState
    }

}