import {
  Drawer,
  Input,
  Dropdown,
  Button,
  Select,
  Switch,
  Form,
} from "antd";


import React, { useCallback, useEffect, useState } from "react";
import "./outline-side-modal/outlinemodal.css";
import newbook from "../assets/images/newbook.png";
import TextArea from "antd/lib/input/TextArea";
import { useDispatch, useSelector } from "react-redux";

import { getColorData } from "../redux/Slice/ColorSlice";
import { getGalleryData } from "../redux/Slice/GallerySlice";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import GalleryList from "./gallery/GalleryList";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const UpdateBookDrawer = ({ open, close, onSubmit, id }) => {
  const [commentsLength, setCommentsLength] = useState(2);
  const [selectFile, setSelectedFile] = useState({});
  const [show, setShow] = useState(true);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  const { colors } = useSelector((state) => state.colors);
  const { seriesData } = useSelector((state) => state.series);
  const { book_data } = useSelector((state) => state.books);
  const { gallery } = useSelector((state) => state.galleries);

  const [bookList, setBookList] = useState({
    books: [],
  });

  const updateData =
    book_data[0]?.length > 0 && book_data[0]?.filter((book) => book?.id === id);

  const bookName = updateData[0]?.book_name;

  const description = updateData[0]?.book_description;
  const color = updateData[0]?.color_id;
  const image_id = updateData[0]?.image_id;
  const isfinished = updateData[0]?.is_finished;
  const series_name = updateData[0]?.series_name;
  const [image, setImage] = useState();
  const seriesIDs = seriesData[0]?.map(s => s.id);
  const series_id = updateData[0]?.series_id;
  console.log(series_id);

  const handleChange = (e) => {
    let value = e.target.value;
    setBookList({
      ...bookList,
      [e.target.name]: value,
    });
  };

  const dispatch = useDispatch();

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChangeImage = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const colors_data = useCallback(() => {
    dispatch(getColorData());
  }, [dispatch]);

  const gallery_data = useCallback(() => {
    dispatch(getGalleryData());
  }, [dispatch]);

  const [form] = Form.useForm();

  useEffect(() => {
    colors_data();
    gallery_data();
    setImage(updateData[0]?.image_url ?? newbook);
    console.log(colors, seriesData);
    form.setFieldsValue({
      image_id: image,
      book_name: bookName,
      book_description: description,
      color_id: color,
      // series_id: seriesIDs,
      is_finished: isfinished,
    });
  }, []);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload your own
      </div>
    </div>
  );

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const uploadImage = async () => {
    const form = new FormData();
    const token = localStorage.getItem("token");
    form.append("image", fileList[0].originFileObj);

    const { data } = await axios.post(
      `https://charliiapp.clickysoft.net/api/v1/user-galleries`,
      form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setSelectedFile(data?.data);
    gallery_data();
  };

  const handleSubmit = (e) => {
    let data = { ...e };
    console.log("data", data);
    if (selectFile?.image_url || image) {
      data.image_id = selectFile?.id ?? image_id;
    }
    // if (selectFile?.image_url == null) {
    //   data.image_id = null;
    // }
    data.is_finished = e.is_finished === true ? 1 : 0;
    data.book = bookList.books;


    onSubmit(data);

  };
  const { Option } = Select;

  return (
    <>
      <Drawer
        title="Update Book"
        placement="right"
        onClose={close}
        open={open}
        className="p-1 drawer"
        zIndex={1}
        autoFocus={false}
        mask={false}
        style={{ position: "fixed" }}
      >
        <Form
          form={form}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 24,
          }}
          layout="horizontal"
          initialValues={{
            remember: true,
          }}
          onFinish={handleSubmit}
          autoComplete="off"
          className="gx-signin-form gx-form-row0"
          style={{
            maxWidth: 1000,
          }}
        >
          <label>Artwork</label>
          <div className="artworkContainer mt-2">
            <Dropdown
              trigger={["click"]}
              overlay={
                <GalleryList
                  gallery={gallery}
                  setSelectedFile={setSelectedFile}
                  fileList={fileList}
                  dummyRequest={dummyRequest}
                  handlePreview={handlePreview}
                  handleChangeImage={handleChangeImage}
                  uploadButton={uploadButton}
                  previewOpen={previewOpen}
                  previewTitle={previewTitle}
                  handleCancel={handleCancel}
                  previewImage={previewImage}
                  uploadImage={uploadImage}
                />
              }
              overlayStyle={{
                minWidth: "180px",
                right: "-10px",
              }}
            >
              <div className="artwork">
                <img
                  src={selectFile?.image_url ?? image}

                  alt="book"
                  style={{
                    width: "80px",
                    padding: "5px",
                    border: "1px dashed black",
                    marginTop: "-5px",
                    height: "80px",
                    marginLeft: "-2px",
                    borderRadius: "4px",
                  }}
                />
                <button
                  type="button"
                  style={{
                    backgroundColor: "#575A60",
                    color: "white",
                    borderColor: "#575A60",
                  }}
                >
                  Change
                </button>
              </div>
            </Dropdown>

            <button
              onClick={() => {
                setSelectedFile(null);
                setImage(newbook)
              }}
              type="button"
              style={{
                backgroundColor: "white", color: "black", texAliign: 'center',
                borderRadius: "7px",
                height: "40px",
                width: "80px"
              }}
            >
              Remove
            </button>
          </div>
          <Form.Item
            label="Title"
            name="book_name"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "Name is required",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="book_description"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "Description is required",
              },
            ]}
          >
            <TextArea style={{ padding: "6px" }}></TextArea>
          </Form.Item>
          <Form.Item
            label="Color"
            name={"color_id"}
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

          <Form.Item
            label="Series"
            name="series_id"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: false,
                message: "Please select Series",
              },
            ]}
          >
            <Select value={selectedOption}
              placeholder="Series Name" onChange={e => setSelectedOption(e?.target)} >
              {seriesData[0]?.map(s => (
                <Option value={s?.id}>
                  {s?.series_name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <div className="mt-1 ">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <label htmlFor="finish" className="mr-5">
                Is the Book finished
              </label>
              <span className="ml-5">
                <Form.Item name={"is_finished"}>
                  <Switch defaultChecked={isfinished == 1 ? true : false} />
                </Form.Item>
              </span>
            </div>
          </div>
          <div className="buttons-container d-flex mt-2">
            <button
              type="submit"
              className="mr-2"
              style={{ cursor: "pointer" }}
            >
              Update
            </button>
            <Button onClick={() => close()} type="ghost">
              Cancel
            </Button>
          </div>
        </Form>
      </Drawer >
    </>
  );
};
