import { ToastError, ToastSuccess } from "./toast-message.js"

const show_image = document.getElementById('show_image')
const image = document.getElementById('avatar')


const show_name = document.getElementById('show_name')
const Name = document.getElementById('name')

const show_bio = document.getElementById('show_bio')
const bio = document.getElementById('bio')
const bio_count = document.getElementById('bio_count')

const update_btn = document.getElementById('update')

const apiData = {
    image:'',
    name:'',
    bio:''
}
image.onchange = e => {
    apiData.image = e.target.files[0]
    const reader = new FileReader()
    reader.onload = () => {
        show_image.src = reader.result
    }
    reader.readAsDataURL(e.target.files[0])
}

Name.oninput = e => {
    const value = e.target.value;
    apiData.name = value
    show_name.innerText = value
}
bio.oninput = e => {
    const value = e.target.value
    apiData.bio = value
    show_bio.innerHTML = value
    bio_count.innerHTML = value.length
    if(value.length > 250) {
        bio_count.style.color = 'red'
        console.log('nice')
    }else{
        bio_count.style.color = 'black'
    }
}

update_btn.onclick = async (e) => {
    if(apiData.name.length < 1 && apiData.bio.length < 1 && apiData.image.length < 1 ){
        return
    }
    try {
        const formData = new FormData()
        formData.append('avatar',apiData.image)
        formData.append('name',apiData.name)
        formData.append('bio',apiData.bio)
        const res = await axios.post('/profile/update',formData)
        ToastSuccess(res.data.message)
    } catch (error) {
        ToastError(error?.response?.data?.message)
    }
}
