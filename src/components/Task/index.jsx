import React from 'react';

export default function Task ({
  requests
}) {
  console.log(requests)

  return (
    <div>
      {requests && requests.length &&
      requests.map(currentTask => {

        return (
          <ul>
            <li>
              {currentTask.delivery_address}
            </li>
            <li>
              {currentTask.items}
            </li>
            <li>
              {currentTask.reimbursement_type}
            </li>

          </ul>
        )
        })
    }
  </div>
  )
}