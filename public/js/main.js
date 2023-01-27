




// new blog handler 

import { ToastError, ToastSuccess } from "./toast-message.js"

// blog realated all dom manipulation
const title = document.getElementById('blog_title')
const count = document.getElementById('title_count')
const image = document.getElementById('blog_image')
const showImage = document.getElementById('show_image')
const submitBtn = document.getElementById('submit')

const apiData = {
    title:'',
    image:'',
    content:''
}
title.oninput = e => {
    const value = e.target.value
    apiData.title = value
    count.innerText = value.length
    if(value.length > 100) {
        count.style.color = 'red'
    }else {
        count.style.color = 'black'
    }
}

image.onchange = e => {
    apiData.image = e.target.files[0]
    const reader = new FileReader()
    reader.onload = () => {
        showImage.src = reader.result
    }
    reader.readAsDataURL(e.target.files[0])
}
export const blogContent = (data) => {
    apiData.content = data
}
submitBtn.onclick = async e => {
    try {
        const formData = new FormData()
        formData.append('image',apiData.image)
        formData.append('title',apiData.title)
        formData.append('content',apiData.content)
        const {data} = await axios.post('/blog/new',formData)
        ToastSuccess(data.message)
    }catch(err) {
        ToastError(err?.response?.data?.message)
    }
}
