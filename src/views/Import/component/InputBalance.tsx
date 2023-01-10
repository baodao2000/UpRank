import { Box, useModal, Card } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useTranslation } from '@pancakeswap/localization'
import ImportInput from 'components/InputBalance'
import ImportHeader from './ImportHeader'
import ImportButton from './ImportButton'
import ImportModal from './ImportModal'

const WrapperCard = styled(Card)`
  width: 100%;
  height: auto;
  margin-bottom: 40px;
  padding: 12px;
  overflow: unset;

  &:last-child {
    margin-bottom: 0;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    width: 448px;
    margin-bottom: 82px;
  }
`

const InputBalance: React.FC<React.PropsWithChildren<{ title: string; textButton: string }>> = ({
  title,
  textButton,
}) => {
  const { t } = useTranslation()

  const [onPresentCurrencyModal] = useModal(<ImportModal status="Success" link="gooogle.com" />)

  return (
    <WrapperCard>
      <ImportHeader title={title} />
      <ImportInput />
      <Box mt="4rem">
        <ImportButton onClick={onPresentCurrencyModal}>{textButton}</ImportButton>
      </Box>
    </WrapperCard>
  )
}

export default InputBalance
