import React, { useEffect, useState } from "react";

const useCurrencyInfo = (currency) => {
    const [currencyData, setCurrencyData] = useState({})
    const [countryData, setCountryData] = useState({})

    
    useEffect(() => {

        const countryNames = new Promise(async (resolve, reject) => {
            try{
                const response = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json')

                if(!response.ok){
                    throw new Error(`Response status: ${response.status}`)
                }
                const data = await response.json()
                resolve(data)
            }
            catch(error){
                reject(error)
            }
        })

        const currencyRates = new Promise(async (resolve, reject) => {
            try{
                const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)

                if(!response.ok){
                    throw new Error(`Response status: ${response.status}`)
                }
                const data = await response.json()
                resolve(data)
            }
            catch(error){
                console.error(error)
                reject(error)
            }
        })

        Promise.all([countryNames, currencyRates]).then(([countryInfo, currencyInfo]) => {
            setCurrencyData(currencyInfo[currency])
            setCountryData(countryInfo)
        })



    }, [currency])


    return [currencyData, countryData]
}

export default useCurrencyInfo
