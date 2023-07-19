import { Button, Modal } from "antd";
const PackageAvailableModal = ({ open, ok, cancel, title }) => {
  return (
    <Modal
      className="chapterModal"
      title="Package Subscription"
      open={open}
      onOk={ok}
      onCancel={cancel}
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
      <div style={{ padding: 10, justifyContent: "center" }}>
        <p
          style={{ fontSize: 16, fontWeight: "bold", textAlign: "center" }}
        >{`Your current package doesn't have access to ${title} feature`}</p>
      </div>
    </Modal>
  );
};

export default PackageAvailableModal;
