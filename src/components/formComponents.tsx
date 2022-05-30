import styled from '@emotion/styled';

export const ErrorMessage = styled('span', {
  shouldForwardProp: (prop) => !String(prop).startsWith('$'),
})<{ $show: boolean }>((props) => ({
  display: 'block',
  height: '15px',
  margin: '5px 0px',
  color: 'red',
  fontSize: '0.85em',
  opacity: props.$show ? 1 : 0,
}));

export const FormTitle = styled.h2`
  text-align: center;
`;

export const InputContainer = styled.div`
  margin-bottom: 15px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 15px;
`;
