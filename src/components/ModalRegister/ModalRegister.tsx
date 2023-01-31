import { useEffect } from 'react'
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

export const hideWrongNetworkModalAtom = atom(false)

export const ModalRegister = () => {
  const { chains, chain } = useNetwork()
  const { account, chainId } = useWeb3React()
  const { isWrongNetwork } = useActiveWeb3React()
  const [dismissWrongNetwork, setDismissWrongNetwork] = useAtom(hideWrongNetworkModalAtom)
  // const [isRef, setIsRef] = useState(false)
  // const CHAINID = chainId === undefined ? ChainId.BSC_TESTNET : chainId;
  const CHAIN_ID = Number(process.env.NEXT_PUBLIC_DEFAULT_CHAIN)
  const currentChain = chains.find((c) => c.id === Number(process.env.NEXT_PUBLIC_DEFAULT_CHAIN))
  const { data: signer } = useSigner()
  const refferCT = getContract({ address: addresses.refferal[CHAIN_ID], abi: refferalAbi, chainId: CHAIN_ID, signer })
  const [openModal, onDismiss] = useModal(<ModalCheckRegister />, true, false, 'removeModalCheckRegister')
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
      if (account) {
        const a = await refferCT.isReferrer(account)
        if (!a) {
          openModal()
        }
      }
    } else {
      openModalChange()
    }
  }

  useEffect(() => {
    if (chain?.id) checkRegis()
  }, [account, chain, isWrongNetwork])

  return <></>
}
