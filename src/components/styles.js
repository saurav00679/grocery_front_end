import styled from 'styled-components';

export const StyledGridContainer = styled.div`
display: grid;
grid-template-columns: ${({ val }) => `repeat(${val}, 1fr)`};
grid-auto-rows: 1fr;
margin-top: 5%;
margin-left: 25%;
margin-right: 25%;
`;