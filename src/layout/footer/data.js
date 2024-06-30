import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import AspectRatioOutlinedIcon from '@mui/icons-material/AspectRatioOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import AlbumOutlinedIcon from '@mui/icons-material/AlbumOutlined';
import SwitchCameraOutlinedIcon from '@mui/icons-material/SwitchCameraOutlined';
import SwitchLeftOutlinedIcon from '@mui/icons-material/SwitchLeftOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import AutoAwesomeMosaicOutlinedIcon from '@mui/icons-material/AutoAwesomeMosaicOutlined';

const Menuitems = [
  {
    title: "메뉴",
    icon: DescriptionOutlinedIcon,
    href: "/menu",
  },
  {
    title: "테이블관리",
    icon: AutoAwesomeMosaicOutlinedIcon,
    href: "/table",
  },
  {
    title: "재고",
    icon: AddToPhotosOutlinedIcon,
    href: "/stoke",
  },
  {
    title: "매출",
    icon: AssignmentTurnedInOutlinedIcon,
    href: "/sales",
  },
];

export default Menuitems;
