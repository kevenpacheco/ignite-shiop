import { styled } from "..";

export const ShoppingCartContainer = styled('aside', {
  width: 480,
  height: '100vh',
  padding: 48,
  paddingTop: 72,
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  backgroundColor: '$gray800',
  display: 'flex',
  flexDirection: 'column',
  zIndex: 2,
  transform: 'translateX(150%)',
  transition: 'transform 0.3s linear',

  '&.show': {
    transform: 'translateX(0)',
  },

  h2: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '$gray100',
    marginBottom: 32,
  },

  ul: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    listStyle: 'none',
    flex: 1,
    overflowY: 'auto',
    marginBottom: 24,
  },
})

export const ShoppingCartCloseButton = styled('button', {
  border: 0,
  backgroundColor: 'transparent',
  display: 'grid',
  placeItems: 'center',

  svg: {
    color: "$gray500",
    cursor: 'pointer',
    position: 'absolute',
    top: 24,
    right: 24,

    '&:hover': {
      color: "$gray100",
    }
  },
})

export const ShoppingCartEmpty = styled('div', {
  flex: 1,
  display: 'grid',
  placeItems: 'center',
  
  svg: {
    color: '$gray500',
    width: 'min(150px, 100%)',
    height: '100%',
    opacity: 0.1,
  },
});

export const ShoppingCartItem = styled('li', {
  display: 'flex',
  gap: 20,

  figure: {
    width: '100%',
    maxWidth: 102,
    height: 93,
    background: 'linear-gradient(180deg, #1ea483 0%, #7465a4 100%)',
    borderRadius: 8,
    padding: '0.25rem',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    img: {
      objectFit: 'cover',
    },
  },

  '.details': {
    width: '100%',

    h3: {
      color: '$gray300',
      fontSize: '1.125rem',
      fontWeight: 400,
      marginBottom: 2,
    },

    div: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8,
    },
  
    strong: {
      color: '$gray100',
      fontSize: '1.125rem',
      marginBottom: 8,
    },
  
    span: {
      color: '$gray300',
    },
  
    button: {
      backgroundColor: 'transparent',
      color: '$green500',
      fontWeight: 700,
      border: 0,
      cursor: 'pointer',
  
      '&:hover': {
        color: '$green300',
      },
    },
  },
})

export const ShoppingCartSummary = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  alignItems: 'center',
  gap: 3,
  marginBottom: 55,

  span: {
    '&:nth-child(1)': {
      color: '$gray100',
    },

    '&:nth-child(2)': {
      color: '$gray300',
      fontSize: '1.125rem',
      justifySelf: 'flex-end',
    },

    '&:nth-child(3)': {
      color: '$gray100',
      fontSize: '1.125rem',
      fontWeight: 'bold',
    },

    '&:nth-child(4)': {
      justifySelf: 'flex-end',
      color: '$gray100',
      fontWeight: 'bold',
      fontSize: '1.5rem',
    },
  },
})