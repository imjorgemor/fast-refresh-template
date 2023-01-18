import styled from 'styled-components';
import { Link, Outlet} from 'react-router-dom';

const Root = () => {
    return (
        <>
            <Container>
                <h1 style={{ marginBottom: "1rem" }}>Hello fast refresh with typescript and styled components!!!!!!</h1>
            </Container>
            <Outlet />
        </>
    );
};

export default Root;

const Container = styled.div`
border: 1px solid blueviolet;
padding: 1rem; 
`;

const Button = styled.button`
    border: 1px solid purple;
    border-radius: .8rem;
    font-weight: 600;
    color: ${props => props.color};
    cursor: pointer;
    text-decoration: none;
   ${({ size = "sm" }: { size?: any }) => {
        const sizes: any = {
            sm: `
                padding: .5rem 1rem;
                font-size: 1rem;
            `,
            md: `
                padding: 1rem 2rem;
                font-size: 1.25rem;
            `,
            lg: `
                padding: 1.5rem 3rem;
                font-size: 1.5rem;
            `
        };
        return sizes[size];

    }};    
`;

const LinkTo = styled(Button)`
    text-decoration: underline;
`;

