import { Link, useNavigate } from 'react-router-dom'


export default function AboutPage() {

    const navigate = useNavigate()
    function goToTransactions() {
        navigate('/transactions?from=about')
    }
    function backTolastPages() {
        navigate(-1)
    }

  return (
    <div>
        <h2>Учет доходов и расходов</h2>
        <p>Это простое учебное приложение, написанное на классическом REACT, без типизации. Цель создания - научиться работать с новыми инструментами и закрепить знание о тех, которые уже знакомы. В процессе разработки были использованы:</p>
        <ul className='ulAboutPage'>
            <li className='liAboutPage'>React (Castoms Hooks, useEffect, useState, useRef, useContext, useMemo, Router, useNavigate, NavLink, JSX)</li>
            <li className='liAboutPage'>JS (fetch, async, await, setTimeout, function, Object, array)</li>
            <li className='liAboutPage'>CSS</li>
            <li className='liAboutPage'>HTML</li>
        </ul>
        <div className='aboutPageButtons'>
            <button onClick={backTolastPages}>Назад</button>
            <Link to="/" className='buttonHomePage'>На главную</Link>
            <button onClick={goToTransactions}>К транзакциям</button>
        </div>
    </div>
  )
}
