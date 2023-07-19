import {
  DeleteOutlined,
  PlusCircleFilled,
  UserDeleteOutlined,
} from "@ant-design/icons";
import Plus from "../../../../assets/images/plus1.png";
import BookPlus from "../../../../assets/images/book_plus.png";
import BrainsStromPlus from "../../../../assets/images/barinstorm_plus.png";
import OutlinePlus from "../../../../assets/images/outline_plus.png";
import PlotlinePlus from "../../../../assets/images/plot_plus.png";
import Reply from "../../../../assets/images/Union.png";
import Copy from "../../../../assets/images/Shape.png";
import Edit from "../../../../assets/images/Edit.png";
import Thread from "../../../../assets/images/thread.png";
import Path from "../../../../assets/images/Path.png";


export const messageItemList = [
  {
    label: (
      <p>
        <img src={Reply} alt="" className="chatDropDownIcon" />
        <span>Reply</span>{" "}
      </p>
    ),
    key: "0",
    onclick,
  },
  {
    type: "divider",
  },
  {
    label: (
      <p>
        <img src={Thread} alt="" className="chatDropDownIcon" />
        <span>Thread Reply</span>{" "}
      </p>
    ),
    key: "1",
  },

  {
    type: "divider",
  },
  {
    label: (
      <p>
        <img src={Copy} alt="" className="chatDropDownIcon" />
        <span>Copy Message</span>{" "}
      </p>
    ),
    key: "2",
  },
  {
    type: "divider",
  },
  {
    label: (
      <p>
        <img src={Edit} alt="" className="chatDropDownIcon" />
        <span>Edit Message</span>{" "}
      </p>
    ),
    key: "3",
  },
  {
    type: "divider",
  },
  {
    label: (
      <p>
        <UserDeleteOutlined className="chatDropDownIcon" />
        <span>Block User</span>{" "}
      </p>
    ),
    key: "4",
  },
  {
    type: "divider",
  },
  {
    label: (
      <p>
        <DeleteOutlined className="deleteDropDownIcon" />
        <span style={{ color: "red" }}>Delete Message</span>{" "}
      </p>
    ),
    key: "5",
  },
];

export const pathItemsList = [
  {
    label: (
      <p className="pathItem">
        <img src={Path} alt="" className="pathIcons" />
        <span style={{ marginLeft: "10px" }}>Instant Commands</span>{" "}
      </p>
    ),
    key: "0",
  },
  {
    label: (
      <p className="pathItem">
        <img src={Plus} alt="" className="pathIcons" />
        <span style={{ marginLeft: "6px" }}>Timeline</span>
        <span className="text-muted"> /timeline [query]</span>
      </p>
    ),
    key: "1",
  },
  {
    label: (
      <p className="pathItem">
        <img src={BrainsStromPlus} alt="" className="pathIcons" />
        <span style={{ marginLeft: "6px" }}>BrainStorm</span>
        <span className="text-muted"> /brainstorm [query]</span>
      </p>
    ),
    key: "2",
  },
  {
    label: (
      <p className="pathItem">
        <img src={BookPlus} alt="" className="pathIcons" />
        <span style={{ marginLeft: "6px" }}>Book</span>
        <span className="text-muted"> /book [query]</span>
      </p>
    ),
    key: "3",
  },
  {
    label: (
      <p className="pathItem">
        <img src={OutlinePlus} alt="" className="pathIcons" />
        <span style={{ marginLeft: "6px" }}>Outline</span>
        <span className="text-muted"> /outline [query]</span>
      </p>
    ),
    key: "4",
  },
  {
    label: (
      <p className="pathItem">
        <img src={PlotlinePlus} alt="" className="pathIcons" />
        <span style={{ marginLeft: "6px" }}>Plot</span>
        <span className="text-muted"> /Plot [query]</span>
      </p>
    ),
    key: "5",
  },
  {
    label: (
      <p className="pathItem">
        <img src={BookPlus} alt="" className="pathIcons" />
        <span style={{ marginLeft: "6px" }}>Series</span>
        <span className="text-muted"> /series [query]</span>
      </p>
    ),
    key: "6",
  },
];

const S = () => {
  return <PlusCircleFilled />
}
export const instantCommand = {
  timeline: {
    title: 'Timeline',
    query: ' /timeline [query]',
    description: 'description',
    name: 'name',
    id: 'timeline_id',
  },
  brainstorm: {
    title: 'Brainstorm',
    query: ' /brainstorm [query]',
    name: 'brainstorm_name',
    description: 'description',
    id: 'brainstorm_id',
  },
  outline: {
    title: 'Outline',
    query: ' /outline [query]',
    name: 'outline_name',
    description: 'description',
    id: 'outline_id',
  },
  plot: {
    title: 'Plot',
    query: ' /plot [query]',
    name: 'plot_planner_title',
    description: 'description',
    id: 'plot_planner_id',
  },
  book: {
    title: 'Book',
    query: ' /book [query]',
    name: 'book_name',
    description: 'book_description',
    id: 'book_id',
  },
  series: {
    title: 'Series',
    query: ' /series [query]',
    name: 'series_name',
    description: 'series_description',
    id: 'series_id',
  },
};