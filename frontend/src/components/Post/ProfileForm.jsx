import React, { useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { updateProfile, deleteProfile } from "../../services/profile";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./ProfilePicture.css";

const ProfileForm = () => {
  const { currentUser, updateCurrentUser } = useCurrentUser();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      profilePicture: currentUser?.profilePicture || "",
      bio: currentUser?.bio || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const response = await updateProfile(data, token);
      console.log("Profile updated successfully:", response);

      updateCurrentUser({
        ...currentUser,
        profilePicture: data.profilePicture,
        bio: data.bio,
      });

      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("root", {
        message: "Failed to update profile. Please try again.",
      });
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmDelete) {
      try {
        setIsDeleting(true);
        const token = localStorage.getItem("token");
        const response = await deleteProfile(token);
        console.log("Account deleted successfully:", response);

        updateCurrentUser(null);
        localStorage.removeItem("token");

        navigate("/login");
      } catch (error) {
        console.error("Error deleting account:", error);
        setError("root", {
          message: "Failed to delete account. Please try again.",
        });
        setIsDeleting(false);
      }
    }
  };

  return (
    <div>
      <form className="profile-form" onSubmit={handleSubmit(onSubmit)}>
        {errors.root && <span className="error">{errors.root.message}</span>}
        <div className="profile-picture-container">
          <Controller
            name="profilePicture"
            control={control}
            render={({ field }) => (
              <div className="profile-picture-wrapper">
                <img
                  src={
                    field.value ||
                    "https://img.freepik.com/free-psd/cartoon-question-mark-isolated_23-2151568563.jpg?semt=ais_hybrid"
                  }
                  alt="Profile"
                  className="profile-picture"
                />

                <div className="profile-picture-overlay">UPDATE</div>
                <input
                  type="file"
                  accept="image/*"
                  className="profile-picture-input"
                  onChange={(event) => {
                    const file = event.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.readAsDataURL(file);
                      reader.onloadend = () => {
                        field.onChange(reader.result);
                      };
                    }
                  }}
                />
              </div>
            )}
          />
        </div>
        <textarea name="bio" className="bio-edit" {...register("bio")} />
        <br />
        <button
          disabled={isSubmitting}
          role="submit-button"
          id="submit"
          type="submit"
        >
          {isSubmitting ? "Saving changes..." : "Save changes"}
        </button>
        <br />
        <button
          type="button"
          className="delete-account-button"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete Account"}
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
