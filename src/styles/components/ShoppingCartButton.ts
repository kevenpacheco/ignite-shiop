import { styled } from "..";

export const ShoppingCartButtonContainer = styled('button', {
  borderRadius: 6,
  padding: '0.75rem',
  display: 'grid',
  placeItems: 'center',
  border: 0,
  cursor: 'pointer',

  variants: {
    variant: {
      default: {
        backgroundColor: '$green500',
        color: '$white',
        '&:hover': {
          backgroundColor: '$green300',
        }
      },
      header: {
        backgroundColor: '$gray800',
        color: '$gray500',
        '&:hover': {
          color: '$gray300',
        }
      }
    },
    isShowItemsCount: {
      true: {
        position: 'relative',
        '&::after': {
          content: 'attr(data-items-count)',
          position: 'absolute',
          top: '-0.75rem',
          right: '-0.75rem',
          height: '1.5rem',
          width: '1.5rem',
          backgroundColor: '$green500',
          border: '3px solid $gray900',
          borderRadius: '50%',
          display: 'grid',
          placeItems: 'center',
          fontSize: '0.875rem',
          fontWeight: 'bold',
          color: '$white',
        },
      },
    },
  },
})