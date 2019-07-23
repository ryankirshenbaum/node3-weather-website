const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchLocation = search.value

    messageOne.textContent = "Loading..."
    messageOne.textContent = ''

    fetch('/weather?address=' + searchLocation).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
            return
        } else {
            messageOne.textContent = data.locationDescription
            messageTwo.textContent = data.forecast.dailyForecast
        }
    })
})
})
