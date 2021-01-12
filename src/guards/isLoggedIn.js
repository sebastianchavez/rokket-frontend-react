export const isLoggedIn = async (to, from, next) => {
    // console.log('to',to)
    // console.log('from',from.location.pathname)
    let isLoggedIn = await localStorage.getItem('isLoggedIn')
    if (isLoggedIn) {
        next();
    } else {
        if(to.location.pathname === '/login'){
            next()
        } else {
            next.redirect('/login')
            next()
        }
    }
};