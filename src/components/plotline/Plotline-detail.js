import {
  Card,
  Row,
  Col,
  Space,
  Button,
  Dropdown,
  // Menu,
  Divider,
  Input
} from 'antd';
import More from '../../assets/icons/menu.svg';
import React, { useState, useEffect } from 'react';
import BookNameOutline from '../cards/outline-cards/book-name-outline/BookNameOutlineCard';
import { EditFilled, PlusOutlined } from '@ant-design/icons';
import Accept from '../../assets/icons/accept.svg';
import close from '../../assets/icons/Close.svg';
import Menu from '../../assets/icons/menu.svg';
import { Popover } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getPlotline, getPlotPlanner } from '../../redux/Slice/PlotlineSlice';
import { useParams } from 'react-router-dom';
import FullPageSpinner from '../loader/FullPageSpinner';
import PlotPlannerModal from './PlotPlannerModal';
import PlotPlanner from './PlotPlanner';
import axios from 'axios';
import UpdateEventModal from '../UpdateEventModal';
import EditPlotLineModal from '../EditPlotLineModal';
import AddNewMarkerModal from '../AddNewMarkerModal';
import EditMarkerModal from '../EditMarkerModal';

const PlotlineDetail = (props) => {
  const [currentData, setCurrentData] = useState(defaultData);
  const [scroll, setScroll] = useState(false);
  const [enableCursor, setEnableCursor] = useState(false);
  const { plotline, loading, plotplanner } = useSelector(
    (state) => state.plotline
  );
  const name = plotplanner[0]?.data?.plot_planner_title;
  const desc = plotplanner[0]?.data?.description;

  const dispatch = useDispatch();
  const { id } = useParams();
  const [plotData, setPlotData] = useState([]);

  const [selectedColor, setSelectedColor] = useState('');
  const [open, setOpen] = useState(false);
  const [lineIndex, setLineIndex] = useState(-1);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(-1);
  const [selectedLabelText, setSelectedLabelText] = useState('');
  const [plotlineNameUpdated, setPlotlineNameUpdated] = useState('');
  const [selectedPlot, setSelectedPlot] = useState(-1);
  const [newMarkerOpened, setNewMarkerOpened] = useState(false);
  const [editMarkerOpened, setEditMarkerOpened] = useState(false);
  const [plotlineName, setPlotlineName] = useState('');
  const [markerLabel, setMarkerLabel] = useState('');
  const [modalText, setModalText] = useState('Content of the modal');

  console.log("plotline", plotplanner);
  const Content = ({ e_id, path_id, data }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const deleteevent = (eid) => {
      editPlotlineHandler({ param: 'onDelete', ids: eid });
      console.log('cjececce', eid);
    };
    const showUpdateModal = () => {
      setIsModalOpen(true);
    };
    const handleUpdateOk = () => {
      setIsModalOpen(false);
    };
    const handleUpdateCancel = () => {
      setIsModalOpen(false);
    };

    const EditEvent = (data) => {
      setSelectedColor(data.color_code);
      setPlotlineNameUpdated(data.event_type);
      setTimeout(() => {
        editPlotlineHandler({
          param: '',
          ids: -1,
          selectedColor: data.color_code,
          plotlineNameUpdated: data.event_type
        });
      }, 500);
    };

 
    return (
      <div>
        <div
          className="edit"
          onClick={(e) => {
            e.preventDefault();
            showUpdateModal();
          }}
        >
          <button>
            Edit
            <span className="ml-2">
              <i className="fa fa-check"></i>
            </span>
          </button>
        </div>

        <div className="delete-btn">
          <button
            onClick={() => {
              deleteevent(e_id);
            }}
          >
            Delete
            <span className="ml-2">
              <i className="fa fa-times"></i>
            </span>
          </button>
        </div>
        <EditPlotLineModal
          title={data?.title}
          lineColor={data?.lineColor}
          open={isModalOpen}
          ok={handleUpdateOk}
          cancel={handleUpdateCancel}
          onSubmit={EditEvent}
          event_id={e_id}
        />
      </div>
    );
  };

  const handleOk = (data) => {
    setModalText('The modal will be closed after two seconds');
    addNewPlotlineHandler(data);
    setConfirmLoading(true);
    setOpen(false);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const showModal = () => {
    setOpen(true);
  };

  useEffect(() => {
    getPlotPlannerDetails();
    dispatch(getPlotPlanner(id));
  }, []);

  const getPlotPlannerDetails = async () => {
    setConfirmLoading(true);
    try {
      const { data } = await axios.get(
        `https://charliiapp.clickysoft.net/api/v1/plot-planners/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      if (data) {
        setPlotData(data.data);
        if (JSON.parse(data.data.plotlines_json) == null) {
          console.log('fetching null');
        } else {
          setCurrentData(JSON.parse(data.data.plotlines_json));
        }
        // navigation.setOptions({ headerTitle: 'Plot Planner' });
        setConfirmLoading(false);
      }
    } catch (error) {
      console.debug(error);
      setConfirmLoading(false);
    }
  };

  //Add new plotlinehandler
  const addNewPlotlineHandler = async (data) => {
    const { plotline_title, lineColor, plot_planner_id } = data;
    if (plotline_title === '') {
      // return Toast.show('Enter plotline name');
    }
    if (lineColor === '') {
      // return Toast.show('Select a color');
    }
    setConfirmLoading(true);
    try {
      const response = await axios.post(
        `https://charliiapp.clickysoft.net/api/v1/save-plot-lines/${plot_planner_id}`,
        {
          plot_planner_id: plot_planner_id,
          plotlines_json: JSON.stringify([
            ...currentData,
            {
              title: plotline_title,
              pointerColor: lineColor,
              lineColor: lineColor,
              data: [
                {
                  x: 1.2,
                  y: 3,
                  custom_label: `${plotline_title} 1`
                },
                {
                  x: 3,
                  y: 3,
                  custom_label: `${plotline_title} 2`
                },
                {
                  x: 4.8,
                  y: 3,
                  custom_label: `${plotline_title} 3`
                }
              ]
            }
          ])
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      if (response.data) {
        getPlotPlannerDetails();
        setConfirmLoading(false);
        setPlotlineName('');
        setSelectedColor('');
      }
    } catch (e) {
      setConfirmLoading(false);
      // Toast.show(e?.response?.data?.message);
    }
  };

  // edit a plotline
  const editPlotlineHandler = async ({
    param = '',
    ids = -1,
    plotlineNameUpdated = '',
    selectedColor = '',
    markerLabel: markerLabel,
    selectedPlot: selectedPlot,
    selectedLabel: selectedLabel,
    selectedLabelText: selectedLabelText
  }) => {
    setEnableCursor(false);
    if (currentData.length > 0) {
      if (plotlineNameUpdated === '' && param == '') {
        // return Toast.show('Enter plotline name');
      }
      if (selectedColor === '' && param == '') {
        // return Toast.show('Select a color');
      }
      setConfirmLoading(true);
      try {
        let newD = [...currentData];
        if (param == '') {
          newD[lineIndex].title = plotlineNameUpdated;
          console.log('sssss', newD[lineIndex].title);
          newD[lineIndex].pointerColor = selectedColor;
          newD[lineIndex].lineColor = selectedColor;
          console.log('dataset', lineIndex);
          console.log('dataset222', newD);
        } else if (param == 'onDelete') {
          console.log('ondelete');
          newD.splice(ids, 1);
        } else if (param == 'onEnd') {
          console.log('onend');
          newD = [...currentData];
        } else if (param == 'onAddMarker') {
          console.log('1111');
          if (selectedPlot < 0) {
            setConfirmLoading(false);
            // return Toast.show('Select any plotline');
          }
          if (currentData[selectedPlot].data.length > 4) {
            console.log('2222');
            setConfirmLoading(false);
            setPlotlineNameUpdated('');
            setSelectedColor('');
            setSelectedPlot(-1);
            setSelectedLabel(-1);
            setMarkerLabel('');
            // return Toast.show('Only 5 markers are allowed');
          }
          console.log('33333');
          newD[selectedPlot].data.push({
            x: 3,
            y: 3.2,
            custom_label: markerLabel
          });
        } else if (param == 'onEditMarker') {
          console.log('4444', selectedPlot, selectedLabel, selectedLabelText);
          newD[selectedPlot].data[selectedLabel].custom_label =
            selectedLabelText;
        } else if (param == 'onDeleteMarker') {
          newD[selectedPlot].data.splice(selectedLabel, 1);
        }

        setNewMarkerOpened(false);
        console.log('dataset222', newD);

        const response = await axios.post(
          `https://charliiapp.clickysoft.net/api/v1/save-plot-lines/${id}`,
          {
            plot_planner_id: id,
            plotlines_json: JSON.stringify(newD)
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        if (response.data) {
          getPlotPlannerDetails();
          setConfirmLoading(false);
          setPlotlineNameUpdated('');
          setSelectedColor('');
          setSelectedPlot(-1);
          setMarkerLabel('');
          setNewMarkerOpened(false);
        }
      } catch (e) {
        console.log('eeee', e);
        setConfirmLoading(false);
        setNewMarkerOpened(true);
        console.log(e?.response?.data);
        // Toast.show(e?.response?.data?.message);
      }
    }
  };

  const handleUpdateOk = () => {
    setNewMarkerOpened(false);
  };
  const handleUpdateCancelModal = () => {
    console.log('sss');
    setNewMarkerOpened(false);
  };

  const handleEditeOk = () => {
    setEditMarkerOpened(false);
  };
  const handleEditCancleModal = () => {
    console.log('sss');
    setEditMarkerOpened(false);
  };

  const AddNewMarker = (data) => {
    console.log('dadad', data);
    setNewMarkerOpened(false);
    editPlotlineHandler({
      param: 'onAddMarker',
      markerLabel: data.event_type,
      selectedPlot: data.selectedPlot
    });
  };

  const EditMarkerModalSuccess = (data) => {
    console.log('dadad', data);
    setEditMarkerOpened(false);
    editPlotlineHandler({
      param: data?.action == 'edit' ? 'onEditMarker' : 'onDeleteMarker',
      selectedLabelText: data.event_type,
      selectedPlot: data.selectedPlot,
      selectedLabel: data.selectedLabel
    });
  };

  return (
    <div className="m-3">
      <BookNameOutline name={name} description={desc} />
      {loading || confirmLoading ? (
        <FullPageSpinner />
      ) : (
        <Card className="mt-2" style={{ borderRadius: '10px' }}>
          <Row gutter={24}>
            {currentData?.length > 0 &&
              currentData?.map((p, index) => (
                <Col sm={12} xs={12} lg={6} md={6} xl={6}>
                  <div className="mb-5 d-flex justify-between">
                    <div className="chapter-name d-flex justify-between">
                      <span
                        style={{
                          width: '18px',
                          height: '18px',
                          background: p.pointerColor,
                          borderRadius: '110px'
                        }}
                        className="mr-2"
                      ></span>
                      <p className="mr-3">{p.title}</p>
                      <div>
                        <span>
                          <Popover
                            id={p.id}
                            popupVisible={false}
                            placement="rightBottom"
                            content={
                              <Content e_id={index} path_id={index} data={p} />
                            }
                            title="Actions"
                            trigger="click"
                            style={{ cursor: 'pointer' }}
                          >
                            <img
                              onClick={() => setLineIndex(index)}
                              src={Menu}
                              className="ml-4"
                              alt="menu-icon"
                            />
                          </Popover>
                        </span>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}

            <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <Button
                type="primary"
                size="small"
                className="p-3 mt-4"
                style={{ cursor: 'pointer' }}
                onClick={showModal}
              >
                New Plotline
              </Button>
            </Col>
          </Row>

          <div className="mt-3">
            <Dropdown
              className="edit-btn"
              overlay={editmenu}
              placement="bottomCenter"
              forceRender
            >
              <Button
                onClick={() => setEditMarkerOpened(true)}
                icon={<EditFilled />}
                size="large"
                className="edit-btn"
              >
                Edit Marker
              </Button>
            </Dropdown>
            <br />
            <Dropdown
              className="edit-btn"
              overlay={newMarkerMenu}
              placement="bottomCenter"
              forceRender
            >
              <Button
                onClick={() => setNewMarkerOpened(true)}
                icon={<PlusOutlined />}
                size="large"
                className="add-btn mt-2"
              >
                New Marker
              </Button>
            </Dropdown>
          </div>
          <AddNewMarkerModal
            open={newMarkerOpened}
            ok={handleUpdateOk}
            cancel={handleUpdateCancelModal}
            onSubmit={AddNewMarker}
            plotLines={currentData}
            event_id={1}
          />
          <EditMarkerModal
            open={editMarkerOpened}
            ok={handleEditeOk}
            cancel={handleEditCancleModal}
            onSubmit={EditMarkerModalSuccess}
            plotLines={currentData}
            event_id={1}
          />
          <PlotPlanner
            enableCursor={enableCursor}
            editPlotlineHandler={() =>
              enableCursor && editPlotlineHandler({ param: 'onEnd' })
            }
            scroll={scroll}
            data={currentData}
            cursorEnableFunc={() => {
              setEnableCursor(!enableCursor);
            }}
            onChange={(data) => setCurrentData(data)}
          />
          <PlotPlannerModal
            handleOk={(data) => handleOk(data)}
            handleCancel={handleCancel}
            isModalOpen={open}
          />
        </Card>
      )}
    </div>
  );
};

const defaultData = [
  {
    data: [
      {
        custom_label: 'Rising Action',
        x: 2.054178032993285,
        y: 3.5258217395191456
      },
      { custom_label: 'Climax', x: 2.884297520661157, y: 4.899843600993984 },
      {
        custom_label: 'Declining Action',
        x: 3.5270890164966424,
        y: 4.004694978955766
      },
      {
        custom_label: 'Exposition',
        x: 1.0183653608169767,
        y: 2.1455399061032865
      },
      {
        custom_label: 'Resolution',
        x: 4.735537190082645,
        y: 2.9123632583259975
      }
    ],
    title: 'default',
    lineColor: '#225e66',
    pointerColor: '#225e66'
  }
];
const editmenu = (
  <></>
  // <Menu className="Menu">
  //   <Menu.Item>
  //     <div className="drop-icons">
  //       <div>Edit Marker</div>
  //       <div className="d-flex">
  //         <div className="check ml-5">
  //           <img src={Accept} alt="" />
  //         </div>
  //         <div className="check">
  //           <img src={close} alt="" />
  //         </div>
  //       </div>
  //     </div>

  //     <Divider className="dropDiv" />
  //     <Row>
  //       <div>
  //         <h4>Select Plotline:</h4>
  //         <br />
  //         <Button>default</Button>
  //       </div>
  //     </Row>
  //   </Menu.Item>
  // </Menu>
);

const newMarkerMenu = (
  <></>
  // <Menu className="Menu">
  //   <Menu.Item>
  //     <div className="drop-icons">
  //       <div>New Marker</div>
  //       <div className="d-flex">
  //         <div className="check">
  //           <img src={Accept} alt="" />
  //         </div>
  //         <div className="check">
  //           <img src={close} alt="" />
  //         </div>
  //       </div>
  //     </div>

  //     <Divider className="dropDiv" />
  //     <Row>
  //       <Input placeholder="Enter Marker Label" />
  //     </Row>

  //     <Divider className="dropDiv" />
  //     <Row>
  //       <div>
  //         <h4>Select Plotline:</h4>
  //         <br />
  //         <Button style={{ border: "1px solid green" }}>Add Marker</Button>
  //       </div>
  //     </Row>
  //   </Menu.Item>
  // </Menu>
);
export default PlotlineDetail;
