import { AiOutlineHome } from 'react-icons/ai';
import { AiOutlineTeam } from 'react-icons/ai';
import { TbCalendarTime } from "react-icons/tb";
import { MdOutlineManageHistory, MdOutlineEventNote } from "react-icons/md";
import { PiNote, PiNotePencilFill } from "react-icons/pi";

export const menuData = [
    {
        "id": 1,
        "icon": <AiOutlineHome />,
        "title": "Dashboard",
        "link": "/"
    },
    {
        "id": 3,
        "icon": <TbCalendarTime />,
        "title": "Booking",
        "link": "/booking",
    },
    {
        "id": 4,
        "icon": <PiNote />,
        "title": "Manage Vechile",
        "link": "/manage",
    },
    {
        "id": 5,
        "icon": <PiNotePencilFill />,
        "title": "Vendor",
        "link": "/vendor",
    }
]
