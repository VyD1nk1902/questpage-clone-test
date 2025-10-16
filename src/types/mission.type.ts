export interface IMission_Type {
  _id: string;
  name: string;
}

export interface IMission {
  _id: string;
  name: string;
  description: string;
  point: number;
  type: "social" | "onchain";
  action?: any;
  mission_type: IMission_Type;
  campaign: string;
}

export interface ICampaign {
  _id: string;
  name: string;
  slug: string;
  description: string;
  banner: string;
  reward: number;
  startDate: Date;
  endDate: Date;
}
