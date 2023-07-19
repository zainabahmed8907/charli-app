import {
  Form,
  Modal,
  Input,
  Button,
  Select,
  DatePicker,
  TimePicker,
  message,
} from "antd";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CloseCircleOutlined } from "@ant-design/icons";
import "./outlinemodal.css";
import { useEffect } from "react";
import {
  getChapterCards,
  updateChapterCard,
} from "../../redux/Slice/ChapterCardsSlice";
import { useParams } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { getChapters } from "../../redux/Slice/ChapterSlice";

const OutlineSideModal = ({ open, close, chapterCardId, onsubmit }) => {
  const { colors } = useSelector((state) => state.colors);
  const { chapterCards, loading } = useSelector((state) => state.chaptercard);
  const dispatch = useDispatch();
  const { id } = useParams();

  const updateData =
    chapterCards[0]?.data?.length > 0 &&
    chapterCards[0]?.data?.filter((c) => c?.id == chapterCardId);

  const name = updateData[0]?.card_title;
  const color = updateData[0]?.color_id;
  const description = updateData[0]?.card_description;

  const [form] = Form.useForm();

  const handleSubmit = (e) => {
    let data = { ...e };
    onsubmit(data);

    close();
  };

  useEffect(() => {
    form.setFieldsValue({
      card_title: name,
      card_description: description,
      color_id: color,
    });
  }, []);

  return (
    <Modal
      className="cardModal"
      open={open}
      onCancel={close}
      title="Update Card"
      mask={false}
      width={350}
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        position: "relative",
        marginTop: "12%",
        padding: "1.2rem",
        height: "20rem",
      }}
    >
      <Form
        layout="horizontal"
        initialValues={{
          remember: true,
        }}
        onFinish={handleSubmit}
        form={form}
        autoComplete="off"
        className="gx-signin-form gx-form-row0"
        style={{
          maxWidth: 1000,
        }}
      >
        <Form.Item
          style={{ padding: ".5rem" }}
          label="Title"
          name="card_title"
          labelCol={{ span: 24 }}
          rules={[
            {
              required: true,
              message: "Card Title is required",
            },
          ]}
        >
          <Input value="abc" />
        </Form.Item>
        <Form.Item
          style={{ padding: ".5rem" }}
          label="Desc"
          name="card_description"
          labelCol={{ span: 24 }}
          rules={[
            {
              required: true,
              message: "Card description is required",
            },
          ]}
        >
          <Input.TextArea value="asdkjl" />
        </Form.Item>
        <Form.Item
          style={{ padding: ".5rem" }}
          label="Color"
          name="color_id"
          labelCol={{ span: 24 }}
          rules={[
            {
              required: true,
              message: "Color is required",
            },
          ]}
        >
          <Select options={colors} placeholder="Select Color" />
        </Form.Item>
        <Button htmlType="submit" type="primary" className="ml-2">
          Update
        </Button>
      </Form>
    </Modal>
  );
};

