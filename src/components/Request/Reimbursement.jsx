import React from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ReimbursementDropDown (props) {

  return (
    <DropdownButton id="dropdown-basic-button" title="Reimbursement Type">
      <Dropdown.Item href="#/action-1">cash</Dropdown.Item>
      <Dropdown.Item href="#/action-2">cheque</Dropdown.Item>
      <Dropdown.Item href="#/action-3">e-transfer</Dropdown.Item>
      <Dropdown.Item href="#/action-3">prepaid</Dropdown.Item>
    </DropdownButton>
  )
}

