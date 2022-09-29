import { FastAverageColor } from "fast-average-color";
import { useEffect, useState } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { XLg, Camera } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";

import EditProfileForm from "../components/EditProfileForm";
import { RootState } from "../redux/store";

const Layout = styled.div`
  position: relative;
  max-height: 200px;
  margin-bottom: 80px;
  text-align: end;
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

const StyledInput = styled.input`
  width: 42px;
  height: 42px;
`;

const StyledButton = styled(Button)`
  width: 120px;
`;

interface BannerProps {
  isEditBanner?: boolean;
  uploadedAvatar?: (formData: FormData) => void;
  uploadedBanner?: (formData: FormData) => void;
}

const Banner = ({
  isEditBanner,
  uploadedAvatar,
  uploadedBanner,
}: BannerProps) => {
  const { t } = useTranslation();

  const [temporaryAvatar, setTemporaryAvatar] = useState<string>();
  const [temporaryBanner, setTemporaryBanner] = useState<string>();

  const authUser = useSelector<RootState, RootState["user"]["authUser"]>(
    (store) => store.user.authUser
  );

  const userByUsername = useSelector<
    RootState,
    RootState["user"]["userByUsername"]
  >((store) => store.user.userByUsername);
  //------------------------------ avatar & banner image ------------------------

  const avatar =
    userByUsername?._id !== authUser._id && userByUsername
      ? userByUsername?.profile?.avatar
      : authUser.profile.avatar;

  const banner =
    userByUsername?._id !== authUser._id && userByUsername
      ? userByUsername?.profile?.banner
      : authUser.profile.banner;

  const removeBanner = () => {
    // const formData = new FormData();
    // const file = new File([""], "");
    // formData.append("banner", file);
    // setTemporaryBanner("");
    // if (uploadedBanner) {
    //   uploadedBanner(formData);
    // }
  };
  //-----------------------------handleUpload-----------------------------

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget && e.currentTarget.files) {
      const formData = new FormData();
      formData.append("avatar", e.currentTarget.files[0]);

      setTemporaryAvatar(URL.createObjectURL(e.currentTarget.files[0]));

      if (uploadedAvatar) {
        uploadedAvatar(formData);
      }
    }
  };

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget && e.currentTarget.files) {
      const formData = new FormData();
      formData.append("banner", e.currentTarget.files[0]);

      setTemporaryBanner(URL.createObjectURL(e.currentTarget.files[0]));

      if (uploadedBanner) {
        uploadedBanner(formData);
      }
    }
  };

  //-------------------------FastAverageColor-----------------------------
  const [backgroundColor, setBackgroundColor] = useState("rgba(181,192,200,1)");

  useEffect(() => {
    const fac = new FastAverageColor();
    if (avatar) {
      fac
        .getColorAsync(
          temporaryAvatar && isEditBanner ? temporaryAvatar : avatar
        )
        .then((color) => {
          setBackgroundColor(color.rgba);
        })
        .catch((e) => {
          console.warn(e);
        });
    } else {
      setBackgroundColor("rgba(181,192,200,1)");
    }
  }, [avatar]);

  const currentUser = useSelector<
    RootState,
    RootState["user"]["userByUsername"]
  >((store) => store.user.userByUsername);

  const handleFollowClick = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser.isFollowed) {
      await dispatch(userActions.unfollow(currentUser._id));
    } else {
      await dispatch(userActions.follow(currentUser._id));
    }
    dispatch(userActions.fetchUser(currentUser.username));
  };

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
                  key={"bottomEditBanner"}
                  placement={"bottom"}
                  delay={{ show: 500, hide: 250 }}
                  overlay={
                    <Tooltip id={`tooltip-bottomEditBanner}`}>
                      {t(`validation:userSettings.addPhoto`)}
                    </Tooltip>
                  }
                >
                  <AddPhotoDiv className="rounded-circle d-flex justify-content-center align-items-center">
                    <Camera size={22} color="white" />
                    <StyledInput
                      className="opacity-0 position-absolute rounded-circle"
                      type="file"
                      accept="image/*"
                      onChange={handleBannerUpload}
                    />
                  </AddPhotoDiv>
                </OverlayTrigger>
              )}

              {isEditBanner && (
                <OverlayTrigger
                  key={"bottomRemoveBanner"}
                  placement={"bottom"}
                  delay={{ show: 500, hide: 250 }}
                  overlay={
                    <Tooltip id={`tooltip-bottomRemoveBanner}`}>
                      {t(`validation:userSettings.removePhoto`)}
                    </Tooltip>
                  }
                >
                  <RemovePhotoDiv
                    onClick={removeBanner}
                    className="ms-3 rounded-circle d-flex justify-content-center align-items-center"
                  >
                    <XLg size={17} color="white" />
                  </RemovePhotoDiv>
                </OverlayTrigger>
              )}
            </ChangePhotoDiv>

            {temporaryBanner && isEditBanner ? (
              <img
                className="img-fluid w-100 h-100"
                src={temporaryBanner}
                alt=""
              />
            ) : (
              banner && (
                <img className="img-fluid w-100 h-100" src={banner} alt="" />
              )
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
              key={"bottomAddPhoto"}
              placement={"bottom"}
              delay={{ show: 500, hide: 250 }}
              overlay={
                <Tooltip id={`tooltip-bottomAddPhoto}`}>
                  {t(`validation:userSettings.addPhoto`)}
                </Tooltip>
              }
            >
              <AddLogoDiv className="position-absolute rounded-circle d-flex justify-content-center align-items-center">
                <Camera size={22} color="white" />

                <StyledInput
                  className="opacity-0 position-absolute rounded-circle"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                />
              </AddLogoDiv>
            </OverlayTrigger>
          )}

          {temporaryAvatar && isEditBanner ? (
            <AvatarImg className="rounded-circle" src={temporaryAvatar} />
          ) : avatar ? (
            <AvatarImg className="rounded-circle" src={avatar} />
          ) : (
            <AvatarImg
              className="rounded-circle"
              src="https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
            />
          )}
        </LogoDiv>
        {userByUsername?._id !== authUser._id && userByUsername ? (
          <StyledButton
            className="btn rounded-pill fw-bold px-2 mt-3 me-3"
            type="button"
            disabled={currentUser.isLoading}
            variant="dark"
            onClick={(e: React.FormEvent) => handleFollowClick(e)}
          >
            {currentUser.isLoading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              ""
            )}
            {currentUser.isFollowed
              ? t("common.following")
              : t("common.follow")}
          </StyledButton>
        ) : (
          !isEditBanner && <EditProfileForm />
        )}
      </Layout>
    </>
  );
};

export default Banner;
