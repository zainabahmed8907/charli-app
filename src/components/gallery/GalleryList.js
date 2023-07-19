import { Col, Divider, Menu, Modal, Row, Upload } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import {
  deleteGalleryimage,
  getGalleryData,
} from "../../redux/Slice/GallerySlice";
import "./gallery.css";

const GalleryList = ({
  gallery,
  setSelectedFile,
  fileList,
  dummyRequest,
  handlePreview,
  handleChangeImage,
  uploadButton,
  previewOpen,
  previewTitle,
  handleCancel,
  previewImage,
  uploadImage,
  deleteGallery
}) => {

  return (
    <Menu className="Menu">
      <p className="change_book">Change Book ArtWork</p>
      <Menu.Item>
        <Row
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            marginTop: 10,
          }}
        >
          {gallery?.length > 0 &&
            gallery?.map((g) => {
              return (
                <div>
                   {/* <button
                    className="deletimg"
                    onClick={() => deleteGallery(g?.id)}
                  >
                    <p>X</p>
                  </button> */}
                  <Col
                    onClick={() => {
                      setSelectedFile(g);
                    }}
                    style={{
                      padding: "5px",
                      border: "1px dashed black",
                      height: "55px",
                      borderRadius: "4px",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginRight: "20px",
                      marginBottom: "20px",
                    }}
                    key={g?.id}
                  >
                    <img
                      height="45"
                      width="28"
                      src={g?.image_url ?? null}
                      alt="artwork"
                      name="image_id"
                    />

                  </Col>
                 
                </div>
              )
            })}
        </Row>
        <Divider />
        <Upload
          accept=".png"
          listType="picture-card"
          fileList={fileList}
          customRequest={dummyRequest}
          onPreview={handlePreview}
          onChange={handleChangeImage}
          beforeUpload={(file) => {
            const isJPG =
              file.type === "image/jpeg" || file.type === "image/png";
            if (!isJPG) {
              console.error("You can only upload JPG or PNG file!");
              return false;
            } else {
              return true;
            }
          }}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
        <Divider />
        <div className="upload_btns">
          <button type="button">Cancel</button>
          <button onClick={() => uploadImage()} type="button">
            Ok
          </button>
        </div>
      </Menu.Item>
    </Menu>
  );
};

export default GalleryList;
