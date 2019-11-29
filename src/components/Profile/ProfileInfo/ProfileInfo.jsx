import React, { useState } from "react";
import styles from "./ProfileInfo.module.css";
import userPhoto from "./../../../images/images.jpg";
import cn from "classnames";

import Preloader from "../../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatus/ProfileStatusWithHooks";
import ProfileDataReduxForm from "./ProfileDataForm";


const ProfileInfo = ( {profile, ...props} ) => {

    const [ editMode, setEditMode ] = useState(false);

    if(!profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = e => {
        if(e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    };
    const onSubmit = formData => {
        props.saveProfile( formData )
            .then(() => {
                setEditMode( false );
            });
    };
    return (
        <div className={styles.descriptionBlock}>
            <div className={styles.profile}>
                <img src={profile.photos.large || userPhoto} alt="profile_image" />
                { props.isOwner && <input type="file" title="change image"  className={styles.changeImage} onChange={ onMainPhotoSelected } /> }
            </div>
            <div className={ cn({[styles.blockEdit]: editMode}, styles.contact) }>
                <div>
                    <ProfileStatusWithHooks status={ props.status } updateUserStatus={ props.updateUserStatus } />
                </div>
                { editMode
                    ? <ProfileDataReduxForm initialValues={ profile } profile={ profile } onSubmit={ onSubmit } />
                    : <ProfileData profile={ profile } isOwner={ props.isOwner }  goToEditMode={ () => setEditMode( true ) }/>
                }
            </div>
        </div>
    )

};

const ProfileData = ( {profile, isOwner, goToEditMode} ) => {

  return (
      <div>
          <div className={styles.profileInformation}>
              <span>FullName:</span> { profile.fullName }
          </div>
          <div className={styles.profileInformation}>
              <span>Looking for a job:</span> {profile.lookingForAJob ? "Yes" : "No"}
          </div>
          <div className={styles.profileInformation}>
              <span>About Me:</span> { profile.aboutMe }
          </div>

          { profile.lookingForAJob &&
              <div className={styles.profileInformation}>
                  <span>My professional skills:</span> {profile.lookingForAJobDescription}
              </div>
          }

          <div className={styles.profileInformation}>
              <span>Contacts:</span> {Object.keys( profile.contacts ).map(key => {
              return <Contact key={ key } contactTitle={ key } contactValue={ profile.contacts[key] }/>
          })}
          </div>
          <div className={styles.infoProfileEdit}> {isOwner && <button onClick={ goToEditMode }>Edit</button>}</div>
      </div>
  )
};


const Contact = ( {contactTitle, contactValue} ) => {
    return (
        <>
            { contactValue &&
                <div className={styles.contacts}><b>{ contactTitle }:</b> { contactValue }</div>
            }
        </>
    )
};

export default ProfileInfo;