export const TodoModal = ({ open, close, cardId, tasks, getChaptersData, chapterId }) => {
  const [count, setCount] = useState([]);
  const form = useRef();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    sortTodoListItemsArray(tasks);
  }, []);

  const [todosArray, setTodosArray] = useState([
    {
      id: 0,
      item: "",
      date: moment(new Date()).format("DD-MM-YYYY"),
      time: moment(new Date()).format("hh:mm:ss"),
    },
  ]);

  const addTodo = () => {
    let check = todosArray.filter(
      (data) => data.item == "" || data.date == "" || data.time == ""
    );
    if (check.length != 0) {
      message.error("Please enter Todo list values");
      return;
    }
    let data = [...todosArray];
    let result = {
      id: 0,
      item: "",
      date: moment(new Date()).format("DD-MM-YYYY"),
      time: moment(new Date()).format("hh:mm:ss"),
    };
    data.push(result);
    setTodosArray(data);
  };

  const sortTodoListItemsArray = (list = []) => {
    if (list.length == 0) {
      setTodosArray([
        {
          id: 0,
          item: "",
          date: moment(new Date()).format("DD-MM-YYYY"),
          time: moment(new Date()).format("hh:mm:ss"),
        },
      ]);
    } else {
      let array = [];
      for (var key in list) {
        const obj = {
          id: list[key]?.id,
          item: list[key]?.todo_item,
          date: list[key]?.todo_date,
          time: list[key]?.todo_time,
          created_at: list[key]?.created_at,
        };
        array.push(obj);
      }
      setTodosArray(array);
    }
  };

  const handleSubmit = async (e) => {
    const token = localStorage.getItem("token");
    let check = todosArray.filter(
      (data) => data.item == "" || data.date == "" || data.time == ""
    );
    if (check.length != 0) {
      message.error("Please enter todo list values");
      return;
    }
    if (
      todosArray[0]?.item !== "" &&
      todosArray[0]?.date !== "" &&
      todosArray[0]?.time !== ""
    ) {
      console.log("newsort arrray", todosArray);
      let newSortArray = todosArray;
      for (var key in newSortArray) {
        delete newSortArray[key]?.created_at;
      }
      try {
        const { data } = await axios.post(
          "https://charliiapp.clickysoft.net/api/v1/card-tasks",
          {
            todos: newSortArray,
            card_id: cardId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("data", data);
        if (data) {
          console.log(data, "todo");
          message.success("todo has been added");
          setTimeout(() => {
            dispatch(getChapterCards(chapterId));
          }, 1000);
          setCount([]);
          close();
          
        }
      } catch (e) {
        console.log(e?.response?.data, "todo err");
        setCount([]);
        close();
      }
    }
  };

  const removeTodoListItem = async (item, index) => {
    let array = todosArray;
    const token = localStorage.getItem("token");
    array.splice(index, 1);
    setTodosArray([...array]);
    if (index == 0 && todosArray.length == 0) {
      setTodosArray([
        {
          id: 0,
          item: "",
          date: moment(new Date()).format("DD-MM-YYYY"),
          time: moment(new Date()).format("hh:mm:ss"),
        },
      ]);
    }
    if (item?.created_at == undefined) {
      return;
    }
    try {
      const { data } = await axios.delete(
        `https://charliiapp.clickysoft.net/api/v1/card-tasks/${item?.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("checked", data);
      if (data) {
        getChaptersData();
        setTimeout(() => {
          dispatch(getChapterCards(chapterId));
        }, 1000);
        close();
      }
    } catch (e) {
      console.log("look up a call", e?.response?.data);
      close();
    }
  };

  const setTodosArrayList = (value, index, name) => {
    let data = [...todosArray];
    data[index] = { ...data[index], [name]: value };
    setTodosArray(data);
  };

  return (
    <Modal
      className="cardModal"
      open={open}
      onCancel={close}
      title="Add Todo"
      mask={false}
      width={550}
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        position: "relative",
        marginTop: "12%",
        padding: "1.2rem",
        height: "20rem",
      }}
    >
      <div
        style={{
          maxWidth: 1000,
        }}
      >
        {todosArray.map((c, index) => {
          return (
            <div className="d-flex">
              <Form.Item
                style={{ padding: "0 .5rem 0 .5rem", marginBottom: 0 }}
                label="Title"
                name={`todos[${index}][item]`}
                labelCol={{ span: 24, marginBottom: 0 }}
              >
                <div>
                  <Input
                    value={todosArray[index].item}
                    onChange={(e) =>
                      setTodosArrayList(e.target.value, index, "item")
                    }
                  />
                </div>
              </Form.Item>
              <Form.Item
                style={{ padding: "0 .5rem 0 .5rem", marginBottom: 0 }}
                label="Date"
                labelCol={{ span: 24, marginBottom: 0 }}
              >
                <div
                  labelCol={{ span: 24 }}
                  style={{ padding: "0 .5rem 0 .5rem", marginBottom: 0 }}
                >
                  <DatePicker
                    onChange={(date) =>
                      setTodosArrayList(
                        moment(new Date(date)).format("DD-MM-YYYY"),
                        index,
                        "date"
                      )
                    }
                    value={moment(todosArray[index].date, "DD-MM-YYYY")}
                  />
                </div>
              </Form.Item>
              <Form.Item
                style={{ padding: "0 .5rem 0 .5rem", marginBottom: 0 }}
                label="Time"
                labelCol={{ span: 24, marginBottom: 0 }}
              >
                <div
                  labelCol={{ span: 24 }}
                  style={{ padding: "0 0 0 .5rem", marginBottom: 0 }}
                >
                  <TimePicker
                    onChange={(time) =>
                      setTodosArrayList(
                        moment(time).format("hh:mm:ss"),
                        index,
                        "time"
                      )
                    }
                    value={moment(todosArray[index].time, "hh:mm:ss")}
                  />
                </div>
              </Form.Item>
              <Form.Item
                style={{
                  padding: "0 .5rem 0 .5rem",
                  marginBottom: 10,
                }}
                name={`todos[${index}][item]`}
                label=" "
                labelCol={{ span: 24, cursor: "pointer" }}
              >
                <div
                  onClick={() => removeTodoListItem(c, index)}
                  labelCol={{ span: 24 }}
                >
                  <CloseCircleOutlined />
                </div>
              </Form.Item>
            </div>
          );
        })}
        <div
          style={{
            flex: 1,
            flexDirection: "row",
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: 30,
            marginTop: 20,
          }}
        >
          <Button onClick={() => addTodo()} style={{ marginRight: "30px" }}>
            Add Todo Fields
          </Button>
          <Form.Item>
            <Button onClick={handleSubmit} htmlType="submit" type="primary">
              Submit
            </Button>
          </Form.Item>
        </div>
      </div>
    </Modal>
  );
};

export default OutlineSideModal;
