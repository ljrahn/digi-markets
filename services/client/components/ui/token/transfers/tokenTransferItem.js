import { useWeb3 } from "@components/providers";
import { CopyClipboard, RedirectUrl } from "@components/ui/common";
import { BiLinkExternal } from "react-icons/bi";
import { useEffect, useState } from "react";

const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";

const TokenTransferItem = ({ item, networkData }) => {
  const { web3 } = useWeb3();
  const time = new Date(item.block_timestamp);
  const [value, setValue] = useState(0);
  console.log(item.value);

  useEffect(() => {
    if (item.value != null && item.value != undefined) {
      setValue(web3.utils.fromWei(String(item.value), "ether").toString());
    }
  }, [item]);

  return (
    <tr className="bg-gray-800 border-b border-gray-700 text-xs text-gray-100">
      <td className="px-3 w-1/5 py-4 text-center">
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
        <CopyClipboard copyText={item.from_address}>
          <div className="overflow-hidden text-ellipsis mr-1">
            {item.from_address == NULL_ADDRESS
              ? "NullAddress"
              : item.from_address}
          </div>
        </CopyClipboard>
      </td>
      <td className="px-3 py-4 text-center">
        <CopyClipboard copyText={item.to_address}>
          <div className="overflow-hidden text-ellipsis mr-1">
            {item.to_address}
          </div>
        </CopyClipboard>
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
      <td className="px-3 py-4 text-center hidden sm:table-cell">
        <RedirectUrl
          href={`${networkData.block_explorer}/tx/${item.transaction_hash}`}
          className="text-gray-100"
          iconSize={15}
        >
          <div className="mr-1">{time.toUTCString()}</div>
        </RedirectUrl>
      </td>
    </tr>
  );
};

export default TokenTransferItem;
