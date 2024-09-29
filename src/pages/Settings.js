import React from "react";
import Layout from "../layout/Layout";
import { FaRegEdit } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../db/config";
import { useDispatch } from "react-redux";
import { UPDATE_ACTIVE_USER } from "../redux/slice/authSlice";

const Settings = () => {
  const dispatch = useDispatch();
  const { profilePic, userName, email, userID, phone, country, address } = JSON.parse(sessionStorage.getItem("user"));
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const userData = {
      userName: data.username || userName,
      email: data.email || email,
      phone: data.phone || phone,
      country: data.country || country,
      address: data.address || address,
      profilePic: profilePic,
    };

    Object.keys(userData).forEach((key) => {
      if (userData[key] === undefined) {
        delete userData[key];
      }
    });

    try {
      const docRef = doc(db, "users", userID);
      await setDoc(docRef, userData);
      dispatch(UPDATE_ACTIVE_USER(userData));
      alert('Profile updated successfully');
    } catch (error) {
      console.error("Error updating profile:", error);
      alert('Error updating profile');
    }
  };


  const InputField = ({ label, id, type, value }) => (
    <div>
      <label htmlFor={id} className="text-lg font-bold">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        defaultValue={value}
        className="mt-2 border border-gray-300 p-2 w-full"
        {...register(id)}
      />
    </div>
  );

  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-8">Settings</h1>
      <div className="flex flex-col space-y-4 mx-auto">
        <div className="relative mx-auto mb-8">
          <img
            src={profilePic || "https://cdn-icons-png.freepik.com/256/12483/12483574.png?uid=R138965801&ga=GA1.1.932674910.1715796673&semt=ais_hybrid"}
            alt="user"
            className="rounded-full h-28 w-28"
          />
          <div className="absolute bottom-0 right-0 rounded-full bg-white p-2 border cursor-pointer">
            <FaRegEdit className="text-lg mx-auto" />
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
          <div className="grid grid-cols-2 gap-6">
            <InputField label="Name" id="username" type="text" value={userName} />
            <InputField label="Email" id="email" type="email" value={email} />
            <InputField label="Phone" id="phone" type="text" value={phone} />
            <InputField label="Country" id="country" type="text" value={country} />
            <InputField label="Address" id="address" type="text" value={address} />
          </div>
          <button type="submit" className="mt-10 bg-orange text-white p-2 rounded-lg w-44">Save</button>
          <button type="reset" className="ml-5 mt-5 border border-gray-300 text-gray-500 p-2 rounded-lg w-44">Cancel</button>
        </form>
      </div>
    </Layout>
  );
};

export default Settings;
