import type { NextPage } from 'next';
import { Box, Show } from '@chakra-ui/react';
import { MainLayout } from '../components/MainLayout';
import { HeaderMenu } from '../components/HeaderMenu';
import { HeaderMenuButtons } from '../components/HeaderMenuButtons';
import { MintDisconnect } from '../components/MintDisconnect'
import { MintHero } from '../components/MintHero';
import { HeroImage } from '../components/HeroImage';

const Mint: NextPage = () => {
  return (
    <MainLayout>
      <Box
        display="flex"
        justifyContent="center"
        mt={{ base: 8, xl: 12, '2xl': 24 }}
      >
        <MintHero />
        {/* <HeroImage /> */}
      </Box>
      <HeaderMenu>
        <MintDisconnect enabled={['auth', 'about']} />
      </HeaderMenu>
    </MainLayout>
  );
};

export default Mint;
