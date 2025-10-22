import { Title, Meta } from "react-head";
import { useAppData } from "@/hooks/useAppData";
import { defaultMeta } from "@/constants/default-meta-head";

export default function CampaignMeta() {
  const { campaignBySlug } = useAppData();
  const campaign = campaignBySlug?.data?.data;

  if (!campaign) return null;

  const title = `${campaign.name} - Quest Campaign`;
  const description = campaign.description || defaultMeta.description;
  const image = campaign.banner || defaultMeta.image;

  return (
    <>
      <Title>{title}</Title>
      <Meta key="description" name="description" content={description} />
      <Meta key="og:title" property="og:title" content={title} />
      <Meta
        key="og:description"
        property="og:description"
        content={description}
      />
      <Meta key="og:image" property="og:image" content={image} />
      <Meta
        key="twitter:card"
        name="twitter:card"
        content="summary_large_image"
      />
      <Meta key="twitter:image" name="twitter:image" content={image} />
    </>
  );
}
