import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
})

export const toast = (message, type = 'success') => {
    Toast.fire({title: message, icon: type})
}

export const alert = (title, message = '', type = 'success') => {
    MySwal.fire({title, text: message, icon: type})
}

export const confirm = (title, type = 'question') => {
    return MySwal.fire({showCancelButton: true, cancelButtonText: 'Cancelar', icon: type, title: title})
}