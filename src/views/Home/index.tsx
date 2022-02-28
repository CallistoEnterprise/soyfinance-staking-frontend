import React from 'react'
import styled from 'styled-components'
// import { Text, BaseLayout } from '@soy-libs/uikit2'
// import PageSection from 'components/PageSection'
// import { useWeb3React } from '@web3-react/core'
// import useTheme from 'hooks/useTheme'
// import Container from 'components/Layout/Container'
// import { Assets } from 'assets/images'
// import EarnAPYCard from 'views/Home/components/EarnAPYCard'
// import EarnAssetCard from 'views/Home/components/EarnAssetCard'
// import CakeStats from 'views/Home/components/CakeStats'
// import TotalValueLockedCard from 'views/Home/components/TotalValueLockedCard'
// import { useTranslation } from 'contexts/Localization'
// import FarmStakingCard from 'views/Home/components/FarmStakingCard'

// import PmoonLPWorthCard from './components/PmoonLPWorthCard'
// import Hero from './components/Hero'
// import { swapSectionData, earnSectionData, cakeSectionData } from './components/SalesSection/data'
// import MetricsSection from './components/MetricsSection'
// import SalesSection from './components/SalesSection'
// import WinSection from './components/WinSection'
// import Footer from './components/Footer'
// import CakeDataRow from './components/CakeDataRow'
// import { WedgeTopLeft, InnerWedgeWrapper, OuterWedgeWrapper, WedgeTopRight } from './components/WedgeSvgs'
// import UserBanner from './components/UserBanner'
// import FarmAuctionsBanner from './components/FarmAuctionsBanner'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  padding-top: 100px;
  align-items: center;
  position: relative;
  width: 100%;
  height: calc(100vh - 64px);
`;

// const Hero1 = styled.div`
//   align-items: center;
//   display: flex;
//   justify-content: center;
//   flex-direction: column;
//   background-color: rgba(0,0,0,.5);
//   padding: 20px 0;
//   width: 100%;
// `
// const StyledHeroSection = styled(PageSection)`
//   padding-top: 16px;

//   ${({ theme }) => theme.mediaQueries.md} {
//     padding-top: 48px;
//   }
// `

// const UserBannerWrapper = styled(Container)`
//   z-index: 1;
//   position: absolute;
//   width: 100%;
//   top: 0px;
//   left: 50%;
//   transform: translate(-50%, 0);
//   padding-left: 0px;
//   padding-right: 0px;

//   ${({ theme }) => theme.mediaQueries.lg} {
//     padding-left: 24px;
//     padding-right: 24px;
//   }
// `

// const ImageCon = styled.div`
//   position: fixed;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   z-index: -1;
//   margin-top: 10%;
//   @media screen and (max-width: 768px) {
//     margin-top: 15%;
//   }
//   @media screen and (max-width: 568px) {
//     margin-top: 35%;
//   }
//   @media screen and (max-width: 430px) {
//     margin-top: 45%;
//   }
// `
// const ImgLogo = styled.img`
//   width: 300px;
//   @media screen and (max-width: 768px) {
//     width: 40%;
//   }
// `
// const ImgText = styled.img`
//   margin-top: 40px;
//   @media screen and (max-width: 768px) {
//     width: 80%;
//   }
// `
// const ImgText2 = styled.img`
//   width: 250px;
//   margin-top: 20px;
//   @media screen and (max-width: 768px) {
//     width: 50%;
//   }
// `

const Heading = styled.p`
  color: #9A6AFF;
  font-weight: 600;
  font-size: 64px;
  margin-bottom: 20px;
  @media screen and (max-width: 610px) {
    font-size: 44px;
  }
  @media screen and (max-width: 470px) {
    font-size: 34px;
  }
`

const Text = styled.p`
  color: #9A6AFF;
  font-weight: 400;
  font-size: 44px;
  margin-top: 20px;
  @media screen and (max-width: 610px) {
    font-size: 34px;
  }
  @media screen and (max-width: 470px) {
    font-size: 24px;
  }
`
// const StyledDiv = styled.div`
//   width: 100%;
//   padding: 30px 20%;
//   @media screen and (max-width: 460px) {
//     padding: 20px;
//   }
// `
// const Cards = styled(BaseLayout)`
//   align-items: stretch;
//   justify-content: stretch;
//   margin-bottom: 32px;

//   & > div {
//     grid-column: span 6;
//     width: 100%;
//   }

//   ${({ theme }) => theme.mediaQueries.sm} {
//     & > div {
//       grid-column: span 8;
//     }
//   }

//   ${({ theme }) => theme.mediaQueries.lg} {
//     & > div {
//       grid-column: span 6;
//     }
//   }
// `

// const CTACards = styled(BaseLayout)`
  
//   grid-template-columns: none;
//   display: flex;
//   align-items: start;
//   justify-content: center;
//   margin-bottom: 30px;

//   & > div {
//     grid-column: span 2;
//   }

//   ${({ theme }) => theme.mediaQueries.sm} {
//     & > div {
//       grid-column: span 1;
//     }
//   }

//   ${({ theme }) => theme.mediaQueries.lg} {
//     & > div {
//       grid-column: span 2;
//     }
//   }

//   @media screen and (max-width: 460px) {
//     flex-direction: column;
//   }
// `

const Home: React.FC = () => {
  // const { theme } = useTheme()
  // const { t } = useTranslation()

  // const { account } = useWeb3React()

  // const HomeSectionContainerStyles = { margin: '0', width: '100%', maxWidth: '968px' }

  return (
    <Wrapper>
      <Heading >
          SoyFinance
        </Heading>
        <Text>COMMING SOON!</Text>
      {/* <ImageCon>
        <ImgLogo src={Assets.logo} alt="logo" />
        <ImgText src={Assets.logoTxt} alt="logoText" />
        <ImgText2 src={Assets.logoTxt2} alt="logoText2" />
      </ImageCon>
      <Hero1>
        <Heading >
          {t('SoyFinance')}
        </Heading>
        <Text>{t('The #1 AMM and yield farm on Polygon Network.')}</Text>
      </Hero1>
      <StyledDiv> */}
        {/* <Cards>
          <FarmStakingCard />
        </Cards> */}
        {/* <CTACards>
          <EarnAPYCard />
          <EarnAssetCard />
        </CTACards>
        <Cards>
          <CakeStats />
          <div>
            <TotalValueLockedCard />
            <PmoonLPWorthCard />
          </div>
        </Cards>
      </StyledDiv> */}
    </Wrapper>
  )
}

export default Home
