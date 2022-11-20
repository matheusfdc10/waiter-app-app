import styled from 'styled-components/native'
import { Platform, StatusBar } from 'react-native'

const isAndroind = Platform.OS === 'android'

export const Container = styled.SafeAreaView`
    margin-top: ${isAndroind? `${StatusBar.currentHeight}px` : '0'};
    flex: 1;
    background-color: #fafafa;
`
export const CategoriesContainer = styled.View`
    height: 73px;
    margin-top: 34px;
`

export const MenuContainer = styled.View`
    flex: 1;
`

export const Footer = styled.View`
    min-height: ${isAndroind? '80px' : '110px'};
    background-color: #fff;
    padding: 16px 24px;
`
export const FooterContainer = styled.SafeAreaView`
    
`

export const CenteredContainer = styled.View`
    align-items: center;
    justify-content: center;
    flex: 1;
`