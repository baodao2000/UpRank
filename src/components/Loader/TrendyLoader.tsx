import styled from 'styled-components'
import Page from '../Layout/Page'

const Wrapper = styled(Page)`
  position: fixed;
  left: 0;
  right: 0;
  background-color: var(--white-color);
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media screen and (max-width: 767px) {
    .loader {
      height: 8em;
      width: 8em;
    }
  }

  @media screen and (max-width: 500px) {
    .loader {
      height: 7em;
      width: 7em;
    }
    .text-loading .letter-loading {
      font-size: 40px;
      letter-spacing: 10px;
    }
  }
`
const LoaderContainer = styled.div`
  position: absolute;
  z-index: 100;
`
const Loader = styled.div`
  border: 3px solid #fff;
  border-top-color: #1fc7d4;
  border-radius: 50%;
  height: 150px;
  margin: 0 auto 45px auto;
  width: 150px;
  -webkit-animation: spin 1s linear infinite; /* Safari */
  animation: spin 1s linear infinite;
  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
const TextLoading = styled.div`
  text-align: center;
  user-select: none;
  @keyframes letters-loading {
    0%,
    75%,
    100% {
      opacity: 0;
      transform: rotateY(-90deg);
    }

    25%,
    50% {
      opacity: 1;
      transform: rotateY(0deg);
    }
  }
  & .letter-loading {
    color: #fff;
    font-weight: 700;
    letter-spacing: 8px;
    display: inline-block;
    position: relative;
    font-size: 70px;
    line-height: 70px;
    text-transform: uppercase;
  }
  & .letter-loading::before {
    animation: letters-loading 6s infinite;
    content: attr(data-text-preloader);
    left: 0;
    opacity: 0;
    top: 0;
    position: absolute;
    color: #1fc7d4;
  }
  & .letter-loading:nth-child(2)::before {
    animation-delay: 0.2s;
  }

  & .letter-loading:nth-child(3)::before {
    animation-delay: 0.4s;
  }

  & .letter-loading:nth-child(4)::before {
    animation-delay: 0.6s;
  }

  & .letter-loading:nth-child(5)::before {
    animation-delay: 0.8s;
  }
`
const PageLoader: React.FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <Wrapper>
      <LoaderContainer>
        <Loader className="loader" />
        <TextLoading className="text-loading">
          <span data-text-preloader="M" className="letter-loading">
            M
          </span>
          <span data-text-preloader="Y" className="letter-loading">
            Y
          </span>
          <span data-text-preloader="G" className="letter-loading">
            G
          </span>
          <span data-text-preloader="A" className="letter-loading">
            A
          </span>
          <span data-text-preloader="M" className="letter-loading">
            M
          </span>
          <span data-text-preloader="E" className="letter-loading">
            E
          </span>
          <span data-text-preloader="R" className="letter-loading">
            R
          </span>
        </TextLoading>
      </LoaderContainer>
    </Wrapper>
  )
}

export default PageLoader
