import { FastAverageColor } from "fast-average-color";
import { useEffect, useRef, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { XLg, Camera } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { userActions } from "../redux/reducers/user";
import { AppDispatch, RootState } from "../redux/store";

const Layout = styled.div`
  position: relative;
  max-height: 200px;
  margin-bottom: 80px;
`;
const BannerPictureDiv = styled.div`
  height: 200px;
  width: 100%;
`;

const RemovePhotoDiv = styled.div`
  background-color: rgba(15, 20, 25, 0.75);
  opacity: 0.75;

  min-width: 42px;
  min-height: 42px;

  :hover {
    transition-duration: 0.2s;
    backdrop-filter: blur(4px);
    background-color: rgba(39, 44, 48, 0.75);
  }
`;

const ChangePhotoDiv = styled.div`
  top: 40%;
  left: 40%;
`;

const AddPhotoDiv = styled.div`
  background-color: rgba(15, 20, 25, 0.75);
  opacity: 0.75;

  min-width: 42px;
  min-height: 42px;

  :hover {
    transition-duration: 0.2s;
    backdrop-filter: blur(4px);
    background-color: rgba(39, 44, 48, 0.75);
  }
`;

const LogoDiv = styled.div`
  bottom: -70px;
  left: 15px;
`;
const AvatarImg = styled.img`
  width: inherit;
  height: inherit;

  border: 4px solid white;
`;
const AddLogoDiv = styled(AddPhotoDiv)`
  top: calc(50% - 21px);
  left: calc(50% - 21px);
`;

interface BannerProps {
  isEditBanner: boolean;
}

export const Banner = ({ isEditBanner }: BannerProps) => {
  const { t } = useTranslation();
  const avatar = useSelector<RootState, RootState["user"]["profile"]["avatar"]>(
    (store) => store.user.profile.avatar
  );
  const banner = useSelector<RootState, RootState["user"]["profile"]["banner"]>(
    (store) => store.user.profile.banner
  );

  const dispatch = useDispatch<AppDispatch>();

  //------------------------------ avatar image ------------------------

  const [fileAvatar, setFileAvatar] = useState<File>();
  const fileRefAvatar = useRef(null);

  useEffect(() => {
    let objectUrlAvatar: string;
    if (fileAvatar) {
      objectUrlAvatar = URL.createObjectURL(fileAvatar);
      dispatch(userActions.addAvatar(objectUrlAvatar)); //
    }

    return () => URL.revokeObjectURL(objectUrlAvatar);
  }, [fileAvatar]);

  // ------------------------------ userImage ------------------------
  const [fileImage, setFileImage] = useState<File>();
  const fileRefImage = useRef(null);

  useEffect(() => {
    let objectUrlImage: string;
    if (fileImage) {
      objectUrlImage = URL.createObjectURL(fileImage);
      dispatch(userActions.addBanner(objectUrlImage)); //
    }

    return () => URL.revokeObjectURL(objectUrlImage);
  }, [fileImage]);

  //-----------------------------handleUpload-----------------------------
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget && e.currentTarget.files) {
      setFileAvatar(e.currentTarget.files[0]);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget && e.currentTarget.files) {
      setFileImage(e.currentTarget.files[0]);
    }
  };
  //-------------------------FastAverageColor-----------------------------
  const [backgroundColor, setBackgroundColor] = useState("rgba(181,192,200,1)");

  useEffect(() => {
    const fac = new FastAverageColor();
    fac
      .getColorAsync(avatar)
      .then((color) => {
        setBackgroundColor(color.rgba);
      })
      .catch((e) => {
        console.warn(e);
      });
  }, [avatar]);

  return (
    <>
      <Layout>
        <BannerPictureDiv style={{ background: `${backgroundColor}` }}>
          <div className="position-relative w-100 h-100">
            {isEditBanner && (
              <div className="bg-dark opacity-50 position-absolute top-0 start-0 bottom-0 end-0" />
            )}

            <ChangePhotoDiv className="d-flex position-absolute">
              {isEditBanner && (
                <OverlayTrigger
                  key={"bottom"}
                  placement={"bottom"}
                  delay={{ show: 500, hide: 250 }}
                  overlay={
                    <Tooltip id={`tooltip-bottom}`}>
                      {t(`validation:userSettings.addPhoto`)}
                    </Tooltip>
                  }
                >
                  <AddPhotoDiv className="rounded-circle d-flex justify-content-center align-items-center">
                    <Camera size={22} color="white" />
                  </AddPhotoDiv>
                </OverlayTrigger>
              )}
              {isEditBanner && (
                <OverlayTrigger
                  key={"bottom"}
                  placement={"bottom"}
                  delay={{ show: 500, hide: 250 }}
                  overlay={
                    <Tooltip id={`tooltip-bottom}`}>
                      {t(`validation:userSettings.removePhoto`)}
                    </Tooltip>
                  }
                >
                  <RemovePhotoDiv className="ms-3 rounded-circle d-flex justify-content-center align-items-center">
                    <XLg size={17} color="white" />
                  </RemovePhotoDiv>
                </OverlayTrigger>
              )}
            </ChangePhotoDiv>

            {banner && (
              <img className="img-fluid w-100 h-100" src={banner} alt="" />
            )}
          </div>
        </BannerPictureDiv>
        <LogoDiv
          style={
            isEditBanner
              ? { width: "122px", height: "122px" }
              : { width: "135px", height: "135px" }
          }
          className="position-absolute rounded-circle bg-white"
        >
          {isEditBanner && (
            <OverlayTrigger
              key={"bottom"}
              placement={"bottom"}
              delay={{ show: 500, hide: 250 }}
              overlay={
                <Tooltip id={`tooltip-bottom}`}>
                  {t(`validation:userSettings.addPhoto`)}
                </Tooltip>
              }
            >
              <AddLogoDiv className="position-absolute rounded-circle d-flex justify-content-center align-items-center">
                <Camera size={22} color="white" />
              </AddLogoDiv>
            </OverlayTrigger>
          )}

          {avatar ? (
            <AvatarImg
              crossOrigin="anonymous"
              className="rounded-circle"
              src={avatar}
              alt=""
            />
          ) : (
            <AvatarImg
              className="rounded-circle"
              src="https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
              alt=""
            />
          )}
        </LogoDiv>
      </Layout>

      {/*----avatar -------*/}
      <input type="file" ref={fileRefAvatar} onChange={handleAvatarUpload} />

      {/*----user image -------*/}
      <input type="file" ref={fileRefImage} onChange={handleImageUpload} />
    </>
  );
};
