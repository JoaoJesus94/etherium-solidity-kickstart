import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Form, Button, Message, Input } from "semantic-ui-react";

import Campaign from "../../../../ethereum/campaign";
import web3 from "../../../../ethereum/web3";

const New = ({ address }) => {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [value, setValue] = useState("");

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    setErrorMessage("");

    const campaign = Campaign(address);

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
        .send({ from: accounts[0] });

      router.push(`campaigns/${address}/requests`);
    } catch (err) {
      setErrorMessage(err.message);
      setValue("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Link href={`/campaigns/${address}/requests`}>
        <a>Back</a>
      </Link>
      <h3>Create a Request</h3>
      <Form onSubmit={handleOnSubmit} error={!!errorMessage}>
        <Form.Field>
          <label>Description</label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Value in Ether</label>
          <Input value={value} onChange={(e) => setValue(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Recipient</label>
          <Input
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </Form.Field>
        <Message error header="Oops!" content={errorMessage} />
        <Button primary loading={isLoading}>
          Create!
        </Button>
      </Form>
    </>
  );
};

export default New;

export const getServerSideProps = ({ query: { address } }) => {
  return { props: { address } };
};
