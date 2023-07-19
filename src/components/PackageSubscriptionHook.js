import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { PACKAGES } from "../constant/constant";
import PackageAvailableModal from "../components/PackagAvailableModal";
import { Modal } from "antd";

const SubscriptionModal = ({ open, ok, cancel }) => {
  return (
    <Modal
      className="chapterModal"
      title="Package Subscription"
      open={open}
      onOk={ok}
      onCancel={cancel}
      mask={false}
      width={450}
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
        >{`Your have not subscribed to any feature`}</p>
      </div>
    </Modal>
  )
}
const PackageSubscriptionHook = forwardRef(
  ({ checkPackageSubscription, title, feature, packageName }, ref) => {
    const [packagesDetails, setPackagesDetails] = useState(false);
    const [newMarkerOpened, setNewMarkerOpened] = useState(false);
    const { token } = useSelector((state) => state.auth);
    const [packageModal, setPackageModal] = useState(false);

    const showPackageModal = () => {
      setPackageModal(true);
    }

    const handlePackageOk = () => {
      setPackageModal(false);
    };
    const handlepackageCancel = () => {
      setPackageModal(false);
    };
    console.log("packagedeta", token.user);
    console.log("packagen name", packageName);

    useImperativeHandle(ref, () => ({
      showModalAction() {
        showModal();
      },
    }));

    useEffect(async () => {
      await getPackageDetails();
      await checkSubscription();

    }, []);
    useEffect(() => {
      if (token?.user?.package_options?.length == 0) {
        showPackageModal();
   
      }
    }, [])

    const checkSubscription = async () => {
      let filter = token.user?.package_options?.filter(
        (item) => PACKAGES[feature]?.slug == item?.slug
      );
      if (filter[0]?.available) {
        checkPackageSubscription(filter[0]?.available);
      } else {
        const array = [];
        for (var key in packagesDetails) {
          let find = packagesDetails[key]?.options.filter(
            (item) => PACKAGES[packageName]?.slug == item?.slug
          );
          if (find[0]?.available) {
            array.push(packagesDetails[key]);
          }
        }
        console.log("aaaa", array);
      }
    };

    const getPackageDetails = async () => {
      // setLoader(true);
      try {
        const { data } = await axios.get(
          "https://charliiapp.clickysoft.net/api/v1/packages",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (data) {
          console.log("package", data);
          setPackagesDetails(data?.data);
        }
      } catch (error) {
        console.debug(error);
        // setLoader(false);
      }
    };

    const showModal = () => {
      setNewMarkerOpened(true);
    };

    const handleUpdateOk = () => {
      setNewMarkerOpened(false);
    };
    const handleUpdateCancel = () => {
      setNewMarkerOpened(false);
    };

    return (
      <div className="main-container">
        <PackageAvailableModal
          open={newMarkerOpened}
          ok={handleUpdateOk}
          cancel={handleUpdateCancel}
          title={title}
        />
        <SubscriptionModal
          open={packageModal}
          ok={handlePackageOk}
          cancel={handlepackageCancel}
        />
      </div>
    );
  }
);

export default PackageSubscriptionHook;
