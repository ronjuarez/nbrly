import React, {useState} from 'react';
import ReimbursementDropDown from './Reimbursement';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Groceries from './Groceries'
export default function RequestForm (props) {
  
  // state = {
  //   date: new Date(),
  // }
  const [value, onChange] = useState(new Date());


  return(
    <form>
      <h1>Form</h1>
      <ReimbursementDropDown/>
      <div>
        < br />
        <Calendar
          onChange={onChange}
          value={value}
        />
      </div>
      <Groceries/>
    </form>
  )
}
