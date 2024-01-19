document.addEventListener('DOMContentLoaded', ()=>{
    var myHeaders = new Headers();
    myHeaders.append("apikey", api_key)
    
    var requestOptions = {
        method: "GET",
        redirect: "follow",
        headers: myHeaders
    }
    
    document.querySelector("form").onsubmit = function(){
        document.querySelector('p').innerHTML = ""
        document.querySelector('#result').style.height = "2rem"
        const from = document.querySelector("#from").value.toUpperCase()
        const to = document.querySelector("#to").value.toUpperCase()
        const amount = document.querySelector("#amount").value

    fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`, requestOptions)
    .then(response => response.json())
    .then(result => {
        document.querySelector('#result').style.height = "8rem"
        document.querySelector('p').innerHTML = `The coversion rate of <strong style="color:red">${from}</strong> to <strong style="color:red">${to}</strong> is <strong style="color:blue">${result.info.rate}</strong> and the coverted amount of <strong style="color:red">${amount}</strong> is <strong style="color:blue">${result.result}</strong>`;
        
        })
    .catch(error => 
        document.querySelector('p').innerHTML = `<strong style="color:red">Invalid currency</strong>`
    )
    return false
    }

    fetch("https://api.apilayer.com/exchangerates_data/symbols", requestOptions)
    .then(response => response.json())
    .then(result => {
        let options = ``
        for(let country in result.symbols){
            options += `<option value="${country}" >${country}: ${result.symbols[country]}</option>`
        }
        document.querySelector('datalist').innerHTML = options
        
    } )

    
})