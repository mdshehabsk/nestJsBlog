

//navbar desing


const profile = document.getElementById('profile')
const links = document.querySelector('.links')
const login_icon = document.getElementById('login_icon')
const login_links = document.querySelector('.login_links')

profile?.addEventListener('click',(e)=> {
   links.classList.toggle('active')
})

login_icon?.addEventListener('click',(e)=> {
   login_links.classList.toggle('active')
})


