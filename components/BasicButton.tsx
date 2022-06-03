import { Box } from '@chakra-ui/react';
import { FC, useCallback } from 'react';

interface BasicButtonProps {
  onClick: () => void;
  isFullWidth?: boolean;
  disabled?: boolean;
}

export const BasicButton: FC<BasicButtonProps> = ({
  children,
  onClick,
  isFullWidth = false,
  disabled = false,
  ...props
}) => {
  const handleClick = useCallback(() => {
    if (!disabled) {
      onClick?.();
    }
  }, [disabled, onClick]);

  return (
    <Box
      as="button"
      borderColor="elvenTools.color2.darker"
      borderWidth={2}
      bgColor="transparent"
      py={2}
      px={6}
      rounded="xl"
      bgRepeat='no-repeat'
      bgSize='cover'
      fontWeight="normal"
      _hover={!disabled ? { bg: 'elvenTools.color2.darker', color:'#000' } : {}}
      cursor={disabled ? 'not-allowed' : 'pointer'}
      color="elvenTools.white"
      userSelect="none"
      transition="background-color .3s"
      onClick={handleClick}
      opacity={!disabled ? 1 : 0.5}
      {...props}
    >
      {children}
    </Box>
  );
};
