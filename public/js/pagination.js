
// pagination handle

const pagination_box = document.getElementById('pagination')
const search = window.location.search
const page = search.split('&')[0]
const query = page.replace('?page=','')
console.log(query)
const ul = `<ul>
<li>
  <a href="?page=${Number(query) - 1}">prev</a>
</li>
<li>
  <a href="?page=${query == '' ? '2' : Number(query) + 1}"> ${query == '' ? '2' : Number(query) + 1} </a>
</li>
<li>
  <a  href="?page=${query == '' ? '2' : Number(query) + 2}">${query == '' ? '3' : Number(query) + 2} </a>
</li>
<li>
  <a  href="?page=${query == '' ? '2' : Number(query) + 3}"> ${query == '' ? '4' : Number(query) + 3} </a>
</li>
<li>
  <a  href="?page=${Number(query) + 1}">next</a>
</li>
</ul>`

pagination_box.innerHTML = ul