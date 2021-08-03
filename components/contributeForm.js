import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Form, Input, Message } from "semantic-ui-react";

import campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";

const ContributeForm = () => {
  const router = useRouter();
  const { address } = router.query;

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    setErrorMessage("");

    const selectedCampaign = campaign(address);

    try {
      const accounts = await web3.eth.getAccounts();
      await selectedCampaign.methods
        .contribute()
        .send({ from: accounts[0], value: web3.utils.toWei(value, "ether") });

      router.replace(`/campaigns/${address}`);
    } catch (err) {
      setErrorMessage(err.message);
      setValue("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnChange = ({ target }) => setValue(target.value);

  return (
    <Form onSubmit={handleOnSubmit} error={!!errorMessage}>
      <Form.Field>
        <label>Amount to contribute</label>
        <Input
          label="ether"
          labelPosition="right"
          onChange={handleOnChange}
          value={value}
        />
      </Form.Field>
      <Message error header="Oops!" content={errorMessage} />
      <Button primary loading={isLoading} type="submit">
        Contribute!
      </Button>
    </Form>
  );
};

export default ContributeForm;
