import { formatStyleString } from './utils';

export const DEFAULT_STYLE_CONFIG = {
  width: 'auto',
  widthUnit: 'auto',
  height: 'auto',
  widthHeight: 'auto',
  // margin
  marginTop: 0,
  marginLeft: 0,
  marginRight: 0,
  marginBottom: 0,

  // border
  // borderTopWidth: 4,
  // borderLeftWidth: 1,
  // borderRightWidth: 1,
  // borderBottomWidth: 1,

  // padding
  paddingTop: 0,
  paddingLeft: 0,
  paddingRight: 0,
  paddingBottom: 0,

  // display
  display: 'block', // default: inline   block inline inline-block flex
  flexDirection: 'row', // default: row   row row-reverse column column-reverse
  alignItems: 'normal', // default: normal    flex-start center flex-end stretch baseline
  justifyContent: 'normal', // default: normal    flex-start center flex-end stretch baseline
  // font
  fontSize: 12,
  lineHeight: 1,
  fontWeight: 400,
  fontAlign: 'left',
  color: '#000000',

  // background
  // backgroundColor: 'rgba(255, 255, 255,1)',
  backgroundColor: 'transparent',
  backgroundImage: '',
  // https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF
  // backgroundImage: 'url(https://t7.baidu.com/it/u=1297102096,3476971300&fm=193&f=GIF)',
  backgroundSize: '100%',

  // border
  borderStyle: 'solid',
  borderWidth: 1,
  borderTopLeftRadius: 8,
  borderTopRightRadius: 2,
  borderBottomLeftRadius: 8,
  borderBottomRightRadius: 8,

  // box-shadow
  boxShadow: 'none',
  // boxShadow: 'rgba(0, 0, 0, 1) 8px 10px',
  // boxShadow: 'rgba(0, 0, 0, 0.7) 2px 3px',
};

export const STYLE_NUMBER = [
  'width', 'height', 'fontSize', 'lineHeight', 'borderWidth', 'fontWeight',
  'marginTop', 'marginLeft', 'marginRight', 'marginBottom', 'borderTopWidth', 'borderLeftWidth',
  'borderRightWidth', 'borderBottomWidth', 'paddingTop', 'paddingLeft', 'paddingRight', 'paddingBottom',
  'borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomRightRadius', 'borderBottomLeftRadius',
];

const NEW_STYLES = [
  'width', 'height',
];

export const formatStyles = (styles: Record<string, string | number>): Record<string, string | number> => {
  const newStyles: Record<string, string | number> = {};
  if (typeof (styles) !== 'object' || styles === null) {
    return newStyles;
  }

  Object.entries(styles).forEach((style) => {
    const [key, value] = style;

    if (key.indexOf('Unit') >= 0) return;

    if (key === 'backgroundImage') {
      if (value === 'none') return;

      newStyles[key] = `url(${value})`;
      return;
    }

    if (NEW_STYLES.includes(key)) {
      const _value = formatStyleString(value, (styles[`${key}Unit`] as string) || 'px');
      newStyles[key] = _value;
      return;
    }

    if (STYLE_NUMBER.includes(key)) {
      newStyles[key] = Number(value) || 0;
      return;
    }
    newStyles[key] = value;
  });

  return newStyles;
};
