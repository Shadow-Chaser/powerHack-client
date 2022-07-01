import { useContext, useEffect, useState } from 'react';
import { BillContext, UserContext } from '../App';
import '../styles/Header.css'

const Header = () => {
    const [bills, setBills] = useContext(BillContext);
    const [paidTotal, setPaidTotal] = useState(0);
    const [user, setUser] = useContext(UserContext);

    useEffect(() => {
        let sum = 0;
        for (let i = 0; i < bills.length; i++) {
            sum += bills[i].paidAmount;
        }
        setPaidTotal(sum)
    }, [bills])

    const logOut = () => {
        setUser({})
        localStorage.removeItem('user')
    }

    return (
        <div className='header-container d-flex justify-content-around'>
            <h2>Logo</h2>
            <h2>Paid Total : ${paidTotal}</h2>
            <p onClick={logOut}>Logout</p>
        </div>
    )
};
export default Header;