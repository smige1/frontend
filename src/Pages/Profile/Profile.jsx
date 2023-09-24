import React, { useEffect, useState } from 'react'
import PageMenu from '../../Components/PageMenu/PageMenu'
import Card from "../../Components/Card/Card"
import {useDispatch, useSelector} from "react-redux"
import "./Profile.scss"
import { getUser, updatePhoto, updateUser } from '../../Redux/Features/auth/authSlice';
import {AiOutlineCloudUpload} from "react-icons/ai"
import { toast } from 'react-toastify';
import {shortenText} from "../../utils"

const cloud_name = process.env.CLOUD_NAME;
const upload_preset = process.env.UPLOAD_PRESET;

const Profile = () => {
    const {isLoading, user} = useSelector((state) => state.auth);
    const initialstate = {
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        photo: user?.photo || "",
        address:  {
            address: user?.address?.address || "",
            state: user?.address?.state || "",
            country: user?.address?.country || "",
        },
    }

    const [profile, setProfile] = useState(initialstate)
    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const dispatch = useDispatch()
   
    useEffect(() => {
        if (user) {
           setProfile({
            name: user?.name || "",
            email: user?.email || "",
           phone: user?.phone || "",
           photo: user?.photo || "",
            address: {
                address: user?.address?.address || "",
                state: user?.address?.state || "",
                country: user?.address?.country || "",
            },
           })
        }
    }, [dispatch, user])

    useEffect(() => {
        if (user === null) {
            dispatch(getUser())
        }
    }, [dispatch, user])

    
const saveProfile = async (e) => {
    e.preventDefault();

    const userData = {
        name: profile?.name,
        phone: profile?.phone,
        role: profile?.role,
        address:{
            address: profile?.address,
            state: profile?.state,
            country: profile?.country,
        }
    }
        await dispatch(updateUser(userData))
}


const handleInputChange = (e) => {
    const {name, value} = e.target;
    setProfile({...profile, [name] : value});
    }

    const handleImageChange = (e) => {
       setImagePreview(URL.createObjectURL(e.target.files[0]));
       setProfileImage(e.target.files[0]);
        }

        const savePhoto = async (e) => {
            e.preventDefault();
            let imageURL;
            try {
                if(
                    profileImage.type === "image/jpeg" || profileImage.type === "image/jpg" || profileImage.typ === "image/png"
                ){
                    const image = new FormData()
                    image.append("file", profileImage)
                    image.append("cloud_name", cloud_name)
                    image.append("upload_preset", upload_preset)

                    const response = await fetch("https://api.cloudinary.com/v1_1/egimsikana/image/upload", {method: "post", body: image})
                    const imgData = await response.json()
                    console.log(imgData)
                    imageURL = imgData.url.toString()
                }
                const userData = {
                    photo: profileImage ? imageURL : profile.photo
                }
                await dispatch(updatePhoto(userData))
                setImagePreview(null)
            } catch (error) {
                toast.error(error.message)
            }
        }
  return (
    <>
    <section>
   <div className="container">
    <PageMenu />
    <h2>Profile</h2>
    <div className="--flex-start profile">
        <Card cardClass={"card"}>
            {!isLoading && (
                <>
                <div className="profile-photo">
                    <div>
                        <img src={imagePreview === null ? user?.photo : imagePreview} alt='profile' />
                        <h3>Role: { profile.role}</h3>
                        {imagePreview !== null && (
                            <div className="--center-all">

                            <button className="--btn --btn-secondary" onClick={savePhoto}>
                                <AiOutlineCloudUpload size={18} />  Upload Photo
                            </button>
                            </div>
                        )}
                    </div>
                    </div>
                    <form onSubmit={saveProfile}>
                        <p>
                            <label>Change Photo</label>
                            <input 
                            type='file'
                            accept='image/*'
                            name='image'
                            onChange={handleImageChange}
                            />
                        </p>
                        <p>
                        <label>Name:</label>
                            <input 
                            type='text'
                            value={profile?.name}
                            name='name'
                            onChange={handleInputChange}
                            required
                            />
                        </p>
                        <p>
                        <label>Email:</label>
                            <input 
                            type='text'
                            value={profile?.email}
                            name='email'
                            onChange={handleInputChange}
                            required
                            />
                        </p>
                        <p>
                        <label>Phone:</label>
                            <input 
                            type='text'
                            value={profile?.phone}
                            name='phone'
                            onChange={handleInputChange}
                            required
                            />
                        </p>
                        <p>
                        <label>Address:</label>
                            <input 
                            type='text'
                            value={profile?.address?.address}
                            name='address'
                            onChange={handleInputChange}
                            required
                            />
                        </p>
                        <p>
                        <label>State:</label>
                            <input 
                            type='text'
                            value={profile?.address?.state}
                            name='state'
                            onChange={handleInputChange}
                            required
                            />
                        </p>
                        <p>
                        <label>Country:</label>
                            <input 
                            type='text'
                            value={profile?.address?.country}
                            name='country'
                            onChange={handleInputChange}
                            required
                            />
                        </p>
                        <button className="--btn --btn-primary --btn-block">
                            Update Profile
                        </button>
                    </form>
                </>
            )}
        </Card>
    </div>
   </div>
    </section>
    </>
  )
}

export const UserName = () => {
const {user } = useSelector((state) => state.auth);

const username = user?.name || "...";

return <span style={{color: "#ff7722"}}> Hi, {shortenText (username, 9)} | </span>
}

export default Profile