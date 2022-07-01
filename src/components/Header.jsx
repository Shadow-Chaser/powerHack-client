import { useContext, useEffect, useState } from 'react';
import { BillContext } from '../App';
import '../styles/Header.css'

const Header = () => {
    const [bills, setBills] = useContext(BillContext);
    const [paidTotal, setPaidTotal] = useState(0);

    useEffect(() => {
        let sum = 0;
        for (let i = 0; i < bills.length; i++) {
            sum += bills[i].paidAmount;
        }
        setPaidTotal(sum)
    }, [bills])

    return (
        <div className='header-container d-flex justify-content-around'>
            <h2>Logo</h2>
            <h2>Paid Total : ${paidTotal}</h2>
        </div>
    )
};
export default Header;