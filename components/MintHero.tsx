import { Box, Text, useBreakpointValue, Image } from '@chakra-ui/react';
import { useCallback } from 'react';
import { Address } from '@elrondnetwork/erdjs';
import { useScQuery, SCQueryType } from '../hooks/interaction/useScQuery';
import { MintForm } from './MintForm';
import { Authenticated } from './Authenticated';
import { useAccount } from '../hooks/auth/useAccount';
import { LoginModalButton } from './LoginModalButton';
import {
  isDropActive,
  smartContractAddress,
  tokensLimitPerAddressTotal,
  tokensLimitPerAddressPerDrop,
  isAllowlistEnabled,
  isMintingStarted,
} from '../config/nftSmartContract';
import { networkConfig, chainType } from '../config/network';
import { NFTLeftToMint } from './NFTLeftToMint';
import { NFTAllowlistEnabled } from './NFTAllowlistEnabled';
import { NFTMintedAlready } from './NFTMintedAlready';
import { NFTLeftToMintPerAddress } from './NFTLeftToMintPerAddress';

// TODO: Prepare sc query hooks for all cases
// TODO: Prepare separate components for the segments here
// TODO: refactor it a bit

export const MintHero = () => {
  let { address } = useAccount();
  // let adress: string = {address};
  // if(address == 'erd1ugfsm4wsk70aspz4agych4408599ehkmznkml9rugup766knw7fq02da8r'){
  //     console.log('da');
  //   }
  // console.log(address);
  const {
    data,
    mutate: refreshData,
    isLoading: totalIsLoading,
  } = useScQuery({
    type: SCQueryType.INT,
    payload: {
      scAddress: smartContractAddress,
      funcName: 'getTotalTokensLeftMeme',
      args: [],
    },
  });
  const counter = data;
  console.log(data);
  // let da = 'erd1ugfsm4wsk70aspz4agych4408599ehkmznkml9rugup766knw7fq02da8r';
  // function Json() {
  //   if ( adress = 'erd1ugfsm4wsk70aspz4agych4408599ehkmznkml9rugup766knw7fq02da8r'){

  //   }
  // }
  const {
    data: dropData,
    mutate: refreshDropData,
    isLoading: dropIsLoading,
  } = useScQuery({
    type: SCQueryType.INT,
    payload: {
      scAddress: smartContractAddress,
      funcName: 'getDropTokensLeft',
      args: [],
    },
    autoInit: isDropActive,
  });

  // if ( {adress} )

  const {
    data: mintedData,
    mutate: refreshMintedData,
    isLoading: mintedDataLoading,
  } = useScQuery({
    type: SCQueryType.INT,
    payload: {
      scAddress: smartContractAddress,
      funcName: 'getMintedPerAddressTotal',
      args: address ? [Address.fromBech32(address)?.hex()] : [],
    },
    autoInit: Boolean(address),
  });

  const { data: mintedPerDropData, mutate: refreshMintedPerDropData } =
    useScQuery({
      type: SCQueryType.INT,
      payload: {
        scAddress: smartContractAddress,
        funcName: 'getMintedPerAddressPerDrop',
        args: address ? [Address.fromBech32(address)?.hex()] : [],
      },
      autoInit: Boolean(address && isDropActive),
    });

  const { data: allowlistCheckData, isLoading: allowlistCheckLoading } =
    useScQuery({
      type: SCQueryType.INT,
      payload: {
        scAddress: smartContractAddress,
        funcName: 'getAllowlistAddressCheck',
        args: address ? [Address.fromBech32(address)?.hex()] : [],
      },
      autoInit: Boolean(address && isAllowlistEnabled),
    });

  const handleRefreshData = useCallback(() => {
    refreshData();
    refreshMintedData();
    refreshMintedPerDropData();
    refreshDropData();
  }, [
    refreshData,
    refreshMintedData,
    refreshMintedPerDropData,
    refreshDropData,
  ]);

  const getLeftToMintForUser = useCallback(() => {
    let leftPerDrop = 0;
    let leftInTotal = 0;

    if (isAllowlistEnabled && Number(allowlistCheckData?.data?.data) === 0) {
      return 0;
    }

    if (mintedPerDropData?.data?.data) {
      leftPerDrop =
        tokensLimitPerAddressPerDrop - Number(mintedPerDropData.data.data);
    }
    if (mintedData?.data?.data) {
      leftInTotal = tokensLimitPerAddressTotal - Number(mintedData.data.data);
    }
    if (!isDropActive || leftPerDrop > leftInTotal) {
      return leftInTotal;
    }
    return leftPerDrop;
  }, [
    allowlistCheckData?.data?.data,
    mintedData?.data.data,
    mintedPerDropData?.data.data,
  ]);

  const isContentCentered = useBreakpointValue({ base: true, md: false });

  return (
    <Box width="100%">
      <Text
        as="h1"
        display='flex'
        flexDirection='row'
        alignItems='center'
        justifyContent='center'
        fontSize={{ base: '2xl', md: '3xl', lg: '5xl' }}
        textAlign={{ base: 'center', md: 'left' }}
        // data-mint={}
        lineHeight="shorter"
        mb={5}
      >
        <Image
          width='40px'
          marginRight={2}
          src="../slightly-smiling-face_1f642.webp"
          alt='discord'
        >
        </Image>
        data?.data['data']
      </Text>
      <Text
        as="h2"
        fontSize="20"
        textAlign={{ base: 'center', md: 'left' }}
      >
        We are glad to see you! Hypium is the first FREE PFP NFT collection to ever exists on the Elrond Blockchain. All artworks are READY FOR USE as a profile picture on your favourite social platforms. HYPIUM is all about hype, energy and unity. HYPIUM is what elrond needs. MINT, USE AND SHARE YOURS NOW. It&apos;s free. For now.
      </Text>
      {isMintingStarted ? (
        <Box mt={6}>
          <NFTLeftToMint
            data={data}
            dropData={dropData}
            dataLoading={isDropActive ? dropIsLoading : totalIsLoading}
          />
          <Box>
            <Authenticated
              fallback={
                <Box
                  mt={6}
                  display="flex"
                  justifyContent={isContentCentered ? 'center' : 'flex-start'}
                >
                  {/* <LoginModalButton /> */}
                </Box>
              }
              spinnerCentered={isContentCentered}
            >
              <NFTAllowlistEnabled
                data={allowlistCheckData}
                dataLoading={allowlistCheckLoading}
              />
              {/* <NFTMintedAlready
                data={mintedData}
                dataLoading={mintedDataLoading}
              />
              <NFTLeftToMintPerAddress
                leftToMintForUser={getLeftToMintForUser()}
              /> */}
              <MintForm
                cb={handleRefreshData}
                leftToMintForUser={getLeftToMintForUser()}
              />
              {mintedData?.data?.data && mintedData.data.data > 0 && (
                <Box
                  display="flex"
                  alignItems="center"
                  mt={6}
                  justifyContent={{ base: 'center', md: 'flex-start' }}
                >
                  <Text
                    as="span"
                    fontSize={{ base: 'md', sm: 'xl' }}
                    fontWeight="bold"
                  >
                    Check your NFTs:
                  </Text>
                  <Text
                    as="a"
                    ml={3}
                    target="_blank"
                    color="elvenTools.color2.base"
                    fontSize="2xl"
                    fontWeight="black"
                    textDecoration="underline"
                    rel="noopener noreferrer nofollow"
                    href={`${networkConfig[chainType].explorerAddress}/accounts/${address}/nfts`}
                  >
                    here
                  </Text>
                </Box>
              )}
            </Authenticated>
          </Box>
        </Box>
      ) : (
        <Box>
          <Text fontSize="2xl" fontWeight="bold" mt={10}>
            Minting was not started yet.
          </Text>
          <Text fontSize="2xl" fontWeight="bold">
            Please be back soon!
          </Text>
        </Box>
      )}
    </Box>
  );
};
