import { ReactNode } from "react";

import styled, { css } from "styled-components";

import { Theme } from "../../theme";

type TypographyVariant =
  | "caption4"
  | "text1"
  | "text2"
  | "text3"
  | "text1Bold"
  | "text2Bold"
  | "text3Bold";

type TypographyColor = "normal" | "secondary" | "primary" | "white";

interface TypographyProps {
  variant?: TypographyVariant;
  color?: TypographyColor;
  onClick?: (...args: any) => void;
  children: ReactNode;
}

const getColorStyles = (color?: TypographyColor) => {
  switch (color) {
  case "secondary":
    return css`
        color: ${Theme.palette.secondary.text};
      `;
  case "primary":
    return css`
        color: ${Theme.palette.primary.main};
      `;
  case "white":
    return css`
        color: ${Theme.palette.common.white};
      `;
  default:
    return css`
        color: inherit;
      `;
  }
};

const FONT_FAMILY_STYLES = css`
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  margin: 0;
`;

const Caption4 = styled.h6<{ color?: TypographyColor }>`
  ${({ color, theme }) =>
    css`
      font-size: ${theme.fonts.caption4.size};
      font-weight: ${theme.fonts.caption4.weight};
      ${getColorStyles(color)}
    `}
  ${FONT_FAMILY_STYLES}
`;

const Text1 = styled.p<{ color?: TypographyColor }>`
  ${({ color, theme }) =>
    css`
      font-size: ${theme.fonts.text1.size};
      font-weight: ${theme.fonts.text1.weight};
      ${getColorStyles(color)}
    `}
  ${FONT_FAMILY_STYLES}
`;

const Text2 = styled.p<{ color?: TypographyColor }>`
  ${({ color, theme }) =>
    css`
      font-size: ${theme.fonts.text2.size};
      font-weight: ${theme.fonts.text2.weight};
      ${getColorStyles(color)}
    `}
  ${FONT_FAMILY_STYLES}
`;

const Text3 = styled.p<{ color?: TypographyColor }>`
  ${({ color, theme }) =>
    css`
      font-size: ${theme.fonts.text3.size};
      font-weight: ${theme.fonts.text3.weight};
      ${getColorStyles(color)}
    `}
  ${FONT_FAMILY_STYLES}
`;

const Text1Bold = styled.p<{ color?: TypographyColor }>`
  ${({ color, theme }) =>
    css`
      font-size: ${theme.fonts.text1Bold.size};
      font-weight: ${theme.fonts.text1Bold.weight};
      ${getColorStyles(color)}
    `}
  ${FONT_FAMILY_STYLES}
`;

const Text2Bold = styled.p<{ color?: TypographyColor }>`
  ${({ color, theme }) =>
    css`
      font-size: ${theme.fonts.text2Bold.size};
      font-weight: ${theme.fonts.text2Bold.weight};
      ${getColorStyles(color)}
    `}
  ${FONT_FAMILY_STYLES}
`;

const Text3Bold = styled.p<{ color?: TypographyColor }>`
  ${({ color, theme }) =>
    css`
      font-size: ${theme.fonts.text3Bold.size};
      font-weight: ${theme.fonts.text3Bold.weight};
      ${getColorStyles(color)}
    `}
  ${FONT_FAMILY_STYLES}
`;

export const Typography: React.FC<TypographyProps> = ({
  variant,
  color,
  ...props
}) => {
  switch (variant) {
  case "caption4":
    return <Caption4 color={color} {...props} />;
  case "text1":
    return <Text1 color={color} {...props} />;
  case "text2":
    return <Text2 color={color} {...props} />;
  case "text3":
    return <Text3 color={color} {...props} />;
  case "text1Bold":
    return <Text1Bold color={color} {...props} />;
  case "text2Bold":
    return <Text2Bold color={color} {...props} />;
  case "text3Bold":
    return <Text3Bold color={color} {...props} />;
  default:
    return <Text2 color={color} {...props} />;
  }
};
