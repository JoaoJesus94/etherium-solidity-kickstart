import { Card, Button } from "semantic-ui-react";
import factory from "../ethereum/factory";

const CampaignIndex = (props) => {
  const renderCampaign = () => {
    const items = props.campaigns.map((address) => ({
      header: address,
      description: <a>View campaign</a>,
      fluid: true,
    }));

    return <Card.Group items={items} />;
  };

  return (
    <div>
      <h3>Open Campaigns</h3>
      <Button
        floated="right"
        content="Create Campaign"
        icon="add circle"
        primary
      />
      {renderCampaign()}
    </div>
  );
};

export async function getServerSideProps() {
  const campaigns = await factory.methods.getDeployedCampaigns().call();

  return { props: { campaigns } };
}

export default CampaignIndex;
