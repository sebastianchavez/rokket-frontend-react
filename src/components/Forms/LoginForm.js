import React from 'react'
import { useForm } from "react-hook-form"


export default ({ authenticate, btnLoad }) => {


    const required = "Este campo es requerido"
    const email = "Debe ingresar un email válido"

    const handleClick = values => {
        authenticate({ ...values })
    }

    const { register, handleSubmit, errors } = useForm()

    const errorMessage = error => {
        return <div className="invalid-feedback d-block">{error}</div>
    }

    return (
        <div className="card">
            <form className="card-body" onSubmit={handleSubmit(handleClick)}>
                <h5>Ingresa tus credenciales</h5>
                <div className="form-group mt-3">
                    <label>Email</label>
                    <input type="text" name="email" id="" className="form-control"
                        ref={register({ required: true, pattern: /^\S+@\S+$/i })} />
                    {errors.email && errors.email.type === "required" &&
                        errorMessage(required)}
                    {errors.email && errors.email.type === "pattern" &&
                        errorMessage(email)}
                </div>
                <div className="form-group">
                    <label>Contraseña</label>
                    <input type="password" name="password" id="" className="form-control"
                        ref={register({ required: true })} />
                    {errors.password && errors.password.type === "required" &&
                        errorMessage(required)}
                </div>
                <button type="submit" disabled={btnLoad} className="btn btn-block btn-rokket">
                    Ingresar
                    {
                        btnLoad ? <div className="spinner-grow spinner-grow-sm ml-2"></div> : null
                    }
                </button>
            </form>
        </div>
    )
}