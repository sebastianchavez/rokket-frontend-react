import React from 'react'
import { useForm } from "react-hook-form"

export default ({saveAnimal, btnLoad, saveImage, imgLoad, flag, image}) => {

    const required = "Este campo es requerido"

    const TYPES = [
        { text: 'Mamifero', value: 'MAMMAL' },
        { text: 'Ave', value: 'BIRD' },
        { text: 'Pez', value: 'FISH' }
    ];

    const handleClick = values => {
        saveAnimal({...values, ...image})
    }

    const { register, handleSubmit, errors } = useForm()
    
    const errorMessage = error => {
        return <div className="invalid-feedback d-block">{error}</div>
    }


    return (
        <form onSubmit={handleSubmit(handleClick)}>
            <div className="form-group">
                <label>Imagen</label>
                <input type="file" className="form-control mb-3" name="image" accept=".jpg, .png" onChange={saveImage}
                ref={register({ required: true })}/>
                {errors.image && errors.image.type === "required" &&
                        errorMessage(required)}
                {
                    imgLoad ?
                    <><div className="spinner-grow spinner-grow-sm ml-2 mr-3"></div> <label>Cargando...</label> </>:
                    null
                }
                {
                     flag.ok ? 
                     <div className="alert alert-info text-center">
                        <strong>Imagen cargado</strong>
                    </div> : null

                }
                {
                    flag.error ?
                    <div className="alert alert-danger text-center">
                        <strong>Problemas al cargar imagen</strong>
                    </div> : null
                }
            </div>
            <div className="form-group">
                <label>Nombre</label>
                <input type="text" className="form-control" name="name" 
                ref={register({ required: true })}/>
                {errors.name && errors.name.type === "required" &&
                        errorMessage(required)}
            </div>
            <div className="form-group">
                <label>Descripción</label>
                <textarea className="form-control" name="description" id="" cols="30" rows="3"
                ref={register({ required: true })}></textarea>
                {errors.description && errors.description.type === "required" &&
                        errorMessage(required)}
            </div>
            <div className="form-group">
                <label>Tipo</label>
                <select className="form-control" name="type" ref={register({ required: true })}>
                    {
                        TYPES.map((t,i) => <option key={i} value={t.value}>{t.text}</option>)
                    }
                </select>
                {errors.type && errors.type.type === "required" &&
                        errorMessage(required)}
            </div>
            <button type="submit" disabled={btnLoad} className="btn btn-rokket btn-block">
                Agregar
                {
                    btnLoad ? <div className="spinner-grow spinner-grow-sm ml-2"></div> : null
                }
            </button>
        </form>
    )
}