
import { blogContent } from "./main.js";
import { ToastError } from "./toast-message.js";
Quill.register('modules/imageUploader', ImageUploader);
document.addEventListener('DOMContentLoaded', () => {
  const toolbarOptions = [
    ['bold', 'italic', 'underline'], // toggled buttons
    ['code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    [{ direction: 'rtl' }], // text direction
    [{ size: [ 'small', false, 'large', 'huge' ]}],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],
    ['link', 'image', 'video'], // remove formatting button
  ];
  hljs.configure({   // optionally configure hljs
    languages: ['javascript', 'ruby', 'python']
  });
  const quill = new Quill('#editor', {
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
              ToastError(err?.response?.data?.message)
            }
          });
        },
      },
    },
  });
  quill.on('text-change', () => {
    // this blog content function is come from main.js file
    blogContent(quill.root.innerHTML)
  });
});

// show.onclick = () => {
//   output.innerHTML = content
// }

