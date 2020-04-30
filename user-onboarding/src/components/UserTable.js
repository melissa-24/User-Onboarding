import React from "react";
import { Table } from "reactstrap";

const UserTable = ({ user }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Password</th>
          <th>Terms?</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">{user.id}</th>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.password}</td>
          <td>{user.terms === true ? "Yes" : null}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default UserTable;