import { Button, Modal, Text, Grid, InjectedModalProps, useToast, Input, Link } from '@pancakeswap/uikit'
import { InjectedProps } from '@pancakeswap/uikit/src/widgets/Modal/types'
import { useState } from 'react'
import styled from 'styled-components'

interface VoteModalProps extends InjectedProps {}

const StyledInput = styled(Input)`
  outline: none;
  border: 3px solid #009571;
  border-radius: 10px;
`

export const ModalVotes: React.FC<React.PropsWithChildren<VoteModalProps>> = ({ onDismiss }) => {
  return (
    <Modal title="Notification" width={350} onDismiss={onDismiss}>
      <div style={{ background: '#27262c' }}>
        <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'center' }}>
          {/* <Image src="/images/logo-mobile.png" alt="" width="50px" height="50px" /> */}
        </div>
        <Grid alignItems="center" justifyContent="center" mt="20px">
          <h1 style={{ color: '#816bf2', fontWeight: 600, fontSize: '25px', textAlign: 'center' }}>
            Voting for release $TREND token
          </h1>
        </Grid>
        <div style={{ display: 'flex', marginTop: '10px', justifyContent: 'center', alignItems: 'center' }}>
          <Link href="/vote">
            {/* <Button height="40px" onClick={handleOk}>
          Do it!
        </Button> */}
          </Link>
        </div>
      </div>
    </Modal>
  )
}
