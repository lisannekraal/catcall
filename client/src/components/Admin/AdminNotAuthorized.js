import React from 'react'

function AdminNotAuthorized() {
  return (
    <div data-testid="page-not-found" className="not-found-container">
      <div className="header-footer"></div>
      <div data-testid="page-not-found" className="not-found">
        <h1>401</h1>
        <h2>You are not authorized to visit this page.</h2>
      </div>
      <div className="header-footer"></div>
    </div>
  )
}

export default AdminNotAuthorized
