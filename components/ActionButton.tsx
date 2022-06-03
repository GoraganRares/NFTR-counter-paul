import { Box } from '@chakra-ui/react';
import { FC, useCallback } from 'react';

interface ActionButtonProps {
  onClick: () => void;
  isFullWidth?: boolean;
  disabled?: boolean;
}

export const ActionButton: FC<ActionButtonProps> = ({
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
      // borderColor="elvenTools.color2.darker"
      // borderWidth={2}
      bgColor="transparent"
      py={2}
      px={6}
      // rounded="xl"
      width='100px'
      height='100px'
      bgRepeat='no-repeat'
      bgSize='cover'
      fontWeight="normal"
      cursor={disabled ? 'not-allowed' : 'pointer'}
      color="elvenTools.white"
      userSelect="none"
      bg='url(button_normal.svg)'
      _hover={!disabled ? { bg:'url(button_hover.svg)', width:'110px', height:'110px' } : {}}
      transition="background-color .3s"
      onClick={handleClick}
      opacity={!disabled ? 1 : 0.5}
      {...props}
    >
      {children}
    </Box>
  );
};
