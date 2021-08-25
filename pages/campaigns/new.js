import { useState } from "react";
import { useRouter } from "next/router";
import { Form, Button, Input, Message } from "semantic-ui-react";

import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";

const CampaignNew = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [minimumContribution, setMinimumContribution] = useState("");

  const handleOnChange = ({ target }) => setMinimumContribution(target.value);

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    setErrorMessage("");

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(web3.utils.toWei(minimumContribution, "ether"))
        .send({ from: accounts[0] });

      router.push("/");
    } catch (err) {
      setErrorMessage(err.message);
      setValue("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h3>Create a Campaign</h3>
      <Form onSubmit={handleOnSubmit} error={!!errorMessage}>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            label="eth"
            labelPosition="right"
            value={minimumContribution}
            onChange={handleOnChange}
          />
        </Form.Field>
        <Message error header="Oops!" content={errorMessage} />
        <Button primary loading={isLoading} type="submit">
          Create!
        </Button>
      </Form>
    </>
  );
};

export default CampaignNew;
