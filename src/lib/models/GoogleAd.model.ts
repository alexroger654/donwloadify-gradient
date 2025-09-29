import mongoose, { Schema, model, models } from "mongoose";

export interface IGoogleAd {
  type: "hero" | "body"; 
  adSlotId: string;      
  title?: string;     
  description?: string;  
  createdAt?: Date;
}

const GoogleAdSchema = new Schema<IGoogleAd>({
  type: { type: String, enum: ["hero", "body"], default: "body" },
  adSlotId: { type: String, required: true },
  title: String,
  description: String,
  createdAt: { type: Date, default: Date.now },
});

const GoogleAd = models.GoogleAd || model<IGoogleAd>("GoogleAd", GoogleAdSchema);
export default GoogleAd;
