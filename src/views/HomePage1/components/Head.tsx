import { Button, Flex, useModal } from '@pancakeswap/uikit'
import styled from 'styled-components'
import images from 'configs/images'
import 'aos/dist/aos.css'
// import {VoteModal }from '../../../components/VoteModal'
// import { ModalVotes } from 'components/VoteModal/Votemodal'
import { ModalRegister } from 'components/ModalRegister'

const Head = styled(Flex)`
  padding-top: 24px;
  position: relative;
  z-index: 1;
  width: 100%;
  display: flex;
  * {
    font-family: Inter, sans-serif;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    padding: 100px 0;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  img {
    width: 100%;
    height: auto;
  }
`

const ContentHead = styled.div`
  width: 100%;
  max-width: 696px;
  z-index: 1;
  padding-top: 50px;

  ${({ theme }) => theme.mediaQueries.md} {
    max-width: 696px;
  }

p {
  width: 696px;
  
    margin-bottom: 20px;
      .p1 {
        font-size: 60px;
        font-style: normal;
        font-weight: 400;
        line-height: 72px;
        letter-spacing: -1.2px;
        letter-spacing: 0.001em;
        color: rgba(133, 68, 245, 1);
      }
      .p2 {
        font-size: 60px;
    font-weight: 700;
    line-height: 72px;
    letter-spacing: -1.2px;
    letter-spacing: 0.001em;
    background: var(--primary-primary-gradient-2, linear-gradient(180deg, #7B3FE4 0%, #A726C1 100%));
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
      }
    }
}

`
const ContentHeadRight = styled.div`
  width: 100%;
  z-index: 1;
  h5 {
    font-weight: 700;
    font-size: 20px;
    line-height: 25px;
    text-align: center;
    letter-spacing: 0.001em;
    text-transform: uppercase;
    color: #816bf2;
    text-align: center;
    margin: 20px;
    word-wrap: break-word;
    display: block;
    ${({ theme }) => theme.mediaQueries.xs} {
      display: none;
    }
    ${({ theme }) => theme.mediaQueries.sm} {
      display: none;
    }
    ${({ theme }) => theme.mediaQueries.md} {
      font-size: 30px;
      line-height: 36px;
      text-align: start;
      margin-bottom: 0;
      display: block;
    }
    ${({ theme }) => theme.mediaQueries.xl} {
      font-size: 20px;
      line-height: 25px;
      text-align: center;
      display: block;
    }
  }
`

const ImageHead = styled.img`
  width: 883px !important;
  height: 669px !important;
  ${({ theme }) => theme.mediaQueries.md} {
    display: block;
  }
`

const ImageShowMb = styled.img`
  width: 80% !important;
  display: block;
  max-width: 715px;
  margin: 0 auto;

  ${({ theme }) => theme.mediaQueries.md} {
    display: none;
  }
`
const H5ShowMb = styled.h5`
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  text-align: center;
  letter-spacing: 0.001em;
  text-align: left;
  margin: 20px 0;
  word-wrap: break-word;
  margin-bottom: 70px;
  span {
    color: rgba(173, 171, 178, 1);
  }
`

const LinkToDownload = styled.div`
  margin-top: 40px;
  text-align: center;

  span {
    color: #393939;
    font-weight: 500;
    font-size: 16px;
    line-height: 40px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 50px;
    padding: 0;
  }
`

const ListImgButton = styled.div`
  gap: 2%;
  row-gap: 30px;
  display: none;
  flex-direction: row;

  a {
    border: 1px solid #a6a6a6;
    border-radius: 7px;
  }

  img {
    border-radius: 7px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    display: flex;
  }
`

const ListImgButtonMb = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  margin-bottom: 25px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 14%;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 0 20%;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    display: none;
  }
`
const Staking = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  p {
    color: rgba(131, 131, 145, 1);
    font-size: 14px;
    font-style: italic;
    font-weight: 400;
    line-height: 20px;
    margin-bottom: 0px;
    span {
      color: #8544f5;
    }
  }
`
const ButtonStaking = styled(Button)`
  border-radius: var(--border-radius-lg, 8px);
  background: var(--primary-primary-1, #8544f5);
  box-shadow: 2px 2px 8px 16px rgba(0, 0, 0, 0.1);
  color: white;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  width: 130px;
  padding: 16px;
`

const HeadHome = (isModalOpen) => {
  return (
    <Head>
      {/* <VoteModal /> */}
      <ContentHead>
        <p>
          <span className="p1">TrendyDefi is an open network for</span>
          <span className="p2"> storing </span>
          <span className="p1">and </span> <span className="p2">moving money</span>
        </p>

        <H5ShowMb>
          <span>Own your own data. Earn passive income with crypto.</span>
        </H5ShowMb>
        <Staking>
          <ButtonStaking>Staking Now</ButtonStaking>
          <div>
            <p>*Start staking now to maximize your earnings!</p>
            <p>
              Stake Matic, you can earn an APR of<span> 85.1%</span> up to<span> 127.75%</span>{' '}
            </p>
          </div>
        </Staking>
        {/* <LinkToDownload>
          <ListImgButton>
            <a href="">
              <img src={images.downloadIOS} alt="" />
            </a>
            <a href="">
              <img src={images.downloadPlay} alt="" />
            </a>
            <a href="">
              <img src={images.downloadAPK} alt="" />
            </a>
          </ListImgButton>
          <ListImgButtonMb data-aos="fade-up-left">
            <a href="">
              <img src={images.apple} alt="" />
            </a>
            <a href="">
              <img src={images.chPlay} alt="" />
            </a>
            <a href="">
              <img src={images.android} alt="" />
            </a>
          </ListImgButtonMb>
        </LinkToDownload> */}
      </ContentHead>
      <ContentHeadRight>
        <ImageHead src={images.Illustrations} alt="" />
      </ContentHeadRight>
    </Head>
  )
}

export default HeadHome
