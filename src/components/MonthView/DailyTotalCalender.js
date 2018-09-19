import React from "react";
import Loader from "../Common/Loader";
import * as utils from "../Util";
import moment from "moment";

const DailyTotalCalender = props => {
    let expenses = props.expenses;
    let currentUser = props.authUser;
    let selectedMonth = props.month;
    let selectedYear = props.year;

    if (!expenses || !currentUser || !selectedMonth || !selectedYear) {
        return (
            <tr>
                <td>
                    <Loader />
                </td>
                <td>
                    <Loader />
                </td>
                <td>
                    <Loader />
                </td>
                <td>
                    <Loader />
                </td>
                <td>
                    <Loader />
                </td>
                <td>
                    <Loader />
                </td>
                <td>
                    <Loader />
                </td>
            </tr>
        );
    }

    if (expenses && currentUser && selectedMonth && selectedYear) {
        let eachExpense = utils.eachExpense(expenses);
        let usersExpensesInSelectedMonthAndYear = utils.expensesinMonthAndYear(
            eachExpense,
            currentUser,
            selectedMonth,
            selectedYear
        );

        let totals = {};

        let allDatesInSelectedMonth = utils.getAllTheDatesInAMonth(selectedYear, selectedMonth);
        let TotalInThatDay = allDatesInSelectedMonth.map(date => {
            var expensesOnThatDate = usersExpensesInSelectedMonthAndYear.filter(exp => Number(exp.value.date === date));
            totals[date] =
                expensesOnThatDate.map(elem => Number(elem.value.expense)).length >= 1
                    ? expensesOnThatDate.map(elem => Number(elem.value.expense)).reduce((prev, cur) => prev + cur)
                    : 0;
        });

        const listStyle = {
            backgroundColor: "white",
            padding: "1px",
            margin: "0px",
            display: "inline-block",
            width: "14.15%",
            minHeight: "65px",
            border: "1px solid rgba(0,0,0,0.1)",
            textAlign: "center"
        };

        const listStyle1 = {
            backgroundColor: "white",
            padding: "1px",
            margin: "0px",
            display: "inline-block",
            width: "14.15%",
            fontSize: "18px",
            color: "#00A5EB",
            border: "1px solid rgba(0,0,0,0.1)",
            textAlign: "center"
        };

        const ulStyle = {
            padding: "0px",
            borderRadius: "4px"
        };

        const ulStyle1 = {
            padding: "0px",
            marginBottom: "0px",
            borderRadius: "4px"
        };

        const dateArea = {
            background: "rgba(0,0,0,0.05)",
            color: "orange",
            letterSpacing: "2px",
            fontSize: "20px"
        };

        const calenderHeader = {
            backgroundColor: "white",
            padding: "5px",
            marginTop: "15px",
            width: "99%"
        };

        const calenderHeaderMonth = {
            color: "orange",
            fontSize: "25px",
            fontWeight: "bold",
            letterSpacing: "1px",
            paddingLeft: "10px"
        };

        const calenderHeaderYear = {
            float: "right",
            fontSize: "30px",
            marginTop: "-40px",
            letterSpacing: "2px"
        };

        let dayStart = [];
        let dayEnd = [];

        for (let i = 0; i < moment(allDatesInSelectedMonth[0]).day(); i++) {
            dayStart.push(i);
        }

        for (
            let i = 0;
            i < Math.abs(moment(allDatesInSelectedMonth[allDatesInSelectedMonth.length - 1]).day() - 6);
            i++
        ) {
            dayEnd.push(i);
        }

        let daysStartGapHtml = dayStart.map(function(elem) {
            return (
                <li key={elem} style={listStyle}>
                    <div style={dateArea}>
                        {" "}
                        &nbsp; <br />{" "}
                    </div>
                    &nbsp;{" "}
                </li>
            );
        });

        let daysEndGapHtml = dayEnd.map(function(elem) {
            return (
                <li key={elem + 55} style={listStyle}>
                    <div style={dateArea}>
                        {" "}
                        &nbsp; <br />{" "}
                    </div>
                    &nbsp;{" "}
                </li>
            );
        });

        let printHtml = Object.keys(totals).map((elem, i) => {
            return (
                <li key={elem} style={listStyle}>
                    <div style={dateArea}> {moment(allDatesInSelectedMonth[i]).date()}</div> {totals[elem]}{" "}
                </li>
            );
        });

        if (usersExpensesInSelectedMonthAndYear.length >= 1) {
            return (
                <div>
                    <div style={calenderHeader}>
                        <div style={calenderHeaderMonth}> {moment(allDatesInSelectedMonth[0]).format("MMMM")} </div>
                        <div style={calenderHeaderYear}> {selectedYear} </div>
                    </div>
                    <ul style={ulStyle1}>
                        <li key="Sun" style={listStyle1}>
                            Sun
                        </li>
                        <li key="Mon" style={listStyle1}>
                            Mon
                        </li>
                        <li key="Tue" style={listStyle1}>
                            Tue
                        </li>
                        <li key="Wed" style={listStyle1}>
                            Wed
                        </li>
                        <li key="Thu" style={listStyle1}>
                            Thu
                        </li>
                        <li key="Fri" style={listStyle1}>
                            Fri
                        </li>
                        <li key="Sat" style={listStyle1}>
                            Sat
                        </li>
                    </ul>
                    <ul style={ulStyle}>
                        {daysStartGapHtml}
                        {printHtml}
                        {daysEndGapHtml}
                    </ul>
                </div>
            );
        } else {
            return <div>{/* You have'nt spent a penny on the selected month */}</div>;
        }
    }
};

export default DailyTotalCalender;
