import mans from '../assets/mans.png';
import mostafa from '../assets/mostafa.png';
import abdallh from '../assets/abdullah.png';
import omar from '../assets/omar.png';
import abdullah_active from '../assets/abdullah_active.png';
import mans_active from '../assets/mans_active.png';
import mostafa_active from '../assets/mostafa_active.png';
import omar_active from '../assets/omar_active.png';
export const team_members = [
    {
        name : "Mansour Mohamed",
        title:"Full-Stack",
        bio : '',
        img: mans,
        active_img : mans_active,
        links : [
            {
            name:'leetcode',
            logo:'',
            link : '' 
        },
            {
            name:'LinkedIn',
            logo:'',
            link : '' 
        },
            {
            name:'GitHub',
            logo:'',
            link : '' 
        },
    ]
    },
    {
        name : "Mostafa Abdelal",
        title:"Backend",
        bio : '',
        img:mostafa,
        middle:true,
        active_img : mostafa_active,
        links : [
            {
                name:'leetcode',
                link : '' 
            },
            {
                name:'LinkedIn',
                link : '' 
            },
    ]
    },
    {
        name : "AbdAllah Mostafa",
        title:"Front End",
        bio : '',
        img:abdallh,
        middle:true,
        active_img : abdullah_active,
        links : [
            {
            name:'leetcode',
            logo:'',
            link : '' 
        }
    ]
    },
    {
        name : "Omar Rehan",
        title:"Frontend",
        bio : '',
        img:omar,
        active_img : omar_active,
        links : [{
            name:'leetcode',
            link : '' 
        }]
    },
] 