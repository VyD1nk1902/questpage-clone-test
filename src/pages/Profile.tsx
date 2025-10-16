import { Separator } from "@/components/ui/separator";
import JoinedCampaign from "@/modules/Profile/JoinedCampaign";
import ProfileHead from "@/modules/Profile/ProfileHead";

const Profile = () => {
  return (
    <div className="main-content max-w-2xl min-w-[224px] mx-auto">
      <ProfileHead />
      <Separator />
      <JoinedCampaign />
    </div>
  );
};

export default Profile;
