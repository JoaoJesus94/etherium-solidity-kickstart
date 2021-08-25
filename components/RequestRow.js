import { Button, Table } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import { useEffect, useState } from "react";
import Campaign from "../ethereum/campaign";

const RequestRow = ({ approversCount, campaignAddress, id, request }) => {
  const { Row, Cell } = Table;
  const [accounts, setAccounts] = useState(null);
  const [isFinalizing, setIsFinalizing] = useState(null);
  const campaign = Campaign(campaignAddress);
  const readyToFinalize = request.approvalCount > approversCount / 2;

  useEffect(async () => setAccounts(await web3.eth.getAccounts()), []);

  const handleApprove = async () => {
    await campaign.methods.approveRequest(id).send({ from: accounts[0] });
  };

  const handleFinalize = async () => {
    setIsFinalizing(true);
    await campaign.methods.finalizeRequest(id).send({ from: accounts[0] });
    setIsFinalizing(false);
  };

  return (
    <Row
      disabled={request.complete}
      positive={!request.complete && readyToFinalize}
    >
      <Cell>{id}</Cell>
      <Cell>{request.description}</Cell>
      <Cell>{web3.utils.fromWei(request.value, "ether")} ETH</Cell>
      <Cell>{request.recipient}</Cell>
      <Cell>{`${request.approvalCount}/${approversCount}`}</Cell>
      <Cell>
        {!request.complete && (
          <Button color="green" basic onClick={handleApprove}>
            Approve
          </Button>
        )}
      </Cell>
      <Cell>
        {!request.complete && (
          <Button
            loading={isFinalizing}
            color="blue"
            basic
            onClick={handleFinalize}
          >
            Finalize
          </Button>
        )}
      </Cell>
    </Row>
  );
};

export default RequestRow;
