import { useMintTransaction } from '../hooks/interaction/useMintTransaction';
import { useCallback, FC, useState, useEffect } from 'react';
import { ActionButton } from './ActionButton';
import { BasicButton } from '../components/BasicButton';
import { ScTransactionCb } from '../hooks/interaction/useScTransaction';
import { useLoginInfo } from '../hooks/auth/useLoginInfo';
import { useAccount } from '../hooks/auth/useAccount';
import { LoginMethodsEnum } from '../types/enums';
// import { Ninjas } from '../components/lambo';
// import axios from 'axios';

import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Box,
} from '@chakra-ui/react';
import { TransactionPendingModal } from '../components/TransactionPendingModal';
import { isAllowlistEnabled } from '../config/nftSmartContract';

interface MintFormProps {
  leftToMintForUser: number;
  cb?: (params: ScTransactionCb) => void;
  // dataLoading?: boolean;
}

export const MintForm: FC<MintFormProps> = ({ leftToMintForUser, cb }) => {
  const [amount, setAmount] = useState(1);
  const { mint, pending, transaction, error } = useMintTransaction(cb);
  const { loginMethod } = useLoginInfo();

  // const {address} = useAccount();

  // if ( adrees )

  const handleMint = useCallback(() => {
    mint(amount);
  }, [amount, mint]);

  const setAmountHandler = useCallback((value) => setAmount(value), []);
  // if (isAllowlistEnabled == '')
  return (
    <>
      <Box
        display="flex"
        gap={5}
        alignItems="center"
        justifyContent={{ base: 'center', md: 'flex-start' }}
      >
        <NumberInput
          maxW="100px"
          min={1}
          max={5}
          value={amount}
          onChange={setAmountHandler}
        >
          <NumberInputField
            py={5}
            min={1}
            max={5}
            value={amount}
            onChange={setAmountHandler}
            _focus={{ outline: 'none' }}
            // disabled={leftToMintForUser <= 0}
            placeholder="Amount of tokens to mint..."
          />
          {leftToMintForUser <= 0 ? null : (
            <NumberInputStepper>
              <NumberIncrementStepper borderColor="elvenTools.base.dark" />
              <NumberDecrementStepper />
            </NumberInputStepper>
          )}
        </NumberInput>
        <BasicButton
          onClick={handleMint}
        >
          {pending ? 'Pending...' : 'Mint'}
        </BasicButton>
      </Box>
      <TransactionPendingModal
        isOpen={pending}
        successTxHash={transaction?.getHash().toString()}
        txError={error}
        additionalMessage={
          loginMethod === LoginMethodsEnum.walletconnect
            ? 'Sign the transaction using Maiar mobile app. It will take some time to finish. You can always close this message. You will get the transaction hash when finished.'
            : 'It will take some time to finish. You can always close this message. You will get the transaction hash when finished.'
        }
      />
    </>
  );
};
