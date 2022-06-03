import type { NextPage } from 'next';
import { Box } from '@chakra-ui/react';
import { MainLayout } from '../components/MainLayout';
import { HeaderMenu } from '../components/HeaderMenu';
import { Hero } from '../components/Hero';
import { HeaderMenuButtons } from '../components/HeaderMenuButtons';
// import { HeroImage } from '../components/HeroImage';
import { Faq } from '../components/Faq';
import { Roadmap } from '../components/Roadmap';
import { Team } from '../components/Team';

const Home: NextPage = () => {
  return (
    <MainLayout>
      <Box
        display="flex"
        // justifyContent="space-between"
        justifyContent="center"
        align-items="center"
        // mt={{ base: 8, xl: 12, '2xl': 24 }}
      >
        <Hero />
        {/* <HeroImage /> */}
      </Box>
      {/* <HeaderMenu>
        <Box margin={'auto'}>
          <HeaderMenuButtons enabled={['auth', 'mint', 'about']} />
        </Box>
      </HeaderMenu> */}
    </MainLayout>
  );
};

export default Home;
