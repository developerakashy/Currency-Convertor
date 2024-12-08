import { useEffect, useRef, useState } from 'react'
import './index.css'
import InputBox from './components/InputBox'
import useCurrencyInfo from './hooks/useCurrencyInfo'

function App() {
  const [amount, setAmount] = useState(1)
  const [from, setFrom] = useState('usd')
  const [to, setTo] = useState('inr')
  const [exchangeRate, setExchangeRate] = useState(0)

  const [currencyInfo, countryNames] = useCurrencyInfo(from)
  const options = Object.entries(countryNames)


  const switchCurrency = () => {
    setFrom(to)
    setTo(from)
  }

  useEffect(() => {
    setExchangeRate(currencyInfo[to])

  }, [currencyInfo,to])


  return (
    <>
      <InputBox
      amount={amount}
      onAmountChange={(amount) => setAmount(amount)}
      currency={from}
      onCurrencyChange={(currency) => setFrom(currency)}
      currencyOptions={options}
      currencyConverted={to}
      exchangeRate={exchangeRate}
      classname='pt-5 pb-16'
      />

      <div className='flex justify-center items-center absolute left-0 right-0 top-1/2 bottom-1/2'>
        <button onClick={switchCurrency} className='rounded-full bg-blue-500 cursor-pointer'>
          <svg className='h-5 w-5 fill-white m-5' xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path d="M11.618,18.117l.707,.707-4.717,4.717c-.296,.296-.689,.459-1.107,.459h0c-.418,0-.812-.163-1.107-.459L.676,18.824l.707-.707,4.617,4.616V0h1V22.735l4.618-4.618ZM23.324,5.176L18.606,.459c-.589-.591-1.623-.593-2.214,0l-4.717,4.717,.707,.707L17,1.266V24h1V1.267l4.617,4.616,.707-.707Z"/></svg>
        </button>
      </div>

      <InputBox
        amount={(exchangeRate * amount)?.toFixed(2)}
        amountDisabled={true}
        currency={to}
        onCurrencyChange={(currency) => setTo(currency)}
        currencyOptions={options}
        currencyConverted={from}
        exchangeRate={(1 / exchangeRate)}
        classname='pb-5 pt-16'
      />
    </>
  )
}

export default App
