export const getUser = function() {
    try {
        const user = window.localStorage.getItem('user')
        if(user) {
            return JSON.parse(user)
        }
    } catch(e) {
        console.error(e)
        throw e
    }
}