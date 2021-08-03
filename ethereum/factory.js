import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x1c98E5eC73D37fEC9911F16fdAACbf576aAC0420"
);

export default instance;
