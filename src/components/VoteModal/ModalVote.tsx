import { Button, Modal, Text, Grid, InjectedModalProps, useToast, Input } from '@pancakeswap/uikit'
import { useState, useEffect } from 'react'
import { getContract } from 'utils/contractHelpers'
import addresses from 'config/constants/contracts'
import refferalAbi from 'config/abi/refferal.json'
import { useDispatch } from 'react-redux'
import { setRefLink } from 'state/referral'
import { useSigner } from 'wagmi'
import { InjectedProps } from '@pancakeswap/uikit/src/widgets/Modal/types'
import { useWeb3React } from '../../../packages/wagmi/src/useWeb3React'
import styled from 'styled-components'
import Link from 'next/link'
// import { Modal } from 'antd'
import Image from 'next/image'
interface RegistersModalProps extends InjectedProps {}

const StyledInput = styled(Input)`
  outline: none;
  border: 3px solid #009571;
  border-radius: 10px;
`

export const ModalVote = ({ onVote, onDismiss }: { onVote: () => void; onDismiss: () => void }) => {
  const [isModalOpen, setIsModalOpen] = useState(localStorage.getItem('isVote') === 'voted' ? false : true)
  const [loading, setLoading] = useState(false)

  const handleCancel = () => {
    onDismiss()
    localStorage.setItem('isVote', 'voted')
    setIsModalOpen(false)
    onVote()
  }

  const handleOk = () => {
    setLoading(true)
    setLoading(false)
    setIsModalOpen(false)
    localStorage.setItem('isVote', 'voted')
    // window.location'/vote'
    onDismiss()
    onVote()
  }
  return (
    <Modal title="Notification" onDismiss={handleCancel} style={{ width: '320px' }}>
      <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'center' }}>
        <Image src="/images/logo-mobile.png" alt="" width="50px" height="50px" />
      </div>
      <Grid alignItems="center" justifyContent="center" mt="20px">
        <h1 style={{ color: 'white', fontWeight: 600, fontSize: '16px', textAlign: 'center' }}>
          Voting for release $TREND token
        </h1>
        <h1
          style={{
            color: 'white',
            fontWeight: 600,
            fontSize: '18px',
            lineHeight: '24px',
            textAlign: 'center',
            margin: '20px 0',
          }}
        >
          Join now to get 1 $TREND airdrop, after realese
        </h1>
      </Grid>
      <div style={{ display: 'flex', marginTop: '10px', justifyContent: 'center', alignItems: 'center' }}>
        <Link href="/vote">
          <Button height="40px" onClick={handleOk}>
            Do it!
          </Button>
        </Link>
      </div>
    </Modal>
  )
}
