

//navbar desing


const profile = document.getElementById('profile')
const links = document.querySelector('.links')

profile.onclick = e => {
   links.classList.toggle('active')
}