import { AiOutlineHome } from 'react-icons/ai';
import { AiOutlineTeam } from 'react-icons/ai';
import { TbCalendarTime } from "react-icons/tb";
import { PiNote, PiNotePencilFill } from "react-icons/pi";
import { IoAddCircleOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";

export const menuData = [
   
    {
        "id": 1,
        "icon": <TbCalendarTime />,
        "title": "Booking",
        "link": "/booking",
    },
    {
        "id": 2,
        "icon": <PiNote />,
        "title": "Manage Vehicle",
        "link": "/manage/all-listed-vehicle-types",
    },
    {
        "id": 3,
        "icon": <IoAddCircleOutline />,
        "title": "Add Vehicle Detail",
        "link": "/add-detail/vehicles/add/new-rental-vehicle",
    },
    {
        "id": 4,
        "icon": <PiNotePencilFill />,
        "title": "Vendor",
        "link": "/vendor",
    },{
        "id":5,
        "icon":<CiUser/>,
        "title":"User",
        "link":"/user"
    }
]
