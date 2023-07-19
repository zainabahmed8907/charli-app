import {
  Drawer,
  Checkbox,
  Input,
  Space,
  Tag,
  Form,
  Button,
  Select,

  Dropdown,
} from "antd";
import axios from "axios";

import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { deleteGalleryimage, getGalleryData } from "../../../redux/Slice/GallerySlice";
import newbook from "../../../assets/images/newbook.png";
import "./addEvent.css";
import { getColorData } from "../../../redux/Slice/ColorSlice";
import { useEffect } from "react";
import GalleryList from "../../gallery/GalleryList";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const AddOutlineEventDrawer = ({
  open,
  close,
  isUpdate,
  onSubmit,
  outlineID,
}) => {
  const { id } = useParams();

  const [selectFile, setSelectedFile] = useState({});
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const { colors } = useSelector((state) => state.colors);
  const { gallery } = useSelector((state) => state.galleries);
  const { outlineData } = useSelector((state) => state.outline);
  const [form] = Form.useForm();

  const handleSubmit = (e) => {
    let data = { ...e };
    if (selectFile?.image_url || image) {
      data.image_id = selectFile?.id ?? image_id;
    }
    if (selectFile?.image_url == null) {
      data.image_id = null;

    }
    data.book_id = parseInt(id);
    onSubmit(data);
    if (!isUpdate) {
      form.resetFields();
      setSelectedFile(null);

    }
  };
  const handleCancel = () => setPreviewOpen(false);

  const handleChangeImage = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

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

  //dispatching ACTIONS
  const dispatch = useDispatch();
  const gallery_data = useCallback(() => {
    dispatch(getGalleryData());
  }, []);



  const deleteGallery = (id) => {
    fileList?.filter(file => file?.id !== id);
    dispatch(deleteGalleryimage(id));

    setTimeout(() => {
      dispatch(getGalleryData());
    }, 1000);
  };

  //uploadImage Function
  const uploadImage = async () => {
    const form = new FormData();
    const token = localStorage.getItem('token');
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
  const uploadButton = (
    <div>
      <div
        style={{
          marginTop: 8,
        }}
      >
        Attachments
      </div>
    </div>
  );


  const updateData =
    outlineData?.length > 0 &&
    outlineData?.filter((item) => item?.id === outlineID);

  const outlineName = updateData[0]?.outline_name;

  const outlineTitle = updateData[0]?.outline_title;

  const description = updateData[0]?.description;
  const color = updateData[0]?.color_id;
  const [image, setImage] = useState();
  const image_id = updateData[0]?.image_id;


  useEffect(() => {
    dispatch(getColorData());
    gallery_data();
    setImage(updateData[0]?.image_url ?? newbook);
    form.setFieldsValue({
      image_id: image,
      outline_title: outlineTitle,
      description: description,
      color_id: color,
      outline_name: outlineName,
    });
  }, []);
  return (
    <Drawer
      title={isUpdate ? "Update Outline" : "Add Outline"}
      placement="right"
      onClose={close}
      open={open}
      className="p-1 drawer"
      zIndex={0}
      autoFocus={false}
      mask={false}
    >
      <Form onFinish={handleSubmit} form={form}>

        <div className="artworkContainer mt-2">
          <Dropdown
            trigger={['click']}
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
              deleteGallery={deleteGallery}

            />}
            overlayStyle={{
              minWidth: "180px",
              right: "-10px",
            }}
          >
            <div className="artwork">
              <img
                src={isUpdate ? selectFile?.image_url ?? image : selectFile?.image_url ?? newbook}

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
              setImage(newbook);
            }}
            type="button"
            style={{
              backgroundColor: "white", color: "black", texAliign: 'center',
              borderRadius: "2px",
              height: "40px",
              width: "80px"
            }}
          >
            Remove
          </button>
        </div>
        <Form.Item
          label="Title"
          labelCol={{ span: 24 }}
          name="outline_title"
          rules={[
            {
              required: true,
              message: "Please Enter Outline Title!",
            },
          ]}
        >
          <Input placeholder="Enter Title" />
        </Form.Item>

        <div className="mt-2">
          <Form.Item
            label="Label"
            name="outline_name"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "Please Enter Outline Name!",
              },
            ]}
          >
            <Input placeholder="Enter Outline Name" />
          </Form.Item>
        </div>


        <div className="mt-2">
          <Form.Item
            label="colors"
            name="color_id"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "Please Select a Color!",
              },
            ]}
          >
            <Select options={colors} placeholder="Select Color" />
          </Form.Item>
        </div>

        {/* <div className="mt-4">
          <label for="due-date">Shared</label>
          <br />
          <button className="shared">+</button>
        </div> */}
        <div className="mt-2">
          <Form.Item
            label="Description"
            labelCol={{ span: 24 }}
            name="description"
          >
            <Input.TextArea placeholder="description" rows={7} />
          </Form.Item>
        </div>

        <div className="buttons-container mt-3 d-flex space-between">
          <button type="submit" className="mr-2" style={{ cursor: "pointer" }}>
            Save
          </button>
          <Button type="ghost" onClick={() => close()}>Cancel</Button>
        </div>
      </Form>
    </Drawer>
  );
};

export default AddOutlineEventDrawer;
