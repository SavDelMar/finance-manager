import React, { FC } from 'react';

type fullEvent = {
}

const FullEvent: FC<fullEvent> = () => {
    const parameters = new URL(window.location.href);
    let name: string = parameters.pathname.slice(8);
    let members = ['Maria', 'Katya', 'Vasya'];
    let doubled = members.concat(members);
    let expenseItems = [{
        name: 'Cafe',
        sum: 100,
        membersPay: [10, 20, 40, 20, 50, 60],
    },
    {
        name: 'Beers',
        sum: 300,
        membersPay: [200, 300, 100, 0, 0, 0],
    },
    {
        name: 'Ice-cream',
        sum: 50,
        membersPay: [12, 10, 15, 20, 23, 20],
    },
    ];
    let totalSum = expenseItems.reduce(function (acc, curr) {
        return acc + curr.sum;
    }, 0);
    let membersTotalPay = doubled.map((member, i) => expenseItems.reduce(function (acc, curr) {
        return acc + curr.membersPay[i]
    }, 0))
    debugger

    return (
        <div>
            <h1>
                Event name: {name}
            </h1>
            <div className='event-table'>
                <table>
                    <tr>
                        <th rowSpan={3}>Expense <br></br>items</th>
                        <th rowSpan={3}>Sum</th>
                        <th colSpan={members.length*2}>Members</th>
                    </tr>
                    <tr>
                        {members.map(member => <th colSpan={2}>{member}</th>)}
                    </tr>
                    <tr>
                        {doubled.map( (member, i) => i%2 ? <th>paid</th> : <th>owe</th>)}
                    </tr>
                    {expenseItems.map(item => <tr>
                        <td>{item.name}</td>
                        <td>{item.sum}</td>
                        {doubled.map((it, i) => <td>{item.membersPay[i]}</td>  )}
                    </tr>)
                    }
                    <tr>
                        <th rowSpan={2}>Total</th>
                        <th rowSpan={2}>{totalSum}</th>
                        {doubled.map((it, i) => <td>
                            {expenseItems.reduce(function (acc, curr) {
                                return acc + curr.membersPay[i];
                            }, 0)}
                        </td>)}
                    </tr>
                    <tr>
                        {members.map((member, i) => <td colSpan={2}>
                            {membersTotalPay[i*2+1] - membersTotalPay[i*2]}
                        </td>)}
                    </tr>
                </table>
               
            </div>
        </div>
        
    )
}

export default FullEvent
