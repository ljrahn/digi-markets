import { useWeb3 } from "@components/providers";
import { CopyClipboard, Loader, RedirectUrl } from "@components/ui/common";
import { BiLinkExternal } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useContractMetadata, useNetworkData } from "@components/hooks/server";
import Image from "next/image";
import { useRouter } from "next/router";
import { RiSendPlaneFill, RiUserReceived2Fill } from "react-icons/ri";

const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";

const AccountTokenTransferItem = ({ item, networkData, error }) => {
  const { web3 } = useWeb3();
  const router = useRouter();
  const { eoa } = router.query;
  const {
    data: contractMetadata,
    isValidating: contractMetadataIsValidating,
    error: contractMetadataError,
  } = useContractMetadata({ contractAddress: item.contract_address });
  const [value, setValue] = useState(0);
  const time = new Date(item.block_timestamp);

  useEffect(() => {
    if (item.value) {
      setValue(web3.utils.fromWei(String(item.value), "ether").toString());
    }
  }, []);

  useEffect(() => {
    if (contractMetadataError) {
      console.error(contractMetadataError);
      error(contractMetadataError);
    } else {
      error(null);
    }
  }, [contractMetadataError, contractMetadata]);

  return (
    <>
      {!contractMetadataError &&
      contractMetadata &&
      !contractMetadataIsValidating ? (
        <tr className="bg-gray-800 border-b border-gray-700 text-xs text-gray-100">
          <td className="px-3 py-4 text-center">
            <RedirectUrl
              href={`/nft/contract/${item.contract_address}/${item.token_id}?page=1`}
              className="text-gray-100"
              iconSize={17}
              internal={true}
            >
              <div className="flex mx-auto justify-center items-center min-w-0">
                <div className="w-fit">{contractMetadata.name}</div>
                <div className="text-gray-500 ml-1 overflow-hidden text-ellipsis">
                  #{item.token_id}
                </div>
              </div>
            </RedirectUrl>
          </td>
          <td className="px-3 py-4 text-center hidden sm:table-cell">
            <RedirectUrl
              href={`${networkData.block_explorer}/tx/${item.transaction_hash}`}
              className="text-gray-100"
              iconSize={15}
            >
              <div className="overflow-hidden text-ellipsis">
                {item.transaction_hash}
              </div>
            </RedirectUrl>
          </td>
          <td className="px-3 py-4 text-center">
            <div className="w-fit mx-auto">
              {item.to_address == eoa ? (
                <RiUserReceived2Fill size={20} />
              ) : (
                <RiSendPlaneFill size={20} />
              )}
            </div>
          </td>
          <td className="px-3 py-4 break-words text-center">
            <div className="bg-gray-500 text-white px-3 py-1 rounded-xl w-fit mx-auto">
              <span className="break-all">{value}</span>
              <span>
                {"  "}
                {networkData.currency}
              </span>
            </div>
          </td>
          <td className="px-3 py-4 text-center">
            <RedirectUrl
              href={`${networkData.block_explorer}/tx/${item.transaction_hash}`}
              className="text-gray-100"
              iconSize={15}
            >
              <div className="mr-1">{time.toUTCString()}</div>
            </RedirectUrl>
          </td>
        </tr>
      ) : (
        <tr className="bg-gray-800 border-b border-gray-700 text-xs text-gray-100">
          <td className="px-3 py-4"></td>
          <td className="px-3 py-4 hidden sm:table-cell"></td>
          <td className="px-3 py-4">
            <div className="mr-auto w-fit">
              <Loader color="white" />
            </div>
          </td>
          <td className="px-3 py-4"></td>
          <td className="px-3 py-4"></td>
        </tr>
      )}
    </>
  );
};

export default AccountTokenTransferItem;
