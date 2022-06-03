import { Container, Box, Image, Link, Text } from '@chakra-ui/react';

export const Footer = () => {
  return (
    <footer className='text-center mt-2 mb-3'>
      <div>
        <Box width="100%" marginBottom={2} display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
          <Link href="https://discord.gg/nftrmarket">
            <Image
              width={10}
              marginRight={5}
              src="../discord.svg"
              alt='discord'
            />
          </Link>
          <Link href="https://twitter.com/hypiumnft">
            <Image
              width={10}
              marginRight={5}
              src="../twitter.svg"
              alt='discord'
            />
          </Link>
          <Link href="https://t.me/nftrmarket">
            <Image
              width={10}
              src="../telegram.svg"
              alt='discord'
            />
          </Link>
        </Box>
        <Link href="https://app.nftr.market/" width="100%" display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'} target={'_blank'}>
          Made with
          <Image
              width={10}
              src="../slightly-smiling-face_1f642.webp"
              alt='discord'
            />
          by nftr.market
        </Link>
      </div>
    </footer>
  );
};
