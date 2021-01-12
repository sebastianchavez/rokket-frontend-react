//******** React ********/
import React, { useState, useEffect } from 'react'

//******** Dependencies ********/
import { Tooltip } from 'reactstrap'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//******** Services ********/
import { getAllAnimals, saveAnimal, saveImage, deleteAnimal } from '../services/animal'
import { alert, toast, confirm } from '../services/messages'
import { error, log } from '../services/logger'

//******** Components ********/
import Modal from '../components/Modals/AnimalModal'
import AnimalForm from '../components/Forms/AnimalForm'

//******** Helpers ********/
import translate from '../helpers/translate'
import titlecase from '../helpers/titlecase'

export default () => {

    const idLog = 'HomePage'

    const [tooltipOpen, setTooltipOpen] = useState(false)
    const [animals, setAnimals] = useState([])
    const [btnLoad, setBtnLoad] = useState(false)
    const [image, setImage] = useState({image: null, imageName: null})
    const [imgLoad, setImgLoad] = useState(false)
    const [flag, setFlag] = useState({ok: false, error: false})
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const toggle = () => setTooltipOpen(!tooltipOpen)
    
    useEffect(() => {
        getAnimals()
    },[])

    const getAnimals = async () => {
        try {
            let response = await getAllAnimals()
            setAnimals(response.data.animals)
            log(idLog, 'getAnimals', {info: 'Success', response})
        } catch (e) {
            error(idLog, 'getAnimals', {info: 'Error', error: e})
            catchError(e)
        }
    }

    const addAnimal = async values => {
        try {
            let response = await saveAnimal(values)
            toast('Animal agregado')
            log(idLog, 'addAnimal', {info: 'Success', response})
            setShow(false)
            getAnimals()
        } catch (e) {
            error(idLog, 'addAnimal', {info: 'Error', error: e})
            catchError(e)
        }
    }

    const saveImg = async event => {
        if(event.target.files && event.target.files[0]){
            setImgLoad(true)
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = async e => {
                const request = {
                    fileName: Date.now() + '.' + event.target.files[0].name.split('.')[1],
                    file: e.target.result.split(',')[1].toString()
                };
                try {
                    let response = await saveImage(request)
                    setImage({image: response.data.url, imageName: request.fileName})
                    setImgLoad(false)
                    setFlag({ok: true, error: false})
                    log(idLog, 'saveImg', {info: 'Success', response})
                } catch (e) {
                    setImgLoad(false)
                    setFlag({ok: false, error: true})
                    error(idLog, 'saveImg', {info: 'Error', error: e})
                    catchError(e)
                }
            }

        }
    }

    const delAnimal = async id => {
        let ok = await confirm('Desea eliminar este animal?')
        if(ok && ok.value){
            try {
                let response = await deleteAnimal(id)
                toast('Animal eliminado')
                getAnimals()
                log(idLog, 'delAnimal', {info: 'Success', response})
            } catch (e) {
                error(idLog, 'delAnimal', {info: 'Error', error: e})
                catchError(e)
            }
        }
    }

    const openModal = () => {
        setFlag({ok: false, error: false})
        handleShow()
    }

    const catchError = e => {
        if(e.response && e.response.status == 401){
            alert('Error', 'Token expirado', 'error')
            localStorage.clear()
        } else {
            let msg = e.response && e.response.data && e.response.data.message ? e.response.data.message : 'En estos momentos existen dificultades, intente mas tarde'
            alert('Error',msg,'error')
        }
    }

    return(
        <div className="container pt-5">
            <div className="card card-body">
                <div className="row">
                    <div className="col">
                        <button className="btn btn-rokket mb-4" onClick={openModal}>
                            Agregar animal
                        </button>
                        <Modal onHide={handleClose} show={show}>
                            <AnimalForm 
                                btnLoad={btnLoad} 
                                saveAnimal={addAnimal} 
                                saveImage={saveImg} 
                                imgLoad={imgLoad}
                                flag={flag}
                                image={image}/>
                        </Modal>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        {
                            animals.length == 0 ?

                            <div className="alert alert-info text-center">
                                <strong>No hay animales</strong>
                            </div> : 

                            <table className="table table-hover">
                            <thead>
                                <tr className="text-center">
                                    <th>Nombre</th>
                                    <th>Tipo</th>
                                    <th>Imagen</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    animals.map((a,i) => (
                                        <tr className="text-center" key={i}>
                                            <td>{a.name}</td>
                                            <td>{titlecase(translate(a.type))}</td>
                                            <td>
                                                <img src={a.image} style={{maxHeight: 200, maxWidth: 200}} alt=""/>
                                            </td>
                                            <td>
                                                <button className="btn btn-icon" id="btnDelete" onClick={() => delAnimal(a._id)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                                <Tooltip isOpen={tooltipOpen} target="btnDelete" toggle={toggle}>
                                                    Eliminar
                                                </Tooltip>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}