import { Card, Button } from "semantic-ui-react";
import Link from "next/link";

import factory from "../ethereum/factory";

const CampaignIndex = ({ campaigns }) => {
  const renderCampaign = () => {
    const items = campaigns.map((address) => ({
      header: address,
      description: (
        <Link href={`/campaigns/${address}`}>
          <a>View campaign</a>
        </Link>
      ),
      fluid: true,
    }));

    return <Card.Group items={items} />;
  };

  return (
    <div>
      <h3>Open Campaigns</h3>
      <Link href="/campaigns/new">
        <a>
          <Button
            floated="right"
            content="Create Campaign"
            icon="add circle"
            primary
          />
        </a>
      </Link>

      {renderCampaign()}
    </div>
  );
};

export async function getServerSideProps() {
  const campaigns = await factory.methods.getDeployedCampaigns().call();

  return { props: { campaigns } };
}

export default CampaignIndex;
