import { useState } from "react";
import {
  Form,
  Row,
  Col,
  Label,
  Input,
  FormGroup,
  Button,
  // FormFeedback,
} from "reactstrap";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { TodoLists } from "./TodoLists";
import { useNavigate } from "react-router-dom";

const Todos = () => {
  const navigate = useNavigate();

  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), name0: "", url0: "", file0: null, base: "", status0: true },
  ]);
  const [err, setErr] = useState(false);
  // console.log("inputFields", inputFields);
  const {
    // register,
    // control,
    handleSubmit,
    // formState: { errors },
  } = useForm({ mode: "onChange", reValidateMode: "onBlur" });
  // console.log(errors);
  // const registerOptions = {
  //   name: {
  //     required: true,
  //     minLength: {
  //       value: 3,
  //       message: "Minimum 3 Characters Required",
  //     },
  //   },
  //   email: {
  //     required: true,
  //     pattern: {
  //       value: /\S+@\S+\.\S+/,
  //       message: "Enter valid email",
  //     },
  //   },
  // };

  const convertToBase64 = (selectedFile) => {
    if (selectedFile) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    } else {
      return "";
    }
  };

  async function handleChangeInput(e, index) {
    const { name, value, type } = e.target;
    // console.log(type);
    if (type === "text" || type === "url") {
      const list = [...inputFields];
      list[index][name] = value;
      setInputFields(list);
    } else if (type === "file") {
      const list = [...inputFields];
      let data = await convertToBase64(e.target.files[0]);
      list[index][name] = e.target.files[0];
      list[index]["base"] = data;
      setInputFields(list);
    } else if (type === "select-one") {
      const list = [...inputFields];
      list[index][name] = value === "true" ? true : false;
      setInputFields(list);
    }
  }

  const handleAddFields = () => {
    const inputLength = inputFields.length;
    setInputFields([
      ...inputFields,
      {
        id: uuidv4(),
        [`name${inputLength}`]: "",
        [`url${inputLength}`]: "",
        [`file${inputLength}`]: "",
        [`base`]: "",
        [`status${inputLength}`]: true,
      },
    ]);
  };

  const handleRemoveFields = (index, id) => {
    const list = [...inputFields];
    console.log(list.filter((item) => item.id !== id));
    list.splice(index, 1);
    console.log(list);
    setInputFields(list);
  };

  const handleDatas = () => {
    console.log("inputFields", inputFields);
    let dataArr = [];
    inputFields.forEach((value, index) => {
      dataArr.push({
        name: value[`name${index}`],
        url: value[`url${index}`],
        file: value[`base`],
        status: value[`status${index}`],
      });
    });
    console.log("dataArr", dataArr);
    let filterNotEmpty = dataArr.filter(
      (item) => !Object.values(item).some((val) => val == "")
    );

    // /todos
    if (filterNotEmpty.length > 0) {
      setErr(false);
      axios
        .post("http://localhost:4000/todos", dataArr)
        .then((res) => {
          console.log(res);
          navigate(0);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // alert("Please fill all the fields")
      setErr(true);
    }
  };

  return (
    <>
      <div>
        <h3 className="mb-4">Todos</h3>

        <Form>
          {inputFields.map((data, index) => (
            <Row className="row-cols-lg-auto g-3" key={data.id}>
              <Col>
                <FormGroup>
                  <Input
                    id={data.id}
                    name={`name${index}`}
                    placeholder="Name"
                    type="text"
                    value={data.name}
                    // {...register(`name${index}`, registerOptions.name)}
                    onChange={(e) => handleChangeInput(e, index)}
                    //   invalid={errors[`name${index}`] && true}
                  />
                  <Label for="name" hidden>
                    Name
                  </Label>
                  {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                  {/* {errors[`name${index}`] &&
                  errors[`name${index}`].type === "required" && (
                    <p>Name is Required</p>
                  )}
                {errors[`name${index}`] &&
                  errors[`name${index}`].type === "minLength" && (
                    <p>Required minimum 3 character</p>
                  )} */}
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Input
                    id={data.id}
                    name={`url${index}`}
                    placeholder="Url"
                    type="url"
                    value={data.url}
                    onChange={(e) => handleChangeInput(e, index)}
                  />
                  <Label for="url" hidden>
                    URL
                  </Label>
                </FormGroup>
              </Col>
              <Col sm={3}>
                <FormGroup>
                  <Input
                    id={data.id}
                    name={`file${index}`}
                    type="file"
                    value={data.file}
                    onChange={(e) => handleChangeInput(e, index)}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  {/* <Label for="exampleSelectMulti">Select Multiple</Label> */}
                  <Input
                    id={data.id}
                    name={`status${index}`}
                    type="select"
                    value={data.status}
                    onChange={(e) => handleChangeInput(e, index)}
                  >
                    <option value={true}>Active</option>
                    <option value={false}>Inactive</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col>
                <Button
                  color="danger"
                  type="button"
                  disabled={inputFields.length === 1}
                  onClick={() => handleRemoveFields(index, data.id)}
                >
                  Remove
                </Button>
              </Col>
            </Row>
          ))}
        </Form>

        <Row className="mt-4">
          <Col>
            <Button color="primary" type="button" onClick={handleAddFields}>
              Add
            </Button>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            <Button
              color="success"
              type="button"
              onClick={handleSubmit(handleDatas)}
            >
              Submit
            </Button>
          </Col>
        </Row>
        {err && (
          <Row>
            <Col>
              <p className="error">Please fill all the fields</p>
            </Col>
          </Row>
        )}
      </div>

      <TodoLists />
    </>
  );
};

export default Todos;
