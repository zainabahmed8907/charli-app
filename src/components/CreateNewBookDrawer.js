import {
  Drawer,
  Input,
  Dropdown,
  Button,
  Select,
  Switch,

  Form,
  Checkbox,
} from "antd";

import React, { useCallback, useEffect, useRef, useState } from "react";
import "./outline-side-modal/outlinemodal.css";
import newbook from "../assets/images/newbook.png";
import TextArea from "antd/lib/input/TextArea";
import { useDispatch, useSelector } from "react-redux";

import { deleteGalleryimage, getGalleryData } from "../redux/Slice/GallerySlice";
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

export const CreateNewBookDrawer = ({ open, close, onSubmit, status }) => {
  const [selectFile, setSelectedFile] = useState({});
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const { colors } = useSelector((state) => state.colors);
  const { seriesData, booksOfSeries } = useSelector((state) => state.series);
  const { book_data } = useSelector((state) => state.books);
  const { gallery } = useSelector((state) => state.galleries);
  const form = useRef();
  const [forms] = Form.useForm();

  const [bookList, setBookList] = useState({
    books: [],
  });

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

  const gallery_data = useCallback(() => {
    dispatch(getGalleryData());
  }, [dispatch]);

  useEffect(() => {
    gallery_data();
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

  const deleteGallery = (id) => {
    fileList?.filter(file => file?.id !== id);
    dispatch(deleteGalleryimage(id));

    setTimeout(() => {
      dispatch(getGalleryData());
    }, 1000);
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
    if (selectFile?.image_url) {
      data.image_id = selectFile?.id;
    }
    if (selectFile?.image_url == null) {
      data.image_id = null;
    }

    data.is_finished = e.is_finished == true ? 1 : 0;
    if (status == 1 && "Create new series") {
      data.book = bookList.books;
    }
    form?.current?.resetFields();
    onSubmit(data);
      forms.resetFields();
    setSelectedFile(null);

  };

  return (
    <>
      <Drawer
        title={status === 1 ? "Create new Series" : "Create new Book"}
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
          ref={form}
          form={forms}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 24,
          }}
          layout="horizontal"
          initialValues={{
            remember: false,
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
              trigger={['click']}
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
                  deleteGallery={deleteGallery}

                />
              }
              overlayStyle={{
                minWidth: "180px",
                right: "-10px",
              }}
            >
              <div className="artwork">
                <img
                  src={selectFile?.image_url ?? newbook}
                  alt="book"
                  style={{
                    width: "80px",
                    padding: "5px",
                    border: "1px dashed black",
                    marginTop: "-5px",
                    height: "80px",
                    borderRadius: "4px",
                    marginBottom: "10px"
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
              onClick={(e) => {
                e.preventDefault();

                setSelectedFile(null)
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
            name={status == 1 ? "series_name" : "book_name"}
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
            name={status == 1 ? "series_description" : "book_description"}
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "Description is required",
              },
            ]}
          >
            <TextArea
              style={{ padding: "6px" }}
              name="book_description"
            ></TextArea>
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
          {status == 2 && (
            <Form.Item
              label="Series"
              name={"series_id"}
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: false,
                  message: "Please select Series",
                },
              ]}
            >
              <Select options={seriesData[0]} placeholder="Series Name" />
            </Form.Item>
          )}
          {status == 1 && (
            <div className="mt-2">
              <label htmlFor="checkbox">Other books in series name</label>
              <Form.Item name="books">
                <br />
                {book_data[0]?.length > 0 &&
                  book_data[0]?.map((b, index) => {
                    return (
                      <li key={index} style={{ listStyle: "none" }}>

                        <Checkbox
                          name="books"
                          value={[...bookList.books, b.id]}
                          onChange={handleChange}
                          className="gray"
                        >
                          <p style={{ textDecoration: "underline" }}>
                            <span className="mr-2">
                              <img
                                src={b?.image_url}
                                width="20"
                                height="20"
                                alt=""
                              />
                            </span>
                            {b?.book_name}
                          </p>
                        </Checkbox>
                      </li>
                    );
                  })}
              </Form.Item>
              <br />
            </div>
          )}
          <div className="mt-1 ">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <label htmlFor="finish" className="mr-5">
                {status == 1
                  ? "Is the Series finished"
                  : "Is the Book finished"}
              </label>
              <span className="ml-5">
                <Form.Item name={"is_finished"}>
                  <Switch />
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
              Add
            </button>
            <Button onClick={close} type="ghost">
              Cancel
            </Button>
          </div>
        </Form>
      </Drawer >
    </>
  );
};
