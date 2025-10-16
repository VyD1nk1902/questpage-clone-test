import { useAppData } from "@/hooks/useAppData";

export const useUpdateData = () => {
  const { userInfo } = useAppData();
  const { leaderBoard } = useAppData({
    leaderboardType: "all",
    currentPage: 1,
    sizePage: 10,
    walletAddress: userInfo?.data?.data?.walletAddress,
  });

  // Hàm update cho userInfo
  const updateUserInfo = (partialData: any, shouldRevalidate = false) => {
    userInfo.mutate(
      (prev: any) => ({
        ...prev,
        data: {
          ...prev?.data,
          ...partialData,
        },
      }),
      shouldRevalidate
    );
  };

  // Hàm update cho leaderBoard
  const updateLeaderBoard = (partialData: any, shouldRevalidate = false) => {
    leaderBoard.mutate(
      (prev: any) => ({
        ...prev,
        myRank: {
          ...prev?.myRank,
          ...partialData,
        },
      }),
      shouldRevalidate
    );
  };

  return { updateUserInfo, updateLeaderBoard };
};
