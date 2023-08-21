import styled from 'styled-components'
import { Button, Heading, Text, LogoIcon } from '@pancakeswap/uikit'
import Page from 'components/Layout/Page'
import { useTranslation } from '@pancakeswap/localization'
import Link from 'next/link'

const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  justify-content: center;
  .title {
    background: var(--primary-primary-gradient-2, linear-gradient(180deg, #7B3FE4 0%, #A726C1 100%));
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
text-align: center;

/* Display xs/Bold */
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: 32px; /* 133.333% */
  }
  .label {
    color: var(--greyscale-grey-scale-text-seconday, #ADABB2);
text-align: center;
max-width: 352px;
width: 100%
/* Text lg/regular */
 font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: 28px; /* 155.556% */
  }
  .button {
    display: flex;
padding: 0px 16px;
flex-direction: column;
justify-content: center;
align-items: center;
gap: var(--spacing-8, 8px);
border-radius: var(--border-radius-lg, 8px);
background: var(--primary-primary-1, #8544F5);

/* light effect/boxShadow */
box-shadow: 2px 2px 8px 16px rgba(0, 0, 0, 0.10);
  }
`

const NotFound = ({ statusCode = 404 }: { statusCode?: number }) => {
  const { t } = useTranslation()

  return (
    <Page>
      <StyledNotFound>
        <img src="/images/V3/Error.svg" alt="" width="304px" style={{ marginBottom: 8 }} />
        {/* <Heading scale="xxl">{statusCode}</Heading> */}
        <Text className="title" mb="16px">
          {t('Page not found.')}
        </Text>
        <Text className="label" mb="16px">
          {t('We’re sorry, but the page you were looking for doesn’t exist.')}
        </Text>
        <Link href="/" passHref>
          <Button className="button" as="a" scale="sm">
            {t('Back Home')}
          </Button>
        </Link>
      </StyledNotFound>
    </Page>
  )
}

export default NotFound
