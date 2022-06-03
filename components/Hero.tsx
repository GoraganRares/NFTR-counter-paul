import { Box, Text, Image, AbsoluteCenter } from '@chakra-ui/react';
import { CollectionInfoBox } from './CollectionInfoBox';
import { chainType, networkConfig } from '../config/network';
import { HeaderMenu } from '../components/HeaderMenu';
import { HeaderMenuButtons } from '../components/HeaderMenuButtons';
import { motion } from 'framer-motion';

import {
  collectionTicker,
  smartContractAddress,
  collectionSize,
} from '../config/nftSmartContract';
import { shortenHash } from '../utils/shortenHash';

export const Hero = () => {
  return (
    <Box width="100%" display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
      {/* <Text
        as="h1"
        fontSize={{ base: '2xl', md: '3xl', lg: '5xl' }}
        textAlign={{ base: 'center', md: 'left' }}
        fontWeight="black"
        lineHeight="shorter"
        mb={5}
      >
        Open source Dapp template for the{' '}
        <Text
          as="a"
          color="elvenTools.color3.base"
          href="https://www.elven.tools"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          Elven Tools
        </Text>{' '}
        and{' '}
        <Text
          as="a"
          color="elvenTools.color2.base"
          href="https://www.elrond.com"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          Elrond
        </Text>{' '}
        blockchain.
      </Text> */}
      {/* <Text
        as="h2"
        fontSize="lg"
        fontWeight="thin"
        textAlign={{ base: 'center', md: 'left' }}
      >
        The actual working example is connected to the Elven Tools smart
        contract deployed on the Elrond blockchain{' '}
        <Text as="span" fontWeight="medium">
          devnet
        </Text>
        ! You can play with it. I will redeploy it from time to time to keep the
        minting active. You can also use the template on the mainnet with a
        couple of config changes. Check the Elven Tools website for docs.
      </Text> */}
      <Box
        display='flex'
        justifyContent='center'
        alignContent='center'
        position='relative'
        width='100%'
        zIndex='5'
      >
        <Image
          width={400}
          src="../gura.svg"
          alt='discord'
          sx={{
            '@media screen and (max-width: 500px)': {
              width: '100%',
            },
          }}
          >
        </Image>
        <HeaderMenuButtons enabled={['auth', 'mint', 'about']} />
      </Box>
      {/* <Box 
        display='flex'
        justifyContent='center'
        alignItems='center'
        right='140px'
        position='absolute'
        top='50%'
      > */}
      <motion.div initial="hidden" animate="visible" variants={{
        hidden: {
          // scale: .8,
          width:'600px',
          // height:'400px',
          position: 'absolute',
          // opacity: 0,
          right: '90%',
          // top: '120%',
          overflow: 'hidden'
          // transform: 'rotate(180deg)'
        },
        visible: {
          // scale: 1,
          // opacity: 1,
          width:'600px',
          // height:'400px',
          // top: '-30%',
          position: 'absolute',
          right: '-60%',
          overflow: 'hidden',
          transition: {
            delay: 2,
            duration: 1
          }
        },
      }}>
          <Image
            // transform= "rotate(-45deg)"
            width='600px'
            src="../lambo.webp"
            alt='lambo'
            position='absolute'
            zIndex='2'
            top='40%'
          >
          </Image>
      </motion.div>
      {/* <Box
        display="flex"
        justifyContent={{ base: 'center', md: 'flex-start' }}
        mt={10}
        gap={3}
        sx={{
          '@media screen and (max-width: 650px)': {
            flexDirection: 'column',
          },
        }}
      >
      */}
      {/* </Box>  */}
      {/* <CollectionInfoBox content={collectionSize} label="Collection amount" /> */}
    </Box>
  );
};
