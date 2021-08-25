import { Button, Table } from "semantic-ui-react";
import Link from "next/link";

import Campaign from "../../../../ethereum/campaign";
import RequestRow from "../../../../components/RequestRow";

const Requests = ({
  approversCount,
  campaignAddress,
  requestCount,
  requests,
}) => {
  const { Header, Row, HeaderCell, Body } = Table;

  return (
    <div>
      <h3>Requests</h3>
      <Link href={`/campaigns/${campaignAddress}/requests/new`}>
        <a>
          <Button primary floated="right" style={{ marginBottom: 10 }}>
            Add Request
          </Button>
        </a>
      </Link>
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval Count</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
        <Body>
          {requests.map((request, index) => (
            <RequestRow
              {...{
                approversCount,
                campaignAddress,
                id: index,
                key: index,
                request,
              }}
            />
          ))}
        </Body>
      </Table>
      <div>Found {requestCount} requests.</div>
    </div>
  );
};

export default Requests;

export const getServerSideProps = async ({ query: { address } }) => {
  const campaign = Campaign(address);
  const requestCount = await campaign.methods.getRequestCount().call();
  const approversCount = await campaign.methods.approversCount().call();

  const requests = await Promise.all(
    Array(parseInt(requestCount))
      .fill()
      .map((value, index) => campaign.methods.requests(index).call())
  );

  return {
    props: {
      approversCount,
      campaignAddress: address,
      requests: JSON.parse(JSON.stringify(requests)),
      requestCount,
    },
  };
};
