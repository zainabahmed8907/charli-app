import {
  Drawer,
  Input,

  Form,
  Select,
  Button,
  Dropdown,
} from "antd";
import axios from "axios";

import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import newbook from "../../assets/images/newbook.png";
import { getColorData } from "../../redux/Slice/ColorSlice";
import { deleteGalleryimage, getGalleryData } from "../../redux/Slice/GallerySlice";
import "./add-event-drawer/addEvent.scss";
import GalleryList from "../gallery/GalleryList";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const AddEventDrawer = ({ open, close, isUpdate, onSubmit, timelineId }) => {
  const { id } = useParams();

  const [selectFile, setSelectedFile] = useState({});
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const { colors } = useSelector((state) => state.colors);
  const { gallery } = useSelector((state) => state.galleries);
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
  }, [dispatch]);


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
  const { timelineData } = useSelector((state) => state.timeline);
  const updateData =
    timelineData?.length > 0 &&
    timelineData?.filter((item) => item?.id === timelineId);

  const timelineName = updateData[0]?.name;
  const description = updateData[0]?.description;
  const color = updateData[0]?.color_id;
  const [image, setImage] = useState(updateData[0]?.image_url);
  const image_id = updateData[0]?.image_id;
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


  useEffect(() => {
    dispatch(getColorData());
    gallery_data();
    setImage(updateData[0]?.image_url ?? newbook);
    form.setFieldsValue({
      name: timelineName,
      description: description,
      color_id: color,
      image_id: image,
    });
  }, []);
  return (
    <Drawer
      title={isUpdate ? "Update Timeline" : "Create New Timeline"}
      placement="right"
      onClose={close}
      open={open}
      className="p-0 drawer"
      zIndex={0}
      autoFocus={false}
      mask={false}
    >
      <Form onFinish={handleSubmit} form={form}>
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
          label="Name"
          labelCol={{ span: 24 }}
          name="name"
          rules={[
            {
              required: true,
              message: "Please Enter Outline Title!",
            },
          ]}
        >
          <Input placeholder="Enter TimeLine Name" />
        </Form.Item>
        <div className="mt-4 mb-3">
          <Form.Item
            label="colors"
            name="color_id"
            labelCol={{ span: 24 }}
            className="mb-3"
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
        <div className="mt-4">
          <Form.Item
            label="Description"
            labelCol={{ span: 24 }}
            name="description"
          >
            <Input.TextArea placeholder="description" rows={5} />
          </Form.Item>
        </div>

        <div className="buttons-container mt-5 d-flex space-between">
          <button type="submit" className="mr-2" style={{ cursor: "pointer" }}>
            Save
          </button>
          <Button type="ghost" onClick={() => close()}>Cancel</Button>
        </div>
      </Form>
    </Drawer>
  );
};

export default AddEventDrawer;