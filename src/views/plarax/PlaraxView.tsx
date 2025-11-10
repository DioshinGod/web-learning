import { useEffect, useState } from "react"

import { WinPop } from "./popups/WinPop"
import { FailPop } from "./popups/FailPop"
import { Button } from "../../components/Button"
import { traerPalabraAleatoria } from "./services/traerPalabraAleatoria"

const arrInicial = ['']
const nFilas = 6
export const PlaraxView = () => {
    const [state, setState] = useState({
        arrayInicial: arrInicial,
        palabraCorrecta: '',
        celdas: arrInicial,
        aciertos: arrInicial,
        popup: ''
    })

    const { celdas, aciertos, popup, palabraCorrecta, arrayInicial } = state


    const ancho = palabraCorrecta.length
    const nLetrasNoVacios = celdas.filter((char) => char !== '').length
    const palabraCompletada = nLetrasNoVacios % ancho === 0
    const nCeldasVacias = celdas.filter((char) => char === '').length
    const nAciertosVacios = aciertos.filter((char) => char === '').length
    const estaRevisada = nAciertosVacios === nCeldasVacias
    const aciertoNoVacios = aciertos.filter(char => char !== '')
    const ultimos6NoVacios = aciertoNoVacios.slice(-ancho)
    const ganaste = ultimos6NoVacios.every(char => char === '💘') && (aciertoNoVacios.length > 0)
    const perdiste = aciertos.slice(-ancho).every(char => char !== '') && !ganaste

    // console.log({ nCeldasVacias, nAciertosVacios, estaRevisada, ultimos6NoVacios, ganaste, perdiste })

    // solo se llama la primera vez que se renderize
    useEffect(() => {
        traerPalabraAleatoria().then((palabra) => {
            const arrayInicial = Array(nFilas * palabra.length).fill('')
            setState((prev) => ({
                ...prev,
                palabraCorrecta: palabra,
                arrayInicial,
                celdas: arrayInicial,
                aciertos: arrayInicial
            }))
        })
    }, [])

    // escuchar teclado
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            console.log(event.key)
            const letra = event.key.toUpperCase()
            const esLetra = /^[a-zA-ZñÑ]$/.test(letra);
            if (esLetra && (nLetrasNoVacios === 0 || estaRevisada || !palabraCompletada) && !ganaste) {
                const index = celdas.findIndex((char) => char === '')

                const nuevasCeldas = [...celdas]
                nuevasCeldas[index] = letra
                setState((prev) => ({
                    ...prev,
                    celdas: nuevasCeldas
                }))
            }
            // si se presiona Borrar 
            if (event.key === 'Backspace' && nAciertosVacios > nCeldasVacias) {
                let index = celdas.findIndex((char) => char === '')
                if (index === 0) return
                if (index === -1) index = celdas.length
                const nuevasCeldas = [...celdas]
                nuevasCeldas[index - 1] = ''
                setState((prev) => ({
                    ...prev,
                    celdas: nuevasCeldas
                }))

            }
            // revisar cuando la palabra este completa
            if (event.key === 'Enter' && nLetrasNoVacios > 0 && palabraCompletada) {
                console.log('hhh')
                revisarPalabra()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }

    }, [celdas.join(''), estaRevisada, palabraCorrecta])

    useEffect(() => {
        let popup = ''
        if (ganaste) popup = 'winpop'
        if (perdiste) popup = 'failpop'
        setState((prev) => ({
            ...prev,
            popup
        }))
    }, [ganaste, perdiste])

    const revisarPalabra = () => {
        const nuevosAciertos = [...aciertos]
        const pcArray = palabraCorrecta.split('')
        const letras = celdas.filter(c => c !== '')
        const nLetrasPrevias = letras.length - ancho
        const ultimos6 = letras.slice(-ancho)

        // revisar solo coincidencias exactas
        ultimos6.forEach((char, index) => {
            if (char === '') return
            const letraCorrecta = pcArray[index % ancho]

            if (char === letraCorrecta) {
                pcArray[index] = ''
                nuevosAciertos[index + nLetrasPrevias] = '💘'
            }
        })
        // revisar existencias
        ultimos6.forEach((char, index) => {
            if (char === '') return
            // evitar revisar si tiene coincidencias exactas
            if (nuevosAciertos[index + nLetrasPrevias] === '💘') return
            //si existe
            if (pcArray.includes(char)) {
                //buscar el indice del array 
                const i = pcArray.findIndex((letra) => char === letra)
                pcArray[i] = ''
                nuevosAciertos[index + nLetrasPrevias] = '💔'
            }
            else (
                nuevosAciertos[index + nLetrasPrevias] = '💜'
            )

        })

        setState((prev) => ({
            ...prev,
            aciertos: nuevosAciertos
        }))
    }
    const closePopup = () => {
        console.log("dsadfassx")
        setState((prev) => ({
            ...prev,
            popup: ''
        }))
    }

    const otraVez = () => {
        console.log("dsadfassx")
        setState((prev) => ({
            ...prev,
            celdas: arrayInicial,
            aciertos: arrayInicial,
            popup: ''
        }))
    }
    return (
        <div key={palabraCorrecta} className="dpF fdC aiC jcC g1em">
            <h1> Plarax</h1>
            <div className="dpG g0_25em"
                style={{ gridTemplateColumns: `repeat(${ancho},1fr)` }}>
                {celdas.map((letra, index) => <Celda key={index} letra={letra} acierto={aciertos[index]} />)}

            </div>
            {(ganaste || perdiste) && <Button text="Jugar de Nuevo" onClick={otraVez} />}
            {popup === 'winpop' && <WinPop onClose={closePopup} />}
            {popup === 'failpop' && <FailPop onClose={closePopup} palabraCorrecta={palabraCorrecta} />}
        </div>

    )
}
interface Props {
    letra: string
    acierto: string
}

const Celda = ({ letra, acierto }: Props) => {
    const bg = {
        '💘': 'bgGreen',
        '💔': 'bgYellow',
        '💜': 'bgGray'
    }[acierto] ?? ''
    return (

        <div className={`h2em w2em aiC jcC dpF bTexto coWhite fwB ${bg}`}>{letra}</div>
    )
}
