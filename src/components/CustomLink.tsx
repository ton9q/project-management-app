import { Link as RouterLink, useMatch } from 'react-router-dom';
import styled from '@emotion/styled';
import Link, { LinkProps } from '@mui/material/Link';
import { type Style } from '../types/react';

type Props = {
  children: React.ReactNode | string;
  to: string;
  variant?: LinkProps['variant'];
  underline?: LinkProps['underline'];
  style?: Style;
  styleForActive?: Style;
};

type MuiLinkProps = Props & {
  $styleForAny?: Style;
  $styleForActive?: Style;
  component: typeof RouterLink;
  $active: boolean;
};

const StyledLink = styled(Link, {
  shouldForwardProp: (prop) => !String(prop).startsWith('$'),
})<MuiLinkProps>(
  {
    color: 'inherit',
  },
  (props) => props.$styleForAny,
  (props) => (props.$active ? props.$styleForActive : { fontWeight: 'bold' })
);

export function CustomLink({
  children,
  to,
  variant = 'inherit',
  underline = 'none',
  style,
  styleForActive,
  ...props
}: Props) {
  const match = useMatch(to);

  const active = !!match;

  return (
    <StyledLink
      component={RouterLink}
      variant={variant}
      underline={underline}
      to={to}
      $active={active}
      $styleForAny={style}
      $styleForActive={styleForActive}
      {...props}
    >
      {children}
    </StyledLink>
  );
}
