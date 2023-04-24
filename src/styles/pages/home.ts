import { styled } from "..";

export const HomeContainer = styled('main', {
  flex: 1,
  display: 'flex',
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  marginLeft: 'auto',
  minHeight: 480
})

export const Product = styled('div', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  cursor: 'pointer',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',

  img: {
    objectFit: 'cover',
  },

  footer: {
    position: 'absolute',
    bottom: '0.25rem',
    left: '0.25rem',
    right: '0.25rem',
    borderRadius: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: '2rem',
    transform: 'translateY(110%)',
    opacity: 0,
    transition: 'all 0.2s ease-in-out',
    zIndex: 1,

    div: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.25rem',
      textAlign: 'left',
    },

    strong: {
      fontSize: '$lg',
      color: '$gray100'
    },

    span: {
      fontSize: '$xl',
      fontWeight: 'bold',
      color: '$green300',
    }
  },

  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1,
    }
  }
})

export const SliderControl = styled('button', {
  position: 'absolute',
  top: 0,
  bottom: 0,
  width: 136,
  backgroundColor: 'transparent',
  display: 'grid',
  placeItems: 'center',
  cursor: 'pointer',
  border: 0,
  zIndex: 1,

  svg: {
    color: '$gray300',
  },

  '&:hover': {
    svg: {
      color: '$gray100',
    },
  },

  variants: {
    side: {
      right: {
        right: 0,
        backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(18, 18, 20, 0.75) 100%)',

      },
      left: {
        left: 0,
        backgroundImage: 'linear-gradient(90deg, rgba(18, 18, 20, 0.75) 0%, transparent 100%)',
      }
    }
  }
})