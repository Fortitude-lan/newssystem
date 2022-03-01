/*
 * @Description: 
 * @Author: wanghexing
 * @Date: 2022-02-28 10:53:17
 * @LastEditors: wanghexing
 * @LastEditTime: 2022-02-28 11:08:10
 */
export const LoadingReduxer = (prevState = { loading: false }, action) => {
    console.log(action)
    let { type, payload } = action
    switch (type) {
        case 'change_loading':
            let newState = { ...prevState }
            newState.loading = payload
            return newState
        default:
            return prevState
    }

}