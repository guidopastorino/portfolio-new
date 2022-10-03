// swiper
var swiper = new Swiper(".mySwiper", {
    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 20
        },

        600: {
          slidesPerView: 2,
          spaceBetween: 30
        },
    
        950: {
            slidesPerView: 3,
            spaceBetween: 30
        },
    },

    grabCursor: true,
    touchEventsTarget: 'container',
});



// welcome text typing
new TypeIt("#typeText", {
    strings: "Hi, i'm Guido, Front-End web developer.",
})
.go();


// select elements via function
const $ = (selector) => document.querySelector(selector)



document.addEventListener('click', e => {
    // open menu
    if(e.target.getAttribute('id') === 'btnOpenMenu') {
        $('#menu').classList.replace('menu-close', 'menu-open')
        $('#bg-close-menu').classList.replace('bg-hidden', 'bg-show')
    }
    
    // close menu
    if(e.target.getAttribute('id') === 'btnCloseMenu') {
        $('#menu').classList.replace('menu-open', 'menu-close')
        $('#bg-close-menu').classList.replace('bg-show', 'bg-hidden')
    }

    // close menu click bg
    if(e.target.getAttribute('id') === 'bg-close-menu') {
        // menu
        $('#menu').classList.replace('menu-open', 'menu-close')
        $('#bg-close-menu').classList.replace('bg-show', 'bg-hidden')

        // modal email
        $('#modalEmailSent').classList.replace('modal-email', 'd-none')
    }

    // btn change theme
    if(e.target.getAttribute('id') === 'btnChangeTheme') {
        e.target.classList.toggle('moon')
        e.target.classList.toggle('sun')

        if (e.target.classList.contains('moon')) {
            lightMode()
        } else {
            darkMode()
        }
    }



    // modal email sent
    if(e.target.getAttribute('id') === 'btnCloseEmailModal') {
        $('#modalEmailSent').classList.replace('modal-email', 'd-none')
        $('#bg-close-menu').classList.replace('bg-show', 'bg-hidden')
    }
})

// theme functions
function lightMode(){
    localStorage.setItem('GuidoPortfolioTheme', 'light')
    document.body.classList.remove('dark-mode')
    $('#btnChangeTheme').classList.replace('sun', 'moon')

    // modal email images
    $('#modalEmailImgs').classList.replace('modal-email__img-light', 'modal-email__img-dark')
}

function darkMode(){
    localStorage.setItem('GuidoPortfolioTheme', 'dark')
    document.body.classList.add('dark-mode')
    $('#btnChangeTheme').classList.replace('moon', 'sun')

    // modal email images
    $('#modalEmailImgs').classList.replace('modal-email__img-dark', 'modal-email__img-light')
}


document.addEventListener('DOMContentLoaded', () => {
    // comprobar localstorage
    if(localStorage.getItem('GuidoPortfolioTheme') === null) lightMode()
    if(localStorage.getItem('GuidoPortfolioTheme') === 'light') lightMode()
    if(localStorage.getItem('GuidoPortfolioTheme') === 'dark') darkMode()
})

const $form = document.querySelector('.form')


let regExpName = /^[a-zA-Z]+$/
let regExpSurname = /^[a-zA-Z]+$/
let regExpEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z-]+\.[a-zA-Z]+$/
let regExpTopic = /^[a-zA-Z0-9\s]{0,30}$/
let regExpMessage = /^[\w\s,.!¡¿?-]{0,250}$/


document.addEventListener('keyup', e => {
    // ipt name
    if(e.target === $form.name){
        let nameValue = e.target.value
        let nameVerif = regExpName.test(nameValue)
        
        if (nameVerif) {
            e.target.classList.remove('input-invalid')
            e.target.nextElementSibling.classList.remove('label-invalid')
        } else {
            e.target.classList.add('input-invalid')
            e.target.nextElementSibling.classList.add('label-invalid')
        }
    }

    // ipt surname
    if(e.target === $form.surname){
        let surnameValue = e.target.value
        let surnameVerif = regExpSurname.test(surnameValue)
        
        if (surnameVerif) {
            e.target.classList.remove('input-invalid')
            e.target.nextElementSibling.classList.remove('label-invalid')
        } else {
            e.target.classList.add('input-invalid')
            e.target.nextElementSibling.classList.add('label-invalid')
        }
    }

    // ipt email
    if(e.target === $form.email){
        let emailValue = e.target.value
        let emailVerif = regExpEmail.test(emailValue)
        
        if (emailVerif) {
            e.target.classList.remove('input-invalid')
            e.target.nextElementSibling.classList.remove('label-invalid')
        } else {
            e.target.classList.add('input-invalid')
            e.target.nextElementSibling.classList.add('label-invalid')
        }
    }

    // ipt topic
    if(e.target === $form.topic){
        let topicValue = e.target.value
        let topicVerif = regExpTopic.test(topicValue)
        
        if (topicVerif) {
            e.target.classList.remove('input-invalid')
            e.target.nextElementSibling.classList.remove('label-invalid')
        } else {
            e.target.classList.add('input-invalid')
            e.target.nextElementSibling.classList.add('label-invalid')
        }
    }

    // ipt message
    if(e.target === $form.message){
        let messageValue = e.target.value
        let messageVerif = regExpMessage.test(messageValue)
        
        if (messageVerif) {
            e.target.classList.remove('msg-invalid')
        } else {
            e.target.classList.add('msg-invalid')
        }
    }

})



let $loader = `<img id="loader" src="assets/Rolling-1s-200px.svg" alt="loader">`

document.addEventListener('submit', e => {
    if(e.target === $form) {
        e.preventDefault()
        if(($form.name || $form.surname || $form.email || $form.topic).classList.contains('input-invalid') || ($form.message).classList.contains('msg-invalid')) {
            alert('Make sure the inputs are completed or correct and resend')
        } else {
            // submit form data
            $form.querySelector('#btnForm').style.cursor = 'wait'
            $form.querySelector('#btnForm').textContent = 'Enviando datos...'
            $form.querySelector('#btnForm').disabled = true

            $form.querySelector('#btnForm').insertAdjacentHTML('beforeend', $loader)


            fetch('https://formsubmit.co/ajax/guidopasto05@gmail.com', {
                method: 'POST',
                body: new FormData(e.target)
            })
            .then(() => {
                $form.querySelector('#btnForm').style.cursor = 'pointer'
                $form.querySelector('#btnForm').textContent = 'Enviar'
                $form.querySelector('#btnForm').disabled = false

                $form.querySelector('#btnForm').innerHTML = `Enviar`
                e.target.reset()

                // show modal
                $('#modalEmailSent').classList.replace('d-none', 'modal-email')
                // show bg close modal
                $('#bg-close-menu').classList.replace('bg-hidden', 'bg-show')
            })
        }
    }
})