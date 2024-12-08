import React from "react";

function InputBox({
    amount,
    onAmountChange,
    amountDisabled = false,
    currency = 'USD',
    onCurrencyChange,
    currencyOptions,
    currencyConverted,
    exchangeRate,
    classname

}){


    const handleAmountChangeRequest = (e) => {
        let value = Number(e.target.value)

        if(e.target.value === ''){
            onAmountChange('')
            return
        }

        if(!isNaN(value) && onAmountChange){
            onAmountChange(value)

        }

    }

    return (
        <div className={`z-2 bg-black w-full flex flex-col justify-center items-center ${classname} ${amountDisabled ? 'border-t border-zinc-600' : ''}`}>
        <div className="relative">
            <select className="py-2 pr-10 pl-2 bg-black text-xl rounded-lg border border-zinc-600 appearance-none outline-none"
            value={currency}
            onChange={(e) => onCurrencyChange(e.target.value)}
            >
                {currencyOptions.map(([code, name]) => <option className="" key={code} value={code}>{name}</option>)}
            </select>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="pointer-events-none h-full w-6 absolute top-0 right-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
            </svg>
        </div>

        <div className="text-center">
            <input className={`p-0 my-2 outline-none bg-black text-center w-5/6 sm:w-96 rounded-lg text-5xl font-bold remove-arrow ${amountDisabled ? '' : 'focus:outline-zinc-600'}`}
            type="number"
            value={amount}
            disabled={amountDisabled}
            onChange={(e) => handleAmountChangeRequest(e)}
            />
        </div>

        <div>
            <p className="text-xl text-gray-400">1 {currency.toUpperCase()}={exchangeRate?.toFixed(2)} {currencyConverted.toUpperCase()}</p>
        </div>
        </div>
    )
}

export default InputBox
