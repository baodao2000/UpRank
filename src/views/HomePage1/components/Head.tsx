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
    padding: 118px 0;
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
    max-width: 50%;
  }

  h2 {
    font-weight: 700;
    font-size: 24px;
    line-height: 25px;
    text-align: center;
    letter-spacing: 0.001em;
    text-transform: uppercase;
    color: #816bf2;
    text-align: center;
    margin-bottom: 20px;
    word-wrap: break-word;

    ${({ theme }) => theme.mediaQueries.md} {
      font-size: 40px;
      line-height: 46px;
      text-align: start;
      margin-bottom: 0;
    }
    ${({ theme }) => theme.mediaQueries.xl} {
      font-size: 64px;
      line-height: 60px;
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

const ImageHead = styled.img`
  width: 100%;
  display: none;
  max-width: 715px;
  margin: 0 auto;

  ${({ theme }) => theme.mediaQueries.md} {
    display: block;
  }
`

const ImageShowMb = styled.img`
  width: 100%;
  display: block;
  max-width: 715px;
  margin: 0 auto;

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
  width: 80%;
  margin-left: auto;
  margin-right: auto;

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    display: none;
  }
`

const HeadHome = () => {
  return (
    <Head>
      <ContentHead data-aos="fade-up-right">
        <h2>Buy & Sell Cryptocurrency in minutes.</h2>
        <p>Join now on the largest cryptocurrency exchange in the world.</p>
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
          <ListImgButtonMb>
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
      <div>
        <ImageHead data-aos="fade-up-left" src={images.coinHead} alt="" />
      </div>
    </Head>
  )
}

export default HeadHome
