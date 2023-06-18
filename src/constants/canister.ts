import { network, NETWORK } from "./server";

const canisterIds: { [key: string]: string } = {};

export const getCanisterId = (canisterName: string): string => {
  return canisterIds[canisterName];
};

export const CANISTER_NAMES = {
  TOKEN_CANISTER_CONTROLLER: "TokenCanisterController",
  TOKEN_SERVICE: "token",
  SWAP_POSITION_MANAGER: "SwapPositionManager",
  ICS: "ICS",
  WICP: network === NETWORK.IC ? "wicp" : "WICP_T",
  FILE: "FileAssets",
  NFTCanisterController: "V3NFTCanisterController",
  SwapNFTCanister: "V3SwapNFTCanister",
  V3NFTCanister: "NFTDynamicCanister",
  V3TradeStat: "V3TradeStat",
  NFTTrade: "V3TradeCanister",
  FileCanister: "FileCanister",
  V1StakingController: "SwapStakerController",
  SingleSmartChef: "SingleSmartChef",
  SwapStaker: "SwapStaker",
  LaunchpadCanister: "LaunchpadCanister",
  LaunchpadController: "LaunchpadController",
  LaunchpadManager: "LaunchpadManager",
  VOTE: "Vote",
  FileActor: "File",
  SwapRecord: "BaseDataStructure",
  SwapGraphPool: "Pools",
  TokenList: "TokenList",

  ClaimStorage: "ClaimStorage",

  TokenPoolController: "TokenPoolController",
};

export const WICPCanisterId = getCanisterId(CANISTER_NAMES.WICP);

export const ALL_CANISTER_IDS = [...Object.values(canisterIds)];

export { canisterIds };
