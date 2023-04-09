import { Flex } from '@pancakeswap/uikit'
import styled from 'styled-components'
import images from 'configs/images'
import 'aos/dist/aos.css'

const Head = styled(Flex)`
  padding-top: 24px;
  position: relative;
  z-index: 1;
  width: 100%;
  flex-direction: column;

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
  z-index: 1;

  ${({ theme }) => theme.mediaQueries.md} {
    max-width: 55%;
  }

  h2 {
    font-weight: 700;
    font-size: 20px;
    line-height: 25px;
    text-align: center;
    letter-spacing: 0.001em;
    text-transform: uppercase;
    color: #816bf2;
    text-align: center;
    margin-bottom: 20px;
    word-wrap: break-word;

    ${({ theme }) => theme.mediaQueries.md} {
      font-size: 30px;
      line-height: 36px;
      text-align: start;
      margin-bottom: 0;
    }
    ${({ theme }) => theme.mediaQueries.xl} {
      font-size: 50px;
      line-height: 58px;
      text-align: start;
    }
  }

  p {
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #d9d1ff;
    display: none;

    ${({ theme }) => theme.mediaQueries.md} {
      font-size: 20px;
      line-height: 26px;
      display: block;
    }
  }
`
const ContentHeadRight = styled.div`
  width: 100%;
  z-index: 1;

  ${({ theme }) => theme.mediaQueries.md} {
    max-width: 55%;
  }

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
  width: 45% !important;
  display: none;
  max-width: 515px;
  margin: 0 auto;
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

  ${({ theme }) => theme.mediaQueries.md} {
    display: none;
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

const HeadHome = () => {
  return (
    <Head>
      <ContentHead data-aos="fade-up-right">
        <h2>
          Trendy Defi<br></br> is an open network for <br></br>storing and moving money
        </h2>
        <p>Own your own data. Earn passive income with crypto.</p>
        <H5ShowMb>
          Stake Matic, you can earn an ARP of <span style={{ color: 'green' }}>85.1%</span> up to{' '}
          <span style={{ color: 'green' }}>127.75%</span>. Start staking now to maximize your earnings!
        </H5ShowMb>
        <ImageShowMb data-aos="fade-up-left" src={images.coinHead} alt="" />
        <LinkToDownload>
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
        </LinkToDownload>
      </ContentHead>
      <ContentHeadRight data-aos="fade-up-right">
        <ImageHead data-aos="fade-up-left" src={images.coinHead} alt="" />
        <h5>
          Stake Matic, you can earn an ARP of <span style={{ color: 'green' }}>85.1%</span> up to{' '}
          <span style={{ color: 'green' }}>127.75%</span>. Start staking now to maximize your earnings!
        </h5>
      </ContentHeadRight>
    </Head>
  )
}

export default HeadHome
