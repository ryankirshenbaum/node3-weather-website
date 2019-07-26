const weatherForm = document.querySelector('form')
const add = document.querySelector('button')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchLocation = search.value

    messageOne.textContent = "Loading..."
    messageTwo.textContent = ''

    fetch('/weather?address=' + searchLocation).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
            messageTwo.textContent = ''
            return
        } else {
            messageOne.textContent = data.locationDescription
            messageTwo.textContent = data.forecast.dailyForecast
        }
    })
})
})






