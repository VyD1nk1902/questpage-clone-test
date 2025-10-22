import { Title, Meta } from "react-head";
import { defaultMeta } from "@/constants/default-meta-head";

export default function MetaTags() {
  return (
    <>
      <Title>{defaultMeta.title}</Title>
      <Meta name="description" content={defaultMeta.description} />
      <Meta key="og:title" property="og:title" content={defaultMeta.title} />
      <Meta
        key="og:description"
        property="og:description"
        name="description"
        content={defaultMeta.description}
      />
      <Meta key="og:image" property="og:image" content={defaultMeta.image} />
      <Meta
        key="twitter:card"
        name="twitter:card"
        content="summary_large_image"
      />
      <Meta
        key="twitter:image"
        name="twitter:image"
        content={defaultMeta.image}
      />
    </>
  );
}
