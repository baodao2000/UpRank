import { Button, Text, Grid, Input, Modal } from '@pancakeswap/uikit'
import { useState, useEffect } from 'react'
import { InjectedProps } from '@pancakeswap/uikit/src/widgets/Modal/types'
import styled from 'styled-components'
import Link from 'next/link'
// import { Modal } from 'antd'
import Image from 'next/image'
// import './index.css'
const StyledInput = styled(Input)`
  outline: none;
  border: 3px solid #009571;
  border-radius: 10px;
`
const Wraper = styled.div`
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
`
export const ModalVote = () => {
  const [isModalOpen, setIsModalOpen] = useState(localStorage.getItem('isVote') === 'voted' ? false : true)
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState('block')

  const handleCancel = () => {
    localStorage.setItem('isVote', 'voted')
    setIsModalOpen(false)
    setIsOpen('none')
  }
  const handleOk = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setIsModalOpen(false)
      localStorage.setItem('isVote', 'voted')

      setIsOpen('none')
      // window.location'/vote'
    }, 3000)
  }
  const checkLocal = () => {
    if (localStorage.getItem('isVote')) {
      setIsOpen('none')
    } else {
      setIsOpen('block')
    }
  }
  useEffect(() => {
    checkLocal()
  }, [])
  return (
    <Wraper>
      <Modal title="Notification" onDismiss={handleCancel} style={{ width: '320px' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
          }}
        >
          {/* <h1 style={{ color: 'white', fontWeight: 600, fontSize: '20px' }}>Notification</h1>
        <div onClick={handleCancel} style={{ color: '#009571', cursor: 'pointer', fontWeight: 600, fontSize: '15px' }}>
          x
        </div> */}
        </div>
        <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'center' }}>
          <Image src="/images/logo-mobile.png" alt="" width="50px" height="50px" />
        </div>
        <Grid alignItems="center" justifyContent="center" mt="20px">
          <h1 style={{ color: '#816bf2', fontWeight: 600, fontSize: '16px', textAlign: 'center' }}>
            Voting for release $TREND token
          </h1>
          <h1
            style={{
              color: '#816bf2',
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
    </Wraper>
  )
}

export default ModalVote
