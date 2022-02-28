import React from 'react';
import styled from 'styled-components'
import { Text } from '@soy-libs/uikit2'
import { AutoColumn } from 'components/Layout/Column'
import { AutoRow } from 'components/Layout/Row'

const BidderStatus = ({item, prevSoyPrice}) => {
    const d = new Date(item.unlockDate)
    const dd = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()
    const mm = d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1
    const date = item.unlockDate === 0 ? '--/--/--' : `${dd}/${mm}/${d.getFullYear()}`
    const bonus = (0.5 * item.soyAmount).toFixed(2)

    return (
        <Container>
            <AutoColumn>
                <AutoRow justify="space-between" >
                    <AutoColumn justify="space-between">
                        <Text fontSize="14px">{item.id}</Text>
                        <Text fontSize="24px" mt="5px" color="primary">{item.unlockDate === 0 ? '-' : item.soyAmount.toFixed(2)} SOY</Text>
                        <Text fontSize="12px" mt="-5px" color="primary">Bonus: {bonus} SOY</Text>
                    </AutoColumn>
                    <Line />
                    <AutoColumn justify="space-between">
                        <Text fontSize="14px">Price</Text>
                        <Text fontSize="14px" mt="5px">Unlocked on:</Text>
                    </AutoColumn>
                    <AutoColumn justify="space-between">
                        <Text fontSize="14px" textAlign="end">{item.unlockDate === 0 ? '-' : prevSoyPrice.toFixed(6)} CLO</Text>
                        <Text fontSize="14px" mt="5px" textAlign="end">{date}</Text>
                    </AutoColumn>
                </AutoRow>
            </AutoColumn>
        </Container>
    )
}

const Container = styled.div`
    border-radius: 16px;
    padding: 16px;
    background-color: ${({ theme }) => theme.colors.input};
    box-shadow: ${({ theme }) => theme.shadows.inset};
    margin: 10px 0;
`
const Line = styled.div`
    width: 2px;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.primary};
`
export default BidderStatus
