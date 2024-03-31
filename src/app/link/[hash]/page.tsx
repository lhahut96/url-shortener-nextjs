import { getService } from "@/app/services/url-shortener";
import { redirect } from "next/navigation";

type Params = {
  hash: string;
};

const urlRedirect = async ({ params }: { params: Params }) => {
  const campaign = await getService(params.hash);
  if (campaign) {
    redirect(campaign.link);
  }
};

export default urlRedirect;
