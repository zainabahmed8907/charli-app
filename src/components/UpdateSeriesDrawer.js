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
import face1 from "../assets/images/face-1.jpg";
import face2 from "../assets/images/face-2.jpg";
import douglas from "../assets/images/douglas.png";

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
import { getBookofSeries } from "../redux/Slice/SeriesSlice";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const UpdateSeriesDrawer = ({ open, close, onSubmit, id }) => {
  const [selectFile, setSelectedFile] = useState({});
  const [show, setShow] = useState(true);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [checkAll, setCheckAll] = useState([]);
  const { colors } = useSelector((state) => state.colors);
  const { seriesData, booksOfSeries } = useSelector((state) => state.series);
  const { book_data } = useSelector((state) => state.books);
  const { gallery } = useSelector((state) => state.galleries);


  const [bookList, setBookList] = useState({
    books: [],
  });
  const updateData =
    seriesData[0]?.length > 0 &&
    seriesData[0]?.filter((series) => series?.id === id);

  const seriesName = updateData[0]?.series_name;
  const description = updateData[0]?.series_description;
  const color = updateData[0]?.color_id;
  const [image, setimage] = useState();
  const image_id = updateData[0]?.image_id;
  const isfinished = updateData[0]?.is_finished;
  const checkedBooks = updateData[0]?.books;

  const handleChange = (e) => {
    let value = e;
    setBookList({
      ...bookList,
      value,
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


  const checkedBookValue = booksOfSeries[0]?.length > 0 && booksOfSeries[0]?.map(book => book.value);

  useEffect(() => {
    colors_data();
    gallery_data();
    dispatch(getBookofSeries(id));
    setimage(updateData[0]?.image_url ?? newbook);
    form.setFieldsValue({
      image_id: image,
      series_name: seriesName,
      series_description: description,
      color_id: color,
      is_finished: isfinished,
      books: checkedBooks
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
    if (selectFile?.image_url || image) {
      data.image_id = selectFile?.id ?? image_id;
    }
    if (selectFile?.image_url == null) {
      data.image_id = null;

    }
    data.is_finished = e.is_finished === true ? 1 : 0;
    data.books = bookList.books;


    onSubmit(data);

  };

  return (
    <>
      <Drawer
        title="Update Series"
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
         
          onFinish={handleSubmit}
          
        >
          <label>Artwork</label>
          <div className="artworkContainer mt-2">
            <Dropdown
              trigger={["click"]}
              overlay={<GalleryList
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

              />}
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
                setimage(newbook);
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
          {selectFile?.image_url}
          <Form.Item
            label="Title"
            name="series_name"
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
            name="series_description"
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

          <div className="mt-2">
            <label htmlFor="checkbox">Other books in series name</label>
            <br />
            <div id="checkbox-group"
              style={{ display: "flex", flexDirection: "column" }}>
              <Checkbox.Group

                options={book_data[0]}
                defaultValue={checkedBookValue}
                onChange={handleChange}

                name="books"
              />

            </div>
            <br />
          </div>

          <div className="mt-1 ">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <label htmlFor="finish" className="mr-5">
                Is the Series finished
              </label>
              <span className="ml-5">
                <Form.Item name="is_finished">
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
      </Drawer>
    </>
  );
};
