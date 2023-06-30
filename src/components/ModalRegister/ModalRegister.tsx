import { useEffect, useState } from 'react'
import { getContract } from 'utils/contractHelpers'
import addresses from 'config/constants/contracts'
import refferalAbi from 'config/abi/refferal.json'
import { useModal } from '@pancakeswap/uikit'
import { useNetwork, useSigner } from 'wagmi'
import { WrongNetworkModal } from 'components/NetworkModal/WrongNetworkModal'
import { atom, useAtom } from 'jotai'
import { ModalCheckRegister } from './ModalCheckRegister'
import { useWeb3React } from '../../../packages/wagmi/src/useWeb3React'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { ModalVote } from 'components/VoteModal/ModalVote'

export const hideWrongNetworkModalAtom = atom(false)

export const ModalRegister = () => {
  const { chains, chain } = useNetwork()
  const { account, chainId } = useWeb3React()
  const { isWrongNetwork } = useActiveWeb3React()
  const [dismissWrongNetwork, setDismissWrongNetwork] = useAtom(hideWrongNetworkModalAtom)
  const CHAIN_ID = Number(process.env.NEXT_PUBLIC_DEFAULT_CHAIN)
  const currentChain = chains.find((c) => c.id === Number(process.env.NEXT_PUBLIC_DEFAULT_CHAIN))
  const { data: signer } = useSigner()
  const refferCT = getContract({ address: addresses.refferal[CHAIN_ID], abi: refferalAbi, chainId: CHAIN_ID, signer })
  const [vote, setVote] = useState(false)
  const [openModalVote, onDismissVote] = useModal(
    <ModalVote onDismiss={() => onDismiss} onVote={() => setVote(true)} />,
    true,
    false,
    'removeModalVote',
  )
  const [openModal, onDismiss] = useModal(
    <ModalCheckRegister onCheck={() => checkRegis()} onDismiss={() => onDismiss} />,
    true,
    false,
    'removeModalCheckRegister',
  )

  // console.log(currentChain, process.env.NEXT_PUBLIC_DEFAULT_CHAIN)
  const [openModalChange, onCloseNetwork] = useModal(
    <WrongNetworkModal currentChain={currentChain} onDismiss={() => setDismissWrongNetwork(true)} />,
    false,
    false,
    'ModalWrongNetwork',
  )
  const checkRegis = async () => {
    console.log(chainId, Number(process.env.NEXT_PUBLIC_DEFAULT_CHAIN))
    if (chainId != null && chainId === Number(process.env.NEXT_PUBLIC_DEFAULT_CHAIN)) {
      onCloseNetwork()
      if (!localStorage.getItem('isVote') && vote === false) {
        openModalVote()
      }
      if (account) {
        const a = await refferCT.isReferrer(account)
        if (!a && vote === true) {
          openModal()
        }
      }
    } else {
      openModalChange()
    }
  }
  useEffect(() => {
    // handleNotification()
    if (chain?.id) checkRegis()
  }, [account, chain, isWrongNetwork, vote, localStorage])
  return <></>
}
