import dictionary from '../constants/dictionary'

export default value => {
    return value && value != '' && dictionary.find(d => d.en === value.toLowerCase()) ? dictionary.find(d => d.en === value.toLowerCase()).es : value
}