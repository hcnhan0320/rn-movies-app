const COLORS = {
   // primary
   darkGray: '#1E1E1E',
   gray2: '#525252',

   // secondary
   mediumGray: '#3D3D3D',
   shadowGold: '#302D28',
   yellow: '#FED530',

   // base color
   white: '#ffffff',
   black: '#000000',

   // text color
   title: '#2E2E2E',
   body: '#808080',
   infield: '#CCCCCC',
   disable: '#E6E6E6',
};

const FONT = {
   regular: 'DMRegular',
   medium: 'DMMedium',
   bold: 'DMBold',
};

const SIZES = {
   xSmall: 10,
   small: 12,
   medium: 16,
   large: 20,
   xLarge: 24,
   xxLarge: 32,
};

const SHADOWS = {
   small: {
      shadowColor: '#fff',
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
   },
   medium: {
      shadowColor: '#fff',
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 5.84,
      elevation: 5,
   },
};

export { COLORS, FONT, SIZES, SHADOWS };
