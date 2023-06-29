import { Button, Text, Grid, Input } from '@pancakeswap/uikit'
import { useState, useEffect } from 'react'
import { InjectedProps } from '@pancakeswap/uikit/src/widgets/Modal/types'
import styled from 'styled-components'
import Link from 'next/link'
import { Modal } from 'antd'
import Image from 'next/image'

const StyledInput = styled(Input)`
  outline: none;
  border: 3px solid #009571;
  border-radius: 10px;
`
export const ModalVote = () => {
  const [isModalOpen, setIsModalOpen] = useState(localStorage.getItem('isVote') === 'voted' ? false : true)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const handleCancel = () => {
    localStorage.setItem('isVote', 'voted')
    setIsModalOpen(false)
  }
  const handleOk = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setOpen(false)
    }, 3000)
  }
  return (
    <Modal
      title={false}
      open={isModalOpen}
      onCancel={handleCancel}
      centered
      closable={false}
      width={350}
      footer={null}
      bodyStyle={{
        borderBottomWidth: '0 ',
        background: '#27262c',
        height: '300px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center',
        }}
      >
        <h1 style={{ color: 'white', fontWeight: 600, fontSize: '20px' }}>Notification</h1>
        <div onClick={handleCancel} style={{ color: '#009571', cursor: 'pointer', fontWeight: 600, fontSize: '15px' }}>
          x
        </div>
      </div>
      <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'center' }}>
        <Image src="/images/logo-mobile.png" alt="" width="50px" height="50px" />
      </div>
      <Grid alignItems="center" justifyContent="center" mt="20px">
        <h1 style={{ color: '#816bf2', fontWeight: 600, fontSize: '25px', textAlign: 'center' }}>
          Voting for release $TREND token
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

export default ModalVote
