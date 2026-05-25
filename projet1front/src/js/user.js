let profile = document.querySelector('.profile')
let menu = document.querySelector('.menu')

profile.addEventListener('click', function(event) {
    event.preventDefault()
    menu.classList.toggle('active')
})

// let header = document.querySelector('header')
// header.addEventListener('click', function(event) {
//     event.preventDefault()
//     if(menu.classList.contains('active'))
//         menu.classList.toggle('active')
// })