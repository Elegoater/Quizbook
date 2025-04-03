import { useState } from "react";
import { updateProfile } from "../../services/profile";
import "./ProfilePicture.css";

const ProfilePicture = ({ initialProfilePicture, token }) => {
  const [profilePicture, setProfilePicture] = useState(initialProfilePicture);
  const [newUrl, setNewUrl] = useState("");

  const handleUpdate = async () => {
    if (!newUrl) return;

    try {
      await updateProfile({ profilePicture: newUrl }, token);
      setProfilePicture(newUrl);
      setNewUrl("");
    } catch (error) {
      console.error("Error updating profile picture:", error);
      alert("Failed to update profile picture. Please try again.");
    }
  };

  return (
    <div className="profile-picture-container">
      <img
        src={profilePicture || "https://img.freepik.com/free-psd/cartoon-question-mark-isolated_23-2151568563.jpg?semt=ais_hybrid"}
        alt="Profile"
        className="profile-picture"
      />
      <input
        type="text"
        placeholder="Enter new profile picture URL"
        value={newUrl}
        onChange={(event) => setNewUrl(event.target.value)}
        className="profile-picture-input"
      />
      <button onClick={handleUpdate} disabled={!newUrl}>
        Update Profile Picture
      </button>
    </div>
  );
};

export default ProfilePicture;
