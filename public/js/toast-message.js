


function ToastError (err) {
    Toastify({
        text: err,
        duration: 3000,
        close: true,
        gravity: 'top', // `top` or `bottom`
        position: 'left', // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background:
            ' linear-gradient(251deg, rgba(144,33,14,1) 51%, rgba(8,8,8,1) 100%)',
        },
        onClick: function () {}, // Callback after click
      }).showToast();
}
function ToastSuccess (data) {
  Toastify({
    text: data,
    duration: 3000,
    close: true,
    gravity: 'top', // `top` or `bottom`
    position: 'left', // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background:
        'linear-gradient(251deg, rgba(161,113,105,1) 2%, rgba(9,203,181,1) 100%)',
    },
    onClick: function () {}, // Callback after click
  }).showToast();
}

export {ToastError,ToastSuccess}