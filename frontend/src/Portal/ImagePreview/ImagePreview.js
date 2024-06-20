import React, { useContext, useState } from 'react'
import './imagepreview.scss';
import CloseIcon from '@mui/icons-material/Close';

import Cropper from 'react-easy-crop';
import axios from 'axios';
import { AppState } from '../../App';


const ImagePreview = ({img,imgFile,setImgProfile,setProfileImage}) => {
    const [crop,setCrop] = useState({x:0,y:0});
    const [zoom,setZoom] = useState(1);
    const [cropArea,setCropArea] = useState(null)
    const [imgAfterCrop,setImgAfterCrop] = useState(null);
    

    const {stundetInfo,setStudentInfo} = useContext(AppState);
    const onCropComplete=(croppedAreaPercentage,croppedAreaPixel)=>{
        setCropArea(croppedAreaPixel);
    }
    const onCropDone = (croppedAreas)=>{
        const canvas = document.createElement('canvas');
        canvas.width=cropArea.width
        canvas.height=cropArea.height
        const context = canvas.getContext('2d')
        let image = new Image()

        image.src = img
        image.onload = ()=>{
            context.drawImage(
                image,
                croppedAreas.x,
                croppedAreas.y,
                croppedAreas.width,
                croppedAreas.height,
                0,
                0,
                croppedAreas.width,
                croppedAreas.height
            )
            canvas.toBlob(async(blob)=>{
                const file = new File([blob],imgFile.name,{type:imgFile.type})
                try{
                    const res = await axios.put(`${process.env.REACT_APP_API_URL}/person/editProfileImg/${stundetInfo.student_id}`,{
                        image:file
                    },{
                        "headers":{
                            'Content-Type': 'multipart/form-data'
                         }
                    })
                    console.log(res)
                    if(res.status===201){
                        setStudentInfo(info=>{return {...info,img_url:res.data.data}})
                        setImgProfile(null);
                    }
                }catch(err){
                    console.log(err)
                }
            })
            const imgURL = canvas.toDataURL('image/jpg');
            setImgAfterCrop(imgURL);

        }
    }
    return (
    <div className='modal'>
        <div className="img_editor_wrapper">
            <CloseIcon onClick={()=>setProfileImage(null)} className='close'/>
            <div className='cropper_container'>
                {
                    imgAfterCrop?<img src={imgAfterCrop}/>:
                <Cropper
                image={imgAfterCrop?imgAfterCrop:img}
                crop={crop}
                zoom={zoom}
                aspect={4 / 4}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                style={{
                    containerStyle:{
                        width:"80%",
                        height:"80%",
                        backgroundColor:'#fff'
                    }
                }}
                    />
                }
                </div>
                <div className="actions_btns">
                    <button onClick={()=>{onCropDone(cropArea)}}>Save</button>
                </div>
        </div>
    </div>
  )
}

export default ImagePreview