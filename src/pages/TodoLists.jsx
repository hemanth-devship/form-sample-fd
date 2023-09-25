import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "reactstrap";

export const TodoLists = () => {
  const [todoLists, setTodoLists] = useState([]);
//   console.log(todoLists);
  useEffect(() => {
    axios
      .get("http://localhost:4000/todos")
      .then((res) => {
        // console.log(res);
        setTodoLists(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="mt-4">
      <h3>Todo Lists</h3>
      {/* <ul>
                {todoLists.map(todoList => (
                    <li key={todoList.id}>{todoList.name}</li>
                ))}
            </ul> */}

      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Url</th>
            <th>Image</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {todoLists.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.url}</td>
              <td>
                <img src={item.file} alt="image" className="img-file" />
              </td>
              <td>{item.status ? "Active" : "Inactive"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
