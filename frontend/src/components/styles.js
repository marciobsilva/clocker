import styled from 'styled-components';

export const Table = styled.table`
    border-collapse: collapse;
    width: 100%;
    
    thead {
        background-color: #aaaaaa;
        border: 1px solid gray;

        th {
            border: 1px solid gray;
            padding: 10px 20px;
        }
    }

    tbody {
        background-color: #eeeeee;

        td {
            border: 1px solid gray;
            padding: 10px 20px;
        }
    }
`;

export const Form = styled.form`
    width: 100%;

    input {
        margin: 10px 0;
        width: 100%;
        height: 50px;
    }

    button[type='submit'] {
        width: 100px;
        height: 50px;
        background-color: green;
        border-color: forestgreen;
        border-radius: 5px;
    }
`;

export const HeaderMenu = styled.header`
    height: 50px;
    width: 100%;
    background-color: purple;
    margin-bottom: 10px;
    justify-content: space-between;
    display: flex;
    align-items: center;
    padding: 0 20px;
    color: white;
`;

export const Container = styled.div`
    width: 80%;
    margin: 0 auto;
`;