import { Card, Grid, Button } from "semantic-ui-react";
import Link from "next/link";

import Campaign from "../../../ethereum/campaign";
import ContributeForm from "../../../components/ContributeForm";
import web3 from "../../../ethereum/web3";

const CampaignShow = ({
  address,
  approversCount,
  balance,
  manager,
  minimumContribution,
  requestsCount,
}) => {
  const items = [
    {
      description:
        "The manager created this campaign and can create requests to withdraw money.",
      header: manager,
      meta: "Address of Manager",
      style: { overflowWrap: "break-word" },
    },
    {
      description:
        "You must contribute at least this much wei to become an approver.",
      header: minimumContribution,
      meta: "Minimum Contribution (wei)",
    },
    {
      description:
        "A request tries to withdraw money from the contract. Request must be approved by approvers.",
      header: requestsCount,
      meta: "Number of Requests",
    },
    {
      description:
        "Number of people who have already donated to this campaign.",
      header: approversCount,
      meta: "Number of Approvers",
    },
    {
      description: "Balance is how much money this campaign has left to spend.",
      header: web3.utils.fromWei(balance, "ether"),
      meta: "Campaign Balance (ether)",
    },
  ];

  return (
    <>
      <h3>Campaign details</h3>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            <Card.Group items={items} />
          </Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Link href={`/campaigns/${address}/requests`}>
              <a>
                <Button primary>View Requests</Button>
              </a>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export const getServerSideProps = async ({ query: { address } }) => {
  const selectedCampaign = Campaign(address);
  const summary = await selectedCampaign.methods.getSummary().call();

  return {
    props: {
      address,
      approversCount: summary[3],
      balance: summary[1],
      manager: summary[4],
      minimumContribution: summary[0],
      requestsCount: summary[2],
    },
  };
};

export default CampaignShow;
