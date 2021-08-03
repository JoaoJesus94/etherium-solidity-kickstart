import { useRouter } from "next/router";
import { Card, Grid } from "semantic-ui-react";

import campaign from "../../ethereum/campaign";
import ContributeForm from "../../components/contributeForm";
import web3 from "../../ethereum/web3";

const CampaignShow = ({
  approversCount,
  balance,
  manager,
  minimumContribution,
  requestsCount,
}) => {
  const items = [
    {
      header: manager,
      meta: "Address of Manager",
      description:
        "The manager created this campaign and can create requests to withdraw money.",
      style: { overflowWrap: "break-word" },
    },
    {
      header: minimumContribution,
      meta: "Minimum Contribution (wei)",
      description:
        "You must contribute at least this much wei to become an approver.",
    },
    {
      header: requestsCount,
      meta: "Number of Requests",
      description:
        "A request tries to withdraw money from the contract. Request must be approved by approvers.",
    },
    {
      header: approversCount,
      meta: "Number of Approvers",
      description:
        "Number of people who have already donated to this campaign.",
    },
    {
      header: web3.utils.fromWei(balance, "ether"),
      meta: "Campaign Balance (ether)",
      description: "Balance is how much money this campaign has left to spend.",
    },
  ];

  return (
    <>
      <h3>Campaign details</h3>
      <Grid>
        <Grid.Column width={10}>
          <Card.Group items={items} />
        </Grid.Column>
        <Grid.Column width={6}>
          <ContributeForm />
        </Grid.Column>
      </Grid>
    </>
  );
};

export async function getServerSideProps({ query: { address } }) {
  const selectedCampaign = campaign(address);
  const summary = await selectedCampaign.methods.getSummary().call();

  return {
    props: {
      approversCount: summary[3],
      balance: summary[1],
      manager: summary[4],
      minimumContribution: summary[0],
      requestsCount: summary[2],
    },
  };
}

export default CampaignShow;
