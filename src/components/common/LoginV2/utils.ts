import { useBalance, useNetwork, Address } from 'wagmi';

export const useLoginHelpers = (account: Address) => {
  const { data } = useBalance({ address: account });
  const { chain, chains } = useNetwork();

  return {
    balance: data,
    chain,
    chains,
  };
};
