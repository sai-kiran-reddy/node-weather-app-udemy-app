

const weatherform = document.querySelector('form');
const inputValue = document.querySelector('input');
const p1 = document.querySelector('#message-1');
const p2 = document.querySelector('#message-1');


weatherform.addEventListener('submit',(event) => {
    p1.textContent = 'loading .....'
    event.preventDefault();
    if(inputValue.value)
    {
    fetch(`/weather?address=${inputValue.value}`).then((response) => {
    response.json().then((data) => {
        if(data.message)
        {
            p2.textContent = data.message;
            console.log(data.message)
        }
        else{
            p1.textContent=data.forecastdata +" address :" + data.address;
        }

    })
})
    }
    else{
        p2.textContent = 'please enter the value';
    }
})