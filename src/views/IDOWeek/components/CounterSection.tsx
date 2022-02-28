import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import { Text } from '@soy-libs/uikit2';

// function getDate(seconds) {
//     return Math.floor(seconds/(3600 * 24))
// }
function getHour(seconds) {
    return Math.floor(seconds/3600)
}

function getMin(seconds) {
    return Math.floor((seconds%3600)/60)
}

function getSec(seconds) {
    const h = getHour(seconds)
    const m = getMin(seconds)
    return seconds - h * 3600 - m * 60
}

function formatString(val: number) {
    if( val < 10 ) {
        return `0${val.toString()}`
    } 
    return val.toString()
}

const Counter = ({item, curRound, soyToSell, iteration, weekly}) => {
    const unlockTime = item === undefined? 0 : item
    const [diff, setDiff] = useState(0)

    useEffect(() => {
        let timer
        const timeCount = () => {

            timer = setInterval(() => {
                const current = Math.floor(Date.now() / 1000)
                if( unlockTime - current > 0) {
                    setDiff(unlockTime - current)
                } else {
                    setDiff(0)
                    clearInterval(timer)
                }
            }, 1000)
        }
        timeCount()
        return () => {
            clearInterval(timer)
        }
    }, [unlockTime])

    const datetime = `${formatString(getHour(diff))} : ${formatString(getMin(diff))} : ${formatString(getSec(diff))}`

    return (
        <Container>
            {weekly && <Text fontSize="24px">Weekly IDO is closed.</Text>}
            {!weekly && <Text fontSize="18px">{`Number of SOY for this round ${soyToSell.toFixed(2)} SOY.`}</Text>}
            {iteration !== 0 && !weekly && <Text fontSize="18px">{`Current Iteration : ${iteration}.`}</Text>}
            {!weekly && <Text fontSize="18px">{`Round ${curRound} of 26 ends in`}</Text>}
            {item !== undefined && !weekly && <Text fontSize="67px">{item === 0 || curRound === 0 ? '00:00:00' : datetime}</Text>}
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export default Counter
