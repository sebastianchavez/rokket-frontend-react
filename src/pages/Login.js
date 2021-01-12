//******** React ********/
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

//******** Services ********/
import { log, error } from '../services/logger'
import { toast, alert } from '../services/messages'
import { loginUser } from '../services/user'

//******** Components ********/
import LoginForm from '../components/Forms/LoginForm'

export default ({userAuth, setUserAuth}) => {

    const idLog = 'LoginPage'
    const [btnLoad, setBtnLoad] = useState(false)

    const authenticate = async value => {
        try {
            setBtnLoad(true)
            let response = await loginUser(value)
            await localStorage.setItem('currentUser', JSON.stringify(response.data.user))
            log(idLog, 'authenticate', {info: 'Success', response})
            await localStorage.setItem('isLoggedIn',true)
            await localStorage.setItem('accessToken', response.data.accessToken)
            setBtnLoad(false)
            setUserAuth(true)
            toast('Usuario autenticado')
        } catch (e) {
            setBtnLoad(false)
            let msg = e.response && e.response.data && e.response.data.message ? e.response.data.message : 'Problemas al ingresar, intente más tarde'
            error(idLog, 'authenticate', {info: 'Catch error', error: e})
            alert('Error',msg,'error')
        }
    }

    if(userAuth){
        return <Redirect to="/" />
    }

    return (
        <>
        <div className="container pt-5">
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <LoginForm {...{authenticate, btnLoad}} />
                </div>
            </div>
        </div>
        </>
    )
}