const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


const addBox = document.querySelector('.add-box')
const popupBox = document.querySelector('.popup-box')
const closePopupBox = document.querySelector('.uil-times')
const titleWork = document.querySelector('header p')
const buttonForm = document.querySelector('form button')
const titleForm = document.querySelector('input')
const textareaForm = document.querySelector('textarea')
const wrapperUls = document.querySelector('.wrapper')


let listNotes = []
let flagNote = true
let idNote = -1

// let noteDeatails = {
//     title: '',
//     description: '',
//     year: 0,
//     months: 0,
//     day: 0,
//     nameDay: ''
// }

if (JSON.parse(localStorage.getItem('Note'))) {
    listNotes = JSON.parse(localStorage.getItem('Note'))
    creatNoteElem()
}

// document.addEventListener('click', (event) => {

//     let check = event.target.closest('.settings')

//     if (check) {
//         console.log(check)
//         check.classList.remove('show')
//     } else {

//     }
// })

addBox.addEventListener('click', () => {
    popupBox.classList.add('show')
    titleWork.innerHTML = 'Add a new Note'
    buttonForm.innerHTML = 'Add Note'
})

closePopupBox.addEventListener('click', () => {
    popupBox.classList.remove('show')
    titleForm.value = ''
    textareaForm.value = ''
    flagNote = true
})

buttonForm.addEventListener('click', () => {
    clickButton()
})

function clickButton() {

    let day = new Date()

    if (flagNote) {
        let noteDeatails = {
            id: Math.round(Math.random() * 1000),
            title: titleForm.value,
            description: textareaForm.value,
            year: day.getFullYear(),
            nameMonth: months[day.getMonth()],
            day: day.getDate(),
            nameDay: days[day.getDay()]
        }


        // noteDeatails.title = titleForm.value
        // noteDeatails.description = textareaForm.value
        // noteDeatails.year = day.getFullYear()
        // noteDeatails.nameMonth = months[day.getMonth()]
        // noteDeatails.day = day.getDate()
        // noteDeatails.nameDay = days[day.getDay()]

        listNotes.push(noteDeatails)
    } else {
        flagNote = true
        listNotes.forEach((item) => {
            if (item.id === idNote) {
                item.title = titleForm.value
                item.description = textareaForm.value
            }
        })
    }

    popupBox.classList.remove('show')
    titleForm.value = ''
    textareaForm.value = ''
    creatNoteElem()
    localStorages()
}


function creatNoteElem() {

    let removeNoteElem = document.querySelectorAll('.note')
    removeNoteElem.forEach((elem) => {
        elem.remove()
    })

    listNotes.forEach((item) => {
        let noteElem = `
        <li class="note">
            <div class="details">
                <p>${item.title}</p>
                <span>${item.description}</span>
            </div>
            <div class="bottom-content">
                <span>${item.nameMonth} ${item.day}, ${item.year} (${item.nameDay})</span>
                <div class="settings">
                    <i class="uil uil-ellipsis-h" onclick="showMenu(this)"></i>
                    <ul class="menu">
                        <li onclick="updateNote(${item.id}, this)">
                            <i class="uil uil-pen"></i>Edit
                        </li>
                        <li onclick="removeNote(${item.id})">
                            <i class="uil uil-trash"></i>Delete
                        </li>
                    </ul>
                </div>
            </div>
        </li>
        `
        wrapperUls.insertAdjacentHTML('beforeend', noteElem)
    })

}

function showMenu(elem) {
    elem.parentElement.classList.add('show')

    const controller = new AbortController();
    const { signal } = controller;
    document.addEventListener('click', ali = event => {

        let check = event.target.closest('.settings') //************************************************
        // console.log(check, elem.parentElement, event.target)


        if (check != elem.parentElement) {
            elem.parentElement.classList.remove('show')
            controller.abort()
        }

    }, { signal })
}

function updateNote(idNotes, elem) {

    elem.parentElement.parentElement.classList.remove('show')

    popupBox.classList.add('show')
    titleWork.innerHTML = 'Update a Note'
    buttonForm.innerHTML = 'Update Note'

    idNote = idNotes

    flagNote = false
}

function removeNote(id) {
    listNotes = listNotes.filter(item => item.id != id)

    creatNoteElem()
    localStorages()
}

function localStorages() {
    localStorage.setItem('Note', JSON.stringify(listNotes))
}