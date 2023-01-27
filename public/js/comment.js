

const commentBox = document.getElementById('commentBox');
const commentBtn = document.getElementById('comment_btn');
Quill.register('modules/imageUploader', ImageUploader);
let commentContent;
document.addEventListener('DOMContentLoaded', () => {
  const toolbarOptions = [
    ['bold', 'italic', 'underline'], // toggled buttons
    ['code-block'],
    // [{ list: 'ordered' }, { list: 'bullet' }],
    [{ direction: 'rtl' }], // text direction
    [{ size: ['small', false, 'large', 'huge'] }],
    // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],
  ];
  hljs.configure({   // optionally configure hljs
    languages: ['javascript', 'ruby', 'python']
  });
  const quill = new Quill(commentBox, {
    theme: 'snow',
    modules: {
      syntax: true,
      toolbar: {
        container: toolbarOptions,
      },
      imageUploader: {
        upload: (file) => {
          return new Promise(async (resolve, reject) => {
            try {
              const formData = new FormData();
              formData.append('image', file);
              const res = await axios.post('/blog/image', formData);
              resolve(res.data.imageURL);
            } catch (err) {
              ToastError(err?.response?.data?.message);
            }
          });
        },
      },
    },
  });
  quill.on('text-change', () => {
    // this blog content function is come from main.js file
    commentContent = quill.root.innerHTML;
  });
});
const param = window.location.pathname.replace('/blog/', '');
//comment delete

commentBtn.onclick = async (e) => {
  try {
    if (!commentContent) {
      return;
    }
    const {data} = await axios.post(`/comment/comment/${param}`, {
      comment: commentContent,
    });
    if(data.success){
      commentFetch()
    }
  } catch (error) {
    console.log(error);
  }
};

// all comment show
function showAllComment(elem) {
  const allComment = document.querySelector('.all_comment');
  let singleComment = ''
  for(let comment of elem) {
     singleComment +=   `
    <div class="single_comment">
    <div class="avatar">
      <img src="${comment.author.avatarImg}" alt="">
    </div>
    <div class="details">
      <div class="topbar">
        <h4 class="name">
          ${comment.author.name}
        </h4>
        <span class="date" > ${comment.date} </span>
      </div>
      <p class="comment_text" > ${comment.text} </p>
     ${comment.canDelete ? ` <div class="icon" >
     <button  ><i class='bx bx-dots-horizontal-rounded'  ></i></button>
      <ul class='sub_menu' >
        <li onclick="deleteComment(${comment.id})"  > <i class='bx bx-trash'></i> &nbsp; delete</li>
      </ul>
    </div>` : ''}
    </div>
  </div>`;
  };

  allComment.innerHTML = singleComment
  const commentIcon = document.querySelectorAll('.icon')
  // const subMenu = document.querySelector('.sub_menu')
  commentIcon.forEach((elem,i)=> {
    elem.onclick = e => {
      elem.childNodes[3].classList.toggle('active')
    }
  })
}
//get All comment

async function commentFetch() {
  try {

    const { data } = await axios.get(`/comment/allComment/${param}`);
    showAllComment(data.allComment);
  } catch (error) {
    console.log(error);
  }
}
commentFetch();

window.deleteComment = async (id) => {
  try {
    const {data} = await axios.delete(`/comment/delete/${param}/${id}`)
    if(data.success){
      commentFetch()
    }
  } catch (error) {
      console.log(error)
  }
}
