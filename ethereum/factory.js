import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0xb416BEF4575518c25283925e3177c2C4466a12E7"
);

export default instance;
